import { useAuth } from "../context/AuthContext";
import { useLead } from "../context/LeadContext";
import { useTask } from "../context/TaskContext";

export default function useStatCount() {
  const { leads, flaggedLeads } = useLead();
  const { tasks } = useTask();
  const { user } = useAuth();
  const activeLeads = leads.filter(
    (l) => l.userId === user!.uid && !l.isDeleted,
  );

  const activeTasks = tasks.filter(
    (t) => t.userId === user!.uid && !t.isDeleted,
  );
 const activeFlaggedLeads = flaggedLeads.filter(
    (l) => l.lead.userId === user!.uid && !l.lead.isDeleted,
  );
  const newCount = activeLeads.filter((l) => l.stage === "New").length;
  const contactedCount = activeLeads.filter(
    (l) => l.stage === "Contacted",
  ).length;
  const f1AfterContactCount = activeLeads.filter(
    (l) => l.stage === "Follow up 1 after Contact",
  ).length;
  const lastFAfterContactCount = activeLeads.filter(
    (l) => l.stage === "Last Follow up after Contact",
  ).length;
  const repliedCount = activeLeads.filter((l) => l.stage === "Replied").length;
  const previewCount = activeLeads.filter(
    (l) => l.stage === "Preview Sent",
  ).length;
  const f1AfterPreviewCount = activeLeads.filter(
    (l) => l.stage === "Follow up 1 after Preview",
  ).length;
  const lastFAfterPreviewCount = activeLeads.filter(
    (l) => l.stage === "Last Follow up after Preview",
  ).length;
  const priceCount = activeLeads.filter((l) => l.stage === "Price Sent").length;
  const f1AfterPriceCount = activeLeads.filter(
    (l) => l.stage === "Follow up 1 after Price",
  ).length;
  const lastFAPriceCount = activeLeads.filter(
    (l) => l.stage === "Last Follow up after Price",
  ).length;
  const negotiatingCount = activeLeads.filter(
    (l) => l.stage === "Negotiating",
  ).length;
  const depositCount = activeLeads.filter(
    (l) => l.stage === "Deposit paid",
  ).length;
  const checklistCount = activeLeads.filter(
    (l) => l.stage === "Checklist Sent",
  ).length;
  const fAfterChecklistCount = activeLeads.filter(
    (l) => l.stage === "Follow up after Checklist",
  ).length;
  const buildingCount = activeLeads.filter(
    (l) => l.stage === "Building Phase",
  ).length;
  const reviewCount = activeLeads.filter(
    (l) => l.stage === "Review Phase",
  ).length;
  const paymentDoneCount = activeLeads.filter(
    (l) => l.stage === "Payment Complete + Pitch Care Plan",
  ).length;
  const closedOnPlanCount = activeLeads.filter(
    (l) => l.stage === "Closed + On Plan",
  ).length;
  const closedOffPlanCount = activeLeads.filter(
    (l) => l.stage === "Closed + Off Plan",
  ).length;
  const deadCount = activeLeads.filter((l) => l.stage === "Dead").length;
  const noInterestCount = activeLeads.filter(
    (l) => l.stage === "Not Interested",
  ).length;
  const totalLeadsCount = activeLeads.length;
  const totalTasksCount = activeTasks.length;
  const todayCount = activeFlaggedLeads.length;
  const totalEarningsCount = activeLeads.reduce((total, lead) => {
    return lead.earningsFromLead + total;
  }, 0);
  return {
    totalEarningsCount,
    todayCount,
    totalTasksCount,
    totalLeadsCount,
    newCount,
    contactedCount,
    reviewCount,
    buildingCount,
    closedOffPlanCount,
    closedOnPlanCount,
    paymentDoneCount,
    deadCount,
    noInterestCount,
    f1AfterContactCount,
    f1AfterPreviewCount,
    f1AfterPriceCount,
    lastFAPriceCount,
    lastFAfterContactCount,
    lastFAfterPreviewCount,
    fAfterChecklistCount,
    checklistCount,
    depositCount,
    priceCount,
    negotiatingCount,
    repliedCount,
    previewCount,
  };
}
