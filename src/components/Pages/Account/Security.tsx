import Input from "../../Atoms/Input/Input";
import "./Security.scss";
import { Link } from "react-router-dom";
import { useInputRef } from "../../../hooks/useInputRef";
import { LinkedEmail} from "../../../types/auth";
import Button from "../../Atoms/Button/Button";
import { useAuth } from "../../../hooks/useAuth";
import { Session } from "@supabase/supabase-js";
import supabase from "../../../api/base";

function Security() {
  const [inputValueRef, handleInputValue] = useInputRef<LinkedEmail>({
    email: "",
  });
  const session: Session | null = useAuth();

  const handlePasswordFindButtonClick = async () => {
    if(session){
      const { error } = await supabase.auth.resetPasswordForEmail(
        inputValueRef.current.email, {redirectTo: "http://localhost:3000/passwordReset"}
      );
      if (error) {
        alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요!");
      } else {
        alert("이메일로 비밀번호 재설정 링크를 보냈습니다.");
      }
    }else{
      alert("로그인이 필요합니다.")
    }
   
  };
  return (
           <div className="account__main-container">
          <div className="account__title-container">
            <div className="account__title">보안</div>
          </div>
          <div className="account__tab-container">
            <div className="account__tab">
              <Link to="/account">일반</Link>
            </div>
            <div className={`account__tab clickedTabMenu`}><Link to="/account/security">보안</Link></div>
          </div>
          <div className="account__detail-container">
            <div className="account__detail-title">비밀번호 변경</div>
            <div className="account__detail-wrapper">
              <div className="account__detail">
                <div className="account__detail-input-container">
                  <Input
                    title="이메일"
                    type="email"
                    name="email"
                    placeholder="비밀번호 변경 링크를 받으실 이메일을 입력하세요"
                    handleInputValue={handleInputValue}
                  ></Input>
                </div>
                <Button onClick={handlePasswordFindButtonClick}>전송</Button>
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
     );
}

export default Security;
