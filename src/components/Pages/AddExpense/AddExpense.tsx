import Appbar from "../../Organism/Appbar/Appbar";
import Sidebar from "../../Organism/Sidebar/Sidebar";
import "./AddExpense.scss";
import Button from "../../Atoms/Button/Button";
import Input from "../../Atoms/Input/Input";
import { useInputRef } from "../../../hooks/useInputRef";
import { AddExpenseInputValue } from "../../../types/auth";
import Select from "../../Atoms/Select/Select";

function AddExpense() {
  const [_, handleInputValue] = useInputRef<AddExpenseInputValue>({
    name: "",
    price: "",
    category: "",
    date: "",
  })

  return (
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
          <div className="addExpense__date-container">
            <div className="addExpense__date-title">Date</div>
            <div className="addExpense__input-container">
              <Input title="Date" type="Date" name="date" handleInputValue={handleInputValue}/>
            </div>
          </div>
          <div className="addExpense__action-container">
            <Button color="error">Delete</Button>
            <div className="addExpense__action">
              <Button variant="outlined">Cancle</Button>
              <Button variant="filled">Add</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddExpense;
