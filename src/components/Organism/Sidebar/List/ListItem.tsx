import React, { ReactNode } from "react";
import Button from "../../../Atoms/Button/Button";
import "./ListItem.scss";
import { useNavigate } from "react-router-dom";

interface ListItemProps {
  children: ReactNode;
  path?: string;
}
function ListItem({ children, path }: ListItemProps) {
  const navigate = useNavigate();
  return (
    <div
      className="list__items"
      onClick={() => {
        navigate(`${path}`);
        return window.scrollTo({top:0, behavior: 'smooth'})
      }}
    >
      <Button color="grey" size="large">
        {children}
      </Button>
    </div>
  );
}

export default ListItem;
