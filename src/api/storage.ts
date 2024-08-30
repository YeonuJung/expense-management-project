import { Session } from "@supabase/supabase-js";
import supabase from "./base";

export const uploadImage = async (image: File, session: Session) => {
    const { data, error } = await supabase.storage.from("image_bucket").upload(`${session.user.id!}/${new Date().toISOString()}.${image.type.slice(
            6,
            10
          )}`, image);
  
    return { data, error };
    //스토리지에 이미지 파일 업로드하는 함수
}