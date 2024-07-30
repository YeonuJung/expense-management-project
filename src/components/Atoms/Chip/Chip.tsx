import Close from "./Delete";
import "./Chip.scss";

interface ChipProps {
  color: "primary" | "success" | "grey" | "error";
  variant: "outlined" | "filled";
  label: string;
  onDelete?: () => void;
}

function Chip(props: ChipProps) {
  const { color, variant, label, onDelete} = props;
  const ChipWithOutline = () => {
    return (
      // 문자열 포맷팅 안에서 undefined를 뱉으면 undefined라는 문자열로 들어간다. (주의) null도 그렇다.
      // 이런 문자열 포맷팅은 신경쓸 게 많기때문에 classnames라는 라이브러리를 사용한다.
      <div
        className={`chip__container ${
          onDelete ? "chip__container-with-delete" : ""
        } outline-${color} ${
          color === "grey" ? "text-black" : `text-${color}`
        }`}
      >
        {label}
        {onDelete && <Close color={color} variant={variant} onDelete={onDelete} />}
        {/* undefined를 태그로 뱉어도 리액트는 undefined를 제거해버림 */}
      </div>
    );
  };

  const ChipWithoutOutline = () => {
    return (
      <div
        className={`chip__container ${
          onDelete ? "chip__container-with-delete" : ""
        } bg-${color} ${color === "grey" ? "text-black" : "text-white"}`}
      >
        {label}
        {onDelete && <Close color={color} variant={variant} onDelete={onDelete}/>}
        {/* undefined를 태그로 뱉어도 리액트는 undefined를 제거해버림 */}
      </div>
    );
  };

  if (variant === "outlined") {
    return <ChipWithOutline />;
  } else {
    return <ChipWithoutOutline />;
  }
}

export default Chip;
