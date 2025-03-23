import React, { createContext, useState } from "react";

// Створюємо контекст
export const Step1Context = createContext();

// Створюємо провайдер для контексту
export const Step1Provider = ({ children }) => {
  const [step1Data, setStep1Data] = useState(null);

  return (
    <Step1Context.Provider value={{ step1Data, setStep1Data }}>
      {children}
    </Step1Context.Provider>
  );
};
