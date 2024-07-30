import "./Delete.scss";
import { IoClose } from "react-icons/io5";

interface CloseProps {
  color: "primary" | "success" | "grey" | "error";
  variant: "outlined" | "filled";
  onDelete?: () => void;
}
function Delete(props: CloseProps) {
  const { color, variant, onDelete} = props;
  return (
    <div
      className={`delete__icon-container ${
        variant === "outlined"
          ? `bg-${color}`
          : color === "grey"
          ? "bg-grey2"
          : "bg-white"
      }`}
      onClick={() => onDelete?.()}
    >
      <IoClose
        className={`${variant === "filled" ? `text-${color}` : "text-white"}`}
      />
    </div>
  );
}

export default Delete;
