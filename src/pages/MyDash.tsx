import { DeleteIcon, Edit, MoveRight } from "lucide-react";
import { useLead } from "../context/LeadContext";
import { Link, useNavigate } from "react-router-dom";
import { leadStage } from "../LeadStage";
import useAutoCheckLead from "../hooks/useAutoCheckLead";
export default function MyDash() {
  const navigate = useNavigate()
  const { checkDaysPassed } = useAutoCheckLead();
  const { leads } = useLead();
  const newCount = leads.filter((l) => l.stage === "New").length;
  const contactedCount = leads.filter((l) => l.stage === "Contacted").length;
  const f1AfterContactCount = leads.filter(
    (l) => l.stage === "Follow up 1 after Contact",
  ).length;
  const lastFAfterContactCount = leads.filter(
    (l) => l.stage === "Last Follow up after Contact",
  ).length;
  const repliedCount = leads.filter((l) => l.stage === "Replied").length;
  const previewCount = leads.filter((l) => l.stage === "Preview Sent").length;
  const f1AfterPreviewCount = leads.filter(
    (l) => l.stage === "Follow up 1 after Preview",
  ).length;
  const lastFAfterPreviewCount = leads.filter(
    (l) => l.stage === "Last Follow up after Preview",
  ).length;
  const priceCount = leads.filter((l) => l.stage === "Price Sent").length;
  const f1AfterPriceCount = leads.filter(
    (l) => l.stage === "Follow up 1 after Price",
  ).length;
  const lastFAPriceCount = leads.filter(
    (l) => l.stage === "Last Follow up after Price",
  ).length;
  const negotiatingCount = leads.filter(
    (l) => l.stage === "Negotiating",
  ).length;
  const depositCount = leads.filter((l) => l.stage === "Deposit paid").length;
  const checklistCount = leads.filter(
    (l) => l.stage === "Checklist Sent",
  ).length;
  const fAfterChecklistCount = leads.filter(
    (l) => l.stage === "Follow up after Checklist",
  ).length;
  const buildingCount = leads.filter(
    (l) => l.stage === "Building Phase",
  ).length;
  const reviewCount = leads.filter((l) => l.stage === "Review Phase").length;
  const paymentDoneCount = leads.filter(
    (l) => l.stage === "Payment Complete + Pitch Care Plan",
  ).length;
  const closedOnPlanCount = leads.filter(
    (l) => l.stage === "Closed + On Plan",
  ).length;
  const closedOffPlanCount = leads.filter(
    (l) => l.stage === "Closed + Off Plan",
  ).length;
  const deadCount = leads.filter((l) => l.stage === "Dead").length;
  const noInterestCount = leads.filter(
    (l) => l.stage === "Not Interested",
  ).length;
  console.log(newCount);
  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-4 items-start gap-4">
        {leadStage.map((s) => (
          <div
            key={s.id}
            style={{ borderColor: s.color }}
            className="bg-slate-950 cursor-pointer hover:scale-105 transition-all shadow-md shadow-slate-600 border-l-3 rounded-lg  py-2 px-4 flex flex-col justify-between gap-2"
          >
            <p style={{ color: s.color }}>{s.name}</p>
            <div className="flex justify-between items-center">
              <s.icon color={s.color} />
              <span className="text-2xl font-bold">
                {s.name == "New"
                  ? newCount
                  : s.name == "Contacted"
                    ? contactedCount
                    : s.name == "Follow up 1 after Contact"
                      ? f1AfterContactCount
                      : s.name == "Last Follow up after Contact"
                        ? lastFAfterContactCount
                        : s.name == "Replied"
                          ? repliedCount
                          : s.name == "Preview Sent"
                            ? previewCount
                            : s.name == "Follow up 1 after Preview"
                              ? f1AfterPreviewCount
                              : s.name == "Last Follow up after Preview"
                                ? lastFAfterPreviewCount
                                : s.name == "Price Sent"
                                  ? priceCount
                                  : s.name == "Follow up 1 after Price"
                                    ? f1AfterPriceCount
                                    : s.name == "Last Follow up after Price"
                                      ? lastFAPriceCount
                                      : s.name == "Negotiating"
                                        ? negotiatingCount
                                        : s.name == "Deposit paid"
                                          ? depositCount
                                          : s.name == "Checklist Sent"
                                            ? checklistCount
                                            : s.name ==
                                                "Follow up after Checklist"
                                              ? fAfterChecklistCount
                                              : s.name == "Building Phase"
                                                ? buildingCount
                                                : s.name == "Review Phase"
                                                  ? reviewCount
                                                  : s.name ==
                                                      "Payment Complete + Pitch Care Plan"
                                                    ? paymentDoneCount
                                                    : s.name ==
                                                        "Closed + On Plan"
                                                      ? closedOnPlanCount
                                                      : s.name ==
                                                          "Closed + Off Plan"
                                                        ? closedOffPlanCount
                                                        : s.name == "Dead"
                                                          ? deadCount
                                                          : s.name ==
                                                              "Not Interested"
                                                            ? noInterestCount
                                                            : null}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Todays view  */}
      <div className="flex  items-start gap-15 py-10">
        <div className="p-5">
          <h1 className="text-xl pb-3 font-bold ">Today</h1>
          {leads.map((l) =>
            checkDaysPassed(l.lastContacted) >= 2 && l.stage == "Contacted" ? (
              <div>
                <p className="flex gap-15 items-center">
                  <span className="text-lg">{l.name}</span>{" "}
                  <Link
                    to={`/Lead/${l.id}`}
                    className="hover:text-blue-600 hover:scale-120 transition-all"
                  >
                    <MoveRight size={35} />
                  </Link>
                </p>
              </div>
            ) : checkDaysPassed(l.lastContacted) >= 4 &&
              l.stage == "Follow up 1 after Contact" ? (
              <div>
                <p className="flex gap-15 items-center">
                  <span className="text-lg">{l.name}</span>{" "}
                  <Link
                    to={`/Lead/${l.id}`}
                    className="hover:text-blue-600 hover:scale-120 transition-all"
                  >
                    <MoveRight size={35} />
                  </Link>
                </p>
              </div>
            ) : checkDaysPassed(l.lastContacted) >= 2 &&
              l.stage == "Preview Sent" ? (
              <div>
                <p className="flex gap-15 items-center">
                  <span className="text-lg">{l.name}</span>{" "}
                  <Link
                    to={`/Lead/${l.id}`}
                    className="hover:text-blue-600 hover:scale-120 transition-all"
                  >
                    <MoveRight size={35} />
                  </Link>
                </p>
              </div>
            ) : checkDaysPassed(l.lastContacted) >= 2 &&
              l.stage == "Follow up 1 after Preview" ? (
              <div>
                <p className="flex gap-15 items-center">
                  <span className="text-lg">{l.name}</span>{" "}
                  <Link
                    to={`/Lead/${l.id}`}
                    className="hover:text-blue-600 hover:scale-120 transition-all"
                  >
                    <MoveRight size={35} />
                  </Link>
                </p>
              </div>
            ) : checkDaysPassed(l.lastContacted) >= 2 &&
              l.stage == "Price Sent" ? (
              <div>
                <p className="flex gap-15 items-center">
                  <span className="text-lg">{l.name}</span>{" "}
                  <Link
                    to={`/Lead/${l.id}`}
                    className="hover:text-blue-600 hover:scale-120 transition-all"
                  >
                    <MoveRight size={35} />
                  </Link>
                </p>
              </div>
            ) : checkDaysPassed(l.lastContacted) >= 2 &&
              l.stage == "Follow up 1 after Price" ? (
              <div>
                <p className="flex gap-15 items-center">
                  <span className="text-lg">{l.name}</span>{" "}
                  <Link
                    to={`/Lead/${l.id}`}
                    className="hover:text-blue-600 hover:scale-120 transition-all"
                  >
                    <MoveRight size={35} />
                  </Link>
                </p>
              </div>
            ) : checkDaysPassed(l.lastContacted) >= 2 &&
              l.stage.includes("Last Follow up") ? (
              <div>
                <p className="flex gap-15 items-center">
                  <span className="text-lg">{l.name}</span>{" "}
                  <Link
                    to={`/Lead/${l.id}`}
                    className="hover:text-blue-600 hover:scale-120 transition-all"
                  >
                    <MoveRight size={35} />
                  </Link>
                </p>
              </div>
            ) : checkDaysPassed(l.lastContacted) >= 1 &&
              l.stage == "Checklist Sent" ? (
              <div>
                <p className="flex gap-15 items-center">
                  <span className="text-lg">{l.name}</span>{" "}
                  <Link
                    to={`/Lead/${l.id}`}
                    className="hover:text-blue-600 hover:scale-120 transition-all"
                  >
                    <MoveRight size={35} />
                  </Link>
                </p>
              </div>
            ) : checkDaysPassed(l.dateAdded) >= 1 && l.stage == "New" ? (
              <div>
                <p className="flex gap-15 items-center">
                  <span className="text-lg">{l.name}</span>{" "}
                  <Link
                    to={`/Lead/${l.id}`}
                    className="hover:text-blue-600 hover:scale-120 transition-all"
                  >
                    <MoveRight size={35} />
                  </Link>
                </p>
              </div>
            ) : null,
          )}

          <div className="text-center pt-5">
          <Link to="/today" className="bg-blue-600 hover:bg-blue-800 text-slate-950 rounded-lg text-lg font-bold p-2.5 hover:text-slate-50 transition-all">Go To Today</Link>
          </div>
        </div>

        <div className="bg-slate-900 p-5 flex-1 rounded-lg">
          <h1 className="text-xl font-bold pb-3 text-blue-600">Your Tasks</h1>
          <ul>
            <div className="bg-slate-950 p-2 rounded-lg">
              <li className=" text-lg">
                <span>Purchase a custom domain for my business</span>{" "}
              </li>
              <span className="flex justify-between pt-3">
                <Edit />
                <DeleteIcon />
              </span>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
