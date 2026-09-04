import type React from "react";
import { useLead } from "../context/LeadContext";
import { dbPromise } from "../config/indexedDB-config";
import useModal from "./useModal";
import { useState } from "react";


export default function useAddLead() {
  const [loading, setLoading] = useState(false)

  const {
    businessName,
    setBusinessName,
    businessCategory,
    setBusinessCategory,
    contactNo,
    setContactNo,
    stage,
    setStage,
    clientPlan,
    setClientPlan,
    lastContacted,
    
  } = useLead();

  const { closeDialog } = useModal();
  const addLead = async (e: React.SubmitEvent) => {

    try {
    e.preventDefault();
setLoading(true)
    const leadInfo = {
      id: Date.now().toString(),
      name: businessName,
      category: businessCategory,
      contact: contactNo,
      stage,
      plan: clientPlan,
      lastContacted,
      dateAdded: new Date(),
      notes: "",
      earningsFromLead: 0,
    };
   const db = await dbPromise
   await db.add("leads", leadInfo)
   
    // setLeads((prev) => [...prev, leadInfo]);
  } catch (err) {
    console.log("An error occured while adding lead! Please try again")
  } finally {
    setLoading(false)
    closeDialog();

    setBusinessName("");
    setBusinessCategory("");
    setContactNo("");
    setStage("");
    setClientPlan("");
  }

  };

  return { addLead, loading };
}
