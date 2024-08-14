import "./ExpenseChart.scss";
import Sidebar from "../../Organism/Sidebar/Sidebar";
import Appbar from "../../Organism/Appbar/Appbar";
import MontlyChart from "./MontlyChart";
import CategoryChart from "./CategoryChart";
import { useState } from "react";

function ExpenseChart() {
  const [toggle, setToggle] = useState<{
    MonthlyButton: boolean;
    CategoryButton: boolean;
  }>({ MonthlyButton: false, CategoryButton: false });

  const handleMontlyButtonClick = () => {
    if (toggle.CategoryButton) {
      setToggle((prev) => ({
        ...prev,
        MonthlyButton: !prev.MonthlyButton,
        CategoryButton: !prev.CategoryButton,
      }));
    } else if (toggle.MonthlyButton) {
      return;
    } else {
      setToggle((prev) => ({ ...prev, MonthlyButton: !prev.MonthlyButton }));
    }
  };

  const handleCategoryButtonClick = () => {
    if (toggle.MonthlyButton) {
      setToggle((prev) => ({
        ...prev,
        CategoryButton: !prev.CategoryButton,
        MonthlyButton: !prev.MonthlyButton,
      }));
    } else if (toggle.CategoryButton) {
      return;
    } else {
      setToggle((prev) => ({ ...prev, CategoryButton: !prev.CategoryButton }));
    }
  };
  console.log(toggle);
  return (
    <div className="expenseChart__container">
      <Sidebar />
      <div className="expenseChart__content-container">
        <Appbar />
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
                  onClick={handleMontlyButtonClick}
                >
                  월별
                </div>
                <div
                  className={`expenseChart__toggle-button toggle-right ${
                    toggle.CategoryButton ? "toggle-active" : ""
                  }`}
                  onClick={handleCategoryButtonClick}
                >
                  카테고리별
                </div>
              </div>
            </div>
            {toggle.MonthlyButton ? <MontlyChart /> : null}
            {toggle.CategoryButton ? <CategoryChart /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseChart;
