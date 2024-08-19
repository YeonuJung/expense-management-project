import Appbar from "../../Organism/Appbar/Appbar";
import Sidebar from "../../Organism/Sidebar/Sidebar";
import "./AboutUs.scss";
import { Link } from "react-router-dom";
import { IoMail } from "react-icons/io5";

function AboutUs() {
  return (
    <div className="cs__container">
      <Sidebar />
      <div className="cs__content-container">
        <Appbar />
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
                서비스라고 생각하셨을지도 모르지만, 이 서비스는 저 혼자 만든
                것입니다. 주니어 프론트엔드 개발자로서, 실제 생활에서 필요한
                것이 무엇인지 고민하다가 지출요정 서비스를 만들게 되었습니다. 연애할
                때 파트너와 데이트 통장을 만들지 않나요? 그러나 대부분의 경우,
                한쪽에서 일방적으로 돈을 관리하기 때문에 지출 기록을 쉽게
                관리하기가 어렵습니다. 또한, 은행 관련 앱은 지출 기록만 보여줘서
                돈이 어디에 어떻게 쓰였는지 정확히 보기 불편하고, 카테고리별로
                필터링할 수 있는 기능이 많지 않습니다. 이러한 문제를 해결하기
                위해 지출요정 서비스를 기획하고 구현했습니다. 시작은
                미미할지라도 작은 불편함을 덜어주는 것에서 시작하여, 많은
                사람들의 불편함을 덜어줄 수 있는 서비스를 제공하는 개발자가 되는
                것이 저의 목표입니다. 부족하지만 제 서비스를 잘 사용해 주시면
                감사하겠습니다. 마지막으로, 이 서비스를 기획하는 데 도움을 준
                제 사랑, 가영이에게 진심어린 감사의 마음을 전하고 싶습니다.
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
      </div>
    </div>
  );
}

export default AboutUs;
