
export default function Leads() {
  return (
    <div>
      <div className="text-center">
        <button className="bg-blue-500 md:w-lg shadow-md shadow-slate-800 text-slate-950 font-bold cursor-pointer  rounded-lg py-3 px-5 text-lg">Add Lead</button>
      </div>
      <div className="flex justify-center">
        <input className={`border-slate-700  border my-15 text-lg rounded-lg p-2 placeholder-slate-700 outline-0 md:w-xl`} type="text" placeholder="Search for lead..."/>
      </div>
    </div>
  )
}
