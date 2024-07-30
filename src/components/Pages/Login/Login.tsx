import "./Login.scss"
import Input from "../../Atoms/Input/Input"
import Button from "../../Atoms/Button/Button"
import {
  IoLogoBuffer,
} from "react-icons/io";
import Alert from "../../Atoms/Alert/Alert";
import Divider from "../../Atoms/Divider/Divider";
import { Link } from "react-router-dom";
import { useInputRef} from "../../../hooks/useInputRef";
import { LoginInputValue } from "../../../types/auth";


function Login() {
  const [inputValueRef, handleInputValue] = useInputRef<LoginInputValue>({
    email: "",
    password: "",
  })
  console.log(inputValueRef.current)
  return (
    <div className="login__container">
      <div className="login__main-container">
        <div className="login__card-container">
          <div className="login__title-container">
            <div className="login__title-logo-container">
            <IoLogoBuffer />
            </div>
            <div className={`login__title-text login__title-text-main`}>Log in</div>
            <div className={`login__title-text login__title-text-sub`}>Sign in on the internal platform</div>
          </div>
          <div className="login__form-container">
            <Input title="Email address" type="email" name="email" placeholder="example@example.com" handleInputValue={handleInputValue}/>
            <Input title="Password" type="password" name="password" placeholder="Enter your password" handleInputValue={handleInputValue}/>
            <Button variant="filled" size="large">Log in</Button>
            <Alert type="warning" content="아이디와 비밀번호를 제대로 입력해주세요!"/>
            <Divider/>
            <div className="login__form-link-container">
            <Link to={"/login"}>Create account</Link>
            <Link to={"/login"}>Forgot password</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
