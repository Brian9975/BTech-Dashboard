import { useState } from "react"
import { useLead } from "../context/LeadContext"
import {dbPromise} from "../config/indexedDB-config"
import { useAuth } from "../context/AuthContext"

export default function useUpdateStage() {
const {leads, setLeads} = useLead()
const [leadToUpdateStage, setLeadToUpdateStage] = useState<string | null>(null)
const {user} = useAuth()
const activeLeads = leads.filter(l => l.userId === user!.uid)
    const updateStage = async (value: string) => {
     const db = await dbPromise
     const data = await db.get("leads", leadToUpdateStage as IDBKeyRange | IDBValidKey)
     data.stage = value
     await db.put("leads", data)
      setLeads(activeLeads.map(l => l.id == leadToUpdateStage ? {
        ...l,
        stage: value
      } : l))

      setLeadToUpdateStage(null)
    }
  return {updateStage, leadToUpdateStage, setLeadToUpdateStage}
}
