import React, { createContext, useContext, useState } from 'react'

interface LeadContextType {
  businessName: string,
  setBusinessName: React.Dispatch<React.SetStateAction<string>>,

}
const LeadContext = createContext<LeadContextType | null>(null)
export default function LeadContextProvider({children}: {children: React.ReactNode}) {
  const [businessName, setBusinessName] = useState("")
  const contextValues = {businessName, setBusinessName}
    return (
    <LeadContext value={contextValues}>{children}</LeadContext>
  )
}
export const useLead = () => {
    const context = useContext(LeadContext)

    if (!context) {
        throw new Error("LeadContext must be within the LeadContextProvider")
    }
    return context
} 