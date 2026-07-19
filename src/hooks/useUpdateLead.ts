import { useLead } from "../context/LeadContext";


export default function useUpdateLead() {
  const {
    leads,
    leadToEdit,
    setLeadToEdit,
    editBusinessName,
    editBusinessCategory,
    editContactNo,
    editStage,
    editClientPlan,
    editLastContacted,
    saveToStorage
  } = useLead();
  
  const updateLead = (e: React.SubmitEvent) => {
 e.preventDefault()
   const leadToEditIndex = leads.findIndex(l => l.id == leadToEdit)

   leads[leadToEditIndex] = {
    ...leads[leadToEditIndex],
    name: editBusinessName,
    category: editBusinessCategory,
    contact: editContactNo,
    stage: editStage,
    plan: editClientPlan,
    lastContacted: editLastContacted
   }
  saveToStorage()
  setLeadToEdit(null)
  };
  return { updateLead };
}
