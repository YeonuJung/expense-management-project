import "./Register.scss";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import Divider from "../../Atoms/Divider/Divider";
import { useInputRef } from "../../../hooks/useInputRef";
import { RegisterInputValue } from "../../../types/auth";
import supabase from "../../../api/base";
import {useState } from "react";
import Terms from "./Terms";
import Alert from "../../Atoms/Alert/Alert";
import { useNavigate } from "react-router-dom";

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

  const handlerRegisterButtonClick = async (): Promise<void> => {
    const validateResult = validateRegisterForm(
      inputValueRef.current.email,
      inputValueRef.current.password
    );
    if (validateResult.email === "" && validateResult.password === "") {
      register();
    } else {
      setIsEmailValid(true);
      setErrors(validateResult);
    }
  };

  const register = async () => {
    const { data: existingUser } = await supabase
      .from("member")
      .select("email")
      .eq("email", inputValueRef.current.email);

    if (existingUser && existingUser?.length > 0) {
      setIsEmailValid(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: inputValueRef.current.email,
      password: inputValueRef.current.password,
      options: {
        emailRedirectTo: "http://localhost:3000/login",
      },
    });
    console.log(error?.message)
    if (error) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      return;
    }
    alert("이메일을 확인해주세요!");
  };

  const validateRegisterForm = (email: string, password: string) => {
    const error: RegisterInputValue = { email: "", password: "" };

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
                onClick={handlerRegisterButtonClick}
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
