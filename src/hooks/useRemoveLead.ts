import { useLead } from "../context/LeadContext"
import { dbPromise } from "../config/indexedDB-config"
import { useState } from "react"

export default function useRemoveLead() {
const [showDeleteToast, setShowDeleteToast] = useState(false)
const {  leadToDelete, setLeadToDelete, setLeads, leads} = useLead()

    const removeLead = async () => {
const db = await dbPromise

await db.delete("leads", leadToDelete as IDBKeyRange | IDBValidKey)

     setLeads(leads.filter(l => l.id != leadToDelete))
    setShowDeleteToast(true)
    setTimeout(() => {
     setShowDeleteToast(false)
    }, 3000)
     setLeadToDelete(null)
    }

  return {removeLead, showDeleteToast}
}
