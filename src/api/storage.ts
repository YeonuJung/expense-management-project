import supabase from "./base";

export const uploadImage = async ({image, userId}: {image: File, userId: string}) => {
    const { data, error } = await supabase.storage.from("image_bucket").upload(`${userId}/${new Date().toISOString()}.${image.type.slice(
            6,
            10
          )}`, image);
  if(error){
    throw error
  }
    return data
    //스토리지에 이미지 파일 업로드하는 함수
}