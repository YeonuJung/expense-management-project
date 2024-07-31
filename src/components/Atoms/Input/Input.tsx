import "./Input.scss";

interface InputProps {
  title: string;
  type: string;
  name: string;
  placeholder?: string;
  step?: number;
  handleInputValue: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
}

function Input(props: InputProps) {
  const { title, type, placeholder, name, step, handleInputValue} = props;
  return (
    <div className="Input__container">
      <label htmlFor={name} className="Input__label">
        {title}
      </label>
      <input
        className={`Input ${title === "Date" ? "Input__date" : ""}`}
        type={type}
        name={name}
        onChange={(e) => handleInputValue(e, name)}
        id={name}
        placeholder={placeholder}
        step={step}
      ></input>
    </div>
  );
}

export default Input;
