import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../config/firebase-config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useHandleToast from "./useHandleToast";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [signedUser, setSignedUser] = useState(true);
  const navigate = useNavigate();
 const [display, toastMessage, handleToast] = useHandleToast() as [
     boolean, 
     string,
     (message: string) => void,
   ]
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);

      navigate("/mydash");
    } catch (err) {
      handleToast(
        "An error occured while signing in, please check your internet connection and try again",
      );
    }
  };

  const loginWithEmailPassword = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      if (signedUser) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        await createUserWithEmailAndPassword(auth, email, password);
      }

      navigate("/mydash");
    } catch (err: any) {
      if (err.code.includes("auth/invalid-credential")) {
        handleToast("Wrong credentials, please sign up to be logged in");
        
      } else if (err.code.includes("auth/network-request-failed")) {
        handleToast(
          "Failed to login, please check your internet connection and try again",
        );
        
      } else
        handleToast(
          "Oops, something went wrong while logging in, please try again",
        );
        
    }
  };
  return {
    toastMessage, 
    display,
    loginWithGoogle,
    signedUser,
    setSignedUser,
    loginWithEmailPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
    email,
    password,
    confirmPassword,
  };
}
