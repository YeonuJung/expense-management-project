import { Session } from "@supabase/supabase-js";
import supabase from "./base";

export const selectMemberRecord = async (session: Session) => {
    const { data, error } = await supabase.from("member").select("*").eq("user_id", session.user.id);
   
    return {data, error};
    // 멤버 정보를 불러오는 함수(세션을 인자로 받아서 세션의 유저id로 멤버 정보를 불러옴)
}
export const checkIsMember = async (email: string) => {
    const {data, error} = await supabase.from("member").select("email").eq("email", email)
   
    return {data, error};
// 1. 로그인할 때 멤버인지 체크하는 함수(이메일을 인자로 받아서 멤버인지 체크)
// 2. 비밀번호 찾을 때 멤버인지 체크하는 함수(이메일을 인자로 받아서 멤버인지 체크)
// 3. 회원가입할 때 기존에 있는 멤버인지 체크하는 함수(이메일을 인자로 받아서 멤버인지 체크)
} 

export const updateMemberName = async (name: string, session: Session) => {
    const { error } = await supabase.from("member").update({ name: name}).eq("user_id", session.user.id);
  
    return {error};

    // 멤버 이름을 변경하는 함수(이름을 인자로 받아서 세션의 유저id로 이름 변경)
}

export const updateMemberLimit = async (limit: number, session: Session) => {
    const { error } = await supabase.from("member").update({ expense_limit: limit}).eq("user_id", session.user.id);
    
    return {error};
    // 멤버 한도를 변경하는 함수(한도를 인자로 받아서 세션의 유저id로 한도 변경)
}

export const updateMemberProfileImg = async (profileImg: string, session: Session) => {
    const { error } = await supabase.from("member").update({ profile_img: profileImg}).eq("user_id", session.user.id);
   
    return {error};
    // 멤버 프로필 이미지를 변경하는 함수(프로필 이미지를 인자로 받아서 세션의 유저id로 프로필 이미지 변경)
}

export const insertMemberRecord = async (email: string, userId: string) => {
    const { error } = await supabase.from("member").insert({
        email: email,
        user_id: userId,
        name: "회원",
      });
      return {error}
    // 멤버 정보를 추가하는 함수(이메일, 유저id를 인자로 받아서 멤버 정보 추가)
}

export const deleteMember = async () => {
    const { error } = await supabase.auth.updateUser({
        data: { status: "deleted" },
      });
      return {error}
      // 사실상 auth의 메타데이터를 수정하는 함수이긴 하지만 멤버 삭제기능은 무료버전으로 구현 불가하기에
      // 메타데이터에 status : deleted를 추가하여 멤버를 삭제하는 함수로 사용
}