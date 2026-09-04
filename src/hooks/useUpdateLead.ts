import { useLead } from "../context/LeadContext";
import { dbPromise } from "../config/indexedDB-config";
import { useState } from "react";
export default function useUpdateLead() {
  const [showUpdateToast, setShowUpdateToast] = useState(false)
  const {
    leadToEdit,
    setLeadToEdit,
    editBusinessName,
    editBusinessCategory,
    editContactNo,
    editStage,
    editClientPlan,
    editLastContacted,
  } = useLead();

  const updateLead = async (e: React.SubmitEvent) => {
    e.preventDefault();
    // const leadToEditIndex = leads.findIndex((l) => l.id == leadToEdit);

    // leads[leadToEditIndex] = {
    //   ...leads[leadToEditIndex],
    //   name: editBusinessName,
    //   category: editBusinessCategory,
    //   contact: editContactNo,
    //   stage: editStage,
    //   plan: editClientPlan,
    //   lastContacted: editLastContacted,
    // };
    // saveToStorage();

const db = await dbPromise;
const leadObject = await db.get("leads", leadToEdit as IDBKeyRange | IDBValidKey)
leadObject.name = editBusinessName
leadObject.category = editBusinessCategory
leadObject.contact = editContactNo
leadObject.stage = editStage
leadObject.plan = editClientPlan
leadObject.lastContacted = editLastContacted

await db.put("leads", leadObject)

    // setLeads(leads.map(l => l.id == leadToEdit ? ({
    //   ...l,
    //   name: editBusinessName,
    //   category: editBusinessCategory,
    //   contact: editContactNo,
    //   stage: editStage,
    //   plan: editClientPlan,
    //   lastContacted: editLastContacted,

    // }) : l))
    setShowUpdateToast(true)
    setTimeout(() => {
      setShowUpdateToast(false)
    }, 3000)
    setLeadToEdit(null);
  };
  return { updateLead, showUpdateToast, setShowUpdateToast };
}
