import "./Register.scss";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import Divider from "../../Atoms/Divider/Divider";
import { useInputRef } from "../../../hooks/useInputRef";
import { RegisterInputValue } from "../../../types/general";
import { useState } from "react";
import Terms from "./Terms";
import Alert from "../../Atoms/Alert/Alert";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../../hooks/useRegister";

function Register() {
  const [inputValueRef, handleInputValue] = useInputRef<RegisterInputValue>({
    email: "",
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState<RegisterInputValue | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const navigate = useNavigate();
  const handleTermsClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { handleRegister } = useRegister();

  return (
    <>
      <div className="register__container">
        <div className="register__main-container">
          <div className="register__card-container">
            <div className="register__title-container">
              <div className="register__title-logo-container">
                <img
                  src="로고.png"
                  className="register__logo"
                  alt="logo"
                  onClick={() => navigate("/")}
                ></img>
              </div>
              <div className={`register__title-text register__title-text-main`}>
                회원가입
              </div>
              <div className={`register__title-text register__title-text-sub`}>
                입력란에 정보를 입력해주세요
              </div>
            </div>
            <div className="register__form-container">
              <Input
                title="이메일"
                type="email"
                name="email"
                placeholder="example@example.com"
                handleInputValue={handleInputValue}
              />
              {errors?.email && <Alert type="error" content={errors.email} />}
              <Input
                title="비밀번호"
                type="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
                handleInputValue={handleInputValue}
              />
              {errors?.password && (
                <Alert type="error" content={errors.password} />
              )}
              <div className="register__form-checkbox-container">
                <input
                  type="checkbox"
                  className="register__form-checkbox"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                ></input>
                <div className="register__terms" onClick={handleTermsClick}>
                  회원가입 이용약관
                </div>
                <span>을 모두 읽고 확인했습니다.</span>
              </div>
              <Button
                variant="filled"
                size="large"
                onClick={() =>
                  handleRegister(
                    inputValueRef.current.email,
                    inputValueRef.current.password,
                    setIsEmailValid,
                    setErrors
                  )
                }
                disabled={!checked}
              >
                회원가입
              </Button>
              {!isEmailValid && (
                <Alert type="error" content={"이미 가입된 이메일입니다."} />
              )}
              <Divider />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Terms
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          setChecked={setChecked}
        />
      )}
    </>
  );
}

export default Register;
