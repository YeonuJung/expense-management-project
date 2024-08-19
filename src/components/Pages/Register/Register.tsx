import "./Register.scss";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import Divider from "../../Atoms/Divider/Divider";
import { useInputRef } from "../../../hooks/useInputRef";
import { RegisterInputValue } from "../../../types/auth";
import supabase from "../../../api/base";
import { useState } from "react";
import Terms from "./Terms";
import { useNavigate
  
 } from "react-router-dom";
function Register() {
  const [inputValueRef, handleInputValue] = useInputRef<RegisterInputValue>({
    email: "",
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleTermsClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlerRegisterButtonClick = async (): Promise<void> => {
    const { data: existingUser } = await supabase
      .from("member")
      .select("email")
      .eq("email", inputValueRef.current.email);

    if (existingUser && existingUser?.length > 0) {
      alert("이미 존재하는 이메일입니다. 다른 이메일을 사용해주세요.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: inputValueRef.current.email,
      password: inputValueRef.current.password,
      options: {
        emailRedirectTo: "http://localhost:3000/login",
      },
    });
    if (error) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      return;
    }
    alert("이메일을 확인해주세요!");
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
              <div className="register__form-checkbox-container">
                <input
                  type="checkbox"
                  className="register__form-checkbox"
                  checked={checked}
                ></input>
                <div className="register__terms" onClick={handleTermsClick}>
                  회원가입 이용약관
                </div>
                <span>을 모두 읽고 확인했습니다</span>
              </div>
              <Button
                variant="filled"
                size="large"
                onClick={handlerRegisterButtonClick}
                disabled={!checked}
              >
                Register
              </Button>
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
