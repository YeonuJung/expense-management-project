import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../api/auth";
import { useAuth } from "../useAuth";
import { validatePassword } from "../../utils/validation";
import { SecurityPassword } from "../../types/general";

export const useChangePassword = () => {
  const navigate = useNavigate();
  const session = useAuth();

  const changeMemberPassword = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      alert("비밀번호 변경이 완료되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      if (
        error.message ===
        "New password should be different from the old password."
      ) {
        alert("다른 비밀번호로 재시도해주세요.");
      }
    },
  });

  const handleChangePassword = async (
    password: string,
    setErrors: React.Dispatch<React.SetStateAction<SecurityPassword | null>>
  ): Promise<void> => {
    if (session) {
      const validateResult = validatePassword(password);
      if (validateResult.password === "") {
        changeMemberPassword.mutate(password);
      } else {
        setErrors(validateResult);
      }
    } else {
      alert("로그인이 필요합니다.");
    }
  };
  return { handleChangePassword };
};
