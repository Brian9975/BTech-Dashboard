import type React from "react";
import { useLead } from "../context/LeadContext";

import useModal from "./useModal";

export default function useAddLead() {
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
    setLeads,
  } = useLead();

  const { closeDialog } = useModal();
  const addLead = (e: React.SubmitEvent) => {
    e.preventDefault();
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

    setLeads((prev) => [...prev, leadInfo]);

    closeDialog();

    setBusinessName("");
    setBusinessCategory("");
    setContactNo("");
    setStage("");
    setClientPlan("");
  };

  return { addLead };
}
