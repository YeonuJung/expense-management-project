import "./Alert.scss";
import { IoWarningSharp } from "react-icons/io5";
import { IoMdInformationCircle } from "react-icons/io";
import { BiError } from "react-icons/bi";
import { FaRegCircleCheck } from "react-icons/fa6";

interface AlertProps {
  type: "error" | "warning" | "success" | "info";
  content: string;
}
function Alert({ type, content }: AlertProps) {
  return (
    <div className={`alert__container alert-${type}`}>
      <div className={`alert__logo text-${type}`}>
        {type === "warning" ? (
          <IoWarningSharp />
        ) : type === "error" ? (
          <BiError />
        ) : type === "info" ? (
          <IoMdInformationCircle />
        ) : (
          <FaRegCircleCheck />
        )}
      </div>
      <div className={`alert__content text-${type}`}>{content}</div>
    </div>
  );
}

export default Alert;
