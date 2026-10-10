import React, { createContext, useContext, useEffect, useState } from "react";


interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  syncLoading: boolean;
  setSyncLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const ThemeContext = createContext<ThemeContextType | null>(null);
export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");
  const [syncLoading, setSyncLoading] = useState(true)
  const contextValues = { theme, setTheme, syncLoading, setSyncLoading };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  return <ThemeContext value={contextValues}>{children}</ThemeContext>;
}
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("ThemeContext must be within ThemeContextProvider");
  }

  return context;
};
