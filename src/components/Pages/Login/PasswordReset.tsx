import "./Login.scss";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import Alert from "../../Atoms/Alert/Alert";
import Divider from "../../Atoms/Divider/Divider";
import { useNavigate } from "react-router-dom";
import { useInputRef } from "../../../hooks/useInputRef";
import { SecurityPassword } from "../../../types/general";
import { useState } from "react";
import { usePasswordReset } from "../../../hooks/usePasswordReset";

function PasswordReset() {
  const [errors, setErrors] = useState<SecurityPassword | null>(null);
  const [isPasswordVaild, setIsPasswordVaild] = useState<boolean>(true);
  const [inputValueRef, handleInputValue] = useInputRef<SecurityPassword>({
    password: "",
  });
  const navigate = useNavigate();
  const { handlePasswordReset } = usePasswordReset();

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
              비밀번호 재설정
            </div>
            <div className={`login__title-text login__title-text-sub`}>
              새로운 비밀번호를 입력해주세요
            </div>
          </div>
          <div className="login__form-container">
            <Input
              title="비밀번호"
              type="password"
              name="password"
              placeholder="새로운 비밀번호를 입력하세요"
              handleInputValue={handleInputValue}
            />
            {errors?.password && (
              <Alert type="error" content={errors.password} />
            )}
            <Button
              variant="filled"
              size="large"
              onClick={() =>
                handlePasswordReset(
                  inputValueRef.current.password,
                  setIsPasswordVaild,
                  setErrors
                )
              }
            >
              비밀번호 재설정
            </Button>
            {!isPasswordVaild && (
              <Alert
                type="error"
                content={"기존 비밀번호와 다른 비밀번호를 사용해주세요."}
              />
            )}

            <Divider />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
