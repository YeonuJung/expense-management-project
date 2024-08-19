import "./Login.scss";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import Alert from "../../Atoms/Alert/Alert";
import Divider from "../../Atoms/Divider/Divider";
import {useNavigate } from "react-router-dom";
import { useInputRef } from "../../../hooks/useInputRef";
import { SecurityPassword} from "../../../types/auth";
import supabase from "../../../api/base";

function PasswordReset() {
  const [inputValueRef, handleInputValue] = useInputRef<SecurityPassword>({
    password: "",
  });
  const navigate = useNavigate();
  const handlePasswordResetButtonClick = async () => {
    const { error } = await supabase.auth.updateUser({password: inputValueRef.current.password});
    console.log(error?.cause)
    console.log(error?.message)
    if (error?.message === 'New password should be different from the old password.') {
        alert("기존 비밀번호와 동일합니다. 다시 시도해주세요!")
        inputValueRef.current.password = "";
        return
    }else if(error){
        alert("비밀번호 재설정에 실패했습니다. 다시 시도해주세요!");
        inputValueRef.current.password = "";
        return
    } 
    else {
      alert("비밀번호 재설정이 완료되었습니다");
    }
    navigate("/login");
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
              비밀번호 재설정
            </div>
            <div className={`login__title-text login__title-text-sub`}>
              새로운 비밀번호를 입력해주세요
            </div>
          </div>
          <div className="login__form-container">
          <Input
              title="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              handleInputValue={handleInputValue}
            />
            <Button variant="filled" size="large" onClick={handlePasswordResetButtonClick}>
              비밀번호 재설정
            </Button>
            <Alert type="warning" content="비밀번호를 제대로 입력해주세요!" />
            <Divider />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
