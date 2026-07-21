import React, { createContext, useContext, useState } from "react";

interface LeadsInterface {
  id: string;
  name: string;
  category: string;
  contact: number | string;
  stage: string;
  plan: string;
  lastContacted: Date | string;
  dateAdded: Date;
  notes: string;
  earningsFromLead: number;
}

interface LeadContextType {
  businessName: string;
  setBusinessName: React.Dispatch<React.SetStateAction<string>>;
  businessCategory: string;
  setBusinessCategory: React.Dispatch<React.SetStateAction<string>>;
  contactNo: number | string;
  setContactNo: React.Dispatch<React.SetStateAction<number | string>>;
  stage: string;
  setStage: React.Dispatch<React.SetStateAction<string>>;
  lastContacted: Date | string;
  setLastContacted: React.Dispatch<React.SetStateAction<Date | string>>;
  leads: LeadsInterface[];
  setLeads: React.Dispatch<React.SetStateAction<LeadsInterface[]>>;
  clientPlan: string;
  setClientPlan: React.Dispatch<React.SetStateAction<string>>;
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  saveToStorage: () => void;
  leadToEdit: string | null;
  setLeadToEdit: React.Dispatch<React.SetStateAction<string | null>>;
  leadToDelete: string | null;
  setLeadToDelete: React.Dispatch<React.SetStateAction<string | null>>;
  editBusinessName: string;
  setEditBusinessName: React.Dispatch<React.SetStateAction<string>>;
  editBusinessCategory: string;
  setEditBusinessCategory: React.Dispatch<React.SetStateAction<string>>;
  editContactNo: number | string;
  setEditContactNo: React.Dispatch<React.SetStateAction<number | string>>;
  editStage: string;
  setEditStage: React.Dispatch<React.SetStateAction<string>>;
  editClientPlan: string;
  setEditClientPlan: React.Dispatch<React.SetStateAction<string>>;
  editLastContacted: Date | string;
  setEditLastContacted: React.Dispatch<React.SetStateAction<Date | string>>;
}
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
