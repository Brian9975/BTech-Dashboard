import { useParams, Link } from "react-router-dom";
import { useLead } from "../context/LeadContext";
import { UserXIcon } from "lucide-react";
export default function IndividualStage() {
  const { name } = useParams();
  const { leads } = useLead();

  const leadsInStage = leads.filter((l) => l.stage === name);
  return (
    <div>
      <p className="text-right">
        <Link className="text-lg font-bold text-blue-600" to="/mydash">
          Back To Dash
        </Link>
      </p>

      <div className=" flex sticky backdrop-blur-lg top-20 justify-center ">
        <div className="dark:bg-slate-900 bg-slate-50 py-2 px-35 rounded-lg my-7 shadow-md shadow-slate-600">
          <h1 className="text-center text-2xl font-bold ">{name}</h1>
        </div>
      </div>

      {/* <p className="text-center  text-xl flex my-3 justify-center gap-2 items-center"><span>Total Earnings</span><ArrowRight/><span className="text-green-600 font-bold border border-green-600 px-4 rounded-lg">Ksh {leadData?.earningsFromLead}</span></p> */}
     {leadsInStage.length == 0 ? <div className="flex justify-center"><div className="dark:bg-slate-900 bg-slate-50 rounded-lg py-5 px-10 text-xl flex flex-col items-center justify-center gap-2  shadow-md my-15 shadow-slate-600"><UserXIcon className="text-blue-600" size={35}/><span>No added leads in this stage at the moment!</span></div></div> : 
      <div className="grid my-10 grid-cols-2 gap-4">
        {leadsInStage.map((l) => (
          <div key={l.id} className={`border  p-5 border-blue-600 text-center rounded-lg`}>
            <h1 className="text-lg font-bold">{l.name}</h1>
          </div>
        ))}
      </div>
}
    </div>
  );
}
