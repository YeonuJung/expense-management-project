import { useNavigate } from "react-router-dom";
import { resetPassword } from "../api/auth";
import { validatePassword } from "../utils/validation";
import { SecurityPassword } from "../types/general";

export const usePasswordReset = () => {
  const navigate = useNavigate();
  const handlePasswordReset = async (
    password: string,
    setIsPasswordVaild: React.Dispatch<React.SetStateAction<boolean>>,
    setErrors: React.Dispatch<React.SetStateAction<SecurityPassword | null>>
  ) => {
    const validateResult = validatePassword(password);
    if (validateResult.password === "") {
      const { error } = await resetPassword(password);
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
    } else {
      setIsPasswordVaild(true);
      setErrors(validateResult);
    }
  };

  return { handlePasswordReset };
};
