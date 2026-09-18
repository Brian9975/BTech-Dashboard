import { Moon, SunIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Login() {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className={`bg-slate-100 flex justify-center items-center text-slate-950 dark:text-slate-100 dark:bg-slate-950 min-h-screen ${theme}`}
    >
      <div className={"fixed right-4 top-4  "}>
        <button
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
          className="cursor-pointer border border-slate-700 p-2 rounded-lg"
        >
          {theme === "light" ? <SunIcon size={25} /> : <Moon size={25} />}
        </button>
      </div>

      <main className="dark:bg-slate-900 shadow-md shadow-slate-600 bg-slate-50 rounded-2xl p-8 md:w-md">
        <form>
          <h1 className="text-center text-lg font-bold text-blue-600 pb-8">
            Sign Up
          </h1>
          <div className="pb-5">
            <label htmlFor="email">Email:</label>
            <div>
              <input id="email" className="border w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg" type="email" required/>
            </div>
          </div>

          <div className="pb-5">
            {" "}
            <label htmlFor="newPass">New Password:</label>
            <div>
              <input id="newPass" className="border w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg" type="password" required/>
            </div>
          </div>
          <div>
            <label htmlFor="newPassConfirm">Confirm New Password:</label>
            <div>
              <input id="newPassConfirm" className="border w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg" type="password" required/>
            </div>
          </div>
          <div className="flex justify-center  py-5">
<button className="bg-slate-950 dark:bg-slate-100 text-slate-100 dark:text-slate-950 py-1.5 cursor-pointer px-2 rounded-lg w-full text-lg">Continue</button>
          </div>
        </form>

        <p className="text-center">
          Already have an account,{" "}
          <span className="cursor-pointer font-bold text-blue-600">Login</span>
        </p>
         <p className="text-center py-2">or</p>
        <div>
          <button className="flex justify-center gap-2 bg-slate-950 text-slate-100 dark:bg-slate-100 dark:text-slate-950 w-full font-bold text-lg cursor-pointer rounded-lg  py-1.5 px-2">
            <Moon /> <span>Continue With Google</span>
          </button>
        </div>
      </main>
    </div>
  );
}
