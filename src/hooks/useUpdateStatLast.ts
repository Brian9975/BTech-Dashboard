import { useState } from "react"
import { useLead } from "../context/LeadContext"

export default function useUpdateStatLast() {
const {setLeads, leads} = useLead()
const [leadToUpdate, setLeadToUpdate] = useState<string | null>(null)
    const updateStatLastCont = () => {
      setLeads(leads.map(l => l.id == leadToUpdate && l.stage == "Contacted" ? {
      ...l,
      stage: "Follow up 1 after Contact",
      lastContacted: new Date()
      } : l.id == leadToUpdate && l.stage == "Follow up 1 after Contact" ? {
        ...l,
        stage: "Last Follow up after Contact",
        lastContacted: new Date()
      } : l.id == leadToUpdate && l.stage == "Preview Sent" ? {
       ...l,
       stage: "Follow up 1 after Preview",
       lastContacted: new Date()
      } : l.id == leadToUpdate && l.stage == "Follow up 1 after Preview" ? {
       ...l,
       stage: "Last Follow up after Preview",
       lastContacted: new Date()
      } : l.id == leadToUpdate && l.stage == "Price Sent" ? {
       ...l,
       stage: "Follow up 1 after Price",
       lastContacted: new Date()
      } : l.id == leadToUpdate && l.stage == "Follow up 1 after Price" ? {
       ...l,
       stage: "Last Follow up after Price",
       lastContacted: new Date()
      } : l.id == leadToUpdate && l.stage.includes("Last Follow up")? {
       ...l,
       stage: "Dead",
      }  : l.id == leadToUpdate && l.stage.includes("Checklist Sent")? {
       ...l,
       stage: "Follow up after Checklist",
       lastContacted: new Date()
      }   : l.id == leadToUpdate && l.stage.includes("New")? {
       ...l,
       stage: "Contacted",
       lastContacted: new Date()
      } : l
      ))

      setLeadToUpdate(null)
    }
  return {updateStatLastCont, leadToUpdate, setLeadToUpdate}
}
