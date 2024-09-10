import { useMutation, useQueryClient} from "@tanstack/react-query";
import { deleteExpenseRecord } from "../../api/expenseRecord";
import { useAuth } from "../useAuth";

export const useDeleteExpense = () => {
  const session = useAuth();
  const queryClient = useQueryClient();

  const deleteExpense = useMutation({
    mutationFn: deleteExpenseRecord,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["expenseRecord"] });
      alert("삭제가 완료되었습니다.");
    },
    onError: () => {
      alert("삭제에 실패했습니다.");
    },
  });
  const handleDeleteExpense = async (id: number): Promise<void> => {
    if (session) {
      deleteExpense.mutate({ userId: session.user.id, id });
    } else {
      alert("로그인이 필요합니다.");
    }
  };
  return { handleDeleteExpense };
};
