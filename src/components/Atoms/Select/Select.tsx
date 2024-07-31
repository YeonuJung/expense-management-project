import "./Select.scss";

interface SelectProps {
  title: string;
  name: string;
  size?: number;
  handleInputValue: (
    e: React.ChangeEvent<HTMLSelectElement>,
    name: string
  ) => void;
}

function Select(props: SelectProps) {
  const { title, name, handleInputValue } = props;


  return (
    <div className="select__container">
      <label htmlFor={name} className="select__label">
        {title}
      </label>
      <select
        className="select"
        name={name}
        onChange={(e) => handleInputValue(e, name)}
        id={name}
      >
        <option value="category" disabled>Select your category</option>
        <option value="식당">식당</option>
        <option value="카페">카페</option>
        <option value="쇼핑">쇼핑</option>
        <option value="문화생활">문화생활</option>
        <option value="숙박">숙박</option>
        <option value="교통">교통</option>
        <option value="기타">기타</option>
      </select>
    </div>
  );
}

export default Select;
