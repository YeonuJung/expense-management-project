import "./ExpenseChart.scss";
import Sidebar from "../../Organism/Sidebar/Sidebar";
import Appbar from "../../Organism/Appbar/Appbar";
import MontlyChart from "./MontlyChart";


function ExpenseChart() {
  return (
    <div className="expenseChart__container">
      <Sidebar />
      <div className="expenseChart__content-container">
        <Appbar />
        <div className="expenseChart__main-container">
          <div className="expenseChart__detail-container">
            <div className="expenseChart__title">소비내역 추이</div>
            <div className="expenseChart__subTitle">
              &nbsp;소비내역 추이를 그래프를 통해 한눈에 확인하세요.
            </div>
            <div className="expenseChart__notice">
              ℹ️카테고리에 따라 알맞은 그래프로 형태가 변합니다ℹ️
            </div>
            <MontlyChart />
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default ExpenseChart;
