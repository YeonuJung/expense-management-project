import supabase from "./base";

export const selectLoginHistoryRecord = async (userId : string) => {
    const { data, error } = await supabase.from("loginhistory").select("*").eq("user_id", userId).order("created_at", {ascending: false}).limit(1);
   if(error){
    throw error
   }
    return data;
    // 로그인 히스토리를 불러오는 함수(세션을 인자로 받아서 세션의 유저id로 로그인 히스토리를 불러옴)
    // 로그인 히스토리는 최신순으로 정렬하여 1개만 불러옴
    // 로그인 히스토리는 로그인 시마다 추가되기 때문에 최신 로그인 히스토리를 불러와서 1개만 불러와야 함
}

export const selectIpAndAgent = async () => {
    const response = await fetch("https://api64.ipify.org/?format=json");
    const { ip } = await response.json();

    const browsers: string[] = [
      "Chrome",
      "Safari",
      "Firefox",
      "Edge",
      "Edg",
      "OPR",
      "Opera",
      "MSIE",
      "Trident",
      "YaBrowser",
      "UCBrowser",
      "CriOS",
      "FxiOS",
      "SamsungBrowser",
    ];
    const browserRegex = new RegExp(`(${browsers.join("|")})/([\\d\\.]+)`, "i");
    const match = navigator.userAgent.match(browserRegex);
    return { ip: ip, agent: match?.[0] };
    // ipify api를 이용해서 ip를 가져오고 브라우저 api를 이용해서 userAgent를 가져오는 함수
    // LoginHistory에 들어가는 정보들을 받아오는 함수이기 때문에 LoginHistory에 넣어둠
  };

  export const insertLoginHistoryRecord = async ({userId, ip, agent} : {userId: string, ip: string, agent: string}) => {
    const { data, error} = await supabase.from("loginhistory").insert([
        {
          user_id: userId,
          ip: ip,
          browser: agent,
          created_at: new Date().toLocaleString(),
        },
      ])
      .select("*");
     if(error){
      throw error
     }
      return data
      // 로그인 히스토리를 추가하는 함수(유저id, ip, agent를 인자로 받아서 로그인 히스토리 추가)
  }