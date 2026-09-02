import { useState } from "react";
import { dbPromise } from "../config/indexedDB-config";
// import { useLead } from "../context/LeadContext"

export default function useUpdateStatLast() {
  // const {setLeads, leads} = useLead()
  const [leadToUpdate, setLeadToUpdate] = useState<string | null>(null);
  const updateStatLastCont = async () => {
    const db = await dbPromise;
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
    await db.put("leads", data);
    setLeadToUpdate(null);
  };
  return { updateStatLastCont, leadToUpdate, setLeadToUpdate };
}
