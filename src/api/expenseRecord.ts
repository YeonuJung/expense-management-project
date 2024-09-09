import supabase from "./base"
import { Session } from "@supabase/supabase-js"
import moment from "moment";

interface ReadExpenseRecordParams {
    searchKeyword?: string[];
    checkedFilterMenuValue?: {
      category: string[];
      rating: string[];
      date: string[];
    };
    start?: number;
    end?: number;
}

export const readExpenseRecord = async (userId: string, {searchKeyword, checkedFilterMenuValue, start, end}: ReadExpenseRecordParams) => {
    let query = supabase.from("expenserecord").select("*", {count: "exact"}).eq("user_id", userId)
    
    
     // dynamic query 여러 조건문 붙이고 싶을 때 사용
     if(start !== undefined && end !== undefined){
      query = query.range(start, end)
     }

     if (searchKeyword && searchKeyword.length > 0) {
        for (const keyword of searchKeyword) {
          query = query.ilike("name", `%${keyword}%`);
        }
      }

      if (checkedFilterMenuValue && checkedFilterMenuValue.category.length > 0) {
        query = query.in("category", checkedFilterMenuValue.category);
      }

      if (checkedFilterMenuValue && checkedFilterMenuValue.rating.length > 0) {
        query = query.in("rating", checkedFilterMenuValue.rating);
      }

      if (checkedFilterMenuValue && checkedFilterMenuValue.date.length === 1) {
        if (checkedFilterMenuValue.date[0] === "최신순") {
          query = query.order("date", { ascending: false });
        } else if (checkedFilterMenuValue.date[0] === "늦은순") {
          query = query.order("date", { ascending: true });
        }
      }
      const { data, error, count } = await query;

      if(error){
        throw error
      }
    return {data, count};
    // 지출 정보를 불러오는 함수(유저id를 인자로 받아서 지출 정보를 불러옴)
    // dynamic query를 사용하기 위해 query를 반환함 (searchKeyword, checkedFilterMenuValue, start, end를 인자로 받아서 해당 조건에 맞는 지출 정보를 불러옴)
    // expenseList에서는 range를 사용해야 하는데, query에 붙여서 사용 가능
}

export const readClickedExpenseRecord = async (userId: string, id: number) => {
    const { data, error } = await supabase
        .from("expenserecord")
        .select("*")
        .eq("user_id", userId)
        .eq("id", id);
        if(error){
          throw error
         }
    return data;
    // 업데이트를 위해 클릭한 expenseReocord를 id를 이용해 불러오는 함수
    // (세션과 id를 인자로 받아서 해당 id의 지출 정보를 불러옴)
}

export const readMontlyExpenseRecord = async (userId: string, month: string) => {
    const { data, error } = await supabase
        .from("expenserecord")
        .select("price, date, category")
        .eq("user_id", userId)
        .gte("date", moment(month).startOf("month").format("YYYY-MM-DD"))
        .lte("date", moment(month).endOf("month").format("YYYY-MM-DD"));
   if(error){
    throw error
   }
    return data;
    // 월간 지출 정보를 불러오는 함수(세션과 월을 인자로 받아서 해당 월의 지출 정보를 불러옴)
    }


export const updateExpenseRecord = async ({userId, id, name, place, price, rating, date, category} : {userId: string, id: number, name: string, place: string | null, price: number, rating: string, date: string, category: string}) => {
    const { data, error } = await supabase
        .from("expenserecord")
        .update({
            name: name,
            place: place,
            price: price,
            rating: rating,
            date: date,
            category: category
        })
        .eq("user_id", userId)
        .eq("id", id)
        .select("*");

        if(error){
          throw error
         }
    return data;
    // 지출 정보를 수정하는 함수(세션과 지출 정보를 인자로 받아서 해당 id의 지출 정보를 수정함)
}

export const insertExpenseRecord = async ({userId, name, place, price, rating, date, category} : {userId: string, name: string, place: string | null, price: number, rating: string, date: string, category: string}) => {
    const { data, error } = await supabase.from("expenserecord").insert([
        {
            name: name,
            place: place,
            price: price,
            rating: rating,
            date: date,
            category: category,
            user_id: userId
        }
    ])
    .select("*");
   if(error){
    throw error
   }
  return data
    // 지출 정보를 추가하는 함수(세션과 지출 정보를 인자로 받아서 지출 정보를 추가함)
}

export const deleteExpenseRecord = async ({userId, id} : {userId: string, id: number}) => {
    const { data, error } = await supabase
        .from("expenserecord")
        .delete()
        .eq("user_id", userId)
        .eq("id", id)
        .select("*");
       if(error){
        throw error
       }
       return data
        // 지출 정보를 삭제하는 함수(세션과 id를 인자로 받아서 해당 id의 지출 정보를 삭제함)
    }
