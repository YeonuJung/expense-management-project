import { Session } from "@supabase/supabase-js";
import { useAuth } from "../../../hooks/useAuth";
import Button from "../../Atoms/Button/Button";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function Home() {
  const navigate = useNavigate();
  const buttonOnclick = () => {
    if (session) {
      navigate("/expenseList");
      return;
    } else {
      navigate("/login");
    }
  };
  const session: Session | null = useAuth();

  return (
    <div className="home__main-container">
      <div className="home__intro-container">
        <div className="home-intro-inner-container">
          <div className="home-intro-text-container">
            <div className="home-intro-text-box">
              <div className="home-intro-text">
                기본에 충실한 지출관리용 서비스
              </div>
              <div className="home-intro-name">지출요정</div>
            </div>
            <div className="home-intro-text-box">
              <div className="home-intro-text">
                {session
                  ? "지금 바로 시작해보세요"
                  : "지금 바로 로그인하고 시작해보세요"}
              </div>
              <div className="home-intro-button">
                <Button
                  variant="outlined"
                  color="white"
                  onClick={buttonOnclick}
                >
                  {session ? "지출내역 추가하러 가기" : "로그인 하러 가기"}
                </Button>
              </div>
            </div>
          </div>
          <div className="home-intro-img" />
        </div>
      </div>

      <div className="home__divider" />
      <Carousel
        width={"calc(100vw - 328px)"}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={4000}
        infiniteLoop={true}
        renderArrowPrev={(clickHandler, hasPrev) => hasPrev && <IoIosArrowBack onClick={clickHandler} className="arrow__left"/>}
        renderArrowNext={(clickHandler, hasNext) => hasNext && <IoIosArrowForward onClick={clickHandler} className="arrow__right"/>}
      >
        <div className="home__intro2-container">
          <div className="home__intro2-img" />
          <div className="home__intro2-text-box">
            <div className="home__intro2-text1-text2-container">
              <div className="home__intro2-text1">POINT 01</div>
              <div className="home__intro2-text2">
                검색기능 및 카테고리별 선택으로 조회를 간편하게
              </div>
            </div>
            <div className="home__intro2-text3-container">
              <div className="home__intro2-text3">
                ℹ️지출내역, 지출한 장소, 지출액, 평가, 지출일자를 테이블로
                조회할 수 있습니다.
              </div>
              <div className="home__intro2-text3">
                ℹ️검색어를 통해 간편하게 원하는 항목을 검색하는 것이 가능합니다.
              </div>
              <div className="home__intro2-text3">
                ℹ️카테고리별로 원하는 카테고리만을 검색하는 것이 가능합니다.
              </div>
            </div>
          </div>
        </div>
        <div className="home__intro2-container">
          <div className="home__intro2-img" />
          <div className="home__intro2-text-box">
            <div className="home__intro2-text1-text2-container">
              <div className="home__intro2-text1">POINT 02</div>
              <div className="home__intro2-text2">
                캘린더 및 그래프로 조회를 한눈에
              </div>
            </div>
            <div className="home__intro2-text3-container">
              <div className="home__intro2-text3">
                ℹ️총 지출액을 날짜별로 조회할 수 있습니다.
              </div>
              <div className="home__intro2-text3">
                ℹ️그래프로 월별 및 카테고리별 지출액을 조회할 수 있습니다.
              </div>
            </div>
          </div>
        </div>

        <div className="home__intro2-container">
          <div className="home__intro2-img" />
          <div className="home__intro2-text-box">
            <div className="home__intro2-text1-text2-container">
              <div className="home__intro2-text1">POINT 03</div>
              <div className="home__intro2-text2">
                지도로 내가 지출했던 곳들을 한번에
              </div>
            </div>
            <div className="home__intro2-text3-container">
              <div className="home__intro2-text3">
                ℹ️지출내역 및 지출했던 장소를 지도를 통해 조회할 수 있습니다.
              </div>
              <div className="home__intro2-text3">
                ℹ️마커를 통해 전국을 넘어 전세계까지 지출했던 장소를 선택할 수
                있습니다.
              </div>
            </div>
          </div>
        </div>
      </Carousel>
      <div className="home__divider bottom-margin" />
    </div>
  );
}
export default Home;
