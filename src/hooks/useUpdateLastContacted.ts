import  { useState } from 'react'
import { useLead } from '../context/LeadContext'
import { getDb } from '../config/indexedDB-config'
import { useAuth } from '../context/AuthContext'
import useSyncData from './useSyncData'
import useHandleToast from './useHandleToast'
export default function useUpdateLastContacted(){
    const [leadLastContactedToUpdate, setLeadLastContactedToUpdate] = useState<string | null>(null)
    const [lastContactedValue, setLastContactedValue] = useState<Date | string>("")
    const {leads, setLeads} = useLead()
    const {handleAllSync} = useSyncData()
    const {user} = useAuth()
    const [lastContErrorToastDisplay,lastContErrorToastMessage, handleToast] = useHandleToast() as [
          boolean, 
          string,
          (message: string) => void,
        ]
    const activeLeads = leads.filter(l => l.userId === user!.uid)
    const updateLastContacted = async () => {
             const db = await getDb()
             try {


                 const data = await db?.get("leads", leadLastContactedToUpdate as IDBKeyRange | IDBValidKey)
                 data.lastContacted = lastContactedValue
                 data.lastModified = Date.now()
                 await db?.put("leads", data)
                  
            
    
            setLeads(activeLeads.map(l => l.id == leadLastContactedToUpdate ? {
                ...l,
            lastContacted: lastContactedValue
            } : l))
             } catch (error) {
                handleToast("An Error Occured while updating Last Contacted! Please try again")
             } finally {
                 setLeadLastContactedToUpdate(null)
                 handleAllSync()
             }
    }
  return {lastContErrorToastDisplay, lastContErrorToastMessage, updateLastContacted,lastContactedValue, leadLastContactedToUpdate, setLeadLastContactedToUpdate, setLastContactedValue}
}
