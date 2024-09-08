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
import { ExpenseRecord, Member} from "../../../types/model";
import Loading from "../../Atoms/Loading/Loading";
import { readMemberRecord } from "../../../api/member";
import { readMontlyExpenseRecord } from "../../../api/expenseRecord";

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

  const handleReadAll =async (userId: string, month: string) => {
    const [memberData, expenseData] = await Promise.all([
      readMemberRecord(userId),
      readMontlyExpenseRecord(userId, month),
    ]);
    return [memberData, expenseData] as [Member[], ExpenseRecord[]];
  
}
  const { data, isError, isPending } = useQuery({
    queryKey: ["member", "montlyExpense"],
    queryFn: () => handleReadAll(session?.user.id as string, month),
    enabled: !!session,
    staleTime: (1000 * 60 * 3)
  });

  useEffect(() => {
    if (data && data[0].length > 0) {
      setExpenseLimit(data[0][0].expense_limit);
    }
    if (data && data[1].length > 0) {
      const totalExpense: number = data[1].reduce(
        (acc: number, cur: ExpenseRecord): number => acc + cur.price,
        0
      );
      setTotalExpense(totalExpense);
    }
    if (isError) {
      alert("설정한도를 불러오는데 실패했습니다. 다시 시도해주세요.");
    }
  }, [data, isError]);

  
  return (
    <div className="sidebar__container">
      <div className="sidebar__logo-container">
        <img src="/로고.png" className="sidebar__logo" alt="logo"></img>
      </div>
      {session ? isPending? (<Loading size="small"/>) : (
        <div className="sidebar__expense-container">
          <div className="sidebar__expense-wrapper">
            <div className="sidebar__expense-text">
              <div className="sidebar__expense-amount">
                설정한도 : {expenseLimit?.toLocaleString()}원
              </div>
              <div className="sidebar__expense-amount">
                지출금액 : {totalExpense?.toLocaleString()}원
              </div>
              <div className="expenseDivider" />
              <div className="sidebar__expense-title">
                잔여한도 :{" "}
                {expenseLimit !== null && totalExpense !== null
                  ? (expenseLimit - totalExpense).toLocaleString()
                  : null}
                원
              </div>
            </div>
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
