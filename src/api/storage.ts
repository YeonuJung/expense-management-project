import supabase from "./base";

export const uploadImage = async ({image, userId}: {image: File, userId: string}) => {
    const { data, error } = await supabase.storage.from("image_bucket").upload(`${userId}/${new Date().toISOString()}.${image.type.slice(
            6,
            10
          )}`, image);
          console.log(data?.path)
    const {error: error2} = await supabase.from("member").update({profile_img: data?.path}).eq("user_id", userId)
  if(error || error2){
    throw error
  }
    return data
    //스토리지에 이미지 파일 업로드 및 멤버 테이블에 업데이트하는 함수
}