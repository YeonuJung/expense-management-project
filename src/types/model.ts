import { Tables } from "./supabase";   
// 한 테이블당 한개의 인터페이스를 만드는 게 기본
// 이때 인터페이스 하나를 모델(데이터 담는 타입)이라고 부름
export type Contact = Tables<'contact'>
export type ExpenseRecord = Tables<'expenserecord'>
export type LoginHistory= Tables<'loginhistory'>
export type Member= Tables<'member'>