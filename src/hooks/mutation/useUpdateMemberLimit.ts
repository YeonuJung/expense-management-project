import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMemberLimit } from "../../api/member";
import { useAuth } from "../useAuth";


export const useUpdateMemberLimit = () => {
    const queryClient = useQueryClient();

    const session = useAuth();


    const updateLimit = useMutation({
      mutationFn: updateMemberLimit,
      onSuccess: (data) => {
        alert("한도 변경이 완료되었습니다.");
        queryClient.setQueryData(["member"], data);
      },
      onError: () => alert("한도 변경에 실패했습니다. 다시 시도해주세요!"),
    });

    const handleUpdateMemberLimit = (
        limit: number,
      ) => {
        if (session) {
          if (limit === 0) {
            alert("한도를 입력해주세요.");
            return;
          }
          updateLimit.mutate({ limit, userId: session.user.id });
        } else {
          alert("로그인이 필요합니다.");
        }
      };
    return {handleUpdateMemberLimit};
  }

 