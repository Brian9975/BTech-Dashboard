import React from "react"
import type { LeadStageInterface, PlanInterface, BCategory } from "../types/planStageCateg";
interface AddLeadFormProps {
    closeDialog: () => void;
    addLead: (e: React.SubmitEvent<Element>) => void;
    businessName: string;
    setBusinessName: React.Dispatch<React.SetStateAction<string>>;
    businessCategory: string;
    setBusinessCategory: React.Dispatch<React.SetStateAction<string>>
    bCategoryOption: BCategory[];
    contactNo: string | number;   
    setContactNo: React.Dispatch<React.SetStateAction<string | number>>;
    stage: string;
    setStage: React.Dispatch<React.SetStateAction<string>>;
    leadStage: LeadStageInterface[];
    plan: PlanInterface[];
    clientPlan: string;
    setClientPlan: React.Dispatch<React.SetStateAction<string>>;
    setLastContacted: React.Dispatch<React.SetStateAction<string | Date>>;
    showToast: () => void;
    hideToast: () => void;
}
export default function AddLeadForm({closeDialog,showToast, hideToast, addLead, businessName, setBusinessName, 
    businessCategory, setBusinessCategory, bCategoryOption,
     contactNo, setContactNo, stage, setStage, leadStage, 
     plan, clientPlan, setClientPlan, setLastContacted}: AddLeadFormProps) {
  return (
    <div
          onClick={closeDialog}
          className="fixed flex justify-center items-center bg-black/50 inset-0 z-50"
        >
          <form
            onSubmit={(e) => {
              addLead(e)
              showToast()
              setTimeout(() => {
                 hideToast()
              }, 3000)
            }}
            onClick={(e) => e.stopPropagation()}
            className="dark:bg-slate-900 bg-slate-50 rounded-2xl p-8 w-md"
          >
            <h3 className="text-center text-lg font-bold text-blue-600 pb-8">
              Enter Lead's Information
            </h3>
            <div className="pb-5">
              <label htmlFor="businessName">Business Name :</label>
              <div>
                <input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  id="businessName"
                  type="text"
                  className="border w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg"
                  placeholder="eg. Ahwan Pharmacy"
                  required
                />
              </div>
            </div>
            <div className="pb-5">
              <label htmlFor="bCategory">Business Category :</label>
              <div>
                <select
                  value={businessCategory}
                  onChange={(e) => setBusinessCategory(e.target.value)}
                  id="bCategory"
                  className={`border ${businessCategory ? "text-blue-600" : businessCategory == "" ? "text-slate-700" : ""} w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg`}
                  required
                >
                  <option value="" className="dark:bg-slate-950 bg-slate-100" disabled>
                    Choose Business Category
                  </option>
                  {bCategoryOption.map((category) => (
                    <option
                      key={category.id}
                      className="dark:bg-slate-950 bg-slate-100 text-slate-950 dark:text-slate-100"
                      value={category.name}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="pb-5">
              <label htmlFor="contact">Contact :</label>
              <div>
                <input
                  value={contactNo}
                  onChange={(e) => setContactNo(Number(e.target.value))}
                  id="contact"
                  type="number"
                  className="border w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg"
                  placeholder="eg. 0711111111"
                  required
                />
              </div>
            </div>

            <div className="pb-5">
              <label htmlFor="stage">Lead Stage :</label>
              <div>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  id="stage"
                  className="border w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg"
                  required
                >
                  <option value="" className="dark:bg-slate-950 bg-slate-100" disabled>
                    Select Stage
                  </option>
                  {leadStage.map((stage) => (
                    <option
                      key={stage.id}
                      className={`dark:bg-slate-950 bg-slate-100 ${stage.id === 1.1 ? "" : stage.id === 1.2 ? "" : stage.id === 1.3 ? "" : stage.id === 1.4 ? "" : stage.id === 1.5 ? "" : stage.id === 1.6 ? "" : stage.id === 1.7 ? "" : stage.id === 1.8 ? "" : stage.id === 1.9 ? "" : stage.id === 2.0 ? "" : stage.id === 2.1 ? "" : stage.id === 2.2 ? "" : stage.id === 2.3 ? "" : ""}`}
                      value={stage.name}
                    >
                      {stage.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pb-5">
              <label htmlFor="plan">Client's Plan :</label>
              <div>
                <select
                  value={clientPlan}
                  onChange={(e) => setClientPlan(e.target.value)}
                  id="plan"
                  className={`border w-full border-slate-600 ${clientPlan == "Growth Plan" ? "text-green-500" : clientPlan == "Care Plan" ? "text-amber-500" : clientPlan == "None" ? "text-gray-500" : "text-slate-700"} p-2 outline-0 placeholder-slate-700  rounded-lg`}
                  required
                >
                  <option value="" className="dark:bg-slate-950 bg-slate-100" disabled>
                    Clients Plan
                  </option>
                  {plan.map((p) => (
                    <option
                      className="dark:bg-slate-950 bg-slate-100 text-slate-950 text-slate-100"
                      key={p.id}
                      value={p.name}
                    >
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pb-5">
              <label htmlFor="lastContactDate">Last Contact Date :</label>
              <div>
                <input
                  disabled={stage == "New"}
                  onChange={(e) => setLastContacted(e.target.value)}
                  id="lastContactDate"
                  type="date"
                  className={`border ${stage == "New" ? "text-slate-700" : ""} w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg `}
                  required
                />
              </div>
            </div>

            <div className="pt-5 flex justify-between">
              <button
                onClick={closeDialog}
                type="button"
                className="bg-slate-50 cursor-pointer dark:text-slate-950 text-slate-100 py-2 px-8 font-bold rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 cursor-pointer dark:text-slate-100 text-slate-950 py-2 px-8 font-bold rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
  )
}
