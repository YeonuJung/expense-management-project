import "./Login.scss";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import Alert from "../../Atoms/Alert/Alert";
import Divider from "../../Atoms/Divider/Divider";
import { useInputRef } from "../../../hooks/useInputRef";
import { LoginInputValue } from "../../../types/auth";
import supabase from "../../../api/base";
import { useNavigate } from "react-router-dom";
import {useState } from "react";

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

  const handlePasswordFindButtonClick = async () => {
    const validateResult = validateEmail(inputValueRef.current.email);
    if (validateResult.email === "") {
      passwordFind();
    } else {
      setErrors(validateResult);
      setIsEmailValid(true);
    }
  };

  const passwordFind = async () => {
    const { data } = await supabase
      .from("member")
      .select("email")
      .eq("email", inputValueRef.current.email);
    
      if (data?.length === 0) {
      setIsEmailValid(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(
      inputValueRef.current.email,
      { redirectTo: "http://localhost:3000/passwordReset" }
    );
    if (error) {
      alert("비밀번호 찾기에 실패했습니다. 다시 시도해주세요!");
      return;
    } else {
      alert("이메일로 비밀번호 재설정 링크를 보냈습니다.");
    }
  };

  const validateEmail = (email: string) => {
    const error: Pick<LoginInputValue, "email"> = { email: "" };

    if (email === "") {
      error.email = "이메일을 입력해주세요.";
    } else if (!/^[a-z0-9.\-_]+@([a-z0-9-]+\.)+[a-z]{2,6}$/.test(email)) {
      error.email = "이메일 형식에 맞게 입력해주세요.";
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
              onClick={handlePasswordFindButtonClick}
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
