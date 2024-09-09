import { signUp } from "../api/auth";
import { checkIsMember } from "../api/member";
import { RegisterInputValue } from "../types/auth";
import { validateRegisterForm } from "../utils/validation";

export const useRegister = () => {
  const handleRegister = async (
    email: string,
    password: string,
    setIsEmailValid: React.Dispatch<React.SetStateAction<boolean>>,
    setErrors: React.Dispatch<React.SetStateAction<RegisterInputValue | null>>
  ): Promise<void> => {
    const validateResult = validateRegisterForm(email, password);
    if (validateResult.email === "" && validateResult.password === "") {
            const { data: existingUser } = await checkIsMember(email);
            if (existingUser && existingUser.length > 0) {
              setIsEmailValid(false);
              return;
            }
            const { error } = await signUp(email, password);
            if (error) {
              alert("회원가입에 실패했습니다. 다시 시도해주세요.");
              return;
            }
            alert("이메일을 확인해주세요!");
          } else {
      setIsEmailValid(true);
      setErrors(validateResult);
    }
};
return { handleRegister };
}