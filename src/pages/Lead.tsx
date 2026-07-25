import { Link, useParams } from "react-router-dom"
import { useLead } from "../context/LeadContext"

export default function Lead() {
  const {id} = useParams()
  const {leads} = useLead()

  const leadData = leads.find(l => l.id == id)
 
  return (
    <div>
      <p className="text-right">
      <Link className="text-lg font-bold text-blue-600" to="/leads">Back To Leads</Link>
      </p>
     

     <p>{leadData?.name}</p>
    </div>
  )
}
