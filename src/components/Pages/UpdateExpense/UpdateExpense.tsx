import Button from "../../Atoms/Button/Button";
import Input from "../../Atoms/Input/Input";
import { useInputRef } from "../../../hooks/useInputRef";
import { AddExpenseInputValue } from "../../../types/auth";
import Select from "../../Atoms/Select/Select";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Dialog from "../../Organism/Dialog/Dialog";
import {
  LoadScriptNext,
  Autocomplete,
  Libraries,
} from "@react-google-maps/api";
import supabase from "../../../api/base";
import { ExpenseRecord } from "../../../types/model";
import { useAuth } from "../../../hooks/useAuth";

const libraries: Libraries = ["places"];

function UpdateExpense() {
  const [_, handleInputValue] = useInputRef<AddExpenseInputValue>({
    name: "",
    place: "",
    price: 0,
    category: "",
    rating: "",
    date: "",
  });
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [data, setData] = useState<ExpenseRecord | null>(null);

  const session = useAuth();

  const cancleOnClick = () => {
    setOpenModal(!openModal);
  };
  const modalCancleOnClick = () => {
    navigate("/expenseList");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const event = {
          target: { value: place.formatted_address || place.name },
        } as React.ChangeEvent<HTMLInputElement>;
        handleInputValue(event, "place");
      }
    }
  };
  const handleUpdateData = () => {};
  // 여러 컬럼을 select할 때는 필드를 쉼표로 구분하여 하나의 문자열로 전달
  useEffect(() => {
    selectExepenseRecord();
  }, []);

  const selectExepenseRecord = async (): Promise<void> => {
    if(session){
      const { data } = await supabase
      .from("expenserecord")
      .select("id, name, place, price, category, rating, date, user_id")
      .eq("user_id", session.user.id);
    if (data !== null) {
      setData(data[0]);
      
    }
    }
   
  };
  console.log(data)


  return (
    <>
          <div className="addExpense__main-container">
            <div className="addExpense__title-container">
              <div className="addExpense__title">지출 세부정보 수정</div>
              <div className="addExpense__subTitle">신중하게 입력하세요!</div>
            </div>
            <div className="addExpense__name-container">
              <div className="addExpense__name-title">기본 정보</div>
              <div className="addExpense__input-container">
                <Input
                  title="이름"
                  type="text"
                  name="name"
                  placeholder="구체적인 행위를 적어주시면 더 좋습니다."
                  handleInputValue={handleInputValue}
                  defaultValue={data?.name}
                />
              </div>
            </div>
            <div className="addExpense__place-container">
              <div className="addExpense__place-title">장소</div>
              <div className="addExpense__input-container">
                <LoadScriptNext
                  googleMapsApiKey={
                    process.env.REACT_APP_GOOGLE_MAP_API_KEY as string
                  }
                  libraries={libraries}
                  loadingElement={<div>Loading...</div>}
                >
                  <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <Input
                      title="장소"
                      type="text"
                      name="place"
                      placeholder="정해진 물리적 장소가 없는 경우 입력하지 않으셔도 됩니다."
                      handleInputValue={handleInputValue}
                      defaultValue={data?.place}
                    />
                  </Autocomplete>
                </LoadScriptNext>
              </div>
            </div>
            <div className="addExpense__price-container">
              <div className="addExpense__price-title">가격</div>
              <div className="addExpense__input-container">
                <Input
                  title="가격"
                  type="number"
                  name="price"
                  placeholder="0"
                  handleInputValue={handleInputValue}
                  step={100}
                  defaultValue={data?.price}
                />
              </div>
            </div>
            <div className="addExpense__category-container">
              <div className="addExpense__category-title">카테고리</div>
              <div className="addExpense__input-container">
                <Select
                  title="카테고리"
                  name="category"
                  handleInputValue={handleInputValue}
                  defaultValue={data?.category}
                />
              </div>
            </div>
            <div className="addExpense__rating-container">
              <div className="addExpense__rating-title">평가</div>
              <div className="addExpense__input-container">
                <Select
                  title="평가"
                  name="rating"
                  handleInputValue={handleInputValue}
                  defaultValue={data?.rating}
                />
              </div>
            </div>
            <div className="addExpense__date-container">
              <div className="addExpense__date-title">날짜</div>
              <div className="addExpense__input-container">
                <Input
                  title="날짜"
                  type="Date"
                  name="date"
                  handleInputValue={handleInputValue}
                  defaultValue={data?.date}
                />
              </div>
            </div>
            <div className="addExpense__action-container">
              <div className="addExpense__action">
                <Button variant="outlined" onClick={cancleOnClick}>
                  취소
                </Button>
                <Button variant="filled">수정</Button>
              </div>
            </div>
          </div>
      {openModal && (
        <Dialog
          title="정말로 취소하시겠습니까?"
          buttons={
            <>
              <Button onClick={cancleOnClick}>Cancle</Button>
              <Button onClick={modalCancleOnClick}>Confirm</Button>
            </>
          }
        ></Dialog>
      )}
    </>
  );
}

export default UpdateExpense;
