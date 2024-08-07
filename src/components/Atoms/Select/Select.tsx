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
        {name === "category" ? (
          <>
            <option value="category" disabled>
              카테고리를 골라주세요
            </option>
            <option value="식당">식당</option>
            <option value="카페">카페</option>
            <option value="쇼핑">쇼핑</option>
            <option value="문화생활">문화생활</option>
            <option value="숙박">숙박</option>
            <option value="교통">교통</option>
            <option value="기타">기타</option>
          </>
        ) : (
          <>
            <option value="rating" disabled>
              평가해주세요
            </option>
            <option value="good">좋아요 😊</option>
            <option value="okay">보통이에요 🤔</option>
            <option value="bad">별로에요 😤</option>
          </>
        )}
      </select>
    </div>
  );
}

export default Select;
