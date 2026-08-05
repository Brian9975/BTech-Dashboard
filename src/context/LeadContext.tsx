import React, { createContext, useContext, useState } from "react";
import type { LeadsInterface } from "../types/LeadsInterface";
import type { LeadContextType } from "../types/LeadsContextType";

const LeadContext = createContext<LeadContextType | null>(null);
export default function LeadContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [leads, setLeads] = useState<LeadsInterface[]>(
    localStorage.getItem("leads")
      ? JSON.parse(localStorage.getItem("leads") as string)
      : [],
  );
  const [businessName, setBusinessName] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [contactNo, setContactNo] = useState<number | string>("");
  const [stage, setStage] = useState("");
  const [lastContacted, setLastContacted] = useState<Date | string>("");
  const [clientPlan, setClientPlan] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Edit States
  const [leadToEdit, setLeadToEdit] = useState<string | null>(null);
  const [editBusinessName, setEditBusinessName] = useState("");
  const [editBusinessCategory, setEditBusinessCategory] = useState("");
  const [editContactNo, setEditContactNo] = useState<number | string>("");
  const [editStage, setEditStage] = useState("");
  const [editClientPlan, setEditClientPlan] = useState("");
  const [editLastContacted, setEditLastContacted] = useState<Date | string>("");
  
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null)
  const saveToStorage = () => {
    localStorage.setItem("leads", JSON.stringify(leads));
  };
  const contextValues = {
    leadToDelete,
    setLeadToDelete,
    leadToEdit,
    setLeadToEdit,
    editBusinessName,
    setEditBusinessName,
    editBusinessCategory,
    setEditBusinessCategory,
    editContactNo,
    setEditContactNo,
    editStage,
    setEditStage,
    editClientPlan,
    setEditClientPlan,
    editLastContacted,
    setEditLastContacted,
    saveToStorage,
    modalIsOpen,
    setModalIsOpen,
    leads,
    setLeads,
    businessName,
    setBusinessName,
    businessCategory,
    setBusinessCategory,
    contactNo,
    setContactNo,
    stage,
    setStage,
    lastContacted,
    setLastContacted,
    clientPlan,
    setClientPlan,
  };

  return <LeadContext value={contextValues}>{children}</LeadContext>;
}
export const useLead = () => {
  const context = useContext(LeadContext);

  if (!context) {
    throw new Error("LeadContext must be within the LeadContextProvider");
  }
  return context;
};
