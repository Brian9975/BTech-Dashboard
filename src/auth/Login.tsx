import {
  AlertTriangle,
  CheckCircle,
  CircleAlert,
  Eye,
  EyeOff,
  Moon,
  SunIcon,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import GoogleLogo from "../assets/GoogleLogo.jpeg";
import useLogin from "../hooks/useLogin";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSendResetEmail from "../hooks/useSendResetEmail";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { theme, setTheme } = useTheme();
  const { authLoading, user } = useAuth();
  const navigate = useNavigate();
  const {
    currentError,
    display,
    toastMessage,
    loginWithGoogle,
    email,
    signedUser,
    setSignedUser,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loginWithEmailPassword,
  } = useLogin();
  const {
    isSuccess,
    resetEmail,
    sendResetEmail,
    stateDisplay,
    stateMessage,
    setResetEmail,
    showResetModal,
    setShowResetModal,
  } = useSendResetEmail();

  useEffect(() => {
    if (user && !authLoading) {
      navigate("/mydash");
    }
  }, [user]);

  if (authLoading) {
    return (
      <div
        className={`text-3xl ${theme} font-bold text-center h-screen flex justify-center items-center dark:bg-slate-950  dark:text-slate-100 text-slate-950  bg-slate-100`}
      >
        <div
          className={`h-20 w-20 animate-spin rounded-full border-8    border-t-transparent`}
        ></div>
      </div>
    );
  }

  if (user) {
    return null;
  }
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
        <form onSubmit={loginWithEmailPassword}>
          <h1 className="text-center text-lg font-bold text-blue-600 pb-8">
            {signedUser ? "Login" : "Sign Up"}
          </h1>

          {currentError && (
            <div className="pb-5 flex text-red-600 items-center gap-2 text-sm">
              <CircleAlert size={16} />
              <span>{currentError}</span>
            </div>
          )}
          <div className="pb-5">
            <label htmlFor="email">Email:</label>
            <div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="border w-full border-slate-600 p-2 outline-0 placeholder-slate-600 rounded-lg"
                type="email"
                placeholder={`${signedUser ? "Enter your email" : "name@example.com"}`}
                required
              />
            </div>
          </div>

          <div className="pb-0">
            {" "}
            <label htmlFor="pass">
              {signedUser ? "Password" : "New Password"}:
            </label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="pass"
                className="border w-full border-slate-600 p-2 outline-0 placeholder-slate-600 rounded-lg"
                type={showPassword ? "text" : "password"}
                placeholder={`${signedUser ? "Enter your password" : "Create a password (min. 6 characters)"}`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 cursor-pointer -translate-y-1/2 top-1/2"
              >
                {showPassword ? (
                  <Eye className="cursor-pointer" />
                ) : (
                  <EyeOff className="text-gray-600" />
                )}
              </button>
            </div>
            <div className="pt-3">
              {signedUser && (
                <span
                  className="cursor-pointer text-sm text-blue-600"
                  onClick={() => setShowResetModal(true)}
                >
                  Forgot Password
                </span>
              )}
            </div>
          </div>

          {!signedUser && (
            <div>
              <label htmlFor="newPassConfirm">Confirm New Password:</label>
              <div className="relative">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="newPassConfirm"
                  className="border w-full border-slate-600 p-2 outline-0 placeholder-slate-600 rounded-lg"
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 cursor-pointer -translate-y-1/2 top-1/2"
                >
                  {showPassword ? (
                    <Eye />
                  ) : (
                    <EyeOff className="text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          )}
          <div className="flex justify-center  py-5">
            <button
              disabled={Boolean(currentError)}
              type="submit"
              className="bg-slate-950 enabled:hover:scale-105 transition-all disabled:cursor-not-allowed disabled:opacity-30 dark:bg-slate-100 text-slate-100 dark:text-slate-950 py-1.5 cursor-pointer px-2 rounded-lg w-full text-lg"
            >
              Continue
            </button>
          </div>
        </form>

        <p className="text-center">
          Already have an account,{" "}
          <span
            onClick={() => {
              setSignedUser(!signedUser);
              setEmail("");
              setPassword("");
              setConfirmPassword("");
            }}
            className="cursor-pointer font-bold text-blue-600"
          >
            {signedUser ? "Sign up" : "Login"}
          </span>
        </p>
        <p className="text-center py-2">or</p>
        <div>
          <button
            onClick={() => loginWithGoogle()}
            className="flex items-center shadow-md shadow-slate-600 dark:shadow-none justify-center gap-1  bg-slate-100 text-slate-950 w-full font-bold text-lg cursor-pointer rounded-lg  py-1.5 px-2"
          >
            <img className="w-15" src={GoogleLogo} />{" "}
            <span>Continue With Google</span>
          </button>
        </div>
      </main>

      <div
        className={`dark:bg-slate-100 bg-slate-950 z-50 fixed shadow-md shadow-slate-700  transition-all duration-400 ${display ? "top-0" : "-top-100"}  m-5 rounded-lg py-5 px-4  text-slate-100 dark:text-slate-950`}
      >
        <p className="flex items-center gap-2">
          <AlertTriangle className="dark:text-red-800 text-red-600" />
          <span className="font-light  md:text-lg">{toastMessage}</span>
        </p>
      </div>
      <div
        className={`dark:bg-slate-100 bg-slate-950 z-50 fixed shadow-md shadow-slate-700  transition-all duration-400 ${stateDisplay ? "top-0" : "-top-100"}  m-5 rounded-lg py-5 px-4  text-slate-100 dark:text-slate-950`}
      >
        <p className="flex items-center gap-2">
          {isSuccess ? <CheckCircle className="text-green-600"/> : <AlertTriangle className="dark:text-red-800 text-red-600" />}
          <span className="font-light  md:text-lg">{stateMessage}</span>
        </p>
      </div>

      {/* Forgot password prompt overlay */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="dark:bg-slate-950 bg-slate-100 w-sm py-10 px-5 shadow-sm shadow-slate-600 flex items-center flex-col gap-7 rounded-lg">
            <input
              onChange={(e) => setResetEmail(e.target.value)}
              type="email"
              value={resetEmail}
              className="border w-full border-slate-600 p-2 text-lg outline-0 placeholder-slate-600 rounded-lg"
              placeholder="Enter email to send password reset link..."
              required
            />
            <div className="flex gap-15">
              <button
                onClick={() => setShowResetModal(false)}
                className="bg-slate-900 text-slate-50 px-2 py-1.5 hover:scale-105 transition-all rounded-lg cursor-pointer text-lg"
              >
                Cancel
              </button>
              <button
                onClick={sendResetEmail}
                className="bg-slate-950 hover:scale-105  transition-all   dark:bg-slate-100 text-slate-100 dark:text-slate-950 py-1.5 cursor-pointer px-2 rounded-lg  text-lg"
              >
                Send Reset Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
