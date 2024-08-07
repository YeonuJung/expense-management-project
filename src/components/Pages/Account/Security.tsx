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
            <div className="account__title">보안</div>
          </div>
          <div className="account__tab-container">
            <div className="account__tab">
              <Link to="/account">일반</Link>
            </div>
            <div className="account__tab">
              <Link to="/account/linkAccount">파트너</Link>
            </div>
            <div className={`account__tab clickedTabMenu`}><Link to="/account/security">보안</Link></div>
          </div>
          <div className="account__detail-container">
            <div className="account__detail-title">비밀번호 변경</div>
            <div className="account__detail-wrapper">
              <div className="account__detail">
                <div className="account__detail-input-container">
                  <Input
                    title="비밀번호"
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력하세요"
                    handleInputValue={handleInputValue}
                  ></Input>
                </div>
                <Button>수정</Button>
              </div>
            </div>
          </div>
          <div className="account__detail-container">
            <div className="account__detail-wrapper">
              <div className="account__detail-title">로그인 기록</div>
              <div className="account__detail-subTitle">
                최근 로그인 활동:
              </div>
              <div className="account__detail-table">
              <div className="account__detail-table-header">
                    <div className="account__detail-table-header-loginType">로그인 시간</div>
                    <div className="account__detail-table-header-ipAddress">IP 주소</div>
                    <div className="account__detail-table-header-client">클라이언트</div>
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
