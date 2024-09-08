import { useMutation } from "@tanstack/react-query";
import { insertContactRecord } from "../../api/contact";
import { useNavigate } from "react-router-dom";
import { validateContactForm } from "../../utils/validation";
import { ContactInputValue } from "../../types/auth";

export const useInsertContact = () => {
  const navigate = useNavigate();

  const insertContact = useMutation({
    mutationFn: insertContactRecord,
    onError: () => {
      alert("문의하기에 실패했습니다. 다시 시도해주세요!");
    },
    onSuccess: () => {
      alert("문의하기가 완료되었습니다.");
      navigate("/");
    },
  });
  const handleInsertContact = ({
    name,
    email,
    phonenumber,
    detail,
    setErrors,
  }: {
    name: string;
    email: string;
    phonenumber: string;
    detail: string;
    setErrors: React.Dispatch<React.SetStateAction<ContactInputValue | null>>;
  }) => {
    const validateResult = validateContactForm(
      name,
      email,
      phonenumber,
      detail
    );
    if (
      validateResult.name === "" &&
      validateResult.email === "" &&
      validateResult.phonenumber === "" &&
      validateResult.detail === ""
    ) {
      insertContact.mutate({ name, email, phonenumber, detail });
    } else {
      setErrors(validateResult);
    }
  };

  return { handleInsertContact };
};