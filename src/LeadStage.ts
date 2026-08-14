import type { LeadStageInterface } from "./types/planStageCateg";
import {
  AlarmClock,
  BadgeCheck,
  CheckCircle2,
  Clock,
  DollarSign,
  Eye,
  Hammer,
  Handshake,
  ListChecks,
  MessageCircle,
  PhoneCall,
  Send,
  ShieldCheck,
  Skull,
  UserPlus,
  Wallet,
  XCircle,
} from "lucide-react";

export const leadStage: LeadStageInterface[] = [
  {
    id: 1.1,
    name: "New",
    color: "#6B7280",
    icon: UserPlus,
  },
  {
    id: 1.2,
    name: "Contacted",
    color: "#3B82F6",
    icon: PhoneCall,
  },
  {
    id: 1.3,
    name: "Follow up 1 after Contact",
    color: "#F59E0B",
    icon: Clock,
  },

  {
    id: 1.4,
    name: "Last Follow up after Contact",
    color: "#EA580C",
    icon: AlarmClock,
  },
  {
    id: 1.5,
    name: "Replied",
    color: "#10B981",
    icon: MessageCircle,
  },
  {
    id: 1.6,
    name: "Preview Sent",
    color: "#06B6D4",
    icon: Send,
  },

  {
    id: 1.7,
    name: "Follow up 1 after Preview",
    color: "#F59E0B",
    icon: Clock,
  },

  {
    id: 1.8,
    name: "Last Follow up after Preview",
    color: "#EA580C",
    icon: AlarmClock,
  },
  {
    id: 1.9,
    name: "Price Sent",
    color: "#14B8A6",
    icon: DollarSign,
  },

  {
    id: 2.0,
    name: "Follow up 1 after Price",
    color: "#F59E0B",
    icon: Clock,
  },

  {
    id: 2.1,
    name: "Last Follow up after Price",
    color: "#EA580C",
    icon: AlarmClock,
  },
  {
    id: 2.2,
    name: "Negotiating",
    color: "#8B5CF6",
    icon: Handshake,
  },
  {
    id: 2.3,
    name: "Deposit paid",
    color: "#6366F1",
    icon: Wallet,
  },
  {
    id: 2.4,
    name: "Checklist Sent",
    color: "#3B82F6",
    icon: ListChecks,
  },

  {
    id: 2.5,
    name: "Follow up after Checklist",
    color: "#F59E0B",
    icon: Clock,
  },
  {
    id: 2.6,
    name: "Building Phase",
    color: "#0D9488",
    icon: Hammer,
  },
  {
    id: 2.7,
    name: "Review Phase",
    color: "#7C3AED",
    icon: Eye,
  },
  {
    id: 2.8,
    name: "Payment Complete + Pitch Care Plan",
    color: "#059669",
    icon: BadgeCheck,
  },
  {
    id: 2.9,
    name: "Closed + On Plan",
    color: "#047857",
    icon: ShieldCheck,
  },
  {
    id: 3.0,
    name: "Closed + Off Plan",
    color: "#64748B",
    icon: CheckCircle2,
  },
  {
    id: 3.1,
    name: "Dead",
    color: "#991B1B",
    icon: Skull,
  },
  {
    id: 3.2,
    name: "Not Interested",
    color: "#DC2626",
    icon: XCircle,
  },
];
