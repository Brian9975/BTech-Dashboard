import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, provider } from "../config/firebase-config"
import { useState } from "react"

export default function useLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
     const loginWithGoogle = async () => {

    try {

      const {user} = await signInWithPopup(auth, provider)

      console.log(user)
    } catch (err) {
      console.log("An error occured while signing in, please check your internet connection and try again")
    }

  }

  const loginWithEmailPassword = async (e: React.SubmitEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
        alert("Passwords do not match")
        return
    }
    try{
        const {user} = await createUserWithEmailAndPassword(auth, email, password)
        console.log(user)

    } catch(err) {
        alert("Oops, something went wrong while logging in, please try again")
    }
  }
    return {loginWithGoogle, loginWithEmailPassword, setEmail, setPassword, setConfirmPassword, email, password, confirmPassword}
}