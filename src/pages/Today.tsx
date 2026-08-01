import { MoveRight, MoveDown } from "lucide-react";
import useAutoCheckLead from "../hooks/useAutoCheckLead";
import { useLead } from "../context/LeadContext";
import useDateFormater from "../hooks/useDateFormater";
import useUpdateStatLast from "../hooks/useUpdateStatLast";

export default function Today() {
  const { checkDaysPassed } = useAutoCheckLead();
  const { leads } = useLead();
  const {formatAnyDate} = useDateFormater()
  const {updateStatLastCont, leadToUpdate, setLeadToUpdate} = useUpdateStatLast()
  return (
    <div>
      <h1 className="font-bold text-xl">Welcome to the todays screen Brian,</h1>

      <main className="flex md:flex-row flex-col items-center my-10 justify-start gap-4">
        <div className="border text-lg  border-green-600 rounded-lg p-2">
          Here is what you will be working on today
        </div>

        <div>
          <MoveDown className="md:hidden" size={71} />
          <MoveRight className="hidden md:block" size={75} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          { 
        leads.map(l => ((checkDaysPassed(l.lastContacted) >= 2 ) && (l.stage == "Contacted" ))   &&
             (      
          <div key={l.id} className="border border-red-600 rounded-lg p-4 flex flex-col items-center gap-4">
            <div>
              <h1 className="font-bold textlg">{l.name}</h1>
            </div>
            <div className="border w-max rounded-lg p-2 border-red-600">
              No contact in {checkDaysPassed(l.lastContacted).toFixed()} days
            </div>
            <div>
              <p className="border-green-600 border p-2 rounded-lg">
                Follow up 1 after contact
              </p>
            </div>
            <div>
              <p className="font-bold ">{l.stage}</p>
            </div>
            <div>
              <p className="bg-amber-600 w-max text-slate-950 rounded-lg font-bold p-2">
                LC: {formatAnyDate(l.lastContacted)}
              </p>
            </div>
            <div>
              <button onClick={() => setLeadToUpdate(l.id)} className="cursor-pointer bg-blue-600 rounded-lg p-1 text-slate-950">
                Complete
              </button>
            </div>
          </div>))

             }

{
        leads.map(l => ((checkDaysPassed(l.lastContacted) >= 4 ) && (l.stage == "Follow up 1 after Contact" ))   &&
             (      
          <div key={l.id} className="border border-red-600 rounded-lg p-4 flex flex-col items-center gap-4">
            <div>
              <h1 className="font-bold textlg">{l.name}</h1>
            </div>
            <div className="border w-max rounded-lg p-2 border-red-600">
              No contact in {checkDaysPassed(l.lastContacted).toFixed()} days
            </div>
            <div>
              <p className="border-green-600 w-max border p-2 rounded-lg">
                Final Follow up after Contact
              </p>
            </div>
            <div>
              <p className="font-bold ">{l.stage}</p>
            </div>
            <div>
              <p className="bg-amber-600 w-max text-slate-950 rounded-lg font-bold p-2">
                LC: {formatAnyDate(l.lastContacted)}
              </p>
            </div>
            <div>
              <button onClick={() => setLeadToUpdate(l.id)} className="cursor-pointer bg-blue-600 rounded-lg p-1 text-slate-950">
                Complete
              </button>
            </div>
          </div>))
}




{
 
        leads.map(l => ((checkDaysPassed(l.lastContacted) >= 2 ) && (l.stage == "Preview Sent" ))   &&
             (      
          <div key={l.id} className="border border-red-600 rounded-lg p-4 flex flex-col items-center gap-4">
            <div>
              <h1 className="font-bold textlg">{l.name}</h1>
            </div>
            <div className="border w-max rounded-lg p-2 border-red-600">
              No contact in {checkDaysPassed(l.lastContacted).toFixed()} days
            </div>
            <div>
              <p className="border-green-600 border p-2 rounded-lg">
                Follow up 1 after Preview
              </p>
            </div>
            <div>
              <p className="font-bold ">{l.stage}</p>
            </div>
            <div>
              <p className="bg-amber-600 w-max text-slate-950 rounded-lg font-bold p-2">
                LC: {formatAnyDate(l.lastContacted)}
              </p>
            </div>
            <div>
              <button onClick={() => setLeadToUpdate(l.id)} className="cursor-pointer bg-blue-600 rounded-lg p-1 text-slate-950">
                Complete
              </button>
            </div>
          </div>)) 
}

{

        leads.map(l => ((checkDaysPassed(l.lastContacted) >= 2 ) && (l.stage == "Follow up 1 after Preview" ))   &&
             (      
          <div key={l.id} className="border border-red-600 rounded-lg p-4 flex flex-col items-center gap-4">
            <div>
              <h1 className="font-bold textlg">{l.name}</h1>
            </div>
            <div className="border w-max rounded-lg p-2 border-red-600">
              No contact in {checkDaysPassed(l.lastContacted).toFixed()} days
            </div>
            <div>
              <p className="border-green-600 w-max border p-2 rounded-lg">
                Final Follow up after Preview
              </p>
            </div>
            <div>
              <p className="font-bold ">{l.stage}</p>
            </div>
            <div>
              <p className="bg-amber-600 w-max text-slate-950 rounded-lg font-bold p-2">
                LC: {formatAnyDate(l.lastContacted)}
              </p>
            </div>
            <div>
              <button onClick={() => setLeadToUpdate(l.id)} className="cursor-pointer bg-blue-600 rounded-lg p-1 text-slate-950">
                Complete
              </button>
            </div>
          </div>))
}

{


        leads.map(l => ((checkDaysPassed(l.lastContacted) >= 2 ) && (l.stage == "Price Sent" ))   &&
             (      
          <div key={l.id} className="border border-red-600 rounded-lg p-4 flex flex-col items-center gap-4">
            <div>
              <h1 className="font-bold textlg">{l.name}</h1>
            </div>
            <div className="border w-max rounded-lg p-2 border-red-600">
              No contact in {checkDaysPassed(l.lastContacted).toFixed()} days
            </div>
            <div>
              <p className="border-green-600 w-max border p-2 rounded-lg">
                Follow up 1 after Price
              </p>
            </div>
            <div>
              <p className="font-bold ">{l.stage}</p>
            </div>
            <div>
              <p className="bg-amber-600 w-max text-slate-950 rounded-lg font-bold p-2">
                LC: {formatAnyDate(l.lastContacted)}
              </p>
            </div>
            <div>
              <button onClick={() => setLeadToUpdate(l.id)} className="cursor-pointer bg-blue-600 rounded-lg p-1 text-slate-950">
                Complete
              </button>
            </div>
          </div>))
}

{

        leads.map(l => ((checkDaysPassed(l.lastContacted) >= 2 ) && (l.stage == "Follow up 1 after Price" ))   &&
             (      
          <div key={l.id} className="border border-red-600 rounded-lg p-4 flex flex-col items-center gap-4">
            <div>
              <h1 className="font-bold textlg">{l.name}</h1>
            </div>
            <div className="border w-max rounded-lg p-2 border-red-600">
              No contact in {checkDaysPassed(l.lastContacted).toFixed()} days
            </div>
            <div>
              <p className="border-green-600 w-max border p-2 rounded-lg">
                Final Follow up after Price
              </p>
            </div>
            <div>
              <p className="font-bold ">{l.stage}</p>
            </div>
            <div>
              <p className="bg-amber-600 w-max text-slate-950 rounded-lg font-bold p-2">
                LC: {formatAnyDate(l.lastContacted)}
              </p>
            </div>
            <div>
              <button onClick={() => setLeadToUpdate(l.id)} className="cursor-pointer bg-blue-600 rounded-lg p-1 text-slate-950">
                Complete
              </button>
            </div>
          </div>))
}

{

        leads.map(l => ((checkDaysPassed(l.lastContacted) >= 1 ) && (l.stage == "Checklist Sent" ))   &&
             (      
          <div key={l.id} className="border border-red-600 rounded-lg p-4 flex flex-col items-center gap-4">
            <div>
              <h1 className="font-bold textlg">{l.name}</h1>
            </div>
            <div className="border w-max rounded-lg p-2 border-red-600">
              No contact in {checkDaysPassed(l.lastContacted).toFixed()} days
            </div>
            <div>
              <p className="border-green-600 w-max border p-2 rounded-lg">
                Follow up after Checklist
              </p>
            </div>
            <div>
              <p className="font-bold ">{l.stage}</p>
            </div>
            <div>
              <p className="bg-amber-600 w-max text-slate-950 rounded-lg font-bold p-2">
                LC: {formatAnyDate(l.lastContacted)}
              </p>
            </div>
            <div>
              <button onClick={() => setLeadToUpdate(l.id)} className="cursor-pointer bg-blue-600 rounded-lg p-1 text-slate-950">
                Complete
              </button>
            </div>
          </div>))
}
        </div>
      </main>

      {/* Confirmation To Update Modal */}
      {leadToUpdate && <div className="inset-0 bg-black/50 fixed flex justify-center items-center">
      
        <div className="bg-slate-950 shadow-md shadow-slate-600 py-5 px-10 rounded-lg">
          <h1 className="text-lg pt-5 font-bold">Do you want to continue updating lead?</h1>
   
         <div className="flex justify-between mt-5">
          <button onClick={() => setLeadToUpdate(null)} className="bg-slate-50 cursor-pointer text-slate-950 rounded-lg py-1.5 px-5 font-bold">Nope</button><button onClick={updateStatLastCont} className="bg-blue-600 cursor-pointer text-slate-950 rounded-lg py-1.5 px-5 font-bold">Sure</button>
         </div>
        </div>
      </div>}
    </div>
  );
}
