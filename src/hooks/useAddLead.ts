import type React from "react";
import { useLead } from "../context/LeadContext";
import { dbPromise } from "../config/indexedDB-config";
import useModal from "./useModal";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import useSyncData from "./useSyncData";
import useHandleToast from "./useHandleToast";


export default function useAddLead() {
  const [loading, setLoading] = useState(false)
  const {user} = useAuth()
  const {setLeads} = useLead()
  const [display, toastMessage, handleToast] = useHandleToast() as [
    boolean, 
    string,
    (message: string) => void,
  ]
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
  const {handleAllSync} = useSyncData()
  const addLead = async (e: React.SubmitEvent) => {
    
    try {
    e.preventDefault();
setLoading(true)
if (!user) return
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
      userId: user.uid,
      lastModified: Date.now(),
      isDeleted: false,
    };
   const db = await dbPromise
   await db.add("leads", leadInfo)
   
   setLeads((prev) => [...prev, leadInfo]);
  } catch (err) {
    handleToast("An error occured while adding lead! Please try again")
  } finally {
    setLoading(false)
    closeDialog();

    setBusinessName("");
    setBusinessCategory("");
    setContactNo("");
    setStage("");
    setClientPlan("");
    handleAllSync()
  }

  };

  return { addLead, loading, display, toastMessage };
}
