import { openDB } from "idb";
import React, { useEffect, useState } from "react";

export default function DbTest() {
  const [leads, setLeads] = useState<
    { id: string; name: string; stage: string }[] | []
  >([]);
  const [name, setName] = useState("");
  const [stage, setStage] = useState("");
  const dbPromise = openDB("btech-dash", 1, {
    upgrade(db) {
      db.createObjectStore("leads", { keyPath: "id" });
    },
  });

  const addLead = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const leadVal = {
      id: Date.now().toString(),
      name: name,
      stage: stage,
    };
    const db = await dbPromise;
    await db.add("leads", leadVal);

    console.log("Lead Added Successfully");
  };

  const getData = async () => {
    const db = await dbPromise;
    const data: { id: string; name: string; stage: string }[]  = await db.getAll("leads");
    setLeads(data);
  };
  async function del(key: string) {
    const db = await dbPromise;
    await db.delete("leads", key);

    alert("Lead Deleted Successfully");
  }

  const editLead = async (key: string) => {
    const val = {
      name: "Yanah Pharmacy",
      stage: "On Care Plan",
    };
    const db = await dbPromise;
    // const data = await db.get("leads",key);
    const data = await db.get("leads", key)
      data.stage = "On Care Plan"
      data.name = val.name
      await db.put("leads", data)
    console.log(`Editing Successfully`);
  };

  useEffect(() => {
    getData();
  }, [addLead]);
  // getData();
  // addLead({id: "8288282882", name: "Ahwan Pharmacy", stage: "New" });
  return (
    <div>
      <form className="flex gap-5 flex-col" onSubmit={addLead}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-sm border-slate-600 text-lg py-2 px-2"
          type="text"
          required
        />
        <select
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          className="border w-sm border-slate-600 text-lg py-2 px-2"
          required
        >
          <option className="bg-slate-900" value="" disabled>
            Choose stage
          </option>
          <option className="bg-slate-900" value="Contacted">
            Contacted
          </option>
          <option className="bg-slate-900" value="Replied">
            Replied
          </option>
          <option className="bg-slate-900" value="Preview">
            Preview
          </option>
          <option className="bg-slate-900" value="Price">
            Price
          </option>
          <option className="bg-slate-900" value="Closed">
            Closed
          </option>
        </select>

        <button
          type="submit"
          className="bg-blue-700 py-1 px-2 cursor-pointer w-40"
        >
          Add
        </button>
      </form>

      <div>
        {leads.map((l) => (
          <>
            <h1>{l.name}</h1>{" "}
            <p>{l.stage}</p>
            <button
              className="bg-blue-800 p-2 rounded-lg cursor-pointer"
              onClick={() => del(l.id)}
            >
              Delete
            </button>
            <button
              className="bg-blue-800 p-2 rounded-lg cursor-pointer"
              onClick={() => editLead(l.id)}
            >
              Edit
            </button>
          </>
        ))}
      </div>
    </div>
  );
}
