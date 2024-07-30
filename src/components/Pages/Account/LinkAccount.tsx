import Divider from "../../Atoms/Divider/Divider";
import Appbar from "../../Organism/Appbar/Appbar";
import Sidebar from "../../Organism/Sidebar/Sidebar";
import Input from "../../Atoms/Input/Input";
import { useInputRef } from "../../../hooks/useInputRef";

import "./LinkAccount.scss";
import { LinkedEmail } from "../../../types/auth";
import Button from "../../Atoms/Button/Button";
import Avatar from "../../Atoms/Avatar/Avatar";
import Chip from "../../Atoms/Chip/Chip";
import { IoMdMore } from "react-icons/io";
import { Link } from "react-router-dom";

function LinkAccount() {
  const [_, handleInputValue] = useInputRef<LinkedEmail>({ email: "" });
  return (
    <div className="account__container">
      <Sidebar />
      <div className="account__content-container">
        <Appbar />
        <div className="account__main-container">
          <div className="account__title-container">
            <div className="account__title">Significant other</div>
          </div>
          <div className="account__tab-container">
            <div className="account__tab">
              <Link to="/account">General</Link>
            </div>
            <div className={`account__tab clickedTabMenu`}>
                <Link to="/account/linkAccount">Significant other</Link>
            </div>
            <div className="account__tab"><Link to="/account/security">Security</Link></div>
          </div>
          <div className="account__detail-container">
            <div className="account__detail-wrapper">
              <div className="account__detail-title">
                Link your partner!
              </div>
              <div className="account__detail-subTitle">
              Send an email to your partner and establish a connection with each other.
              </div>
              <Divider />
              <div className="account__detail">
                <div className="account__detail-input-container">
                <Input
                  title="Email address"
                  type="email"
                  name="email"
                  placeholder="✉️ Enter your partners email address here!"
                  handleInputValue={handleInputValue}
                ></Input>
                </div>
                <Button variant="filled" size="large">Send Link</Button>
              </div>
              <div className="account__detail-table">
                <div className="account__detail-table-header">
                    <div className="account__detail-table-header-member">MEMBER</div>
                    <div className="account__detail-table-header-role">ROLE</div>
                    <div className="account__detail-table-header-blank"></div>
                </div>
                <div className="account__detail-table-data">
                    <div className="account__detail-table-member">
                        <Avatar shape="circular"/>
                        <div className="account__detail-table-member-info-container">
                            <div className="account__detail-table-member-name">Yeonwoo Jung</div>
                            <div className="account__detail-table-member-email">gsh95214@naver.com</div>
                        </div>
                    </div>
                    <div className="account__detail-table-role">
                        <Chip label="Owner" variant="filled" color="success"></Chip>
                    </div>
                    <div className="account__detail-table-more">
                        <IoMdMore className="table__more-button"/>
                    </div>
                </div>
                <div className="account__detail-table-data">
                    <div className="account__detail-table-member">
                        <Avatar shape="circular"/>
                        <div className="account__detail-table-member-info-container">
                            <div className="account__detail-table-member-name">Gayoung Kim</div>
                            <div className="account__detail-table-member-email">partner@partner.com</div>
                        </div>
                    </div>
                    <div className="account__detail-table-role">
                        <Chip label="Partner" variant="filled" color="primary"></Chip>
                    </div>
                    <div className="account__detail-table-more">
                        <IoMdMore className="table__more-button"/>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkAccount;
