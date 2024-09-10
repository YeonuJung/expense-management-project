interface LoginInputValue {
  email: string;
  password: string;
}
interface RegisterInputValue extends LoginInputValue {}

type LinkedEmail = Pick<LoginInputValue, 'email'>
type SecurityPassword = Pick<LoginInputValue, 'password'>
type totalPrice = Pick<AddExpenseInputValue, 'price'>
interface ExpenseRecordForChart {
  date: string;
  price: number;
}
interface MontlyExpenseRecord extends ExpenseRecordForChart {
  category: string;
}
interface AccountInputValue {
  name: string;
  email: string;
  expense_limit: number | null;
  profile_img: string | null;
}
interface AppbarValue {
  name: string;
  profile_img: string | null;
}
interface ContactInputValue {
  name: string;
  email: string;
  phonenumber: string;
  detail: string;
}
interface AddExpenseInputValue {
  name: string; 
  place: string | null; 
  price: number;
  category: string; 
  rating: string; 
  date: string;
}

export type{
    LoginInputValue,
    RegisterInputValue,
    ExpenseRecordForChart,
    MontlyExpenseRecord,
    AccountInputValue,
    ContactInputValue,
    AddExpenseInputValue,
    LinkedEmail,
    SecurityPassword,
    totalPrice,
    AppbarValue
    
}


