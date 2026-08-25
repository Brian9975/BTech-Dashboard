import { useLead } from "../context/LeadContext";

export default function useStatCount() {
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

  return {
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
