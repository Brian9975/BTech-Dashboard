import { useState } from "react"
import { useLead } from "../context/LeadContext"

export default function useUpdateStage() {
const {leads, setLeads} = useLead()
const [leadToUpdateStage, setLeadToUpdateStage] = useState<string | null>(null)
    const updateStage = (value: string) => {
      setLeads(leads.map(l => l.id == leadToUpdateStage ? {
        ...l,
        stage: value
      } : l))

      setLeadToUpdateStage(null)
    }
  return {updateStage, leadToUpdateStage, setLeadToUpdateStage}
}
