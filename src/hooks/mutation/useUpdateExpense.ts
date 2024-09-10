import { useMutation, useQueryClient} from "@tanstack/react-query";
import { updateExpenseRecord } from "../../api/expenseRecord";
import { useNavigate } from "react-router-dom";

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateExpense = useMutation({
    mutationFn: updateExpenseRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenseRecord"] });
      alert("업데이트에 성공했습니다!");
      navigate("/expenseList");
    },
    onError: () => {
      alert("업데이트에 실패했습니다. 다시 시도해주세요!");
    },
  });
  return { updateExpense };
};
