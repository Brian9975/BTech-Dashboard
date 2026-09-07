import { MoveRight, MoveDown, CheckCircleIcon, PartyPopper } from "lucide-react";
import useAutoCheckLead from "../hooks/useAutoCheckLead";
import { useLead } from "../context/LeadContext";
import useDateFormater from "../hooks/useDateFormater";
import useUpdateStatLast from "../hooks/useUpdateStatLast";
import TodayViewCard from "../components/TodayViewCard";


export default function Today() {
  
  const { checkDaysPassed } = useAutoCheckLead();
  const {isLoading, flaggedLeads } = useLead();
  const { formatAnyDate } = useDateFormater();
  const { updateStatLastCont, leadToUpdate, setLeadToUpdate, showToast } =
    useUpdateStatLast();



  return (
    <div>
      <h1 className="font-bold text-xl">Welcome to the todays screen Brian,</h1>

     <div className={"flex justify-center my-30"}>
{isLoading ? <div><h1>Loading...</h1></div> : flaggedLeads.length === 0 ?  <div className="dark:bg-slate-900 bg-slate-50  text-[#10B981] rounded-lg py-5 px-10 text-xl flex flex-col items-center justify-center gap-2  shadow-md my-10 shadow-slate-600">
            <PartyPopper size={30} />
            <span >Today you are free, no leads to follow up with!</span>
          </div> :
      <main className="flex md:flex-row flex-col items-center my-10 justify-start gap-4">
        <div className="border text-lg  border-green-600 rounded-lg p-2">
          Check what you will be working on today right here
        </div>

        <div>
          <MoveDown className="md:hidden" size={71} />
          <MoveRight className="hidden md:block" size={75} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {flaggedLeads.map((l) => (
            <TodayViewCard
              key={l.lead.id}
              l={l.lead}
              checkDaysPassed={checkDaysPassed}
              formatAnyDate={formatAnyDate}
              setLeadToUpdate={setLeadToUpdate}
              action={l.action as string}
            />
          ))}
        </div>
      </main>}
</div>
      {/* Confirmation To Update Modal */}
      {leadToUpdate && (
        <div className="inset-0 bg-black/50 z-50 fixed flex justify-center items-center">
          <div className="dark:bg-slate-950 bg-slate-100 shadow-md shadow-slate-600 py-5 px-10 rounded-lg">
            <h1 className="text-lg pt-5 font-bold">
              Do you want to continue updating lead?
            </h1>

            <div className="flex justify-between mt-5">
              <button
                onClick={() => setLeadToUpdate(null)}
                className="dark:bg-slate-100 bg-slate-950 text-slate-100  cursor-pointer dark:text-slate-950 rounded-lg py-1.5 px-5 font-bold"
              >
                Nope
              </button>
              <button
                onClick={updateStatLastCont}
                className="bg-blue-600 cursor-pointer text-slate-100 dark:text-slate-950 rounded-lg py-1.5 px-5 font-bold"
              >
                Sure
              </button>
            </div>
          </div>
        </div>
      )}


            <div
              className={`bg-slate-50 fixed shadow-md shadow-slate-700 bottom-0 transition-all duration-400 ${showToast ? "right-0" : "-right-100"}  m-5 rounded-lg py-5 px-4 text-center text-slate-950`}
            >
              <p className="flex items-center gap-2">
                <CheckCircleIcon className="text-green-800" />
                <span className="font-light text-lg">Lead Updated Successfully!</span>
              </p>
            </div>
    </div>
  );
}
