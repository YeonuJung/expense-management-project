import Input from "../../Atoms/Input/Input";
import Appbar from "../../Organism/Appbar/Appbar";
import Sidebar from "../../Organism/Sidebar/Sidebar";
import "./Security.scss";
import { Link } from "react-router-dom";
import { useInputRef } from "../../../hooks/useInputRef";
import { SecurityPassword } from "../../../types/auth";
import Button from "../../Atoms/Button/Button";

function Security() {
  const [_, handleInputValue] = useInputRef<SecurityPassword>({
    password: "",
  });
  return (
    <div className="account__container">
      <Sidebar />
      <div className="account__content-container">
        <Appbar />
        <div className="account__main-container">
          <div className="account__title-container">
            <div className="account__title">Security</div>
          </div>
          <div className="account__tab-container">
            <div className="account__tab">
              <Link to="/account">General</Link>
            </div>
            <div className="account__tab">
              <Link to="/account/linkAccount">Significant other</Link>
            </div>
            <div className={`account__tab clickedTabMenu`}><Link to="/account/security">Security</Link></div>
          </div>
          <div className="account__detail-container">
            <div className="account__detail-title">Change password</div>
            <div className="account__detail-wrapper">
              <div className="account__detail">
                <div className="account__detail-input-container">
                  <Input
                    title="Password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    handleInputValue={handleInputValue}
                  ></Input>
                </div>
                <Button>Edit</Button>
              </div>
            </div>
          </div>
          <div className="account__detail-container">
            <div className="account__detail-wrapper">
              <div className="account__detail-title">Login history</div>
              <div className="account__detail-subTitle">
                Your recent login activity:
              </div>
              <div className="account__detail-table">
              <div className="account__detail-table-header">
                    <div className="account__detail-table-header-loginType">LOGIN TIME</div>
                    <div className="account__detail-table-header-ipAddress">IP ADDRESS</div>
                    <div className="account__detail-table-header-client">CLIENT</div>
                </div>
                <div className="account__detail-table-data">
                    <div className="account__detail-table-loginType">
                        <div className="account__detail-table-loginType-info-container">
                            <div className="account__detail-table-loginType-type">Credential login</div>
                            <div className="account__detail-table-loginType-time">on 10:40 AM 2021/09/01</div>
                        </div>
                    </div>
                    <div className="account__detail-table-ipAddress">
                        <div>95.130.17.84</div>
                    </div>
                    <div className="account__detail-table-client">
                        <div>Chrome, Mac OS 10.15.7</div>
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

export default Security;
