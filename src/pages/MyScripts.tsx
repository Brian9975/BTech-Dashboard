// import useCopyToClipboard from "../hooks/useCopyToClipboard";

import useAddScript from "../hooks/useAddScript";
import type { BCategory } from "../types/planStageCateg";

// import { scriptData } from "../ScriptData";
export default function MyScripts() {
// const {copyText, scriptCopied} = useCopyToClipboard()
const {modalOpen, setModalOpen, addScript, setScriptMessage, niche, setNiche, scriptTitle, setScriptTitle, scriptMessage} = useAddScript()
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
        <button onClick={() => setModalOpen(true)} className="bg-blue-600 rounded-lg cursor-pointer text-slate-100 cursor-pointer dark:text-slate-950 py-2 px-4 text-lg font-bold">Add Script</button>
      </div>

      {/* Add Script Modal */}
       <div onClick={() => {

         setModalOpen(false)
         
       }} className={`fixed ${modalOpen ? "flex" : "hidden"}  justify-center items-center inset-0 bg-black/50 z-50`}>
          <form onSubmit={addScript} onClick={(e) => e.stopPropagation()} className="dark:bg-slate-900 bg-slate-50 rounded-2xl p-8 md:w-md">

            <h3 className="text-center text-lg font-bold text-blue-600 pb-8">
              Enter Script Details
            </h3>
             <div>
              <label>Script Title:</label>
              <div>
                <select value={scriptTitle} onChange={e => setScriptTitle(e.target.value)}  className="border w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg" required>
                  <option value=""  className="dark:bg-slate-950 bg-slate-100" disabled>Select Title</option>
                  {scriptTitleOption.map(t => <option className={`dark:bg-slate-950 bg-slate-100`} value={t}>{t}</option>)}
                </select>
              </div>
             </div>
             <div className="pt-5">
              <label>Niche:</label>
              <div>
                <select value={niche} onChange={e => setNiche(e.target.value)}  className="border w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg" required>
                  <option value=""  className="dark:bg-slate-950 bg-slate-100" disabled>Select Niche</option>
                  {bCategoryOption.map(c => <option className={`dark:bg-slate-950 bg-slate-100`} value={c.name}>{c.name}</option>)}
                </select>
              </div>
             </div>
             <div className="py-5">
              <label>Message:</label>
              <div>
                 <textarea value={scriptMessage} onChange={e => setScriptMessage(e.target.value)} className="max-h-30 resize-none border w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg" required/>
              </div>
             </div>

             <div><button className="bg-slate-950 transition-all hover:opacity-80 hover:scale-95 text-slate-100 dark:bg-slate-100 dark:text-slate-950 px-3 py-1.5 rounded-lg cursor-pointer  text-lg font-bold w-full">Add</button></div>
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
