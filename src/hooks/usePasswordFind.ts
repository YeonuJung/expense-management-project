import { passwordFind } from "../api/auth";
import { checkIsMember } from "../api/member";
import { LoginInputValue } from "../types/general";
import { validateEmail } from "../utils/validation";

export const usePasswordFind = () => {
  const handlePasswordFind = async (
    email: string,
    setIsEmailValid: React.Dispatch<React.SetStateAction<boolean>>,
    setErrors: React.Dispatch<
      React.SetStateAction<Pick<LoginInputValue, "email"> | null>
    >
  ) => {
    const validateResult = validateEmail(email);
    if (validateResult.email === "") {
      const { data } = await checkIsMember(email);

      if (data?.length === 0) {
        setIsEmailValid(false);
        return;
      }

      const { error } = await passwordFind(email);
      if (error) {
        alert("비밀번호 찾기에 실패했습니다. 다시 시도해주세요!");
        return;
      } else {
        alert("이메일로 비밀번호 재설정 링크를 보냈습니다.");
      }
    } else {
      setErrors(validateResult);
      setIsEmailValid(true);
    }
  };
  return { handlePasswordFind };
};
