import  { useState } from 'react'
import { useLead } from '../context/LeadContext'
import { getDb } from '../config/indexedDB-config'
import { useAuth } from '../context/AuthContext'
import useSyncData from './useSyncData'
import useHandleToast from './useHandleToast'

export default function useUpdatePlan() {
const [leadToUpdatePlan, setLeadToUpdatePlan] = useState<string | null>(null)
const {leads, setLeads} = useLead()
const {user} = useAuth()
const {handleAllSync} = useSyncData()
const [planErrorToastDisplay, planErrorToastMessage, handleToast] = useHandleToast() as [
      boolean, 
      string,
      (message: string) => void,
    ]
const activeLeads = leads.filter(l => l.userId === user!.uid)
    const updatePlan = async (value: string) => {
     const db = await getDb()
     try {
       const data = await db?.get("leads", leadToUpdatePlan as IDBKeyRange | IDBValidKey)
       data.plan = value
       data.lastModified = Date.now()
     
     await db?.put("leads", data)
       
       setLeads(activeLeads.map(l => l.id == leadToUpdatePlan ? {
         ...l,
         plan: value
       } : l))
     } catch (err) {

      handleToast("An error occured while updating plan! Please try agin")
     } finally {
        setLeadToUpdatePlan(null)
        handleAllSync()
     }
    }
  return {planErrorToastDisplay, planErrorToastMessage ,updatePlan, leadToUpdatePlan, setLeadToUpdatePlan}
}
