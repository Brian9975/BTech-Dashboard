import { useLead } from "../context/LeadContext"
import { dbPromise } from "../config/indexedDB-config"
import { useState } from "react"

export default function useRemoveLead() {
const [showDeleteToast, setShowDeleteToast] = useState(false)
const {  leadToDelete, setLeadToDelete, setLeads, leads} = useLead()

    const removeLead = async () => {
const db = await dbPromise
  const leadData = await db.get("leads", leadToDelete as IDBKeyRange | IDBValidKey)
   leadData.isDeleted = true
   leadData.lastModified = Date.now()
   db.put("tasks", leadData)

     setLeads(leads.filter(l => l.id != leadToDelete))
    setShowDeleteToast(true)
    setTimeout(() => {
     setShowDeleteToast(false)
    }, 3000)
     setLeadToDelete(null)
    }

  return {removeLead, showDeleteToast}
}
