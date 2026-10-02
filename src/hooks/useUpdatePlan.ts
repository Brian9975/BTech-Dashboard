import  { useState } from 'react'
import { useLead } from '../context/LeadContext'
import { dbPromise } from '../config/indexedDB-config'
import { useAuth } from '../context/AuthContext'

export default function useUpdatePlan() {
const [leadToUpdatePlan, setLeadToUpdatePlan] = useState<string | null>(null)
const {leads, setLeads} = useLead()
const {user} = useAuth()
const activeLeads = leads.filter(l => l.userId === user!.uid)
    const updatePlan = async (value: string) => {
     const db = await dbPromise
     const data = await db.get("leads", leadToUpdatePlan as IDBKeyRange | IDBValidKey)
     data.plan = value
     await db.put("leads", data)
      
      setLeads(activeLeads.map(l => l.id == leadToUpdatePlan ? {
        ...l,
        plan: value
      } : l))
        setLeadToUpdatePlan(null)
    }
  return {updatePlan, leadToUpdatePlan, setLeadToUpdatePlan}
}
