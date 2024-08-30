import supabase from "./base"
import { Session } from "@supabase/supabase-js"
import moment from "moment";

export const selectExpenseRecord = async (session: Session) => {
    let query = supabase.from("expenserecord").select("*", {count: "exact"}).eq("user_id", session.user.id)
    const { data, error } = await query;
    
    return {data, error, query};
    // 지출 정보를 불러오는 함수(세션을 인자로 받아서 세션의 유저id로 지출 정보를 불러옴)
    // dynamic query를 사용하기 위해 query를 반환함
    // expenseList에서는 range를 사용해야 하는데, query에 붙여서 사용 가능
}

export const selectClickedExpenseRecord = async (session: Session, id: number) => {
    const { data, error } = await supabase
        .from("expenserecord")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("id", id);
    
    return {data, error};
    // 업데이트를 위해 클릭한 expenseReocord를 id를 이용해 불러오는 함수
    // (세션과 id를 인자로 받아서 해당 id의 지출 정보를 불러옴)
}

export const selectMontlyExpenseRecord = async (session: Session, month: string) => {
    const { data, error } = await supabase
        .from("expenserecord")
        .select("price, date, category")
        .eq("user_id", session.user.id)
        .gte("date", moment(month).startOf("month").format("YYYY-MM-DD"))
        .lte("date", moment(month).endOf("month").format("YYYY-MM-DD"));
   
    return {data, error};
    // 월간 지출 정보를 불러오는 함수(세션과 월을 인자로 받아서 해당 월의 지출 정보를 불러옴)
    }


export const updateExpenseRecord = async (session: Session, id: number, name: string, place: string, price: number, rating: string, date: string, category: string) => {
    const { error } = await supabase
        .from("expenserecord")
        .update({
            name: name,
            place: place,
            price: price,
            rating: rating,
            date: date,
            category: category
        })
        .eq("user_id", session.user.id)
        .eq("id", id);
   
    return {error};
    // 지출 정보를 수정하는 함수(세션과 지출 정보를 인자로 받아서 해당 id의 지출 정보를 수정함)
}

export const insertExpenseRecord = async (session: Session, name: string, place: string, price: number, rating: string, date: string, category: string) => {
    const { error } = await supabase.from("expenserecord").insert([
        {
            name: name,
            place: place,
            price: price,
            rating: rating,
            date: date,
            category: category,
            user_id: session.user.id
        }
    ]);
   
    return {error};
    // 지출 정보를 추가하는 함수(세션과 지출 정보를 인자로 받아서 지출 정보를 추가함)
}

export const deleteExpenseRecord = async (session: Session, id: number) => {
    const { error } = await supabase
        .from("expenserecord")
        .delete()
        .eq("user_id", session.user.id)
        .eq("id", id);
       
        return {error}
        // 지출 정보를 삭제하는 함수(세션과 id를 인자로 받아서 해당 id의 지출 정보를 삭제함)
    }
