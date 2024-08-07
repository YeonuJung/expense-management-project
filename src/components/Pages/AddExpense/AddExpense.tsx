import Appbar from "../../Organism/Appbar/Appbar";
import Sidebar from "../../Organism/Sidebar/Sidebar";
import "./AddExpense.scss";
import Button from "../../Atoms/Button/Button";
import Input from "../../Atoms/Input/Input";
import { useInputRef } from "../../../hooks/useInputRef";
import { AddExpenseInputValue } from "../../../types/auth";
import Select from "../../Atoms/Select/Select";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Dialog from "../../Organism/Dialog/Dialog";

function AddExpense() {
  const [_, handleInputValue] = useInputRef<AddExpenseInputValue>({
    name: "",
    place: "",
    price: "",
    category: "",
    rating: "",
    date: "",
  })
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)

  const cancleOnClick = () => {
    setOpenModal(!openModal)
  }
  const modalCancleOnClick = () => {
    navigate("/expenseList")
    window.scrollTo({top: 0, behavior: "smooth"})
  }

  return (
    <>
    <div className="addExpense__container">
      <Sidebar />
      <div className="addExpense__content-container">
        <Appbar />
        <div className="addExpense__main-container">
          <div className="addExpense__title-container">
            <div className="addExpense__title">
              Add your expenditure records
            </div>
            <div className="addExpense__subTitle">신중하게 입력하세요!</div>
          </div>
          <div className="addExpense__name-container">
            <div className="addExpense__name-title">Basic details</div>
            <div className="addExpense__input-container">
              <Input
                title="Name"
                type="text"
                name="name"
                placeholder="Enter your spent history"
                handleInputValue={handleInputValue}
              />
            </div>
            
          </div>
          <div className="addExpense__place-container">
            <div className="addExpense__place-title">Place</div>
            <div className="addExpense__input-container">
              <Input
                title="Place"
                type="text"
                name="place"
                placeholder="Enter the location"
                handleInputValue={handleInputValue}
              />
            </div>
            
          </div>
          <div className="addExpense__price-container">
            <div className="addExpense__price-title">Price</div>
            <div className="addExpense__input-container">
              <Input
                title="Price"
                type="number"
                name="price"
                placeholder="0"
                handleInputValue={handleInputValue}
                step={100}
              />
            </div>
          </div>
          <div className="addExpense__category-container">
            <div className="addExpense__category-title">Category</div>
            <div className="addExpense__input-container">
              <Select
                title="Category"
                name="category"
                handleInputValue={handleInputValue}
              />
            </div>
          </div>
          <div className="addExpense__rating-container">
            <div className="addExpense__rating-title">Rating</div>
            <div className="addExpense__input-container">
              <Select
                title="Rating"
                name="rating"
                handleInputValue={handleInputValue}
              />
            </div>
          </div>
          <div className="addExpense__date-container">
            <div className="addExpense__date-title">Date</div>
            <div className="addExpense__input-container">
              <Input title="Date" type="Date" name="date" handleInputValue={handleInputValue}/>
            </div>
          </div>
          <div className="addExpense__action-container">
            <div className="addExpense__action">
              <Button variant="outlined" onClick={cancleOnClick}>Cancle</Button>
              <Button variant="filled">Add</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {openModal && <Dialog title="정말로 취소하시겠습니까?" buttons={<><Button onClick={cancleOnClick}>Cancle</Button><Button onClick={modalCancleOnClick}>Confirm</Button></>} ></Dialog>}
    </>
  );
}

export default AddExpense;
