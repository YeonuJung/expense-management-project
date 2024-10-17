import supabase from "./base";


export const logout = async () => {
    await supabase.auth.signOut();
    
    // 로그아웃 함수
}

export const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    return {data, error}
    // 로그인 함수
}

export const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: process.env.REACT_APP_SIGNUP_REDIRECT_URL,
        },
      });
      return {error}
      // 회원가입 함수
}

export const checkMemberDeleted = async (access_token: string) => {
    const {data, error} = await supabase.auth.getUser(access_token);
    const isMemberDeleted = data.user?.user_metadata.status

    return {isMemberDeleted, error}
    // 회원 탈퇴 여부 확인 함수 deleted면 탈퇴한 회원 undefined면 탈퇴하지 않은 회원
}

export const changePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({
        password: password,
      });
      if(error){
        throw error
      }
      // 비밀번호 변경 함수
}

export const passwordFind = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(
        email,
        { redirectTo: process.env.REACT_APP_PASSWORD_FIND_REDIRECT_URL }
      );
      return {error}
      // 비밀번호 찾기 함수
}

export const resetPassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({
        password: password,
      })
      return {error}
      // 비밀번호 재설정 함수
}