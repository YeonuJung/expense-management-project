import "./Login.scss";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import Alert from "../../Atoms/Alert/Alert";
import Divider from "../../Atoms/Divider/Divider";
import { Link, useNavigate } from "react-router-dom";
import { useInputRef } from "../../../hooks/useInputRef";
import { LoginInputValue } from "../../../types/auth";
import supabase from "../../../api/base";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

function Login() {
  const [errors, setErrors] = useState<LoginInputValue | null>(null);
  const [isEmailAndPasswordValid, setIsEmailAndPasswordValid] = useState(true);
  const [inputValueRef, handleInputValue] = useInputRef<LoginInputValue>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const session = useAuth();

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
    setErrors(
      validateLoginForm(inputValueRef.current.email, inputValueRef.current.password)
    );
    
  };
  useEffect(() => {
    const login = async () => {
      if(errors?.email === "" && errors?.password === ""){
        const { data, error } = await supabase.auth.signInWithPassword({
          email: inputValueRef.current.email,
          password: inputValueRef.current.password,
        });
        const checkStatus = await supabase.auth.getUser(data.session?.access_token)
        
        const { ip, agent } = await getIpAndAgent();
       
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
          setIsEmailAndPasswordValid(false)
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
      }else{
        setIsEmailAndPasswordValid(true)
      }
    }
    login()
  }, [errors, inputValueRef.current.email, inputValueRef.current.password]);

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

  const validateLoginForm = (email: string, password: string) => {
    const error: LoginInputValue = { email: "", password: "" };

    if (email === "") {
      error.email = "이메일을 입력해주세요.";
    } else if (!/^[a-z0-9.\-_]+@([a-z0-9-]+\.)+[a-z]{2,6}$/.test(email)) {
      error.email = "이메일 형식에 맞게 입력해주세요.";
    }

    if (password === "") {
      error.password = "패스워드를 입력해주세요.";
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      error.password =
        "패스워드는 최소 8자 이상, 영문자, 숫자, 특수문자를 포함해야 합니다.";
    }

    return error;
  };
  
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
            {errors?.email && <Alert type="error" content={errors.email} />}
            <Input
              title="비밀번호"
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요."
              handleInputValue={handleInputValue}
              onKeyDown={activeEnter}
            />
             {errors?.password && <Alert type="error" content={errors.password} />}
            <Button
              variant="filled"
              size="large"
              onClick={handleLoginButtonClick}
            >
              로그인
            </Button>
            {!isEmailAndPasswordValid && <Alert
              type="error"
              content="이메일 또는 비밀번호가 일치하지 않습니다."
            />}
            
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
