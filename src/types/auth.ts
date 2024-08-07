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
interface AddExpenseInputValue {
  name: string; 
  place: string; 
  price: string;
  category: string; 
  rating: string; 
  date: string;
}

export type{
    LoginInputValue,
    RegisterInputValue,
    AccountInputValue,
    AddExpenseInputValue,
    LinkedEmail,
    SecurityPassword
}


