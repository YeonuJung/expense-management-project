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
            <div className="cs__title">1:1 Contact</div>
          </div>
          <div className="cs__tab-container">
            <div className="cs__tab">
              <Link to="/customerService/aboutUs">About us</Link>
            </div>
            <div className="cs__tab clickedTabMenu">
              <Link to="/customerService/contact">1:1 Contact</Link>
            </div>
            <div className="cs__tab">
              <Link to="/customerService/faq">FAQ</Link>
            </div>
          </div>
          <div className="cs__detail-container">
            <div className="cs__detail-wrapper">
              <div className="cs__contact-title-container">
                <div className="cs__contact-title">
                  Talk to us if you need help
                </div>
                <div className="cs__contact-subTitle">
                  Any suggestions? Fill out the form and i will be in touch
                  shortly.
                </div>
                <div className="cs__contact-subTitle2">
                  Feel free to share good ideas.
                </div>
              </div>
              <div className="cs__detail">
                <div className="cs__detail-input-container">
                  <Input
                    title="Full Name *"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    handleInputValue={handleInputValue}
                  />
                </div>
              </div>
              <div className="cs__detail">
                <div className="cs__detail-input-container">
                  <Input
                    title="Email address *"
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
                    title="Phonenumber"
                    type="text"
                    name="phonenumber"
                    placeholder={`Enter your phonenumber with " - " `}
                    handleInputValue={handleInputValue}
                  />
                </div>
              </div>
              <div className="cs__detail">
                <div className="cs__detail-input-container">
                  <label htmlFor="detail" className="cs__detail-textarea-label">
                    More Details *
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
                  Let's Talk
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
