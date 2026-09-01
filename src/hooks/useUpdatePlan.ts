import  { useState } from 'react'
// import { useLead } from '../context/LeadContext'
import { dbPromise } from '../config/indexedDB-config'

export default function useUpdatePlan() {
const [leadToUpdatePlan, setLeadToUpdatePlan] = useState<string | null>(null)
// const {leads, setLeads} = useLead()
    const updatePlan = async (value: string) => {
     const db = await dbPromise
     const data = await db.get("leads", leadToUpdatePlan as IDBKeyRange | IDBValidKey)
     data.plan = value
     await db.put("leads", data)
      
      // setLeads(leads.map(l => l.id == leadToUpdatePlan ? {
      //   ...l,
      //   plan: value
      // } : l))
        setLeadToUpdatePlan(null)
    }
  return {updatePlan, leadToUpdatePlan, setLeadToUpdatePlan}
}
