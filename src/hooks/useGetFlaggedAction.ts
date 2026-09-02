import type { LeadsInterface } from "../types/LeadsInterface";

export default function useGetFlaggedAction() {

   const getFlaggedAction = (lead: LeadsInterface, checkDaysPassed: (lastC: string | Date) => number): string | null  => {
  const days = checkDaysPassed(lead.lastContacted);
  const daysSinceAdded = checkDaysPassed(lead.dateAdded);

  if (days >= 2 && lead.stage === "Contacted") return "Follow up 1 after contact";
  if (days >= 4 && lead.stage === "Follow up 1 after Contact") return "Final Follow up after Contact";
  if (days >= 2 && lead.stage === "Preview Sent") return "Follow up 1 after Preview";
  if (days >= 2 && lead.stage === "Follow up 1 after Preview") return "Final Follow up after Preview";
  if (days >= 2 && lead.stage === "Price Sent") return "Follow up 1 after Price";
  if (days >= 2 && lead.stage === "Follow up 1 after Price") return "Final Follow up after Price";
  if (days >= 2 && lead.stage.includes("Last Follow up")) return "Dead";
  if (days >= 1 && lead.stage === "Checklist Sent") return "Follow up after Checklist";
  if (daysSinceAdded >= 1 && lead.stage === "New") return "Send hook message";

  return null; // nothing flagged for this lead
}
  return {getFlaggedAction}
}
