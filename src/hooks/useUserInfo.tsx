import { createContext, useState, useEffect, useContext } from "react";
import supabase from "../api/base";
import { useAuth } from "./useAuth";
import { AppbarValue } from "../types/auth";

const UserContext = createContext<AppbarValue | null>(null);

export const useUserInfo = () => {
    return useContext(UserContext)
}


export const UserInfoProvider = ({children} : {children: React.ReactElement}) => {
  const [userInfo, setUserInfo] = useState<AppbarValue | null>(null);

  const session = useAuth()
  
  useEffect(() => {
    const fetchUserInfo = async () => {
        if(session){
            const {data} = await supabase.from('member').select('name, profile_img').eq('user_id',session.user.id)
            if(data && data.length > 0){
                setUserInfo({name: data[0].name, profile_img: data[0].profile_img})
            }else{
                setUserInfo(null)
                console.log("유저 정보를 불러오는데 실패했습니다.")
            }
            
        }
    }
   fetchUserInfo()
}, [session])

  return (
    <UserContext.Provider value={userInfo}>
        {children}
    </UserContext.Provider>
  )
};
