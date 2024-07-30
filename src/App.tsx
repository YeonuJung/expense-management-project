import "./App.css";
import { Routes, Route } from "react-router-dom";
import AddExpense from './components/Pages/AddExpense/AddExpense'
import ExpenseList from './components/Pages/ExpenseList/ExpenseList'
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Register/Register";
import Account from "./components/Pages/Account/Account"
import LinkAccount from "./components/Pages/Account/LinkAccount";
import Security from "./components/Pages/Account/Security";
import AboutUs from "./components/Pages/AboutUs/AboutUs";

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />}/>
        <Route path="expenseList" element={<ExpenseList />}/>
        <Route path="addExpense" element={<AddExpense/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="account" element={<Account/>}/>
        <Route path="account/linkAccount" element={<LinkAccount/>}/>
        <Route path="account/security" element={<Security/>}/>
        <Route path="customerService/aboutUs" element={<AboutUs/>}/>
        
        {/* component 설계할 때 관련된 코드들을 최대한 가깝게 모아두는 응집성을 고려하기
        예를 들어 프롭스를 보낼때 객체로 만들어서 스프레드로 보낸다면 스프레드만 사용하고 
        직접 프롭스를 사용하는 컴포넌트에 명시한다면 사용하는 곳에만 명시해서 쓰기
        물론 나중에는 섞어서 사용하는 경우도 있지만 기본은 응집성을 고려하기*/}
        {/* 크기가 유동적으로 바뀌어야 하면 우선은 %사용, 가끔 vw나 vh가 꼭 필요한 경우에만 사용 */}
      </Routes>
    </>
  );
}

export default App;
