import supabase from "./base";

export const insertContactRecord = async (name: string, email: string, phonenumber: string, detail: string) => {
    const { error } = await supabase.from("contact").insert([
        {
            name: name,
            email: email,
            phonenumber: phonenumber,
            detail: detail,
        },
    ]);
    return { error };
    // 문의하기 데이터를 추가하는 함수
    // 비로그인도 추가 가능하기 때문에 세션을 인자로 받지 않음
}