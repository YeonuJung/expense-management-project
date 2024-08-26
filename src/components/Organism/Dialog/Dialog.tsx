import { ReactNode } from "react";
import "./Dialog.scss";

export interface DialogProps {
  title: string;
  content?: string;
  buttons: ReactNode;
  layout?: "default" | "center" | "reverse";
}
function Dialog(props: DialogProps) {
  const { title, content, layout = "default", buttons } = props;

  return (
    <div className="dialog__container">
      <div className="dialog__wrapper">
        <div className="dialog__title-container">
          <div
            className={`${
              layout === "center"
                ? "dialog__title-content-container-center"
                : layout === "reverse"
                ? "dialog__title-content-container-reverse"
                : "dialog__title-content-container"
            }`}
          >
            <div className="dialog__title-content-text">{title}</div>
          </div>
        </div>
        <div className="dialog__content-container">
          <div
            className={`${
              layout === "center"
                ? "dialog__content-center"
                : layout === "reverse"
                ? "dialog__content-reverse"
                : "dialog__content"
            }`}
          >
            {content}
          </div>
        </div>
        <div
          className={`${
            layout === "center"
              ? "dialog__button-container-center"
              : layout === "reverse"
              ? "dialog__button-container-reverse"
              : "dialog__button-container"
          }`}
        >
          <div className="dialog__button-wrapper">{buttons}</div>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
