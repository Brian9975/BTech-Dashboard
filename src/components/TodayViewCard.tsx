import React from 'react'
import type { LeadsInterface } from '../types/LeadsInterface'
interface ViewCardProps {
l: LeadsInterface;
checkDaysPassed: (lastC: string | Date) => number;
formatAnyDate: (dateValue: any) => string;
setLeadToUpdate: React.Dispatch<React.SetStateAction<string | null>>;
action: string;
}
export default function TodayViewCard({l, checkDaysPassed, formatAnyDate, setLeadToUpdate, action}: ViewCardProps) {
  return (
    <div key={l.id} className="border border-red-600 rounded-lg p-4 flex flex-col items-center gap-4">
            <div>
              <h1 className="font-bold textlg">{l.name}</h1>
            </div>
            <div className="border w-max rounded-lg p-2 border-red-600">
              No contact in {checkDaysPassed(l.lastContacted).toFixed()} days
            </div>
            <div>
              <p className="border-green-600 border p-2 rounded-lg">
                {action}
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
          </div>
  )
}
