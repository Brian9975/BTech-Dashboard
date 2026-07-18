import type React from 'react'
import { useLead } from '../context/LeadContext'
import useSaveToStorage from './useSaveToStorage'
import useModal from './useModal'

export default function useAddLead() {

const {businessName,setBusinessName, businessCategory, setBusinessCategory, contactNo, setContactNo, stage, setStage, clientPlan, setClientPlan, lastContacted, setLeads} = useLead()
const {saveToStorage} = useSaveToStorage()
const {closeDialog} = useModal()
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
    closeDialog()

    setBusinessName("")
    setBusinessCategory("")
    setContactNo("")
    setStage("")
    setClientPlan("")
 }



  return {addLead}
}
