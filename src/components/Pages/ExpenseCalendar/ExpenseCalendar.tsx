import Appbar from "../../Organism/Appbar/Appbar";
import Sidebar from "../../Organism/Sidebar/Sidebar";
import "./ExpenseCalendar.scss";
import Calendar, { TileArgs } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ReactNode, useState } from "react";
import moment from "moment";
import Chip from "../../Atoms/Chip/Chip";

interface ExpenseCalendarProps {
  data?: string[];
}
interface ExpenditureData {
  date: string;
  price: string;
}
function ExpenseCalendar({ data }: ExpenseCalendarProps) {
  type ValuePiece = Date | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const today = new Date();
  const [date, setDate] = useState<Value>(today);

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };

  const expenditureData: ExpenditureData[] = [
    { date: "2024.08.01", price: "100000" },
    { date: "2024.08.02", price: "240000" },
    { date: "2024.07.30", price: "30000" },
    { date: "2024.07.30", price: "20000" },
    { date: "2024.07.30", price: "1000000000000000" },
  ];

  return (
    <div className="expenseCalendar__container">
      <Sidebar />
      <div className="expenseCalendar__content-container">
        <Appbar />
        <div className="expenseCalendar__main-container">
          <div className="expenseCalendar__detail-container">
            <div className="expenseCalendar__detail-wrapper">
              <div className="expenseCalendar__title">Calendar</div>
              <div className="expenseCalendar__subTitle">
                &nbsp;Manage your spending history through the Calendar!
              </div>
              <div className="expenseCalendar__notice">
                ℹ️<span style={{ color: "#10b981a6" }}>Green box</span> indicates
                todayℹ️
              </div>
              <div className="expenseCalendar__calendar-container">
                <Calendar
                  locale="en"
                  onChange={handleDateChange}
                  value={date}
                  showNeighboringMonth={false}
                  calendarType="gregory"
                  formatDay={(locale, date: Date) => moment(date).format("D")}
                  formatYear={(locale, date: Date) =>
                    moment(date).format("YYYY")
                  }
                  formatMonthYear={(locale, date: Date) =>
                    moment(date).format("YYYY. MM")
                  }
                  next2Label={null}
                  prev2Label={null}
                  tileContent={({ date, view }: TileArgs): ReactNode => {
                    const expenditures: ExpenditureData[] = expenditureData.filter((expenditure) => {
                      return expenditure.date === moment(date).format("YYYY.MM.DD");
                    });
                
                    if (expenditures.length > 0 && view === "month") {
                      const totalExpenditure: number = expenditures.reduce((acc: number, expenditure: ExpenditureData) => {
                        return acc + parseInt(expenditure.price);
                      }, 0);
                
                      return (
                        <div className="expenseCalendar-total-expenditure"><Chip color="error" variant="outlined" label={`-${totalExpenditure}`}></Chip></div>
                      );
                    }
                  }}
                ></Calendar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseCalendar;
