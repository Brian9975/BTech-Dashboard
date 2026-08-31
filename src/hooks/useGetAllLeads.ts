import { dbPromise } from "../config/indexedDB-config"
import { useLead } from "../context/LeadContext";

export default function useGetAllLeads() {
   


    const getAllLeads = async () => {
      const db = await dbPromise;
      const data = await db.getAll("leads")
      
    }
  return {getAllLeads}
}
