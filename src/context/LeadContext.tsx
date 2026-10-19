import React, { createContext, useContext, useState, useEffect } from "react";
import type { LeadsInterface } from "../types/LeadsInterface";
import type { LeadContextType } from "../types/LeadsContextType";
import { getDb } from "../config/indexedDB-config";
import useAutoCheckLead from "../hooks/useAutoCheckLead";
import useGetFlaggedAction from "../hooks/useGetFlaggedAction";

const LeadContext = createContext<LeadContextType | null>(null);
export default function LeadContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [leads, setLeads] = useState<LeadsInterface[]>(
    // localStorage.getItem("leads")
    //   ? JSON.parse(localStorage.getItem("leads") as string)
    //   : [],
    []
  );

  const [isLoading, setIsLoading] = useState(true)
  // const {addLead} = useAddLead()
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

  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
  const {checkDaysPassed} = useAutoCheckLead()
  const {getFlaggedAction} = useGetFlaggedAction()
  const saveToStorage = () => {
    localStorage.setItem("leads", JSON.stringify(leads));
  };


  const flaggedLeads = leads?.map((l) => ({ lead: l, action: getFlaggedAction(l, checkDaysPassed) }))
    .filter((l) => l.action !== null);
  const contextValues = {
    flaggedLeads,
    isLoading,
    setIsLoading,
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

  
      const getAllLeads = async () => {
        const db = await getDb()
        const data = await db?.getAll("leads")
        setLeads(data as LeadsInterface[])
        setIsLoading(false)
      }
 useEffect(() => {
    
      getAllLeads()
      
  }, []);
  return <LeadContext value={contextValues}>{children}</LeadContext>;
}
export const useLead = () => {
  const context = useContext(LeadContext);

  if (!context) {
    throw new Error("LeadContext must be within the LeadContextProvider");
  }
  return context;
};
