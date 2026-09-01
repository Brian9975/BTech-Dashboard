import  { useState } from 'react'
// import { useLead } from '../context/LeadContext'
import { dbPromise } from '../config/indexedDB-config'
export default function useUpdateLastContacted(){
    const [leadLastContactedToUpdate, setLeadLastContactedToUpdate] = useState<string | null>(null)
    const [lastContactedValue, setLastContactedValue] = useState<Date | string>("")
    // const {leads, setLeads} = useLead()
    const updateLastContacted = async () => {
             const db = await dbPromise
             const data = await db.get("leads", leadLastContactedToUpdate as IDBKeyRange | IDBValidKey)
             data.lastContacted = lastContactedValue
             await db.put("leads", data)
              
        

        // setLeads(leads.map(l => l.id == leadLastContactedToUpdate ? {
        //     ...l,
        // lastContacted: lastContactedValue
        // } : l))
        setLeadLastContactedToUpdate(null)
    }
  return {updateLastContacted,lastContactedValue, leadLastContactedToUpdate, setLeadLastContactedToUpdate, setLastContactedValue}
}
