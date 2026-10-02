import { useState } from "react"
import { useLead } from "../context/LeadContext"
import { dbPromise } from "../config/indexedDB-config"

export default function useUpdateEarningsFromLead() {
const [leadToUpdateEarnings, setLeadToUpdateEarnings] = useState<string | null>(null)
const [amount, setAmount] = useState(0)
const {leads, setLeads} = useLead()
    const updateEarningsFromLead = async () => {

        if (!amount) {
          alert("Please add amount")
          return     
        }

  const db = await dbPromise
             const data = await db.get("leads", leadToUpdateEarnings as IDBKeyRange | IDBValidKey)
             data.earningsFromLead = data.earningsFromLead + amount
             data.lastModified = Date.now()

             await db.put("leads", data)
     setLeads(leads.map(l => l.id == leadToUpdateEarnings ? {
        ...l,
        earningsFromLead: l.earningsFromLead  + amount
     } : l))

        setLeadToUpdateEarnings(null)
        setAmount(0)
    }
  return {updateEarningsFromLead, leadToUpdateEarnings, setLeadToUpdateEarnings, amount, setAmount}
}
