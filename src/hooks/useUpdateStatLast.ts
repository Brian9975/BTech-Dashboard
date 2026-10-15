import { useState } from "react";
import { dbPromise } from "../config/indexedDB-config";
import { useAuth } from "../context/AuthContext";
import { useLead } from "../context/LeadContext";
import type { LeadsInterface } from "../types/LeadsInterface";
import useSyncData from "./useSyncData";
import useHandleToast from "./useHandleToast";


export default function useUpdateStatLast() {
  
  const [leadToUpdate, setLeadToUpdate] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false)
  const {leads, setLeads} = useLead()
  const {user} = useAuth()
  const [errorToastDisplay, errorToastMessage, handleToast] = useHandleToast() as [
        boolean, 
        string,
        (message: string) => void,
      ]
  const {handleAllSync} = useSyncData()

  const activeLeads = leads.filter(l => l.userId === user!.uid)
  const updateStatLastCont = async () => {
    const db = await dbPromise;

    try {

      const data = await db.get(
        "leads",
        leadToUpdate as IDBKeyRange | IDBValidKey,
      );
  
      if (data.stage == "Contacted") {
        data.stage = "Follow up 1 after Contact";
        data.lastContacted = new Date();
      } else if (data.stage == "Follow up 1 after Contact") {
        data.stage = "Last Follow up after Contact";
        data.lastContacted = new Date();
      } else if (data.stage == "Preview Sent") {
        data.stage = "Follow up 1 after Preview";
        data.lastContacted = new Date();
      } else if (data.stage == "Follow up 1 after Preview") {
        data.stage = "Last Follow up after Preview";
        data.lastContacted = new Date();
      } else if (data.stage == "Price Sent") {
        data.stage = "Follow up 1 after Price";
        data.lastContacted = new Date();
      } else if (data.stage == "Follow up 1 after Price") {
        data.stage = "Last Follow up after Price";
        data.lastContacted = new Date();
      } else if (data.stage.includes("Last Follow up")) {
        data.stage = "Dead";
      } else if (data.stage.includes("Checklist Sent")) {
        data.stage = "Follow up after Checklist";
        data.lastContacted = new Date();
      } else if (data.stage.includes("New")) {
        data.stage = "Contacted";
        data.lastContacted = new Date();
      }
      data.lastModified = Date.now()
      await db.put("leads", data);
  
   
     setLeads(activeLeads.map((l) => {
        if (l.id === leadToUpdate) {
          if (l.stage === "Contacted") {
  
            return {
              ...l,
              stage: "Follow up 1 after Contact",
              lastContacted: new Date(),
            }
          } else if (l.stage == "Follow up 1 after Contact") {
        return {
          ...l,
          stage:"Last Follow up after Contact",
        lastContacted:new Date(),}
      } else if (l.stage == "Preview Sent") {
        return{
          
          ...l,
          stage:"Follow up 1 after Preview",
        lastContacted:new Date(),}
      } else if (l.stage == "Follow up 1 after Preview") {
        return{
          ...l,
          stage:"Last Follow up after Preview",
        lastContacted:new Date(),}
      } else if (l.stage == "Price Sent") {
        return{
          ...l,
          stage:"Follow up 1 after Price",
        lastContacted:new Date(),}
      } else if (l.stage == "Follow up 1 after Price") {
       return{
        ...l,
        stage:"Last Follow up after Price",
        lastContacted:new Date(),}
      } else if (l.stage.includes("Last Follow up")) {
        return{
          ...l,
          stage:"Dead",}
      } else if (l.stage.includes("Checklist Sent")) {
       return{ 
        ...l,
        stage:"Follow up after Checklist",
        lastContacted:new Date(),}
      } else if (l.stage.includes("New")) {
        return{
          ...l,
          stage:"Contacted",
        lastContacted:new Date(),}
      }
        } else {
  
          return l
        }
     }) as LeadsInterface[])
      setShowToast(true)
      setTimeout(() => {
       setShowToast(false)
      }, 3000)
    } catch (err) {
      handleToast("An Error Occurd while completing lead! Please try again")
    } finally {
      setLeadToUpdate(null);
      handleAllSync()
    }

  };
  return { errorToastDisplay, errorToastMessage , updateStatLastCont, leadToUpdate, setLeadToUpdate, showToast };
}
