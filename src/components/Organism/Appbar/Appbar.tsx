import "./Appbar.scss";
import Avatar from "../../Atoms/Avatar/Avatar";
import { useAuth } from "../../../hooks/useAuth";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../../api/base";
import { Session } from "@supabase/supabase-js";
import Divider from "../../Atoms/Divider/Divider";
import { useUserInfo } from "../../../hooks/useUserInfo";
import { getFullStorageUrl } from "../../Pages/Account/Account";
import { AppbarValue } from "../../../types/auth";

function Appbar() {
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const session: Session | null = useAuth();
  const userInfo: AppbarValue | null = useUserInfo();

  const naviagte = useNavigate();
  const handleLogout = async (): Promise<void> => {
    await supabase.auth.signOut();
    alert("로그아웃 되었습니다.");
    naviagte("/");
  };
  return (
    <div className="appBar__container">
      <div className="appBar__menu-container">
        {session && userInfo?.name ? (
          <div className="appBar__menu-greet">
            안녕하세요😌
            <span className="appBar__menu-name">{`"${userInfo.name}"`}</span>님
          </div>
        ) : (
          <>
            <Link className="appBar__menu" to={"/register"}>
              회원가입
            </Link>
            <Link className="appBar__menu" to={"/login"}>
              로그인
            </Link>
          </>
        )}
        <div
          className="appBar__avatar"
          onClick={() => setIsDropdownClicked(!isDropdownClicked)}
        >
          {session ? (
            <>
              {userInfo?.profile_img ? (
                <Avatar
                  shape="circular"
                  type="img"
                  src={getFullStorageUrl(userInfo.profile_img)}
                />
              ) : (
                <Avatar shape="circular" type="icon" />
              )}
              <IoMdArrowDropdown className="avatar__dropdown-icon" />
              {isDropdownClicked && (
                <div className="avatar__dropdown-container">
                  <Link className="avatar__dropdown" to={"/account"}>
                    계정 관리
                  </Link>
                  <Link
                    className="avatar__dropdown"
                    to={"/customerService/contact"}
                  >
                    1:1 문의
                  </Link>
                  <Link
                    className="avatar__dropdown"
                    to={"/customerService/faq"}
                  >
                    자주 묻는 질문
                  </Link>
                  <Divider />
                  <div className="avatar__dropdown" onClick={handleLogout}>
                    로그아웃
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <Avatar shape="circular" type="icon" />
              <IoMdArrowDropdown className="avatar__dropdown-icon" />
              {isDropdownClicked && (
                <div className="avatar__dropdown-container">
                  <Link
                    className="avatar__dropdown"
                    to={"/customerService/contact"}
                  >
                    1:1 문의
                  </Link>
                  <Link
                    className="avatar__dropdown"
                    to={"/customerService/faq"}
                  >
                    자주 묻는 질문
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appbar;
