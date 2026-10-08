import { useLead } from "../context/LeadContext"
import { dbPromise } from "../config/indexedDB-config"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import useSyncData from "./useSyncData"

export default function useRemoveLead() {
const [showDeleteToast, setShowDeleteToast] = useState(false)
const {  leadToDelete, setLeadToDelete, setLeads, leads} = useLead()
const {user} = useAuth()
const {handleAllSync} = useSyncData()
const activeLeads = leads.filter(l => l.userId === user!.uid)

    const removeLead = async () => {
const db = await dbPromise
try{

  const leadData = await db.get("leads", leadToDelete as IDBKeyRange | IDBValidKey)
   leadData.isDeleted = true
   leadData.lastModified = Date.now()
   db.put("leads", leadData)

     setLeads(activeLeads.filter(l => l.id != leadToDelete))
    setShowDeleteToast(true)
    setTimeout(() => {
     setShowDeleteToast(false)
    }, 3000)
} catch (err) {
  console.log("An error occured while deleting lead! Please try again")
} finally {
  setLeadToDelete(null)
 handleAllSync()
}
    }

  return {removeLead, showDeleteToast}
}
