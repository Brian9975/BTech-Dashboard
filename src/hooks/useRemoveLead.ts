import { useLead } from "../context/LeadContext"


export default function useRemoveLead() {
const { setLeads, leadToDelete, setLeadToDelete, leads } = useLead()
    const removeLead = () => {
     setLeads(leads.filter(l => l.id != leadToDelete))
     setLeadToDelete(null)
    }

  return {removeLead}
}
