import { useMutation } from "@tanstack/react-query";
import { insertExpenseRecord } from "../../api/expenseRecord";
import { useAuth } from "../useAuth";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const useInsertExpense = () => {
  const session = useAuth();
  const navigate = useNavigate();

  const updateExpense = useMutation({
    mutationFn: insertExpenseRecord,
    onSuccess: () => {
      alert("지출내역 추가가 완료되었습니다.");
      navigate("/expenseList");
    },
    onError: () => {
      alert("지출내역 추가에 실패했습니다. 다시 시도해주세요!");
    },
  });
  const handleInsertExpense = (insertExpenseParams: {
    name: string;
    place: string | null;
    price: number;
    rating: string;
    date: string;
    category: string;
  }) => {
    if (session) {
      const today = moment(new Date()).format("YYYY-MM-DD");
      if (insertExpenseParams.date > today) {
        alert("오늘 이후의 날짜는 추가할 수 없습니다.");
        return;
      }
      updateExpense.mutate({ ...insertExpenseParams, userId: session.user.id });
    } else {
      alert("로그인이 필요합니다.");
    }
  };
  return { handleInsertExpense };
};
