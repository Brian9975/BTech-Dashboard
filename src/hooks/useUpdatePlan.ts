import  { useState } from 'react'
import { useLead } from '../context/LeadContext'

export default function useUpdatePlan() {
const [leadToUpdatePlan, setLeadToUpdatePlan] = useState<string | null>(null)
const {leads, setLeads} = useLead()
    const updatePlan = (value: string) => {
      setLeads(leads.map(l => l.id == leadToUpdatePlan ? {
        ...l,
        plan: value
      } : l))


        setLeadToUpdatePlan(null)
    }
  return {updatePlan, leadToUpdatePlan, setLeadToUpdatePlan}
}
