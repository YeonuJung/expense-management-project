import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImage } from "../../api/storage";
import { Member } from "../../types/model";
import { useAuth } from "../useAuth";

export const useUploadMemberProfile = () => {
    const queryClient = useQueryClient();
    const session = useAuth();

    const uploadProfile = useMutation({
      mutationFn: uploadImage,
      onSuccess: (data) => {
        queryClient.setQueryData(["member"], (prev: Member[]) => {
          return prev.map(() => {
            return {...prev[0], profile_img: data.path}
          })
        });
        alert("프로필 이미지 변경이 완료되었습니다.");
      },
      onError: () => {
        alert("프로필 이미지 변경에 실패했습니다. 다시 시도해주세요.");
      },
    });

    const handleUploadProfile = (
        e: React.ChangeEvent<HTMLInputElement>,
        setPreview: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>,
      ) => {
        if (session) {
          const reader = new FileReader();
          const file = e.target.files?.[0];
          if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              setPreview(reader.result);
              uploadProfile.mutate({ image: file, userId: session.user.id });
            };
          }
        } else {
          alert("로그인이 필요합니다.");
        }
      };
      return {handleUploadProfile}
  }