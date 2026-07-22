import  { useState } from 'react'
import { useLead } from '../context/LeadContext'

export default function useUpdateLastContacted(){
    const [leadLastContactedToUpdate, setLeadLastContactedToUpdate] = useState<string | null>(null)
    const [lastContactedValue, setLastContactedValue] = useState<Date | string>("")
    const {leads, setLeads} = useLead()
    const updateLastContacted = () => {
        setLeads(leads.map(l => l.id == leadLastContactedToUpdate ? {
            ...l,
        lastContacted: lastContactedValue
        } : l))
        setLeadLastContactedToUpdate(null)
    }
  return {updateLastContacted,lastContactedValue, leadLastContactedToUpdate, setLeadLastContactedToUpdate, setLastContactedValue}
}
