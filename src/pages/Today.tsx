import { MoveRight, MoveDown } from "lucide-react";
import useAutoCheckLead from "../hooks/useAutoCheckLead";
import { useLead } from "../context/LeadContext";
import useDateFormater from "../hooks/useDateFormater";

export default function Today() {
  const { checkDaysPassed } = useAutoCheckLead();
  const { leads } = useLead();
  const {formatAnyDate} = useDateFormater()
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
              <p className="border-green-600 w-max border p-2 rounded-lg">
                Send follow up
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
              <button className="cursor-pointer bg-blue-600 rounded-lg p-1 text-slate-950">
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
                Send follow up
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
              <button className="cursor-pointer bg-blue-600 rounded-lg p-1 text-slate-950">
                Complete
              </button>
            </div>
          </div>))
}
        </div>
      </main>
    </div>
  );
}
