import React, { createContext, useContext, useEffect, useState } from "react";
import useSyncData from "../hooks/useSyncData";

interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}
const ThemeContext = createContext<ThemeContextType | null>(null);
export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");
  
  const contextValues = { theme, setTheme };

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
