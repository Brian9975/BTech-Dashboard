import React, { createContext, useContext, useState } from 'react'

interface LeadContextType {
  businessName: string,
  setBusinessName: React.Dispatch<React.SetStateAction<string>>,
  businessCategory: string,
  setBusinessCategory: React.Dispatch<React.SetStateAction<string>>,
  contactNo: number,
  setContactNo: React.Dispatch<React.SetStateAction<number>>,
  stage: string,
  setStage: React.Dispatch<React.SetStateAction<string>>,
  lastContacted: Date | string,
  setLastContacted: React.Dispatch<React.SetStateAction<Date | string>>,

}
const LeadContext = createContext<LeadContextType | null>(null)
export default function LeadContextProvider({children}: {children: React.ReactNode}) {
  const [businessName, setBusinessName] = useState("")
  const [businessCategory, setBusinessCategory] = useState("")
  const [contactNo, setContactNo] = useState(0)
  const [stage, setStage] = useState("")
  const [lastContacted, setLastContacted] = useState<Date | string>(new Date())

  const contextValues = {businessName, setBusinessName,businessCategory, setBusinessCategory, 
    contactNo, setContactNo, stage, setStage, lastContacted, setLastContacted}
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