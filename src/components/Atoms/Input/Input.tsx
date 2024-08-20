import "./Input.scss";
import { forwardRef } from "react";
interface InputProps {
  title: string;
  type: string;
  name: string;
  placeholder?: string;
  step?: number;
  handleInputValue: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  defaultValue?: string | number | null;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  readOnly?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { title, type, placeholder, name, step, handleInputValue, defaultValue, onKeyDown, readOnly } = props;
  return (
    <div className="Input__container">
      <label htmlFor={name} className="Input__label">
        {title}
      </label>
      <input
        className={`Input ${readOnly ? 'Input__readOnly' : ''}`}
        type={type}
        name={name}
        onChange={(e) => handleInputValue(e, name)}
        id={name}
        placeholder={placeholder}
        step={step}
        ref={ref}
        defaultValue={defaultValue?? undefined}
        onKeyDown={onKeyDown}
        readOnly={readOnly}
      />
    </div>
  );
});


export default Input;
