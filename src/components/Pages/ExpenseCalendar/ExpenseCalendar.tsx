import Appbar from "../../Organism/Appbar/Appbar";
import Sidebar from "../../Organism/Sidebar/Sidebar";
import "./ExpenseCalendar.scss";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import moment from "moment";

function ExpenseCalendar() {
  type ValuePiece = Date | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const today = new Date();
  const [date, setDate] = useState<Value>(today);

  console.log(date);

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };
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
                Manage your spending history through the Calendar!
              </div>
              <Calendar
                locale="en"
                onChange={handleDateChange}
                value={date}
                showNeighboringMonth={false}
                calendarType="gregory"
                formatDay={(locale, date: Date) => moment(date).format("D")}
                formatYear={(locale, date: Date) => moment(date).format("YYYY")}
                formatMonthYear={(locale, date: Date) =>
                  moment(date).format("YYYY. MM")
                }
                next2Label={null}
                prev2Label={null}
              ></Calendar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseCalendar;
