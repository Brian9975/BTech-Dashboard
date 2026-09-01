import { useEffect, useState } from "react";
import {
  BadgeDollarSign,
  ChartBarIncreasing,
  Contact,
  Handshake,
  HeartHandshake,
  MinusCircle,
  MoveRight,
  TrendingUp,
  UserLock,
} from "lucide-react";
import { leadStage } from "../LeadStage";
import { useLead } from "../context/LeadContext";
import useAddLead from "../hooks/useAddLead";
import useModal from "../hooks/useModal";
import { Link } from "react-router-dom";
import useUpdateLead from "../hooks/useUpdateLead";
import useRemoveLead from "../hooks/useRemoveLead";
import useUpdateStage from "../hooks/useUpdateStage";
import useUpdateLastContacted from "../hooks/useUpdateLastContacted";
import useUpdatePlan from "../hooks/useUpdatePlan";
import useUpdateEarningsFromLead from "../hooks/useUpdateEarningsFromLead";
import useDateFormater from "../hooks/useDateFormater";
import type { PlanInterface, BCategory } from "../types/planStageCateg";
import AddLeadForm from "../components/AddLeadForm";
export default function Leads() {
  const [searchVal, setSearchVal] = useState("");
  const { leadToUpdateStage, setLeadToUpdateStage, updateStage } =
    useUpdateStage();
  const {
    updateLastContacted,
    lastContactedValue,
    setLastContactedValue,
    leadLastContactedToUpdate,
    setLeadLastContactedToUpdate,
  } = useUpdateLastContacted();
  const { updatePlan, leadToUpdatePlan, setLeadToUpdatePlan } = useUpdatePlan();
  const {
    leadToUpdateEarnings,
    setLeadToUpdateEarnings,
    amount,
    setAmount,
    updateEarningsFromLead,
  } = useUpdateEarningsFromLead();
  const { openDialog, closeDialog } = useModal();
  const { formatAnyDate } = useDateFormater();

  const {
    businessName,
    setBusinessName,
    businessCategory,
    setBusinessCategory,
    setContactNo,
    contactNo,
    setLastContacted,
    stage,
    setStage,
    clientPlan,
    setClientPlan,
    leads,
    modalIsOpen,

    leadToEdit,
    setLeadToEdit,
    editBusinessName,
    setEditBusinessName,
    editBusinessCategory,
    setEditBusinessCategory,
    editContactNo,
    setEditContactNo,
    editStage,
    setEditStage,
    editClientPlan,
    setEditClientPlan,
    editLastContacted,
    setEditLastContacted,
    leadToDelete,
    setLeadToDelete,
    isLoading
  } = useLead();
  const { addLead } = useAddLead();
  const { updateLead } = useUpdateLead();
  const { removeLead } = useRemoveLead();

  const leadToEditObject = leads.find((l) => l.id === leadToEdit);
  const leadToUpdateLastContactedObject = leads.find(
    (l) => l.id == leadLastContactedToUpdate,
  );
  const leadToUpdateStageObject = leads.find((l) => l.id === leadToUpdateStage);
  const filteredLeads = leads.filter(
    (l) =>
      l.stage.toLowerCase().includes(searchVal.toLowerCase()) ||
      l.name.toLowerCase().includes(searchVal.toLowerCase()),
  );
  const plan: PlanInterface[] = [
    {
      id: 1,
      name: "Care Plan",
      amount: 2000,
      color: "#0D9488",
      icon: HeartHandshake,
    },
    {
      id: 2,
      name: "Growth Plan",
      amount: 3000,
      color: "#16A34A",
      icon: TrendingUp,
    },
    {
      id: 3,
      name: "None",
      color: "#9CA3AF",
      icon: MinusCircle,
    },
  ];
  const bCategoryOption: BCategory[] = [
    {
      id: 1,
      name: "pharmacy",
    },
    {
      id: 2,
      name: "restaurant",
    },
  ];

  useEffect(() => {
    if (leadToUpdateLastContactedObject) {
      setLastContactedValue(leadToUpdateLastContactedObject.lastContacted);
    }
  }, [leadLastContactedToUpdate]);

  useEffect(() => {
    if (leadToEditObject) {
      setEditBusinessName(leadToEditObject.name);
      setEditBusinessCategory(leadToEditObject.category);
      setEditContactNo(leadToEditObject.contact);
      setEditClientPlan(leadToEditObject.plan);
      setEditStage(leadToEditObject.stage);
      setEditLastContacted(leadToEditObject.lastContacted);
    }
  }, [leadToEdit]);
  // useEffect(() => {
  //   // saveToStorage();
  //     getAllLeads()
  // }, []);
  return (
    <div>
      <div className="text-right">
        <button
          onClick={openDialog}
          className="bg-blue-600  shadow-md text-slate-950 hover:scale-105 transition-all font-bold cursor-pointer  rounded-lg py-2 px-5 text-lg"
        >
          Add Lead
        </button>
      </div>
      {leads.length != 0 && (
        <div className="flex justify-center">
          <input
            onChange={(e) => setSearchVal(e.target.value)}
            className={`border-slate-600  border my-15 text-lg rounded-lg p-2 placeholder-slate-700 outline-0 md:w-xl`}
            type="text"
            placeholder="Search for lead..."
          />
        </div>
      )}

      {/* Add lead modal */}
      {modalIsOpen && (
        <AddLeadForm
          closeDialog={closeDialog}
          addLead={addLead}
          businessName={businessName}
          setBusinessName={setBusinessName}
          businessCategory={businessCategory}
          setBusinessCategory={setBusinessCategory}
          bCategoryOption={bCategoryOption}
          contactNo={contactNo}
          setContactNo={setContactNo}
          stage={stage}
          setStage={setStage}
          leadStage={leadStage}
          plan={plan}
          clientPlan={clientPlan}
          setClientPlan={setClientPlan}
          setLastContacted={setLastContacted}
        />
      )}

      {/* Leads Display */}
      <main className=" flex  overflow-x-auto justify-center gap-10 flex-col items-center">
        {isLoading ? <div><h1>Loading...</h1></div> : leads.length == 0 ? (
          <div className="bg-slate-900 rounded-lg py-5 px-10 text-xl flex flex-col items-center justify-center gap-2  shadow-md my-30 shadow-slate-600">
            <UserLock className="text-blue-600" size={35} />
            <span>No added leads at the moment!</span>
          </div>
        ) : (
          filteredLeads.map((l) => (
            <div
              key={l.id}
              className="flex min-w-max md:gap-6 gap-4 border p-5 border-blue-600 rounded-lg"
            >
              <div className="flex shrink-0 flex-col gap-5">
                <h1 className="md:text-2xl text-lg font-bold">{l.name}</h1>
                <p className="md:text-2xl text-lg text-blue-600">
                  {l.category}
                </p>
                <p className="md:text-lg font-bold">0{l.contact}</p>
                <p className="text-amber-500 text-sm md:text-md">
                  Last Contact :
                  <span className="bg-amber-500  ml-1 text-slate-950 rounded-3xl py-1 px-3 font-bold md:text-md text-xs">
                    {formatAnyDate(l.lastContacted)}
                  </span>
                </p>
              </div>
              <div className="flex  shrink-0 flex-col gap-5">
                <div>
                  <button
                    onClick={() => setLeadToUpdateStage(l.id)}
                    className="bg-slate-400 text-slate-950 cursor-pointer py-1 px-2 rounded-lg md:text-md text-sm  font-bold"
                  >
                    Update Status
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setLeadLastContactedToUpdate(l.id)}
                    className="bg-amber-500  text-slate-950 cursor-pointer py-1 px-2 rounded-lg md:text-md text-sm  font-bold flex justify-center gap-1 items-center"
                  >
                    <span>Update Last </span>
                    <Contact className="hidden md:block" />
                    <Contact size={20} className="md:hidden" />
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setLeadToUpdatePlan(l.id)}
                    className="bg-blue-600 text-slate-950 cursor-pointer py-1 px-2 rounded-lg md:text-md text-sm  font-bold"
                  >
                    Update Plan
                  </button>
                </div>
                <div>
                  <Link
                    to={`/lead/${l.id}`}
                    className="flex gap-2 text-sm md:text-md items-center"
                  >
                    <MoveRight />
                    <span className="text-blue-600 font-bold">Go to Lead</span>
                  </Link>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-5">
                <p className="md:text-lg  font-bold flex items-center gap-1  uppercase">
                  <Handshake />
                  <span className="  max-w-40">{l.stage}</span>
                </p>
                <p className="md:text-lg font-bold flex uppercase items-center gap-1">
                  <ChartBarIncreasing />
                  <span>{l.plan}</span>
                </p>
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => setLeadToUpdateEarnings(l.id)}
                    className="bg-slate-50 px-3 cursor-pointer rounded-lg"
                  >
                    <BadgeDollarSign className="text-slate-950 md:hidden" />
                    <BadgeDollarSign
                      className="text-slate-950 md:block hidden"
                      size={35}
                    />
                  </button>
                  <span className="md:text-sm border text-xs  border-green-500 rounded-3xl py-1 px-3 text-green-500 font-bold">
                    <span className="text-slate-50">TE :</span> Ksh{" "}
                    {l.earningsFromLead}
                  </span>
                </div>
                <div className="flex gap-5">
                  <button
                    onClick={() => setLeadToEdit(l.id)}
                    className="bg-slate-900 cursor-pointer py-1 rounded-lg shadow-md shadow-slate-600 px-4"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setLeadToDelete(l.id)}
                    className="bg-slate-900 py-1 rounded-lg shadow-md shadow-slate-600 cursor-pointer px-4"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </main>

      {/* Edit lead modal */}
      {leadToEdit && (
        <div
          onClick={() => setLeadToEdit(null)}
          className="fixed flex justify-center items-center bg-black/50 inset-0 z-50"
        >
          <form
            onSubmit={updateLead}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 rounded-2xl p-8 w-md"
          >
            <h3 className="text-center text-lg font-bold text-blue-600 pb-8">
              Update Lead's Information
            </h3>
            <div className="pb-5">
              <label htmlFor="businessName">Business Name :</label>
              <div>
                <input
                  value={editBusinessName}
                  onChange={(e) => setEditBusinessName(e.target.value)}
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
                  value={editBusinessCategory}
                  onChange={(e) => setEditBusinessCategory(e.target.value)}
                  id="bCategory"
                  className={`border text-blue-600 w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg`}
                  required
                >
                  <option value="" className="bg-slate-950" disabled>
                    Choose Business Category
                  </option>
                  {bCategoryOption.map((category) => (
                    <option
                      key={category.id}
                      className="bg-slate-950 text-slate-50"
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
                  value={editContactNo}
                  onChange={(e) => setEditContactNo(Number(e.target.value))}
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
                  value={editStage}
                  onChange={(e) => setEditStage(e.target.value)}
                  id="stage"
                  className="border w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg"
                  required
                >
                  <option value="" className="bg-slate-950" disabled>
                    Select Stage
                  </option>
                  {leadStage.map((stage) => (
                    <option
                      key={stage.id}
                      className={`bg-slate-950 ${stage.id === 1.1 ? "" : stage.id === 1.2 ? "" : stage.id === 1.3 ? "" : stage.id === 1.4 ? "" : stage.id === 1.5 ? "" : stage.id === 1.6 ? "" : stage.id === 1.7 ? "" : stage.id === 1.8 ? "" : stage.id === 1.9 ? "" : stage.id === 2.0 ? "" : stage.id === 2.1 ? "" : stage.id === 2.2 ? "" : stage.id === 2.3 ? "" : ""}`}
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
                  value={editClientPlan}
                  onChange={(e) => setEditClientPlan(e.target.value)}
                  id="plan"
                  className={`border w-full border-slate-600 ${editClientPlan == "Growth Plan" ? "text-green-500" : editClientPlan == "Care Plan" ? "text-amber-500" : editClientPlan == "None" ? "text-gray-500" : "text-slate-700"} p-2 outline-0 placeholder-slate-700  rounded-lg`}
                  required
                >
                  <option value="" className="bg-slate-950" disabled>
                    Clients Plan
                  </option>
                  {plan.map((p) => (
                    <option
                      className="bg-slate-950 text-slate-50"
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
                  disabled={editStage == "New"}
                  value={editLastContacted as any}
                  onChange={(e) => setEditLastContacted(e.target.value)}
                  id="lastContactDate"
                  type="date"
                  className={`border ${stage == "New" ? "text-slate-700" : ""} w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg `}
                  required
                />
              </div>
            </div>

            <div className="pt-5 flex justify-between">
              <button
                onClick={() => setLeadToEdit(null)}
                type="button"
                className="bg-slate-50 cursor-pointer text-slate-950 py-2 px-8 font-bold rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 cursor-pointer text-slate-50 py-2 px-8 font-bold rounded-md"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Modal */}
      {leadToDelete && (
        <div className="inset-0 z-50  flex justify-center items-center fixed bg-black/50">
          <div className="bg-slate-950 md:w-lg shadow-md shadow-slate-700 px-10 py-8 rounded-lg text-center">
            <p className="text-lg md:text-xl mb-5 font-bold text-blue-600">
              Complete Deletion!
            </p>
            <div className="flex justify-between gap-20">
              <button
                onClick={() => setLeadToDelete(null)}
                className="bg-slate-900 cursor-pointer rounded-lg font-bold py-2  text-slate-50 md:w-40 md:text-lg w-25"
              >
                Cancel
              </button>
              <button
                onClick={removeLead}
                className="bg-slate-50 cursor-pointer md:text-lg md:w-40  rounded-lg font-bold py-2  text-slate-950 w-25"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Status Dropdown */}
      <div
        onClick={() => setLeadToUpdateStage(null)}
        className={`z-50 fixed inset-0 bg-black/50  ${leadToUpdateStage ? "block " : "hidden"} `}
      >
        {" "}
      </div>
      <div
        className={`fixed  duration-300 z-50 bg-slate-950 py-5 overflow-y-auto  h-100  shadow-md shadow-slate-700   rounded-b-4xl transition-all  ${leadToUpdateStage ? "top-0" : "-top-350"} left-0  right-0`}
      >
        {leadStage.map((s) => (
          <div
            key={s.id}
            onClick={() => updateStage(s.name)}
            className={`font-bold  text-slate-600 ${s.name === leadToUpdateStageObject?.stage && "bg-slate-400"} cursor-pointer px-5 py-3 hover:bg-slate-400 flex justify-center items-center gap-2`}
          >
            <s.icon color={s.color} />
            <span>{s.name}</span>
          </div>
        ))}
      </div>

      {/* Update Last Contacted */}
      <div
        onClick={() => setLeadLastContactedToUpdate(null)}
        className={`z-50 fixed inset-0 bg-black/50  ${leadLastContactedToUpdate ? "block" : "hidden"}`}
      >
        {" "}
      </div>
      <div
        className={`fixed  w-full flex-col gap-10 flex justify-center items-center duration-300 z-50 bg-slate-950 py-5 overflow-y-auto  h-50  shadow-md shadow-slate-700  ${leadLastContactedToUpdate ? "top-0" : "-top-350"}   rounded-b-4xl transition-all left-0  right-0`}
      >
        <input
          value={lastContactedValue as any}
          onChange={(e) => setLastContactedValue(e.target.value)}
          className="w-lg  bg-slate-50 text-lg text-slate-950  border-slate-600 p-2 outline-0  rounded-lg border"
          type="date"
        />
        <button
          onClick={updateLastContacted}
          className="bg-slate-50 py-3 transition-all rounded-lg cursor-pointer font-bold hover:scale-105 w-3xs text-slate-950"
        >
          Save
        </button>
      </div>

      {/* Update Plan */}
      <div
        onClick={() => setLeadToUpdatePlan(null)}
        className={`z-50 fixed inset-0 bg-black/50   ${leadToUpdatePlan ? "block " : "hidden"}`}
      >
        {" "}
      </div>
      <div
        className={`fixed ${leadToUpdatePlan ? "top-0" : "-top-350"} w-full duration-300 z-50 bg-slate-950 py-5 overflow-y-auto  shadow-md shadow-slate-700   rounded-b-4xl transition-all  left-0  right-0`}
      >
        {plan.map((p) => (
          <div
            key={p.id}
            onClick={() => updatePlan(p.name)}
            className="font-bold text-slate-600 cursor-pointer px-5 py-3 hover:bg-slate-400"
          >
            {p.name}
          </div>
        ))}
      </div>

      {/* Update Earnings From Lead */}
      <div
        onClick={() => {
          setLeadToUpdateEarnings(null);
          setAmount(0);
        }}
        className={`z-50 fixed inset-0 bg-black/50   ${leadToUpdateEarnings ? "block" : "hidden"}`}
      >
        {" "}
      </div>
      <div
        className={`fixed ${leadToUpdateEarnings ? "top-0" : "-top-350"} flex flex-col justify-center items-center gap-10  w-full duration-300 z-50 bg-slate-950 py-5 overflow-y-auto  shadow-md shadow-slate-700   rounded-b-4xl transition-all  left-0  right-0`}
      >
        <div>
          <div>
            <label className="text-lg font-bold">KSH</label>
          </div>
          <input
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-lg   text-lg text-green-600  border-slate-600 p-2 outline-0  rounded-lg border"
            type="number"
            required
          />
        </div>
        <button
          onClick={updateEarningsFromLead}
          className=" py-3 transition-all border border-green-600 rounded-lg cursor-pointer font-bold hover:scale-105 w-45 text-green-600"
        >
          Add
        </button>
      </div>
    </div>
  );
}
