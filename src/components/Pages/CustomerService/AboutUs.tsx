import "./AboutUs.scss";
import { Link } from "react-router-dom";
import { IoMail } from "react-icons/io5";

function AboutUs() {
  return (
            <div className="cs__main-container">
          <div className="cs__title-container">
            <div className="cs__title">회사 소개</div>
          </div>
          <div className="cs__tab-container">
            <div className={`cs__tab clickedTabMenu`}>
              <Link to="/customerService/aboutUs">회사 소개</Link>
            </div>
            <div className="cs__tab">
              <Link to="/customerService/contact">1:1 문의</Link>
            </div>
            <div className="cs__tab">
              <Link to="/customerService/faq">자주 묻는 질문</Link>
            </div>
          </div>
          <div className="cs__detail-container">
            <div className="cs__detail-wrapper">
              <div className="cs__aboutUs-title">
                ABOUT US
                <div className="cs__aboutUs-title-underline"></div>
              </div>
              <div className="cs__aboutUs-description">
                <br /> 안녕하세요! “회사 소개”라는 제목을 보며 팀이 있는
                서비스라고 생각하셨을지도 모르지만, 이 서비스는 1인 기획, 개발로
                만들어졌습니다. 주니어 프론트엔드 개발자로서, 지금 저에게
                실생활에서 필요한 것이 무엇인지 고민하던 와중에 지출요정
                서비스를 만들게 되었습니다. 은행 관련 앱은 지출 기록만 보여줘서
                돈이 어디에 어떻게 쓰였는지 카테고리별로 편리하게 보고싶으신 적
                없으신가요? 또는 데이트 통장을 사용하면서 사용했던 날을 캘린더로
                확인하고, 비용을 지불했던 장소를 지도에서 보고싶었던 적은
                없으신가요? 이러한 욕구를 해결하기 위해 지출요정 서비스를
                기획하고 구현했습니다. 작은 욕구 및 불편함을 해소해주는 것에서
                시작하여, 많은 사람들의 욕구 및 불편함을 해소해줄 수 있는
                서비스를 제공하는 개발자가 되는 것이 저의 목표입니다. 부족하지만
                끊임없이 발전하여 좋은 서비스를 제공할 수 있는 사람이
                되도록 노력하겠습니다. 마지막으로, 이 서비스를 기획하는데
                도움을 준 제 사랑, 가영이에게 진심어린 감사의 마음을 전하고
                싶습니다.
              </div>
              <div className="cs__aboutUs-contact">
                <span className="cs__aboutUs-contact-icon">
                  <IoMail />
                </span>
                질문이나 제안이 있으시면 1:1 문의하시거나 아래로 연락해 주세요
              </div>
              <div className="cs__aboutUs-contact-address">
                👉gsh95214@naver.com👈
              </div>
            </div>
          </div>
        </div>
   );
}

export default AboutUs;
