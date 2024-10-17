import "./Login.scss";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import Alert from "../../Atoms/Alert/Alert";
import Divider from "../../Atoms/Divider/Divider";
import { Link, useNavigate } from "react-router-dom";
import { useInputRef } from "../../../hooks/useInputRef";
import { LoginInputValue } from "../../../types/general";
import { useEffect, useState } from "react";
import { selectIpAndAgent } from "../../../api/loginHistory";
import { useQuery } from "@tanstack/react-query";
import { useLogin } from "../../../hooks/useLogin";

function Login() {
  const [errors, setErrors] = useState<LoginInputValue | null>(null);
  const [isEmailAndPasswordValid, setIsEmailAndPasswordValid] = useState(true);
  const [inputValueRef, handleInputValue] = useInputRef<LoginInputValue>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["LoginHistory"],
    queryFn: selectIpAndAgent,
  });
  const { handleLogin } = useLogin();

  const activeEnter = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      handleLogin(
        inputValueRef.current.email,
        inputValueRef.current.password,
        inputValueRef,
        data,
        setIsEmailAndPasswordValid,
        setErrors
      );
    }
  };
  useEffect(() => {
    const loginTime = localStorage.getItem("loginTime");
    if (loginTime) {
      alert("이미 로그인 되어있습니다.");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login__container">
      <div className="login__main-container">
        <div className="login__card-container">
          <div className="login__title-container">
            <div className="login__title-logo-container">
              <img
                src="로고2.png"
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
            {errors?.password && (
              <Alert type="error" content={errors.password} />
            )}
            <Button
              variant="filled"
              size="large"
              onClick={() =>
                handleLogin(
                  inputValueRef.current.email,
                  inputValueRef.current.password,
                  inputValueRef,
                  data,
                  setIsEmailAndPasswordValid,
                  setErrors
                )
              }
            >
              로그인
            </Button>
            {!isEmailAndPasswordValid && (
              <Alert
                type="error"
                content="이메일 또는 비밀번호가 일치하지 않습니다."
              />
            )}

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
