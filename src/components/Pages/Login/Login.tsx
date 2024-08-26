import "./Login.scss";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import Alert from "../../Atoms/Alert/Alert";
import Divider from "../../Atoms/Divider/Divider";
import { Link, useNavigate } from "react-router-dom";
import { useInputRef } from "../../../hooks/useInputRef";
import { LoginInputValue } from "../../../types/auth";
import supabase from "../../../api/base";
import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";

function Login() {
  const [inputValueRef, handleInputValue] = useInputRef<LoginInputValue>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const session = useAuth();
console.log(session?.user.user_metadata)
  const getIpAndAgent = async () => {
    const response = await fetch("https://api64.ipify.org/?format=json");
    const { ip } = await response.json();

    const browsers: string[] = [
      "Chrome",
      "Safari",
      "Firefox",
      "Edge",
      "Edg",
      "OPR",
      "Opera",
      "MSIE",
      "Trident",
      "YaBrowser",
      "UCBrowser",
      "CriOS",
      "FxiOS",
      "SamsungBrowser",
    ];
    const browserRegex = new RegExp(`(${browsers.join("|")})/([\\d\\.]+)`, "i");
    const match = navigator.userAgent.match(browserRegex);
    return { ip: ip, agent: match?.[0] };
  };

  const handleLoginButtonClick = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: inputValueRef.current.email,
      password: inputValueRef.current.password,
    });
    const checkStatus = (await supabase.auth.getUser(data.session?.access_token))
    console.log(checkStatus)
    const { ip, agent } = await getIpAndAgent();
    console.log(ip, agent);
    if (data.user && ip && agent && checkStatus?.data.user?.user_metadata.status === undefined) {
      await supabase
        .from("loginhistory")
        .insert([
          {
            user_id: data.user.id,
            ip: ip,
            browser: agent,
            created_at: new Date().toLocaleString(),
          },
        ])
    }
    if(checkStatus?.data.user?.user_metadata.status === "deleted"){
      alert("탈퇴한 회원입니다.")
      await supabase.auth.signOut();
    }

    if (error?.message === "Invalid login credentials") {
      console.log(error);
      alert("아이디나 비밀번호가 틀렸습니다. 다시 시도해주세요!");
      return;
    } else if (error) {
      alert("로그인에 실패했습니다. 다시 시도해주세요!");
      return;
    }

    const checkMember = await supabase
      .from("member")
      .select("email")
      .eq("email", inputValueRef.current.email);

    if (checkMember.data?.length === 0) {
      await supabase.from("member").insert({
        email: inputValueRef.current.email,
        user_id: data?.user.id,
        name: "회원",
      });
    }

    navigate("/");
  };

  const activeEnter = (e: React.KeyboardEvent): void => {
    console.log("Key pressed:", e.key);
    if (e.key === "Enter") {
      handleLoginButtonClick();
    }
  };
  useEffect(() => {
    if (session) {
      alert("이미 로그인 되어있습니다.");
      navigate("/");
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="login__container">
      <div className="login__main-container">
        <div className="login__card-container">
          <div className="login__title-container">
            <div className="login__title-logo-container">
              <img
                src="로고.png"
                className="login__logo"
                alt="logo"
                onClick={() => navigate("/")}
              ></img>
            </div>
            <div className={`login__title-text login__title-text-main`}>
              로그인
            </div>
            <div className={`login__title-text login__title-text-sub`}>
              입력란에 정보를 입력해주세요
            </div>
          </div>
          <div className="login__form-container">
            <Input
              title="이메일"
              type="email"
              name="email"
              placeholder="example@example.com"
              handleInputValue={handleInputValue}
              onKeyDown={activeEnter}
            />
            <Input
              title="비밀번호"
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              handleInputValue={handleInputValue}
              onKeyDown={activeEnter}
            />
            <Button
              variant="filled"
              size="large"
              onClick={handleLoginButtonClick}
            >
              로그인
            </Button>
            <Alert
              type="warning"
              content="아이디와 비밀번호를 제대로 입력해주세요!"
            />
            <Divider />
            <div className="login__form-link-container">
              <Link to={"/register"}>회원가입</Link>
              <Link to={"/passwordFind"}>비밀번호 찾기</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
