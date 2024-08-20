import "./ExpenseCalendar.scss";
import Calendar, { TileArgs } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ReactNode, useState, useEffect } from "react";
import moment from "moment";
import Chip from "../../Atoms/Chip/Chip";
import supabase from "../../../api/base";
import { useAuth } from "../../../hooks/useAuth";
import { ExpenseRecord } from "../../../types/model";
import { useCallback } from "react";

interface ExpenseCalendarProps {
  data?: string[];
}

function ExpenseCalendar({ data }: ExpenseCalendarProps) {
  type ValuePiece = Date | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const today = new Date();
  const [date, setDate] = useState<Value>(today);
  const [expenseRecord, setExpenseRecord] = useState<ExpenseRecord[]>([]);

  const handleDateChange = (newDate: Value) => {
    setDate(newDate)
  };
  const session = useAuth();

  const fetchExpenseRecord = useCallback(async (): Promise<void> => {
    if (session) {
      const { data, error } = await supabase
        .from("expenserecord")
        .select("*")
        .eq("user_id", session.user.id);
      if (error) {
        alert("지출내역을 불러오는데 실패했습니다.");
        return;
      } else {
        setExpenseRecord(data);
      }
    }
  }, [session]);

  useEffect(() => {
    fetchExpenseRecord();
  }, [fetchExpenseRecord]);

  return (
        <div className="expenseCalendar__main-container">
          <div className="expenseCalendar__detail-container">
            <div className="expenseCalendar__detail-wrapper">
              <div className="expenseCalendar__title">캘린더</div>
              <div className="expenseCalendar__subTitle">
                &nbsp;캘린더를 통해 일별 총 지출액을 확인하세요!
              </div>
              <div className="expenseCalendar__notice">
                ℹ️<span style={{ color: "#10b981a6" }}>초록색 박스는</span>{" "}
                오늘을 나타냅니다!ℹ️
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
                    const expenditures: ExpenseRecord[] = expenseRecord.filter(
                      (expenditure) => {
                        return (
                          expenditure.date === moment(date).format("YYYY-MM-DD")
                        );
                      }
                    );

                    if (expenditures.length > 0 && view === "month") {
                      const totalExpenditure: number = expenditures.reduce(
                        (acc: number, expenditure: ExpenseRecord) => {
                          return acc + expenditure.price;
                        },
                        0
                      );

                      return (
                        totalExpenditure !== 0 && (
                          <div className="expenseCalendar-total-expenditure">
                            <Chip
                              color="error"
                              variant="outlined"
                              label={`-${totalExpenditure.toLocaleString(
                                "ko-KR"
                              )}`}
                            ></Chip>
                          </div>
                        )
                      );
                    }
                  }}
                ></Calendar>
              </div>
            </div>
          </div>
        </div>
  );
}

export default ExpenseCalendar;
