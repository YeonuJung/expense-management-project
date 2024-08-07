import "./Input.scss";
import { forwardRef } from "react";
interface InputProps {
  title: string;
  type: string;
  name: string;
  placeholder?: string;
  step?: number;
  handleInputValue: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { title, type, placeholder, name, step, handleInputValue } = props;
  return (
    <div className="Input__container">
      <label htmlFor={name} className="Input__label">
        {title}
      </label>
      <input
        className={`Input`}
        type={type}
        name={name}
        onChange={(e) => handleInputValue(e, name)}
        id={name}
        placeholder={placeholder}
        step={step}
        ref={ref}
      />
    </div>
  );
});


export default Input;
