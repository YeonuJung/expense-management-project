import "./Contact.scss";
import { Link } from "react-router-dom";
import Sidebar from "../../Organism/Sidebar/Sidebar";
import Appbar from "../../Organism/Appbar/Appbar";
import Input from "../../Atoms/Input/Input";
import { useInputRef } from "../../../hooks/useInputRef";
import { AccountInputValue } from "../../../types/auth";
import Button from "../../Atoms/Button/Button";

function Contact() {
  const [_, handleInputValue] = useInputRef<Omit<AccountInputValue, "limit">>({
    name: "",
    email: "",
  });
  return (
    <div className="cs__container">
      <Sidebar />
      <div className="cs__content-container">
        <Appbar />
        <div className="cs__main-container">
          <div className="cs__title-container">
            <div className="cs__title">1:1 문의</div>
          </div>
          <div className="cs__tab-container">
            <div className="cs__tab">
              <Link to="/customerService/aboutUs">회사 소개</Link>
            </div>
            <div className="cs__tab clickedTabMenu">
              <Link to="/customerService/contact">1:1 문의</Link>
            </div>
            <div className="cs__tab">
              <Link to="/customerService/faq">자주 묻는 질문</Link>
            </div>
          </div>
          <div className="cs__detail-container">
            <div className="cs__detail-wrapper">
              <div className="cs__contact-title-container">
                <div className="cs__contact-title">
                  도움이 필요하시면 말씀해 주세요
                </div>
                <div className="cs__contact-subTitle">
                 제안하실 아이디어가 있으신가요? 양식을 작성해 주시면 빠른시일 내 답변드리겠습니다.
                </div>
                <div className="cs__contact-subTitle2">
                  좋은 아이디어가 있으면 자유롭게 말씀해 주세요!
                </div>
              </div>
              <div className="cs__detail">
                <div className="cs__detail-input-container">
                  <Input
                    title="이름 *"
                    type="text"
                    name="name"
                    placeholder="이름을 입력하세요"
                    handleInputValue={handleInputValue}
                  />
                </div>
              </div>
              <div className="cs__detail">
                <div className="cs__detail-input-container">
                  <Input
                    title="이메일 *"
                    type="email"
                    name="email"
                    placeholder="example@example.com"
                    handleInputValue={handleInputValue}
                  />
                </div>
              </div>
              <div className="cs__detail">
                <div className="cs__detail-input-container">
                  <Input
                    title="휴대폰 번호"
                    type="text"
                    name="phonenumber"
                    placeholder={`"-"를 포함하여 휴대폰 번호를 입력하세요`}
                    handleInputValue={handleInputValue}
                  />
                </div>
              </div>
              <div className="cs__detail">
                <div className="cs__detail-input-container">
                  <label htmlFor="detail" className="cs__detail-textarea-label">
                    자세한 내용 *
                  </label>
                  <textarea
                    className="cs__detail-textarea"
                    id="detail"
                    name="detail"
                    maxLength={200}
                  ></textarea>
                </div>
              </div>
              <div className="cs__detail-submit">
                <Button variant="filled" size="large">
                 문의하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
