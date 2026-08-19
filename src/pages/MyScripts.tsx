import { scriptData } from "../ScriptData";
export default function MyScripts() {
  
 
  return (
    <div className="">
      <main className="grid  md:grid-cols-3 p-5  grid-cols-1 justify-items-center  gap-10">
        {scriptData.map(sc => (

        <div className="">
          
          
          <div className="bg-slate-900 relative px-3 py-5 rounded-lg max-w-75">
            <p className="tracking-wider overflow-auto">{sc.message}</p>

          <div className="flex justify-end ">
            <button className="bg-slate-600 px-4 py-1 rounded-lg cursor-pointer hover:scale-102 transition-all">Copy</button>
          </div>
          <span className="border-blue-600 border left-1/2 top-0 -translate-y-1/2 -translate-x-1/2  absolute py-1 px-2 rounded-lg text-sm text-ellipsis font-bold">{sc.title}</span>
          </div>
        </div>
        ))}
      </main>
    </div>
  )
}
