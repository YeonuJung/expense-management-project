import "./Appbar.scss";
import Avatar from "../../Atoms/Avatar/Avatar";
import { useAuth } from "../../../hooks/useAuth";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import Divider from "../../Atoms/Divider/Divider";
import { getFullStorageUrl } from "../../../utils/getFullStorageUrl";
import { logout } from "../../../api/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { readMemberRecord } from "../../../api/member";
import Loading from "../../Atoms/Loading/Loading";

function Appbar() {
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const session: Session | null = useAuth();
  const queryClient = useQueryClient();
  const naviagte = useNavigate();

const {data, isError, isPending} = useQuery({queryKey: ["member"], queryFn: () => readMemberRecord(session?.user.id as string), enabled: !!session ,staleTime: 1000 * 60 * 3});

if(isError){
 alert("이름과 프로필 이미지를 불러오는데 실패했습니다.");
 }

const handleLogout = async (): Promise<void> => {
    await logout();
    alert("로그아웃 되었습니다.");
    queryClient.clear();
    localStorage.clear();
    naviagte("/");
  };
  return (
    <div className="appBar__container">
      <div className="appBar__menu-container">
        {(session && isPending)? (<div style={{width: "280px", height: "40px"}}><Loading size="small" /></div>) : (
          <>
        {(data && data[0] && data[0].name) ? (
          <div className="appBar__menu-greet">
            안녕하세요😌
            <span className="appBar__menu-name">{`"${data[0].name}"`}</span>님
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
              {(data && data[0] && data[0].profile_img)? (
                <Avatar
                  shape="circular"
                  type="img"
                  src={getFullStorageUrl(data[0].profile_img)}
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
        </>
        )}
      </div>
    </div>
  );
}

export default Appbar;
