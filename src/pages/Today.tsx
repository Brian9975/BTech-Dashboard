import { MoveRight, MoveDown } from "lucide-react";
import useAutoCheckLead from "../hooks/useAutoCheckLead";
import { useLead } from "../context/LeadContext";
import useDateFormater from "../hooks/useDateFormater";
import useUpdateStatLast from "../hooks/useUpdateStatLast";
import TodayViewCard from "../components/TodayViewCard";

export default function Today() {
  const { checkDaysPassed } = useAutoCheckLead();
  const { leads } = useLead();
  const { formatAnyDate } = useDateFormater();
  const { updateStatLastCont, leadToUpdate, setLeadToUpdate } =
    useUpdateStatLast();
  return (
    <div>
      <h1 className="font-bold text-xl">Welcome to the todays screen Brian,</h1>

      <main className="flex md:flex-row flex-col items-center my-10 justify-start gap-4">
        <div className="border text-lg  border-green-600 rounded-lg p-2">
          Check what you will be working on today right here
        </div>

        <div>
          <MoveDown className="md:hidden" size={71} />
          <MoveRight className="hidden md:block" size={75} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {leads.map((l) =>
            checkDaysPassed(l.lastContacted) >= 2 && l.stage == "Contacted" ? (
              <TodayViewCard
                key={l.id}
                l={l}
                checkDaysPassed={checkDaysPassed}
                formatAnyDate={formatAnyDate}
                setLeadToUpdate={setLeadToUpdate}
                action={"Follow up 1 after contact"}
              />
            ) : checkDaysPassed(l.lastContacted) >= 4 &&
              l.stage == "Follow up 1 after Contact" ? (
              <TodayViewCard
                l={l}
                checkDaysPassed={checkDaysPassed}
                formatAnyDate={formatAnyDate}
                setLeadToUpdate={setLeadToUpdate}
                action={"Final Follow up after Contact"}
              />
            ) : checkDaysPassed(l.lastContacted) >= 2 &&
              l.stage == "Preview Sent" ? (
              <TodayViewCard
                l={l}
                checkDaysPassed={checkDaysPassed}
                formatAnyDate={formatAnyDate}
                setLeadToUpdate={setLeadToUpdate}
                action={"Follow up 1 after Preview"}
              />
            ) : checkDaysPassed(l.lastContacted) >= 2 &&
              l.stage == "Follow up 1 after Preview" ? (
              <TodayViewCard
                l={l}
                checkDaysPassed={checkDaysPassed}
                formatAnyDate={formatAnyDate}
                setLeadToUpdate={setLeadToUpdate}
                action={"Final Follow up after Preview"}
              />
            ) : checkDaysPassed(l.lastContacted) >= 2 &&
              l.stage == "Price Sent" ? (
              <TodayViewCard
                l={l}
                checkDaysPassed={checkDaysPassed}
                formatAnyDate={formatAnyDate}
                setLeadToUpdate={setLeadToUpdate}
                action={"Follow up 1 after Price"}
              />
            ) : checkDaysPassed(l.lastContacted) >= 2 &&
              l.stage == "Follow up 1 after Price" ? (
              <TodayViewCard
                l={l}
                checkDaysPassed={checkDaysPassed}
                formatAnyDate={formatAnyDate}
                setLeadToUpdate={setLeadToUpdate}
                action={"Final Follow up after Price"}
              />
            ) : checkDaysPassed(l.lastContacted) >= 2 &&
              l.stage.includes("Last Follow up") ? (
              <TodayViewCard
                l={l}
                checkDaysPassed={checkDaysPassed}
                formatAnyDate={formatAnyDate}
                setLeadToUpdate={setLeadToUpdate}
                action={"Dead"}
              />
            ) : checkDaysPassed(l.lastContacted) >= 1 &&
              l.stage == "Checklist Sent" ? (
              <TodayViewCard
                l={l}
                checkDaysPassed={checkDaysPassed}
                formatAnyDate={formatAnyDate}
                setLeadToUpdate={setLeadToUpdate}
                action={" Follow up after Checklist"}
              />
            ) : checkDaysPassed(l.dateAdded) >= 1 && l.stage == "New" ? (
              <TodayViewCard
                l={l}
                checkDaysPassed={checkDaysPassed}
                formatAnyDate={formatAnyDate}
                setLeadToUpdate={setLeadToUpdate}
                action={" Send hook message"}
              />
            ) : null,
          )}
        </div>
      </main>

      {/* Confirmation To Update Modal */}
      {leadToUpdate && (
        <div className="inset-0 bg-black/50 fixed flex justify-center items-center">
          <div className="bg-slate-950 shadow-md shadow-slate-600 py-5 px-10 rounded-lg">
            <h1 className="text-lg pt-5 font-bold">
              Do you want to continue updating lead?
            </h1>

            <div className="flex justify-between mt-5">
              <button
                onClick={() => setLeadToUpdate(null)}
                className="bg-slate-50 cursor-pointer text-slate-950 rounded-lg py-1.5 px-5 font-bold"
              >
                Nope
              </button>
              <button
                onClick={updateStatLastCont}
                className="bg-blue-600 cursor-pointer text-slate-950 rounded-lg py-1.5 px-5 font-bold"
              >
                Sure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
