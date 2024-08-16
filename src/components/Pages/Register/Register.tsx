import "./Register.scss";
import { IoLogoBuffer } from "react-icons/io";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import Divider from "../../Atoms/Divider/Divider";
import { Link } from "react-router-dom";
import { useInputRef } from "../../../hooks/useInputRef";
import { RegisterInputValue } from "../../../types/auth";
import supabase from "../../../api/base";

function Register() {
  const [inputValueRef, handleInputValue] = useInputRef<RegisterInputValue>({
    email: "",
    password: "",
  })

  const handlerRegisterButtonClick = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: inputValueRef.current.email,
      password: inputValueRef.current.password,
      options: {
        emailRedirectTo: 'http://localhost:3000/',
      },
    })
    
    console.log(data, error)
  }
  
  return (
    <div className="register__container">
      <div className="register__main-container">
        <div className="register__card-container">
          <div className="register__title-container">
            <div className="register__title-logo-container">
              <IoLogoBuffer />
            </div>
            <div className={`register__title-text register__title-text-main`}>
              Register
            </div>
            <div className={`register__title-text register__title-text-sub`}>
              Register on the internal platform
            </div>
          </div>
          <div className="register__form-container">
            <Input
              title="Email address"
              type="email"
              name="email"
              placeholder="example@example.com"
              handleInputValue={handleInputValue}
            />
            <Input title="Password" type="password" name="password" placeholder="Enter your password" handleInputValue={handleInputValue}/>
            <div className="register__form-checkbox-container">
              <input
                type="checkbox"
                className="register__form-checkbox"
              ></input>
              <span>I have read the</span>
              <Link to={"/register"}>Terms and Conditions</Link>
            </div>
            <Button variant="filled" size="large" onClick={handlerRegisterButtonClick}>
              Register
            </Button>
            <Divider />
            <div className="register__form-link-container">
              <Link to={"/register"}>Already having an account?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
