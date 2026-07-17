import React, { createContext, useContext, useState } from 'react'


interface LeadsInterface {
    name: string,
    category: string,
    contact: number,
    stage: string,
    plan: string,
    lastContacted: Date | string,
    dateAdded: Date,
    notes: string,
    earningsFromLead: number,

}

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
  leads: LeadsInterface[],
  setLeads: React.Dispatch<React.SetStateAction<LeadsInterface[]>>,
  clientPlan: string,
  setClientPlan: React.Dispatch<React.SetStateAction<string>>
}
const LeadContext = createContext<LeadContextType | null>(null)
export default function LeadContextProvider({children}: {children: React.ReactNode}) {
  const [leads, setLeads] = useState<LeadsInterface[]>(localStorage.getItem("leads")  ?  JSON.parse(localStorage.getItem("leads") as string ) : [] )
  const [businessName, setBusinessName] = useState("")
  const [businessCategory, setBusinessCategory] = useState("")
  const [contactNo, setContactNo] = useState(0)
  const [stage, setStage] = useState("")
  const [lastContacted, setLastContacted] = useState<Date | string>("")
  const [clientPlan, setClientPlan] = useState("")
  const contextValues = {leads, setLeads, businessName, setBusinessName,businessCategory, setBusinessCategory, 
    contactNo, setContactNo, stage, setStage, lastContacted, setLastContacted, clientPlan, setClientPlan}
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