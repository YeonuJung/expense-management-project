import "./Table.scss";
import { IoMdMore } from "react-icons/io";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Chip from "../../Atoms/Chip/Chip";
import { Data } from "../../Pages/ExpenseList/ExpenseList"

interface TableProps {
  data: Data[]
}

function Table(props: TableProps) {
  const {data} = props
  const headers: string[] = ["", "NAME", "PLACE", "PRICE", "RATING", "DATE", ""];
  
  return (
    <div className="table__container">
      <table className="table">
        <thead className="table__header">
          <tr>
            {headers.map((header, idx) => {
              return <th key={idx}>{header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((data, idx) => {
            return (
              <>
                <tr key={idx} className="tbody-row">
                  <td>
                    <div className="arrow__container">
                      <IoIosArrowForward />
                    </div>
                  </td>
                  <td>
                    <div className="table__name-container">
                      <img src={`expense${idx}.png`} alt="expenseImage"></img>
                      <div className="table__name-text-container">
                        <span>{data.name}</span>
                      </div>
                    </div>
                  </td>
                  <td>{data.place}</td>
                  <td>{data.price}</td>
                  <td>
                    {data.rating === "좋아요" ? (
                      <Chip
                        color="success"
                        variant="filled"
                        label="좋아요 😊"
                      />
                    ) : data.rating === "보통이에요"? (
                      <Chip color="grey" variant="filled" label="보통이에요 🤔" />
                    ) : (
                      <Chip color="error" variant="filled" label="별로에요 😤" />
                    )}
                  </td>
                  <td>{data.date}</td>
                 
                  <td>
                    <IoMdMore className="table__more-button"/>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <div className="table__page-navigate-container">
        <div className="table__page-navigate-text"><div>1-5 of 13</div></div>
        <div className="table__page-navigate-icon-container">
          <div className="table__page-navigate-icon"><IoIosArrowBack /></div>
          <div className="table__page-navigate-icon"><IoIosArrowForward /></div>
        </div>
      </div>
    </div>
  );
}

export default Table;
