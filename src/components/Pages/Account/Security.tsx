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
import Alert from "../../Atoms/Alert/Alert";


function Security() {
  const [inputValueRef, handleInputValue] = useInputRef<SecurityPassword>({
    password: "",
  });
  const [loginHistory, setLoginHistory] = useState<LoginHistory[] | null>(null);
  const [errors, setErrors] = useState<SecurityPassword | null>(null)

  const session: Session | null = useAuth();
  const navigate = useNavigate();


  const changeMemberPassword = async (): Promise<void> => {
    if (session) {
      setErrors(validatePassword(inputValueRef.current.password))
    } else {
      alert("로그인이 필요합니다.");
    }
  };
useEffect(() => {
  const changePassword = async () => {
    if(errors?.password === ""){
      const { error } = await supabase.auth.updateUser({
        password: inputValueRef.current.password,
      });
      console.log(error?.name)
      if (error?.message === 'New password should be different from the old password.') {
       alert("다른 비밀번호로 재시도해주세요.")
      } else {
        alert("비밀번호 변경이 완료되었습니다.");
        navigate("/")
      }
    }
   
  }
  changePassword()
}, [errors, inputValueRef.current.password])

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

  const validatePassword = (password: string)  => {
    const error: SecurityPassword = {password: ""}
    if(password === ""){
      error.password = "패스워드를 입력해주세요."
    }else if( !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(password)){
      error.password = "패스워드는 최소 8자 이상, 영문자, 숫자, 특수문자를 포함해야 합니다."
    }
    return error
  }
 
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
            <Button onClick={changeMemberPassword}>변경</Button>
          </div>
          {errors?.password && <Alert type="error" content={errors.password}/>}
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
