import "./Sidebar.scss";
import List from "./List/List";
import ListItem from "./List/ListItem";
import ListTitle from "./List/ListTitle";
import Button from "../../Atoms/Button/Button";
import { IoLogoBuffer } from "react-icons/io";
import { TbFileDescription } from "react-icons/tb";
import {
  RiExpandUpDownLine,
  RiAccountCircleFill,
  RiMailOpenFill,
} from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import { SiSimpleanalytics } from "react-icons/si";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { FaShoppingBag, FaMapMarkerAlt } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const onClick = (): void => {
    navigate("/customerService/contact");
    return window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="sidebar__container">
      <div className="sidebar__logo-container">
        <IoLogoBuffer />
      </div>
      <div className="sidebar__expense-container">
        <div className="sidebar__expense-wrapper">
          <div className="sidebar__expense-text">
            <div className="sidebar__expense-title">이번달 총 소비액</div>
            <div className="sidebar__expense-amount">현재까지: 300000</div>
          </div>
          <div className="sidebar__expense-button">
            <RiExpandUpDownLine />
          </div>
        </div>
      </div>
      <div className="divider" />
      <div className="sidebar__list-container">
        <List listTitle={<ListTitle listTitle="GENERAL"></ListTitle>}>
          <ListItem path="/">
            <TiHome />
            Home
          </ListItem>
          <ListItem>
            <SiSimpleanalytics />
            Analytics
          </ListItem>
          <ListItem path="/account">
            <RiAccountCircleFill />
            Account
          </ListItem>
        </List>
        <List listTitle={<ListTitle listTitle="MANAGEMENT"></ListTitle>}>
          <ListItem path="/expenseList">
            <FaShoppingBag />
            Spent History
          </ListItem>
          <ListItem path="/calendar">
            <BsFillCalendar2WeekFill />
            Calendar
          </ListItem>
          <ListItem>
            <FaMapMarkerAlt />
            Visited Places
          </ListItem>
        </List>
        <List listTitle={<ListTitle listTitle="CUSTOMER SERVICE"></ListTitle>}>
          <ListItem path="/customerService/aboutUs">
            <TbFileDescription />
            About us
          </ListItem>
          <ListItem path="/customerService/contact">
            <RiMailOpenFill />
            1:1 Contact
          </ListItem>
          <ListItem path="/customerService/faq">
            <MdError />
            FAQ
          </ListItem>
        </List>
      </div>
      <div className="divider" />
      <div className="sidebar__documentation-container">
        <div className="sidebar__documentation-text">
          <div>Need More Service?</div>
          <div>
            We would appreciate if you could support us by clicking here
          </div>
        </div>
        <Button color="success" variant="filled" onClick={onClick}>
          Talk
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
