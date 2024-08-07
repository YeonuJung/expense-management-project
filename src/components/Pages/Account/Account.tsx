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
            <div className="account__title">계정</div>
          </div>
          <div className="account__tab-container">
            <div className={`account__tab clickedTabMenu`}>
              <Link to="/account">일반</Link>
            </div>
            <div className="account__tab">
              <Link to="/account/linkAccount">파트너</Link>
            </div>
            <div className="account__tab"><Link to="/account/security" >보안</Link></div>
          </div>
          <div className="account__detail-container">
            <div className="account__detail-title">기본 정보</div>
            <div className="account__detail-wrapper">
              <div className="account__detail">
                <Avatar shape="circular" />
                <Button color="success" size="small">
                  변경
                </Button>
              </div>
              <div className="account__detail">
                <div className="account__detail-input-container">
                  <Input
                    title="이름"
                    name="name"
                    type="text"
                    placeholder="이름을 입력하세요"
                    handleInputValue={handleInputValue}
                  />
                </div>
                <Button size="small">저장</Button>
              </div>
              <div className="account__detail">
                <div className="account__detail-input-container">
                  <Input
                    title="이메일"
                    name="email"
                    type="email"
                    placeholder="example@example.com"
                    handleInputValue={handleInputValue}
                  />
                </div>
                <Button size="small">수정</Button>
              </div>
            </div>
          </div>
          <div className="account__detail-container">
            <div className="account__detail-title">추가 정보</div>
            <div className="account__detail-wrapper">
              <div className="account__detail">
                <div className="account__detail-text">
                  지출 한도를 여기에 입력하세요! 저축에 도움이 될 수 있습니다.
                </div>
              </div>
              <div className="account__detail">
                <div className="account__detail-input-container">
                <Input
                  title="지출 한도"
                  name="limit"
                  type="number"
                  step={100}
                  placeholder="0"
                  handleInputValue={handleInputValue}
                ></Input>
                </div>
                <Button size="small">저장</Button>
              </div>
            </div>
          </div>
          <div className="account__detail-container">
            <div className="account__detail-title">계정 삭제</div>
            <div className="account__detail-wrapper">
              <div className="account__detail">
                <div className="account__detail-text">
                  계정과 모든 소스 데이터를 삭제합니다. 이는 되돌릴 수 없습니다.
                </div>
              </div>
              <div className="account__detail">
                <Button variant="outlined" color="error">
                  계정 삭제
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
