import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLead } from "../context/LeadContext";
import { ArrowRight } from "lucide-react";
import useDateFormater from "../hooks/useDateFormater";
import { dbPromise } from "../config/indexedDB-config";

export default function Lead() {
  const { id } = useParams();
   const [hasLoaded, setHasLoaded] = useState(false);
  
  const { leads } = useLead();
  const leadData = leads.find((l) => l.id == id);
  const [notesValue, setNotesValue] = useState(""
  );
  const { formatAnyDate } = useDateFormater();

  const getLead = async () => {
    const db = await dbPromise;
    const data = await db.get("leads", id as IDBKeyRange | IDBValidKey);

    setNotesValue(data.notes)
    setHasLoaded(true)
  };
  const updateNotes = async () => {  

     if (!hasLoaded) return; 
    const db = await dbPromise;
    const data = await db.get("leads", id as IDBKeyRange | IDBValidKey);

    data.notes = notesValue;
    await db.put("leads", data);

  };
  useEffect(() => {

    getLead();
   
  }, [id]);


  useEffect(() => {
    
    updateNotes();
    
  }, [notesValue])

  return (
    <div>
      <p className="text-right">
        <Link className="text-lg font-bold text-blue-600" to="/leads">
          Back To Leads
        </Link>
      </p>

      <div className=" flex sticky backdrop-blur-lg top-20 justify-center ">
        <div className="dark:bg-slate-900 bg-slate-50 py-2   rounded-lg my-7 w-xs shadow-md shadow-slate-600">
          <h1 className="text-center text-2xl font-bold ">{leadData?.name}</h1>
        </div>
      </div>

      <p className="text-center  text-xl flex my-3 justify-center gap-2 items-center">
        <span>Total Earnings</span>
        <ArrowRight />
        <span className="text-green-600 font-bold border border-green-600 px-4 rounded-lg">
          Ksh {leadData?.earningsFromLead}
        </span>
      </p>

      <div className="grid  my-10 md:grid-cols-4 gap-4">
        <div className="border p-5 border-blue-600 text-center rounded-lg">
          <h1 className="text-lg font-bold">Category</h1>
          <p className="uppercase pt-3 text-blue-600 text-lg">
            {leadData?.category}
          </p>
        </div>

        <div className="border  p-5 border-blue-600 text-center rounded-lg">
          <h1 className="text-lg font-bold">Contact</h1>
          <p className="uppercase pt-3 text-blue-600 text-lg">
            0{leadData?.contact}
          </p>
        </div>
        <div className="border  p-5 border-blue-600 text-center rounded-lg">
          <h1 className="text-lg font-bold">Stage</h1>
          <p className="uppercase pt-3 text-blue-600 text-lg">
            {leadData?.stage}
          </p>
        </div>

        <div className="border  p-5 border-blue-600 text-center rounded-lg">
          <h1 className="text-lg font-bold">Plan</h1>
          <p className="uppercase pt-3 text-blue-600 text-lg">
            {leadData?.plan}
          </p>
        </div>
        <div className="border p-5 col-span-2 border-blue-600 text-center rounded-lg">
          <h1 className="text-lg font-bold">Date Added</h1>
          <p className="uppercase pt-3 text-blue-600 text-lg">
            {formatAnyDate(leadData?.dateAdded)}
          </p>
        </div>
        <div className="border  col-span-2 p-5 border-blue-600 text-center rounded-lg">
          <h1 className="text-lg font-bold">Last Contacted</h1>
          <p className="uppercase pt-3 text-blue-600 text-lg">
            {formatAnyDate(leadData?.lastContacted)}
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="text-lg font-bold">
          Notes:
        </label>
        <textarea
          onChange={(e) => {
            setNotesValue(e.target.value);
          }}
          value={notesValue}
          className="w-full h-50 resize-none rounded-lg p-2 text-lg border border-amber-600 outline-0"
          id="notes"
        ></textarea>
      </div>
    </div>
  );
}
