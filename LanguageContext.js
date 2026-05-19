import React, { createContext, useState } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [isSpanish, setIsSpanish] = useState(false);

  return (
    <LanguageContext.Provider value={{ isSpanish, setIsSpanish }}>
      {children}
    </LanguageContext.Provider>
  );
};
