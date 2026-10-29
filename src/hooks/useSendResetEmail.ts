import { useState } from "react"
import useHandleToast from "./useHandleToast"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../config/firebase-config"


export default function useSendResetEmail() {

    const [resetEmail, setResetEmail] = useState("")
    const [showResetModal, setShowResetModal] = useState(false)
    const [successDisplay, successMessage, handleToast] = useHandleToast() as [
      boolean, 
      string,
      (message: string) => void,
    ]
    const sendResetEmail = async () => {
        try{
           await sendPasswordResetEmail(auth, resetEmail)
           handleToast("Password Reset Email Sent")
           setShowResetModal(false)
        }catch (err: any) {
          console.log(err.code)
        }
    }
  return {sendResetEmail, successDisplay, successMessage, setResetEmail, showResetModal, setShowResetModal}
}
