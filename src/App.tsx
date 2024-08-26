import { Routes, Route, useLocation } from "react-router-dom";
import AddExpense from "./components/Pages/AddExpense/AddExpense";
import ExpenseList from "./components/Pages/ExpenseList/ExpenseList";
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Register/Register";
import Account from "./components/Pages/Account/Account";
import Security from "./components/Pages/Account/Security";
import AboutUs from "./components/Pages/CustomerService/AboutUs";
import Contact from "./components/Pages/CustomerService/Contact";
import Faq from "./components/Pages/CustomerService/Faq";
import ExpenseCalendar from "./components/Pages/ExpenseCalendar/ExpenseCalendar";
import VisitedPlace from "./components/Pages/VisitedPlace/VisitedPlace";
import UpdateExpense from "./components/Pages/UpdateExpense/UpdateExpense";
import ExpenseChart from "./components/Pages/ExpenseChart/ExpenseChart";
import Home from "./components/Pages/Home/Home";
import PasswordFind from "./components/Pages/Login/PasswordFind";
import PasswordReset from "./components/Pages/Login/PasswordReset";
import Sidebar from "./components/Organism/Sidebar/Sidebar";
import Appbar from "./components/Organism/Appbar/Appbar";


function App() {
  const location = useLocation();
  const pageWithoutSidebarAndAppbar: string[] = [
    "/login",
    "/register",
    "/passwordFind",
    "/passwordReset",
  ];
  const isPageWithoutSidebarAndAppbar: boolean =
    pageWithoutSidebarAndAppbar.includes(location.pathname);
  return (
    <>
      {!isPageWithoutSidebarAndAppbar ? (
        <div className="app__container">
          <Sidebar />
          <div className="app__content-container">
            <Appbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="passwordFind" element={<PasswordFind />} />
              <Route path="passwordReset" element={<PasswordReset />} />
              <Route path="expenseList" element={<ExpenseList />} />
              <Route path="addExpense" element={<AddExpense />} />
              <Route path="register" element={<Register />} />
              <Route path="account" element={<Account />} />
              <Route path="account/security" element={<Security />} />
              <Route path="customerService/aboutUs" element={<AboutUs />} />
              <Route path="customerService/contact" element={<Contact />} />
              <Route path="customerService/faq" element={<Faq />} />
              <Route path="calendar" element={<ExpenseCalendar />} />
              <Route path="visitedPlaces" element={<VisitedPlace />} />
              <Route path="updateExpense" element={<UpdateExpense />} />
              <Route path="expenseChart" element={<ExpenseChart />} />

              {/* component 설계할 때 관련된 코드들을 최대한 가깝게 모아두는 응집성을 고려하기
        예를 들어 프롭스를 보낼때 객체로 만들어서 스프레드로 보낸다면 스프레드만 사용하고 
        직접 프롭스를 사용하는 컴포넌트에 명시한다면 사용하는 곳에만 명시해서 쓰기
        물론 나중에는 섞어서 사용하는 경우도 있지만 기본은 응집성을 고려하기*/}
              {/* 크기가 유동적으로 바뀌어야 하면 우선은 %사용, 가끔 vw나 vh가 꼭 필요한 경우에만 사용 */}
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="passwordFind" element={<PasswordFind />} />
          <Route path="passwordReset" element={<PasswordReset />} />
          <Route path="expenseList" element={<ExpenseList />} />
          <Route path="addExpense" element={<AddExpense />} />
          <Route path="register" element={<Register />} />
          <Route path="account" element={<Account />} />
          <Route path="account/security" element={<Security />} />
          <Route path="customerService/aboutUs" element={<AboutUs />} />
          <Route path="customerService/contact" element={<Contact />} />
          <Route path="customerService/faq" element={<Faq />} />
          <Route path="calendar" element={<ExpenseCalendar />} />
          <Route path="visitedPlaces" element={<VisitedPlace />} />
          <Route path="updateExpense" element={<UpdateExpense />} />
          <Route path="expenseChart" element={<ExpenseChart />} />

          {/* component 설계할 때 관련된 코드들을 최대한 가깝게 모아두는 응집성을 고려하기
        예를 들어 프롭스를 보낼때 객체로 만들어서 스프레드로 보낸다면 스프레드만 사용하고 
        직접 프롭스를 사용하는 컴포넌트에 명시한다면 사용하는 곳에만 명시해서 쓰기
        물론 나중에는 섞어서 사용하는 경우도 있지만 기본은 응집성을 고려하기*/}
          {/* 크기가 유동적으로 바뀌어야 하면 우선은 %사용, 가끔 vw나 vh가 꼭 필요한 경우에만 사용 */}
        </Routes>
      )}
    </>
  );
}

export default App;
