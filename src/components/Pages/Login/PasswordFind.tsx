import "./Login.scss";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import Alert from "../../Atoms/Alert/Alert";
import Divider from "../../Atoms/Divider/Divider";
import { useInputRef } from "../../../hooks/useInputRef";
import { LoginInputValue } from "../../../types/auth";
import supabase from "../../../api/base";
import { useNavigate } from "react-router-dom";

function PasswordFind() {
  const [inputValueRef, handleInputValue] = useInputRef<LoginInputValue>({
    email: "",
    password: "",
  });
const navigate = useNavigate();
  const handlePasswordFindButtonClick = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(
      inputValueRef.current.email, {redirectTo: "http://localhost:3000/passwordReset"}
    );
    if (error) {
      alert("비밀번호 찾기에 실패했습니다. 다시 시도해주세요!");
    } else {
      alert("이메일로 비밀번호 재설정 링크를 보냈습니다.");
    }
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
            <Button variant="filled" size="large" onClick={handlePasswordFindButtonClick}>
              비밀번호 찾기
            </Button>
            <Alert type="warning" content="이메일을 제대로 입력해주세요!" />
            <Divider />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordFind;
