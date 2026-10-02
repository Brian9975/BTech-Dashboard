import  { useState } from 'react'
import { useLead } from '../context/LeadContext'
import { dbPromise } from '../config/indexedDB-config'
import { useAuth } from '../context/AuthContext'
export default function useUpdateLastContacted(){
    const [leadLastContactedToUpdate, setLeadLastContactedToUpdate] = useState<string | null>(null)
    const [lastContactedValue, setLastContactedValue] = useState<Date | string>("")
    const {leads, setLeads} = useLead()
    const {user} = useAuth()
    const activeLeads = leads.filter(l => l.userId === user!.uid)
    const updateLastContacted = async () => {
             const db = await dbPromise
             const data = await db.get("leads", leadLastContactedToUpdate as IDBKeyRange | IDBValidKey)
             data.lastContacted = lastContactedValue
             data.lastModified = Date.now()
             await db.put("leads", data)
              
        

        setLeads(activeLeads.map(l => l.id == leadLastContactedToUpdate ? {
            ...l,
        lastContacted: lastContactedValue
        } : l))
        setLeadLastContactedToUpdate(null)
    }
  return {updateLastContacted,lastContactedValue, leadLastContactedToUpdate, setLeadLastContactedToUpdate, setLastContactedValue}
}
