import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMemberName } from "../../api/member";
import { useAuth } from "../useAuth";
import { AccountInputValue } from "../../types/auth";
import { validateName } from "../../utils/validation";

export const useUpdateMemberName = () => {
    const queryClient = useQueryClient();
    const session = useAuth();

    const updateName = useMutation({
      mutationFn: updateMemberName,
      onSuccess: (data) => {
        alert("이름 변경이 완료되었습니다.");
        queryClient.setQueryData(["member"], data);
      },
      onError: () => alert("이름 변경에 실패했습니다. 다시 시도해주세요!"),
    });
  

  const handleUpdateMemberName = (
    setErrors: React.Dispatch<
      React.SetStateAction<Pick<AccountInputValue, "name"> | null>
    >,
    name: string
  ) => {
    if (session) {
      const validateResult = validateName(name);
  
      if (validateResult.name === "") {
        updateName.mutate({ name, userId: session.user.id });
      } else {
        setErrors(validateResult);
      }
    } else {
      alert("로그인이 필요합니다.");
    }
  }
  return {handleUpdateMemberName};
}