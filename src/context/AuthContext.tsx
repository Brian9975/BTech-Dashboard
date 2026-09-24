import { onAuthStateChanged, type User } from 'firebase/auth'
import React, {createContext, useEffect, useState, useContext} from 'react'
import { auth } from '../config/firebase-config'


interface AuthContextType {
 user: User | null
 isLoading: boolean
}
const AuthContext = createContext<AuthContextType | null>(null)
export default function AuthContextProvider({children}: {children: React.ReactNode}) {
const [user, setUser] = useState<User | null>(null)
const [isLoading, setIsLoading] = useState(true)
    const contextValues = {user, isLoading}



    useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
       setUser(firebaseUser)
       setIsLoading(false)
   })

   return () =>  unsubscribe()
    }, [])
  return (
 <AuthContext value={contextValues}>{children}</AuthContext>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("AuthContext must be within the AuthContextProvider")
  }

  return context
}