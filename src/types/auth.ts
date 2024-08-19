interface LoginInputValue {
  email: string;
  password: string;
}
interface RegisterInputValue extends LoginInputValue {}

type LinkedEmail = Pick<LoginInputValue, 'email'>
type SecurityPassword = Pick<LoginInputValue, 'password'>

interface AccountInputValue {
  name: string;
  email: string;
  limit: string;
}
interface ContactInputValue {
  name: string;
  email: string;
  phonenumber: string;
  detail: string;
}
interface AddExpenseInputValue {
  name: string; 
  place: string; 
  price: number;
  category: string; 
  rating: string; 
  date: string;
}

export type{
    LoginInputValue,
    RegisterInputValue,
    AccountInputValue,
    ContactInputValue,
    AddExpenseInputValue,
    LinkedEmail,
    SecurityPassword
    
}


