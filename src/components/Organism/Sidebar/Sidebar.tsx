import "./Sidebar.scss";
import List from "./List/List";
import ListItem from "./List/ListItem";
import ListTitle from "./List/ListTitle";
import Button from "../../Atoms/Button/Button";
import { TbFileDescription } from "react-icons/tb";
import { RiAccountCircleFill, RiMailOpenFill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import { SiSimpleanalytics } from "react-icons/si";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { FaShoppingBag, FaMapMarkerAlt } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Atoms/Loading/Loading";
import { readMemberRecord } from "../../../api/member";
import { readMontlyExpenseRecord } from "../../../api/expenseRecord";
import { MontlyExpenseRecord } from "../../../types/general";
import Alert from "../../Atoms/Alert/Alert";

function Sidebar() {
  const [expenseLimit, setExpenseLimit] = useState<number | null>(null);
  const [totalExpense, setTotalExpense] = useState<number | null>(null);
  const navigate = useNavigate();
  const onClick = (): void => {
    navigate("/customerService/contact");
    return window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const session: Session | null = useAuth();
  const month: string = moment().format("YYYY-MM");

  const {
    data: memberData,
    isError: memberError,
    isPending: memberIsPending,
    isStale: memberIsStale,
    refetch: memberRefetch,
  } = useQuery({
    queryKey: ["member"],
    queryFn: () => readMemberRecord(session?.user.id as string),
    enabled: !!session,
    staleTime: 1000 * 60 * 2,
  });
  const {
    data: expenseData,
    isError: expenseError,
    isPending: expenseIsPending,
    isStale: expenseIsStale,
    refetch: expenseRefetch,
  } = useQuery({
    queryKey: ["expenseRecord", month],
    queryFn: () => readMontlyExpenseRecord(session?.user.id as string, month),
    enabled: !!session,
    staleTime: 1000 * 60 * 2,
  });
  useEffect(() => {
    if (
      memberData &&
      memberData.length > 0 &&
      memberData[0].expense_limit !== 0
    ) {
      setExpenseLimit(memberData[0].expense_limit); 
    }else{
      setExpenseLimit(null);
    }

    if(expenseData && expenseData.length > 0){
      const totalExpense: number = expenseData.reduce(
        (acc: number, cur: MontlyExpenseRecord): number => acc + cur.price,
        0
      );
      setTotalExpense(totalExpense);
    }else{
      setTotalExpense(null);

    }
    if (memberIsStale) {
      memberRefetch();
    }
    if (expenseIsStale) {
      expenseRefetch();
    }
  }, [
    expenseData,
    memberData,
    memberIsStale,
    expenseIsStale,
    expenseRefetch,
    memberRefetch,
  ]);
  return (
    <div className="sidebar__container">
      <div className="sidebar__logo-container">
        <img src="/로고2.png" className="sidebar__logo" alt="logo"></img>
      </div>
      {session ? (
        <div className="sidebar__expense-container">
          <div className="sidebar__expense-wrapper">
            {memberIsPending || expenseIsPending ? (
              <div style={{ height: "80px", width: "200px" }}>
                <Loading size="small" />
              </div>
            ) : memberError || expenseError ? (
              <div
                style={{
                  height: "84px",
                  width: "200px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Alert
                  type="error"
                  content="데이터를 불러오는데 실패했습니다."
                />
              </div>
            ) : (
              <div className="sidebar__expense-text">
                <div className="sidebar__expense-amount">
                  이번달 한도 :{" "}
                  {expenseLimit !== null ? expenseLimit?.toLocaleString() : 0}{" "}
                  원
                </div>
                <div className="sidebar__expense-amount">
                  이번달 지출 :{" "}
                  {totalExpense !== null ? totalExpense?.toLocaleString() : 0}{" "}
                  원
                </div>
                <div className="expenseDivider" />

                <div className="sidebar__expense-title">
                  잔여 한도 :{" "}
                  {expenseLimit !== null && totalExpense !== null
                    ? (expenseLimit - totalExpense).toLocaleString()
                    : expenseLimit !== null && totalExpense === null? expenseLimit.toLocaleString() : expenseLimit === null && totalExpense !== null ? `-${totalExpense.toLocaleString()}` : 0}
                  {" "}원
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="sidebar__expense-container">
          <div className="sidebar__expense-wrapper">
            <div className="sidebar__expense-text">
              <div className="sidebar__expense-amount">
                설정한도 : 로그인 필요
              </div>
              <div className="sidebar__expense-amount">
                지출금액 : 로그인 필요
              </div>
              <div className="expenseDivider" />
              <div className="sidebar__expense-title">
                잔여한도 : 로그인 필요
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="divider" />
      <div className="sidebar__list-container">
        <List listTitle={<ListTitle listTitle="개인 허브"></ListTitle>}>
          <ListItem path="/">
            <TiHome />홈
          </ListItem>
          <ListItem path="/account">
            <RiAccountCircleFill />
            계정
          </ListItem>
        </List>
        <List listTitle={<ListTitle listTitle="지출 내역 관리"></ListTitle>}>
          <ListItem path="/expenseList">
            <FaShoppingBag />
            지출 내역
          </ListItem>
          <ListItem path="/expenseChart">
            <SiSimpleanalytics />
            지출 그래프
          </ListItem>
          <ListItem path="/calendar">
            <BsFillCalendar2WeekFill />
            캘린더
          </ListItem>
          <ListItem path="/visitedPlaces">
            <FaMapMarkerAlt />
            방문한 장소들
          </ListItem>
        </List>
        <List listTitle={<ListTitle listTitle="고객 서비스"></ListTitle>}>
          <ListItem path="/customerService/aboutUs">
            <TbFileDescription />
            회사 소개
          </ListItem>
          <ListItem path="/customerService/contact">
            <RiMailOpenFill />
            1:1 문의
          </ListItem>
          <ListItem path="/customerService/faq">
            <MdError />
            자주 묻는 질문
          </ListItem>
        </List>
      </div>
      <div className="divider" />
      <div className="sidebar__documentation-container">
        <div className="sidebar__documentation-text">
          <div>더 많은 서비스를 원하시나요?</div>
          <div>
            서비스에 대한 제안사항이 있으시면 여기를 눌러 건의해주세요. 큰
            도움이 됩니다.
          </div>
        </div>
        <Button color="success" variant="filled" onClick={onClick}>
          건의하기
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
