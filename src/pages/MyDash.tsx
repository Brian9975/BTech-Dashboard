import { useLead } from "../context/LeadContext";
import { leadStage } from "../LeadStage";
export default function MyDash() {
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
      <div className="grid grid-cols-4 gap-4">
        {leadStage.map((s) => (
          <div
            key={s.id}
            style={{ borderColor: s.color }}
            className="bg-slate-950 shadow-md shadow-slate-600 border-l-3 rounded-lg  py-2 px-4 flex flex-col justify-between gap-2"
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
                  : s.name == "Follow up after Checklist"
                    ? fAfterChecklistCount
                  : s.name == "Building Phase"
                    ? buildingCount
                  : s.name == "Review Phase"
                    ? reviewCount
                  : s.name == "Payment Complete + Pitch Care Plan"
                    ? paymentDoneCount
                  : s.name == "Closed + On Plan"
                    ? closedOnPlanCount
                  : s.name == "Closed + Off Plan"
                    ? closedOffPlanCount
                  : s.name == "Dead"
                    ? deadCount
                  : s.name == "Not Interested"
                    ? noInterestCount
                    : null}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
