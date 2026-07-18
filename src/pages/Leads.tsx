import { useLead } from "../context/LeadContext"
import useAddLead from "../hooks/useAddLead"
import useModal from "../hooks/useModal"
interface LeadStageInterface {
  id: number,
  name: string
}
interface BCategory {
 id: number,
 name:string
}
interface PlanInterface {
  id: number,
  name: string,
  amount?: number
}
export default function Leads() {

const {openDialog, closeDialog} = useModal()
const {businessName, setBusinessName, businessCategory, setBusinessCategory, 
     setContactNo, contactNo, setLastContacted, stage, setStage, clientPlan, setClientPlan, leads, modalIsOpen} = useLead()
const {addLead} = useAddLead()    
console.log(leads)
const plan:PlanInterface[] = [
  {
    id: 1,
    name: "Care Plan",
    amount: 2000
  },
   {
    id: 2,
    name: "Growth Plan",
    amount: 3000
  },
  {
    id: 3,
    name: "None"
  } 
]
const bCategoryOption:BCategory[] = [{
  id: 1,
  name: "pharmacy"
}, {
  id: 2,
  name: "restaurant"
}]

const leadStage:LeadStageInterface[]  = [
  {
    id: 1.1,
    name: "New"
  },
  {
    id: 1.2,
    name: "Contacted"
  },
  {
     id: 1.3,
    name: "Replied"
  },
  {
    id: 1.4,
    name: "Preview Sent"
  },
  {
     id: 1.5,
    name: "Price Sent"
  },
  {
     id: 1.6,
    name: "Negotiating"
  },
  {
     id: 1.7,
    name: "Deposit paid"
  },
  {
     id: 1.8,
    name: "Checklist Sent"
  },
  {
    id: 1.9,
    name: "Building Phase",
  },
  {
     id: 2.0,
    name: "Review Phase"
  },
  {
     id: 2.1,
    name: "Payment Complete + Pitch Care Plan"
  },
  {
    id: 2.2,
    name: "Closed + On Plan"
  },
  {
    id:2.3,
    name: "Closed + Off Plan"
  },
  {
     id: 2.4,
    name: "Dead"
  },
  {
    id: 2.5,
    name: "Not Interested"
  }
]


  return (
    <div>
      <div className="text-center">
        <button onClick={openDialog} className="bg-blue-500 md:w-lg shadow-md shadow-slate-800 text-slate-950 font-bold cursor-pointer  rounded-lg py-3 px-5 text-lg">Add Lead</button>
      </div>
      <div className="flex justify-center">
        <input className={`border-slate-600  border my-15 text-lg rounded-lg p-2 placeholder-slate-700 outline-0 md:w-xl`} type="text" placeholder="Search for lead..."/>
      </div>


      {/* Add lead modal */}
      {modalIsOpen && 
      <div onClick={closeDialog} className="fixed flex justify-center items-center bg-black/50 inset-0 z-50">
         <form onSubmit={addLead} onClick={e => e.stopPropagation()} className="bg-slate-900 rounded-2xl p-8 w-md">
           <h3 className="text-center text-lg font-bold text-blue-600 pb-8">Enter Lead's Information</h3>
           <div className="pb-5">
            <label htmlFor="businessName">Business Name :</label>
            <div>
            <input value={businessName} onChange={e => setBusinessName(e.target.value)} id="businessName" type="text" className="border w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg" placeholder="eg. Ahwan Pharmacy" required/>
            </div>
           </div>
           <div className="pb-5">
            <label htmlFor="bCategory">Business Category :</label>
            <div>
            <select value={businessCategory}  onChange={e => setBusinessCategory(e.target.value)} id="bCategory" className={`border ${businessCategory  ? "text-blue-600" : businessCategory == "" ? "text-slate-700" : ""} w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg`} required>
              <option value="" className="bg-slate-950" disabled>Choose Business Category</option>
            {bCategoryOption.map(category => (<option key={category.id} className="bg-slate-950 text-slate-50" value={category.name}>{category.name}</option>))}
            </select>
            </div>
           </div>
            <div className="pb-5">
            <label  htmlFor="contact">Contact :</label>
            <div>
            <input value={contactNo} onChange={e => setContactNo(Number(e.target.value))} id="contact" type="number"  className="border w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg" placeholder="eg. 0711111111" required/>
            </div>
           </div>

            <div className="pb-5">
            <label htmlFor="stage">Lead Stage :</label>
            <div>
            <select value={stage} onChange={e => setStage(e.target.value)} id="stage" className="border w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg" required>
              <option value=""  className="bg-slate-950" disabled>Select Stage</option>
            {leadStage.map(stage => (<option key={stage.id} className={`bg-slate-950 ${stage.id === 1.1 ? "" : stage.id === 1.2 ? "" : stage.id === 1.3 ? "" : stage.id === 1.4 ? "" : stage.id === 1.5 ? "" : stage.id === 1.6 ? "" : stage.id === 1.7 ? "" : stage.id === 1.8 ? "" : stage.id === 1.9 ? "" : stage.id === 2.0 ? "" : stage.id === 2.1 ? "" : stage.id === 2.2 ? "" : stage.id === 2.3 ? "" : ""}`} value={stage.name}>{stage.name}</option>))}
            </select>
            </div>
           </div>


            <div className="pb-5">
            <label htmlFor="stage">Client's Plan :</label>
            <div>
            <select value={clientPlan}  onChange={e => setClientPlan(e.target.value)} id="stage" className={`border w-full border-slate-600 ${clientPlan == "Growth Plan" ? "text-green-600" : clientPlan == "Care Plan" ? "text-amber-600" : clientPlan == "None" ? "text-gray-500" : "text-slate-700"} p-2 outline-0 placeholder-slate-700  rounded-lg`} required>
              <option value="" className="bg-slate-950" disabled>Clients Plan</option>
            {plan.map(p => <option className="bg-slate-950 text-slate-50" key={p.id} value={p.name}>{p.name}</option>)}
            </select>
            </div>
           </div>

            <div className="pb-5">
            <label htmlFor="lastContactDate">Last Contact Date :</label>
            <div>
            <input  disabled={stage == "New"} onChange={(e) => setLastContacted(e.target.value)} id="lastContactDate" type="date" className={`border ${stage == "New" ? "text-slate-700" : ""} w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg `} required/>
            </div>
           </div>

           <div className="pt-5 flex justify-between">
            <button onClick={closeDialog} type="button" className="bg-slate-50 cursor-pointer text-slate-950 py-2 px-8 font-bold rounded-md">Cancel</button><button type="submit" className="bg-blue-600 cursor-pointer text-slate-50 py-2 px-8 font-bold rounded-md">Save</button>
           </div>
         </form>
      </div>
}


    </div>
  )
}
