import { Moon, SunIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Login() {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className={`bg-slate-100 text-slate-950 dark:text-slate-100 dark:bg-slate-950 min-h-screen ${theme}`}
    >
      <div className={"flex justify-end p-4 dark:bg-slate-900 bg-slate-50"}>
        <button
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
          className="cursor-pointer border border-slate-700 p-2 rounded-lg"
        >
          {theme === "light" ? <SunIcon size={25} /> : <Moon size={25} />}
        </button>
      </div>


      
    </div>
  );
}
