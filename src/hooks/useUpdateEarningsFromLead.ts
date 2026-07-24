import { useState } from "react"
import { useLead } from "../context/LeadContext"


export default function useUpdateEarningsFromLead() {
const [leadToUpdateEarnings, setLeadToUpdateEarnings] = useState<string | null>(null)
const [amount, setAmount] = useState(0)
const {leads, setLeads} = useLead()
    const updateEarningsFromLead = () => {

        if (!amount) {
          alert("Please add amount")
          return     
        }


     setLeads(leads.map(l => l.id == leadToUpdateEarnings ? {
        ...l,
        earningsFromLead: l.earningsFromLead  + amount
     } : l))

        setLeadToUpdateEarnings(null)
        setAmount(0)
    }
  return {updateEarningsFromLead, leadToUpdateEarnings, setLeadToUpdateEarnings, amount, setAmount}
}
