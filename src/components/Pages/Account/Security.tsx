import Input from "../../Atoms/Input/Input";
import "./Security.scss";
import { Link } from "react-router-dom";
import { useInputRef } from "../../../hooks/useInputRef";
import { SecurityPassword } from "../../../types/auth";
import Button from "../../Atoms/Button/Button";
import { useAuth } from "../../../hooks/useAuth";
import { Session } from "@supabase/supabase-js";
import { LoginHistory } from "../../../types/model";
import { useEffect, useState } from "react";
import Alert from "../../Atoms/Alert/Alert";
import { useChangePassword } from "../../../hooks/mutation/useChangePassword";
import { useQuery } from "@tanstack/react-query";
import { selectLoginHistoryRecord } from "../../../api/loginHistory";
import Loading from "../../Atoms/Loading/Loading";

function Security() {
  const [inputValueRef, handleInputValue] = useInputRef<SecurityPassword>({
    password: "",
  });
  const [loginHistory, setLoginHistory] = useState<LoginHistory[] | null>(null);
  const [errors, setErrors] = useState<SecurityPassword | null>(null);
  const session: Session | null = useAuth();

  const { handleChangePassword } = useChangePassword();
  const { data, isError, isPending } = useQuery({
    queryKey: ["loginHistory"],
    queryFn: () => selectLoginHistoryRecord(session?.user.id as string),
    enabled: !!session,
    staleTime: (1000 * 60 * 3)
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setLoginHistory(data);
    }
    if (isError) {
      alert("로그인 기록을 불러오는데 실패했습니다. 다시 시도해주세요.");
    } 
  }, [data, isError]);
  
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
            <Button
              onClick={() =>
                handleChangePassword(inputValueRef.current.password, setErrors)
              }
            >
              변경
            </Button>
          </div>
          {errors?.password && <Alert type="error" content={errors.password} />}
        </div>
      </div>
      {session && isPending ? (
        <Loading />
      ) : (
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
                      {loginHistory && "Email-login"}
                    </div>
                    <div className="account__detail-table-loginType-time">
                      {loginHistory
                        ? loginHistory[0].created_at
                        : "로그인이 필요합니다."}
                    </div>
                  </div>
                </div>
                <div className="account__detail-table-ipAddress">
                  <div>
                    {loginHistory ? loginHistory[0].ip : "로그인이 필요합니다."}
                  </div>
                </div>
                <div className="account__detail-table-client">
                  <div>
                    {loginHistory
                      ? loginHistory[0].browser
                      : "로그인이 필요합니다."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Security;
