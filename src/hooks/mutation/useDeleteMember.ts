import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteMemberRecord } from "../../api/member";
import { logout } from "../../api/auth";
import { useAuth } from "../useAuth";

export const useDeleteMember = (setOpenModal: React.Dispatch<React.SetStateAction<boolean>>, openModal: boolean) => {
    const navigate = useNavigate();
    const session = useAuth();
    
    const deleteMember = useMutation({
      mutationFn: deleteMemberRecord,
      onSuccess: () => {
        alert("계정 삭제가 완료되었습니다.");
        logout();
        navigate("/");
        window.scrollTo({ top: 0 });
      },
      onError: () => {
        alert("계정 삭제에 실패했습니다. 다시 시도해주세요!");
        setOpenModal(!openModal);
      },
    });
    const handleDeleteMember = () => {
      if(session){
        deleteMember.mutate();
      }else{
        alert("로그인이 필요합니다.");
      }
    }
    return {handleDeleteMember};
  }