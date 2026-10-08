import { useState } from "react"
import { useLead } from "../context/LeadContext"
import {dbPromise} from "../config/indexedDB-config"
import { useAuth } from "../context/AuthContext"
import useSyncData from "./useSyncData"

export default function useUpdateStage() {
const {leads, setLeads} = useLead()
const [leadToUpdateStage, setLeadToUpdateStage] = useState<string | null>(null)
const {user} = useAuth()
const {handleAllSync} = useSyncData()
const activeLeads = leads.filter(l => l.userId === user!.uid)
    const updateStage = async (value: string) => {

     const db = await dbPromise
     try {

       const data = await db.get("leads", leadToUpdateStage as IDBKeyRange | IDBValidKey)
       data.stage = value
       data.lastModified = Date.now()
       await db.put("leads", data)
        setLeads(activeLeads.map(l => l.id == leadToUpdateStage ? {
          ...l,
          stage: value
        } : l))
     } catch (err) {
       console.log("An error occured while updating stage! Please try again")
    } finally {
      setLeadToUpdateStage(null)
      handleAllSync()
    }

    }
  return {updateStage, leadToUpdateStage, setLeadToUpdateStage}
}
