import "./List.scss"
import { ReactNode } from "react";

interface ListProps {
   children: ReactNode;
   listTitle: ReactNode;
}
//listTitle을 프롭스로 따로 받는 이유는? compound component pattern
//커스텀할 필요가 없기 때문에 굳이 children으로 받을 필요도 없다.
//그리고 children으로 받을 경우 순서의 자유도가 생기기 때문에 예상치 못한 형태로 사용될 수 있고, 
//이를 방지하기 위함
function List({children, listTitle} : ListProps) {
  return (
    <div className="list__container">
        {listTitle}
        {children}
    </div>
  )
}

export default List
