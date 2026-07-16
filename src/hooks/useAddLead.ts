import { useLead } from '../context/LeadContext'

export default function useAddLead() {

const {businessName, businessCategory, contactNo, stage, clientPlan, lastContacted, setLeads} = useLead()
 const addLead = () => {
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
 }

  return {addLead}
}
