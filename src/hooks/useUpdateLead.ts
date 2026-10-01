import { useLead } from "../context/LeadContext";
import { dbPromise } from "../config/indexedDB-config";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
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
    leads,
    setLeads,
  } = useLead();
  const {user} = useAuth()
const activeLeads = leads.filter(l => l.userId === user!.uid && !l.isDeleted )
  const updateLead = async (e: React.SubmitEvent) => {
    e.preventDefault();


const db = await dbPromise;
const leadObject = await db.get("leads", leadToEdit as IDBKeyRange | IDBValidKey)
leadObject.name = editBusinessName
leadObject.category = editBusinessCategory
leadObject.contact = editContactNo
leadObject.stage = editStage
leadObject.plan = editClientPlan
leadObject.lastContacted = editLastContacted
leadObject.lastModified = Date.now()

await db.put("leads", leadObject)

    setLeads(activeLeads.map(l => l.id == leadToEdit ? ({
      ...l,
      name: editBusinessName,
      category: editBusinessCategory,
      contact: editContactNo,
      stage: editStage,
      plan: editClientPlan,
      lastContacted: editLastContacted,

    }) : l))
    setShowUpdateToast(true)
    setTimeout(() => {
      setShowUpdateToast(false)
    }, 3000)
    setLeadToEdit(null);
  };
  return { updateLead, showUpdateToast, setShowUpdateToast };
}
