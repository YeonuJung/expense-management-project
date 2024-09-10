import "./ExpenseChart.scss";
import MontlyChart from "./MontlyChart";
import CategoryChart from "./CategoryChart";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Session } from "@supabase/supabase-js";
import { ExpenseRecordForChart } from "../../../types/general";
import { useToggleButton } from "../../../hooks/useToggleButton";
import { useQuery } from "@tanstack/react-query";
import { readExpenseRecord } from "../../../api/expenseRecord";
import Loading from "../../Atoms/Loading/Loading";

function ExpenseChart() {
  const [toggle, setToggle] = useState<{
    MonthlyButton: boolean;
    CategoryButton: boolean;
  }>({ MonthlyButton: false, CategoryButton: false });
  const [expenseRecord, setExpenseRecord] = useState<ExpenseRecordForChart[]>(
    []
  );

  const session: Session | null = useAuth();

  const { data, isError, isPending } = useQuery({
    queryKey: ["expenseRecord"],
    queryFn: () => readExpenseRecord(session?.user.id as string, {}),
    staleTime: 1000 * 60 * 2,
    enabled: !!session,
  });

  useEffect(() => {
    if (data && data.data && data.data.length > 0) {
      setExpenseRecord(data.data);
    }
    if (isError) {
      alert("지출내역을 불러오는데 실패했습니다.");
    }
  }, [data, isError]);

  const { handleButtonClick } = useToggleButton(toggle, setToggle);

  return session && isPending ? (
    <Loading />
  ) : (
    <div className="expenseChart__main-container">
      <div className="expenseChart__detail-container">
        <div className="expenseChart__title">지출내역 추이</div>
        <div className="expenseChart__subTitle">
          &nbsp;원하시는 카테고리를 눌러 지출내역 추이를 한눈에 확인하세요.
        </div>
        <div className="expenseChart__notice">
          ℹ️연도는 올해를 기준으로 하여 올해의 데이터가 보여집니다.ℹ️
        </div>
        <div className="expenseChart__toggle-container">
          <div className="expenseChart__toggle-wrapper">
            <div
              className={`expenseChart__toggle-button toggle-left ${
                toggle.MonthlyButton ? "toggle-active" : ""
              }`}
              onClick={() => handleButtonClick("MonthlyButton")}
            >
              월별
            </div>
            <div
              className={`expenseChart__toggle-button toggle-right ${
                toggle.CategoryButton ? "toggle-active" : ""
              }`}
              onClick={() => handleButtonClick("CategoryButton")}
            >
              카테고리별
            </div>
          </div>
        </div>
        {toggle.MonthlyButton ? (
          <MontlyChart expenseRecord={expenseRecord} />
        ) : null}
        {toggle.CategoryButton ? <CategoryChart /> : null}
      </div>
    </div>
  );
}

export default ExpenseChart;
