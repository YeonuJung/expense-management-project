import Appbar from "../../Organism/Appbar/Appbar";
import Sidebar from "../../Organism/Sidebar/Sidebar";
import "./Faq.scss";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
function Faq() {
  const [openAnswer, setOpenAnswer] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const openAnswerHandler = (idx: number): void => {
    setOpenAnswer((prev) => {
      const copyOpenAnswer = [...prev];
      copyOpenAnswer[idx] = !copyOpenAnswer[idx];
      return [...copyOpenAnswer];
    });
  };
  const faqArray: string[] = [
    "지출 관리 서비스란 무엇인가요?",
    "회원가입을 꼭 해야 하나요?",
    "파트너와 연결을 끊을 수 있나요?",
    "앱이 작동하지 않아요.",
    "1:1 문의를 남기면 어떻게 연락을 받을 수 있나요?",
  ];
  const answerArray: string[] = [
    "지출 내역을 쉽게 확인하고 효율적으로 관리할 수 있도록 도와주는 서비스입니다. 링크를 통해 파트너와 연결하여 공동으로 사용하는 계좌의 지출 내역을 확인하고 관리할 수 있습니다.",
    "회원 가입을 해야 합니다. 가입하지 않으면 지출 내역을 저장하거나 다른 파트너와 연결할 수 없습니다.",
    "물론입니다. 계정의 파트너 섹션에서 연결된 파트너의 연결을 끊을 수 있습니다.",
    "앱이 제대로 작동하지 않는 경우, 1:1 문의를 통해 연락해 주시면 신속하게 처리하겠습니다.",
    "제공하신 이메일 또는 전화번호로 연락드리겠습니다.",
  ];
  return (
    <div className="cs__container">
      <Sidebar />
      <div className="cs__content-container">
        <Appbar />
        <div className="cs__main-container">
          <div className="cs__title-container">
            <div className="cs__title">자주 묻는 질문</div>
          </div>
          <div className="cs__tab-container">
            <div className="cs__tab">
              <Link to="/customerService/aboutUs">회사 소개</Link>
            </div>
            <div className="cs__tab">
              <Link to="/customerService/contact">1:1 문의</Link>
            </div>
            <div className="cs__tab clickedTabMenu">
              <Link to="/customerService/faq">자주 묻는 질문</Link>
            </div>
          </div>
          <div className="cs__detail-container">
            <div className="cs__faq-container">
              <div className="cs__faq-title">아래를 클릭하세요👇</div>
              <div className="cs__faq-subTitle">여기에 없는 질문은 1:1 문의를 통해 문의해주시면 빠른시일 내 답변드리겠습니다</div>
              {faqArray.map((faq, idx) => {
                return (
                  <>
                    <div
                      className="cs__faq"
                      key={idx}
                      onClick={() => openAnswerHandler(idx)}
                    >
                      <div>{faq}</div> <FaChevronDown />
                    </div>
                    {openAnswer[idx] && (
                      <div className="cs__faq cs__faq-answer">
                        {answerArray[idx]}
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
