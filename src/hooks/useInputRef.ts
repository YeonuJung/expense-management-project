import React, { useRef } from "react";


// 컴포넌트 안에서만 사용할 수 있는 코드를(리액트 훅을 사용한 로직)
// 별도의 함수로 빼내면 그것을 커스텀 훅이라고 부를 수 있다.
// 타입은 제네릭으로 별도 정의
export const useInputRef = <T>(initialValue: T) => {
  const inputValueRef = useRef<T>(initialValue);
  const handleInputValue = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>,
    name: string
  ) => {
    inputValueRef.current[name as keyof T] = e.target.value as T[keyof T];
  };
 
  return [inputValueRef, handleInputValue] as [typeof inputValueRef, typeof handleInputValue];
};
