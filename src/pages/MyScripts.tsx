// import useCopyToClipboard from "../hooks/useCopyToClipboard";

import type { BCategory } from "../types/planStageCateg";

// import { scriptData } from "../ScriptData";
export default function MyScripts() {
// const {copyText, scriptCopied} = useCopyToClipboard()
 const scriptTitleOption: string[] = [
   "Hook A",
   "Hook B",
   "Hook C",
   "Hook Follow-up 1",
   "Hook Last Follow-up",
   "Preview A",
   "Preview B",
   "Preview C",
   "Preview Follow-up 1",
   "Preview Last Follow-up",
   "Price Inquiry A",
   "Price Inquiry B",
   "Price Inquiry C",
   "Price Follow-up 1",
   "Price Last Follow-up",
   "Payment Details",
   "Checklist after Deposit",
   "Handover",
   "Final Payment + Care Plan Pitch",
 ]

const bCategoryOption: BCategory[] = [
    {
      id: 1,
      name: "pharmacy",
    },
    {
      id: 2,
      name: "Construction Company"
    },
    {
      id: 3,
      name: "restaurant",
    },
  ];


  return (
    <div className="">

      <div className="flex justify-end">
        <button className="bg-blue-600 rounded-lg cursor-pointer text-slate-100 cursor-pointer dark:text-slate-950 py-2 px-4 text-lg font-bold">Add Script</button>
      </div>

      {/* Add Script Modal */}
       <div className="fixed flex justify-center items-center inset-0 bg-black/50 z-50">
          <form className="dark:bg-slate-900 bg-slate-50 rounded-2xl p-8 md:w-md">

            <h3 className="text-center text-lg font-bold text-blue-600 pb-8">
              Enter Script Details
            </h3>
             <div>
              <label>Script Title:</label>
              <div>
                <select  className="border w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg">
                  <option value=""  className="dark:bg-slate-950 bg-slate-100" disabled>Select Title</option>
                  {scriptTitleOption.map(t => <option className={`dark:bg-slate-950 bg-slate-100`} value={t}>{t}</option>)}
                </select>
              </div>
             </div>
          </form> 
       </div> 


      <main className="grid  md:grid-cols-3 p-5  grid-cols-1 justify-items-center  gap-10">
        {/* {scriptData.map(sc => (

        <div>
          
          
          <div className="dark:bg-slate-900 bg-slate-50 shadow-md shadow-slate-600 relative px-3 py-5 rounded-lg max-w-75">
            <p className="tracking-wider overflow-auto">{sc.message}</p>

          <div className="flex justify-end pt-4">
            <button onClick={() => copyText(sc.message, sc.id)} className="bg-slate-600 text-slate-100 px-4 py-1 rounded-lg cursor-pointer hover:scale-102 transition-all">{scriptCopied === sc.id ? "Copied ✓" : "Copy"}</button>
          </div>
          <span className="border-blue-600 border left-1/2 top-0 -translate-y-1/2 -translate-x-1/2  absolute py-1 px-2 rounded-lg text-sm text-ellipsis font-bold">{sc.title}</span>
          </div>
        </div>
        ))} */}
      </main>
    </div>
  )
}
