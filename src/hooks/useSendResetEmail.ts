import { useState } from "react";
import useHandleToast from "./useHandleToast";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase-config";

export default function useSendResetEmail() {
  const [resetEmail, setResetEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [stateDisplay, stateMessage, handleToast] = useHandleToast() as [
    boolean,
    string,
    (message: string) => void,
  ];
  const sendResetEmail = async () => {
    if (!resetEmail) {
      handleToast("Please include email to send reset link");
      return;
    }
    if (!resetEmail.includes("@")) {
      handleToast("Please enter a valid email address");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 6500);
      handleToast("Password Reset Email Sent");
      setShowResetModal(false);
      setResetEmail("");
    } catch (err: any) {
      if (err.code.includes("auth/invalid-email")) {
        handleToast("Please enter a valid email address");
      } 
      if (err.code.includes("auth/network-request-failed")) {
        handleToast("Please check your internet connection and try again")
      }
    }
  };
  return {
    resetEmail,
    isSuccess,
    sendResetEmail,
    stateDisplay,
    stateMessage,
    setResetEmail,
    showResetModal,
    setShowResetModal,
  };
}
