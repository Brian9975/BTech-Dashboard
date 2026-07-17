import type React from 'react'
import { useLead } from '../context/LeadContext'
import useSaveToStorage from './useSaveToStorage'

export default function useAddLead() {

const {businessName, businessCategory, contactNo, stage, clientPlan, lastContacted, setLeads} = useLead()
const {saveToStorage} = useSaveToStorage()
 const addLead = (e: React.SubmitEvent) => {
 e.preventDefault()
    const leadInfo = {
       name: businessName,
       category: businessCategory,
       contact: contactNo,
       stage,
       plan:clientPlan,
       lastContacted,
       dateAdded: new Date(),
       notes: "",
       earningsFromLead: 0
    }

    setLeads(prev => ([...prev, leadInfo]))
    saveToStorage()
 }

  return {addLead}
}
