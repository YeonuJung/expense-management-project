import {
  AccountInputValue,
  ContactInputValue,
  LoginInputValue,
  RegisterInputValue,
  SecurityPassword,
} from "../types/auth";

export const validateName = (name: string) => {
  const error: Pick<AccountInputValue, "name"> = { name: "" };
  if (name === "") {
    error.name = "이름을 입력해주세요.";
  } else if (!/^[가-힣]{2,4}$/.test(name)) {
    error.name = "한글 2~4자로 입력해주세요.";
  }
  return error;
};

export const validatePassword = (password: string) => {
  const error: SecurityPassword = { password: "" };
  if (password === "") {
    error.password = "패스워드를 입력해주세요.";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(
      password
    )
  ) {
    error.password =
      "패스워드는 최소 8자 이상, 영문자, 숫자, 특수문자를 포함해야 합니다.";
  }
  return error;
};

export const validateContactForm = (
  name: string,
  email: string,
  phonenumber: string,
  datail: string
) => {
  const error: ContactInputValue = {
    name: "",
    email: "",
    phonenumber: "",
    detail: "",
  };
  if (name === "") {
    error.name = "이름을 입력해주세요!";
  } else if (!/^[가-힣]{2,4}$/.test(name)) {
    error.name = "한글 2~4자로 입력해주세요.";
  }

  if (email === "") {
    error.email = "이메일을 입력해주세요!";
  } else if (!/^[a-z0-9.\-_]+@([a-z0-9-]+\.)+[a-z]{2,6}$/.test(email)) {
    error.email = "이메일 형식에 맞게 입력해주세요.";
  }

  if (phonenumber === "") {
    error.phonenumber = "휴대폰 번호를 입력해주세요!";
  } else if (
    !/^(010|011|016|017|018|019)-[0-9]{3,4}-[0-9]{4}$/.test(phonenumber)
  ) {
    error.phonenumber = "000-0000-0000 형식으로 입력해주세요.";
  }

  if (datail === "") {
    error.detail = "문의 내용을 입력해주세요!";
  }

  return error;
};

export const validateLoginForm = (email: string, password: string) => {
  const error: LoginInputValue = { email: "", password: "" };

  if (email === "") {
    error.email = "이메일을 입력해주세요.";
  } else if (!/^[a-z0-9.\-_]+@([a-z0-9-]+\.)+[a-z]{2,6}$/.test(email)) {
    error.email = "이메일 형식에 맞게 입력해주세요.";
  }

  if (password === "") {
    error.password = "패스워드를 입력해주세요.";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(
      password
    )
  ) {
    error.password =
      "패스워드는 최소 8자 이상, 영문자, 숫자, 특수문자를 포함해야 합니다.";
  }

  return error;
};

export const validateEmail = (email: string) => {
  const error: Pick<LoginInputValue, "email"> = { email: "" };

  if (email === "") {
    error.email = "이메일을 입력해주세요.";
  } else if (!/^[a-z0-9.\-_]+@([a-z0-9-]+\.)+[a-z]{2,6}$/.test(email)) {
    error.email = "이메일 형식에 맞게 입력해주세요.";
  }
  return error;
};

export const validateRegisterForm = (email: string, password: string) => {
  const error: RegisterInputValue = { email: "", password: "" };

  if (email === "") {
    error.email = "이메일을 입력해주세요.";
  } else if (!/^[a-z0-9.\-_]+@([a-z0-9-]+\.)+[a-z]{2,6}$/.test(email)) {
    error.email = "이메일 형식에 맞게 입력해주세요.";
  }

  if (password === "") {
    error.password = "패스워드를 입력해주세요.";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(
      password
    )
  ) {
    error.password =
      "패스워드는 최소 8자 이상, 영문자, 숫자, 특수문자를 포함해야 합니다.";
  }
  return error;
};
