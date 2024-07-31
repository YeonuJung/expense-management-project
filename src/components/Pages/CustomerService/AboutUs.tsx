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
            <div className="cs__title">About us</div>
          </div>
          <div className="cs__tab-container">
            <div className={`cs__tab clickedTabMenu`}>
              <Link to="/customerService/aboutUs">About us</Link>
            </div>
            <div className="cs__tab">
              <Link to="/customerService/contact">1:1 Contact</Link>
            </div>
            <div className="cs__tab">
              <Link to="/customerService/faq">FAQ</Link>
            </div>
          </div>
          <div className="cs__detail-container">
            <div className="cs__detail-wrapper">
              <div className="cs__aboutUs-title">
                ABOUT US
                <div className="cs__aboutUs-title-underline"></div>
              </div>
              <div className="cs__aboutUs-description">
                <br /> Hello! You might have thought that “ABOUT US” implies a
                team, but this service was created by me alone. As an aspiring
                frontend developer, I pondered what was necessary in real life
                and ended up creating this service. Don’t you create a joint
                account with your partner when dating? However, in most cases,
                it’s difficult to manage expenditure records easily because one
                side unilaterally manages the money. Also, bank-related apps
                only show expenditure records, making it inconvenient to see
                exactly where and how the money was spent, and there’s almost no
                filtering using categories. To solve these problems, I planned a
                couple’s consumption management service and implemented it. The
                start may be humble, but starting from alleviating small
                inconveniences, my goal is to become a developer who can provide
                services that alleviate many people’s inconveniences in the
                future. Although it’s insufficient, I would appreciate it if you
                could use my service well. Lastly, I want to express my
                gratitude to my love, Gayoung, who has helped me in planning
                this service.
              </div>
              <div className="cs__aboutUs-contact">
                <span className="cs__aboutUs-contact-icon">
                  <IoMail />
                </span>
                If you have any questions or suggestions, you can also contact
                me here below
              </div>
              <div className="cs__aboutUs-contact-address">
                👉gsh95214@naver.com👈
              </div>
              <div className="cs__aboutUs-contact-address-underline"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
