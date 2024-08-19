import "./Login.scss";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import Alert from "../../Atoms/Alert/Alert";
import Divider from "../../Atoms/Divider/Divider";
import { Link,useNavigate } from "react-router-dom";
import { useInputRef } from "../../../hooks/useInputRef";
import { LoginInputValue } from "../../../types/auth";
import supabase from "../../../api/base";


function Login() {
  const [inputValueRef, handleInputValue] = useInputRef<LoginInputValue>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLoginButtonClick = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: inputValueRef.current.email,
      password: inputValueRef.current.password,
    });
    if (error) {
      alert("로그인에 실패했습니다. 다시 시도해주세요!");
      return;
    }
    alert("로그인에 성공했습니다!");
   const checkMember = await supabase
      .from("member")
      .select("email")
      .eq("email", inputValueRef.current.email);
      
      if(checkMember.data?.length === 0){
        await supabase
        .from("member")
        .insert({
          email: inputValueRef.current.email,
          user_id: data?.user.id,
          name: "회원",
        });
      }
      navigate("/")
  };

  return (
    <div className="login__container">
      <div className="login__main-container">
        <div className="login__card-container">
          <div className="login__title-container">
            <div className="login__title-logo-container">
            <img src="로고.png" className="login__logo" alt="logo" onClick={() => navigate("/")}></img>
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
              title="Email address"
              type="email"
              name="email"
              placeholder="example@example.com"
              handleInputValue={handleInputValue}
            />
            <Input
              title="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              handleInputValue={handleInputValue}
            />
            <Button
              variant="filled"
              size="large"
              onClick={handleLoginButtonClick}
            >
              Log in
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
