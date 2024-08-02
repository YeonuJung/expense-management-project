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
    "What is an expense management service?",
    "Do I have to sign up?",
    "Can I unlink after breaking up with my partner?",
    "The app is not working.",
    "How will I be contacted if I leave a 1:1 inquiry?",
  ];
  const answerArray: string[] = [
    "It is a service that helps you easily check and efficiently manage your spending history. You can link with your partner through a link to check and manage the spending history of a jointly used account.",
    "You must sign up because you cannot save your spending history or link with other partners without registration.",
    "Of course. You can unlink your connected partner in the Significant other section of your Account.",
    "If the app is not working properly, please contact us through 1:1 Contact, and we will handle it promptly.",
    "We will contact you via the email or phone number you provided.",
  ];
  return (
    <div className="cs__container">
      <Sidebar />
      <div className="cs__content-container">
        <Appbar />
        <div className="cs__main-container">
          <div className="cs__title-container">
            <div className="cs__title">FAQ</div>
          </div>
          <div className="cs__tab-container">
            <div className="cs__tab">
              <Link to="/customerService/aboutUs">About us</Link>
            </div>
            <div className="cs__tab">
              <Link to="/customerService/contact">1:1 Contact</Link>
            </div>
            <div className="cs__tab clickedTabMenu">
              <Link to="/customerService/faq">FAQ</Link>
            </div>
          </div>
          <div className="cs__detail-container">
            <div className="cs__faq-container">
              <div className="cs__faq-title">Click below👇</div>
              <div className="cs__faq-subTitle">For answers not found here, please ask through 1:1 Contact</div>
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
