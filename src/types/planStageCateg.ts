import type { LucideProps } from "lucide-react";
export interface LeadStageInterface {
  id: number;
  name: string;
  color: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}
export interface BCategory {
  id: number;
  name: string;
}
export interface PlanInterface {
  id: number;
  name: string;
  amount?: number;
  color: string,
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}