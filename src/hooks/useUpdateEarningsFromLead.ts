import { useState } from "react"
import { useLead } from "../context/LeadContext"
import { getDb } from "../config/indexedDB-config"
import useSyncData from "./useSyncData"
import useHandleToast from "./useHandleToast"

export default function useUpdateEarningsFromLead() {
const [leadToUpdateEarnings, setLeadToUpdateEarnings] = useState<string | null>(null)
const [amount, setAmount] = useState(0)
const [earningErrorToastDisplay, earningErrorToastMessage, handleToast] = useHandleToast() as [
      boolean, 
      string,
      (message: string) => void,
    ]
const {leads, setLeads} = useLead()
const {handleAllSync} = useSyncData()
    const updateEarningsFromLead = async () => {

        if (!amount) {
          alert("Please add amount")
          return     
        }

  const db = await getDb()
       
  try {

    const data = await db?.get("leads", leadToUpdateEarnings as IDBKeyRange | IDBValidKey)
    data.earningsFromLead = data.earningsFromLead + amount
    data.lastModified = Date.now()

    await db?.put("leads", data)
setLeads(leads.map(l => l.id == leadToUpdateEarnings ? {
...l,
earningsFromLead: l.earningsFromLead  + amount
} : l))
  } catch (err) {
    handleToast("An Error Occured while updating lead's Earnings! Please try again")
  } finally {
    setLeadToUpdateEarnings(null)
    setAmount(0)
    handleAllSync()
  }

    }
  return {earningErrorToastDisplay, earningErrorToastMessage ,updateEarningsFromLead, leadToUpdateEarnings, setLeadToUpdateEarnings, amount, setAmount}
}
