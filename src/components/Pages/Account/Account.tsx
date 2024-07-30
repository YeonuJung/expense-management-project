import Avatar from "../../Atoms/Avatar/Avatar";
import Button from "../../Atoms/Button/Button";
import Appbar from "../../Organism/Appbar/Appbar";
import Sidebar from "../../Organism/Sidebar/Sidebar";
import Input from "../../Atoms/Input/Input";
import "./Account.scss";
import { useInputRef } from "../../../hooks/useInputRef";
import { AccountInputValue } from "../../../types/auth";
import { Link } from "react-router-dom";

function Account() {
  const [_, handleInputValue] = useInputRef<AccountInputValue>({
    name: "",
    email: "",
    limit: "",
  });

  // useEffect + sub routing 사용해서 더 간결하게 바꿔보기
  return (
    <div className="account__container">
      <Sidebar />
      <div className="account__content-container">
        <Appbar />
        <div className="account__main-container">
          <div className="account__title-container">
            <div className="account__title">Account</div>
          </div>
          <div className="account__tab-container">
            <div className={`account__tab clickedTabMenu`}>
              <Link to="/account">General</Link>
            </div>
            <div className="account__tab">
              <Link to="/account/linkAccount">Significant other</Link>
            </div>
            <div className="account__tab"><Link to="/account/security" >Security</Link></div>
          </div>
          <div className="account__detail-container">
            <div className="account__detail-title">Basic details</div>
            <div className="account__detail-wrapper">
              <div className="account__detail">
                <Avatar shape="circular" />
                <Button color="success" size="small">
                  Change
                </Button>
              </div>
              <div className="account__detail">
                <div className="account__detail-input-container">
                  <Input
                    title="Full name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    handleInputValue={handleInputValue}
                  />
                </div>
                <Button size="small">Save</Button>
              </div>
              <div className="account__detail">
                <div className="account__detail-input-container">
                  <Input
                    title="Email address"
                    name="email"
                    type="email"
                    placeholder="example@example.com"
                    handleInputValue={handleInputValue}
                  />
                </div>
                <Button size="small">Edit</Button>
              </div>
            </div>
          </div>
          <div className="account__detail-container">
            <div className="account__detail-title">Extra details</div>
            <div className="account__detail-wrapper">
              <div className="account__detail">
                <div className="account__detail-text">
                  Enter your expense limit here! It can help you save money.
                </div>
              </div>
              <div className="account__detail">
                <div className="account__detail-input-container">
                <Input
                  title="Expense limit"
                  name="limit"
                  type="number"
                  step={100}
                  placeholder="0"
                  handleInputValue={handleInputValue}
                ></Input>
                </div>
                <Button size="small">Save</Button>
              </div>
            </div>
          </div>
          <div className="account__detail-container">
            <div className="account__detail-title">Delete Account</div>
            <div className="account__detail-wrapper">
              <div className="account__detail">
                <div className="account__detail-text">
                  Delete your account and all of your source data. This is
                  irreversible
                </div>
              </div>
              <div className="account__detail">
                <Button variant="outlined" color="error">
                  Delete account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
