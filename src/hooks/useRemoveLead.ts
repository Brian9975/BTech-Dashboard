import { useLead } from "../context/LeadContext"
import { dbPromise } from "../config/indexedDB-config"

export default function useRemoveLead() {
const {  leadToDelete, setLeadToDelete} = useLead()
    const removeLead = async () => {
const db = await dbPromise

await db.delete("leads", leadToDelete as IDBKeyRange | IDBValidKey)

    //  setLeads(leads.filter(l => l.id != leadToDelete))
     setLeadToDelete(null)
    }

  return {removeLead}
}
