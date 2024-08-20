import { createContext, useState, useEffect, useContext } from "react";
import supabase from "../api/base";
import { useAuth } from "./useAuth";

const UserContext = createContext<string | null>(null);

export const useUserName = () => {
    return useContext(UserContext)
}


export const UserNameProvider = ({children} : {children: React.ReactElement}) => {
  const [userName, setUserName] = useState<string | null>(null);

  const session = useAuth()
  
  useEffect(() => {
    const fetchUserName = async () => {
        if(session){
            const {data} = await supabase.from('member').select('name').eq('user_id',session.user.id)
            if(data && data.length > 0){
                setUserName(data[0].name)
            }else{
                setUserName(null)
                console.log("유저 이름을 불러오는데 실패했습니다.")
            }
            
        }
    }
   fetchUserName()
}, [session])

  return (
    <UserContext.Provider value={userName}>
        {children}
    </UserContext.Provider>
  )
};
