import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, provider } from "../config/firebase-config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function useLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [signedUser, setSignedUser] = useState(true)
    const navigate = useNavigate()
     const loginWithGoogle = async () => {
     
    try {
     await signInWithPopup(auth, provider)

     navigate("/mydash")
    } catch (err) {
      console.log("An error occured while signing in, please check your internet connection and try again")
    }
    
  }

  const loginWithEmailPassword = async (e: React.SubmitEvent) => {

    e.preventDefault()
    try{
        if (signedUser) {
          await signInWithEmailAndPassword(auth, email, password)
        
        } else {

            if (password !== confirmPassword) {
                alert("Passwords do not match")
                return
            }

            await createUserWithEmailAndPassword(auth, email, password)

        }
        
     navigate("/mydash") 
    } catch(err: any) {
        alert(`Oops, something went wrong while logging in, please try again [${err.code}]`)
    }
  }
    return {loginWithGoogle, signedUser, setSignedUser, loginWithEmailPassword, setEmail, setPassword, setConfirmPassword, email, password, confirmPassword}
}