import React, { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {

  const [lang, setLang] = useState("fr");

  const value = useMemo(
    () => ({
      lang,
      setLang,
    }),
    [lang]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within <AppProvider />");
  }
  return ctx;
}