import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkMemberDeleted, login, logout } from "../api/auth";
import { LoginInputValue } from "../types/general";
import { insertLoginHistoryRecord } from "../api/loginHistory";
import { checkIsMember, insertMemberRecord } from "../api/member";
import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "../utils/validation";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const insertLoginHistory = useMutation({
    mutationFn: insertLoginHistoryRecord,
    onSuccess: (data) => {
      queryClient.setQueryData(["loginHistory"], data);
    },
    onError: () => {
      alert("로그인 기록을 저장하는데 실패했습니다.");
    },
  });

  const handleLogin = async (
    email: string,
    password: string,
    inputValueRef: React.MutableRefObject<LoginInputValue>,
    data:
      | {
          ip: any;
          agent: string | undefined;
        }
      | undefined,
    setIsEmailAndPasswordValid: React.Dispatch<React.SetStateAction<boolean>>,
    setErrors: React.Dispatch<React.SetStateAction<LoginInputValue | null>>
  ) => {
    const validateResult = validateLoginForm(email, password);
    if (validateResult.email === "" && validateResult.password === "") {
      setErrors(null);

      const { data: loginData, error: loginError } = await login(
        inputValueRef.current.email,
        inputValueRef.current.password
      );
      if (loginData) {
        localStorage.setItem("loginTime", new Date().getTime().toString());
        const session = loginData.session;
        const { isMemberDeleted } = await checkMemberDeleted(
          session?.access_token as string
        );
        if (
          session?.user &&
          data?.ip &&
          data.agent &&
          isMemberDeleted === undefined
        ) {
          insertLoginHistory.mutate({
            userId: session.user.id,
            ip: data.ip,
            agent: data.agent,
          });
        }

        if (isMemberDeleted === "deleted") {
          alert("탈퇴한 회원입니다.");
          await logout();
        }

        if (loginError?.message === "Invalid login credentials") {
          setIsEmailAndPasswordValid(false);
          return;
        } else if (loginError) {
          alert("로그인에 실패했습니다. 다시 시도해주세요!");
          return;
        }

        const checkMember = await checkIsMember(inputValueRef.current.email);

        if (checkMember && checkMember.data && checkMember.data.length === 0) {
          await insertMemberRecord(
            inputValueRef.current.email,
            session?.user.id as string
          );
        }

        navigate("/");
      }
    } else {
      setErrors(validateResult);
      setIsEmailAndPasswordValid(true);
    }
  };

  return { handleLogin };
};
