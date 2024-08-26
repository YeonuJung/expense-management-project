import Input from "../../Atoms/Input/Input";
import "./Security.scss";
import { Link, useNavigate } from "react-router-dom";
import { useInputRef } from "../../../hooks/useInputRef";
import { SecurityPassword } from "../../../types/auth";
import Button from "../../Atoms/Button/Button";
import { useAuth } from "../../../hooks/useAuth";
import { Session } from "@supabase/supabase-js";
import supabase from "../../../api/base";
import { LoginHistory } from "../../../types/model";
import { useEffect, useState } from "react";


function Security() {
  const [inputValueRef, handleInputValue] = useInputRef<SecurityPassword>({
    password: "",
  });
  const [loginHistory, setLoginHistory] = useState<LoginHistory[] | null>(null);

  const session: Session | null = useAuth();
  const navigate = useNavigate();
 
  const handlePasswordChange = async (): Promise<void> => {
    if (session) {
      const { error } = await supabase.auth.updateUser({
        password: inputValueRef.current.password,
      });
      if (error) {
        alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요!");
      } else {
        alert("비밀번호 변경이 완료되었습니다.");
        navigate("/")
      }
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  useEffect(() => {
    const fetchLoginHistory = async () => {
      if(session){
        const {data} = await supabase.from("loginhistory").select("*").eq("user_id", session?.user.id);
        console.log(data)
        setLoginHistory(data)
      }
    }
    fetchLoginHistory()
  }, [session])
  console.log(loginHistory)
  return (
    <div className="account__main-container">
      <div className="account__title-container">
        <div className="account__title">보안</div>
      </div>
      <div className="account__tab-container">
        <div className="account__tab">
          <Link to="/account">일반</Link>
        </div>
        <div className={`account__tab clickedTabMenu`}>
          <Link to="/account/security">보안</Link>
        </div>
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
                placeholder="변경할 비밀번호를 입력해주세요."
                handleInputValue={handleInputValue}
              ></Input>
            </div>
            <Button onClick={handlePasswordChange}>변경</Button>
          </div>
        </div>
      </div>
      <div className="account__detail-container">
        <div className="account__detail-wrapper">
          <div className="account__detail-title">로그인 기록</div>
          <div className="account__detail-subTitle">최근 로그인 활동:</div>
          <div className="account__detail-table">
            <div className="account__detail-table-header">
              <div className="account__detail-table-header-loginType">
                로그인 시간
              </div>
              <div className="account__detail-table-header-ipAddress">
                IP 주소
              </div>
              <div className="account__detail-table-header-client">
                클라이언트
              </div>
            </div>
            <div className="account__detail-table-data">
              <div className="account__detail-table-loginType">
                <div className="account__detail-table-loginType-info-container">
                  <div className="account__detail-table-loginType-type">
                  {loginHistory&& "Email-login"}
                  </div>
                  <div className="account__detail-table-loginType-time">
                    {loginHistory? loginHistory[0].created_at : "로그인이 필요합니다."}
                  </div>
                </div>
              </div>
              <div className="account__detail-table-ipAddress">
                <div>{loginHistory? loginHistory[0].ip : "로그인이 필요합니다."}</div>
              </div>
              <div className="account__detail-table-client">
                <div>{loginHistory? loginHistory[0].browser : "로그인이 필요합니다."}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Security;
