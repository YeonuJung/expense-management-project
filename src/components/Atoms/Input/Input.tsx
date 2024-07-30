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
      <label htmlFor={title} className="Input__label">
        {title}
      </label>
      <input
        className={`Input ${title === "Date" ? "Input__date" : ""}`}
        type={type}
        name={name}
        onChange={(e) => handleInputValue(e, name)}
        id={title}
        placeholder={placeholder}
        step={step}
      ></input>
    </div>
  );
}

export default Input;
