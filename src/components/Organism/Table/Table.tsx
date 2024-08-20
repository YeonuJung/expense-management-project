import "./Table.scss";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Chip from "../../Atoms/Chip/Chip";
import { ExpenseRecord } from "../../../types/model";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { IoIosRestaurant } from "react-icons/io";
import { SiBuymeacoffee } from "react-icons/si";
import { FaShoppingCart } from "react-icons/fa";
import { GiTheater } from "react-icons/gi";
import { FaHotel } from "react-icons/fa";
import { MdOutlineDirectionsBus } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { ReactNode } from "react";
interface TableProps {
  data: ExpenseRecord[];
  setStartPage: React.Dispatch<React.SetStateAction<number>>;
  startPage: number;
  endPage: number;
}

function Table(props: TableProps) {
  const { data, setStartPage, startPage, endPage } = props;
  const headers: string[] = [
    "",
    "NAME",
    "PLACE",
    "PRICE",
    "RATING",
    "DATE",
    "",
  ];

  const navigate = useNavigate();

  const handleUpdateButton = (id: number) => {
    navigate("/updateExpense", { state: { id } });
  };

  const getCategoryIcon = (category: string) : ReactNode => {
    switch (category) {
      case "식당":
        return <IoIosRestaurant />
      case "카페":
        return <SiBuymeacoffee />
      case "쇼핑":
        return  <FaShoppingCart />
      case "문화생활":
        return  <GiTheater />
      case "숙박":
        return  <FaHotel />
      case "교통":
        return  <MdOutlineDirectionsBus />
      case "기타":
        return  <TbCategoryPlus />
    }
  };
  const handleNextPage = (): void => {
    setStartPage((prev) => Math.min(prev + 1, endPage));
  }
  const handlePreviousPage = (): void => {
    setStartPage((prev) => Math.max(prev - 1, 1));
  }
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
                <tr key={data.id} className="tbody-row">
                  <td>
                    <div className="arrow__container">
                      <IoIosArrowForward
                        onClick={() => handleUpdateButton(data.id)}
                        className="table__update-button"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="table__name-container">
                      <div className="table__name-icon">{getCategoryIcon(data.category)}</div>
                      <div className="table__name-text-container">
                        <span>{data.name}</span>
                      </div>
                    </div>
                  </td>
                  <td>{data.place? data.place : "정확한 위치의 설정이 불가능한 지역"}</td>
                  <td>{data.price.toLocaleString() + "원"}</td>
                  <td>
                    {data.rating === "좋아요" ? (
                      <Chip
                        color="success"
                        variant="filled"
                        label="좋아요 😊"
                      />
                    ) : data.rating === "보통이에요" ? (
                      <Chip
                        color="grey"
                        variant="filled"
                        label="보통이에요 🤔"
                      />
                    ) : (
                      <Chip
                        color="error"
                        variant="filled"
                        label="별로에요 😤"
                      />
                    )}
                  </td>
                  <td>{data.date}</td>

                  <td>
                    <RiDeleteBin3Line className="table__delete-button" />
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <div className="table__page-navigate-container">
        <div className="table__page-navigate-text">
          <div>{startPage} of {endPage}</div>
        </div>
        <div className="table__page-navigate-icon-container">
          <div className="table__page-navigate-icon">
            <IoIosArrowBack onClick={handlePreviousPage}/>
          </div>
          <div className="table__page-navigate-icon">
            <IoIosArrowForward onClick={handleNextPage}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
