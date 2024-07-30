import "./ListTitle.scss";

interface ListTitleProps {
  listTitle: string;
}
function ListTitle({ listTitle }: ListTitleProps) {
  return <div className="list__title">{listTitle}</div>;
}

export default ListTitle;
