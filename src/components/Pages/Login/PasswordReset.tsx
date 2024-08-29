import "./Login.scss";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import Alert from "../../Atoms/Alert/Alert";
import Divider from "../../Atoms/Divider/Divider";
import { useNavigate } from "react-router-dom";
import { useInputRef } from "../../../hooks/useInputRef";
import { SecurityPassword } from "../../../types/auth";
import supabase from "../../../api/base";
import { useState} from "react";

function PasswordReset() {
  const [errors, setErrors] = useState<SecurityPassword | null>(null);
  const [isPasswordVaild, setIsPasswordVaild] = useState<boolean>(true);
  const [inputValueRef, handleInputValue] = useInputRef<SecurityPassword>({
    password: "",
  });
  const navigate = useNavigate();

  const handlePasswordResetButtonClick = async () => {
    const validateResult = validatePassword(inputValueRef.current.password);
    if (validateResult.password === "") {
      resetPassword();
    } else {
      setIsPasswordVaild(true);
      setErrors(validatePassword(inputValueRef.current.password));
    }
  };

  const resetPassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password: inputValueRef.current.password,
    })
    if (
      error?.message ===
      "New password should be different from the old password."
    ) {
      setIsPasswordVaild(false);
      return;
    } else if (error) {
      alert("비밀번호 재설정에 실패했습니다. 다시 시도해주세요!");
      return;
    } else {
      alert("비밀번호 재설정이 완료되었습니다");
    }
    navigate("/login");
  };

  const validatePassword = (password: string) => {
    const error: SecurityPassword = { password: "" };
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
              onClick={handlePasswordResetButtonClick}
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
