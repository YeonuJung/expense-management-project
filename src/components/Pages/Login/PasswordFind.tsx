import "./Login.scss";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import Alert from "../../Atoms/Alert/Alert";
import Divider from "../../Atoms/Divider/Divider";
import { useInputRef } from "../../../hooks/useInputRef";
import { LoginInputValue } from "../../../types/general";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePasswordFind } from "../../../hooks/usePasswordFind";

function PasswordFind() {
  const [errors, setErrors] = useState<Pick<LoginInputValue, "email"> | null>(
    null
  );
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [inputValueRef, handleInputValue] = useInputRef<
    Pick<LoginInputValue, "email">
  >({
    email: "",
  });
  const navigate = useNavigate();
  const { handlePasswordFind } = usePasswordFind();

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
              비밀번호 찾기
            </div>
            <div className={`login__title-text login__title-text-sub`}>
              가입하신 이메일을 입력해주세요
            </div>
          </div>
          <div className="login__form-container">
            <Input
              title="이메일"
              type="email"
              name="email"
              placeholder="example@example.com"
              handleInputValue={handleInputValue}
            />
            {errors?.email && <Alert type="error" content={errors.email} />}
            <Button
              variant="filled"
              size="large"
              onClick={() =>
                handlePasswordFind(
                  inputValueRef.current.email,
                  setIsEmailValid,
                  setErrors
                )
              }
            >
              비밀번호 찾기
            </Button>
            {!isEmailValid && (
              <Alert type="error" content="가입되지 않은 이메일입니다." />
            )}
            <Divider />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordFind;
