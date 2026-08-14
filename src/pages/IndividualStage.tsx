import { useParams, Link } from "react-router-dom";
import { useLead } from "../context/LeadContext";
import { leadStage } from "../LeadStage";
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
        <div className="bg-slate-900 py-2 px-35 rounded-lg my-7 shadow-md shadow-slate-600">
          <h1 className="text-center text-2xl font-bold ">{name}</h1>
        </div>
      </div>

      {/* <p className="text-center  text-xl flex my-3 justify-center gap-2 items-center"><span>Total Earnings</span><ArrowRight/><span className="text-green-600 font-bold border border-green-600 px-4 rounded-lg">Ksh {leadData?.earningsFromLead}</span></p> */}

      <div className="grid my-10 grid-cols-2 gap-4">
        {leadsInStage.map((l) => (
          <div className={`border  p-5 border-blue-600 text-center rounded-lg`}>
            <h1 className="text-lg font-bold">{l.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
