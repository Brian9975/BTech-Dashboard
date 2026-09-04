import type {LeadsInterface} from "./LeadsInterface"



export interface LeadContextType {
  businessName: string;
  setBusinessName: React.Dispatch<React.SetStateAction<string>>;
  businessCategory: string;
  setBusinessCategory: React.Dispatch<React.SetStateAction<string>>;
  contactNo: number | string;
  setContactNo: React.Dispatch<React.SetStateAction<number | string>>;
  stage: string;
  setStage: React.Dispatch<React.SetStateAction<string>>;
  lastContacted: Date | string;
  setLastContacted: React.Dispatch<React.SetStateAction<Date | string>>;
  leads: LeadsInterface[];
  setLeads: React.Dispatch<React.SetStateAction<LeadsInterface[]>>;
  clientPlan: string;
  setClientPlan: React.Dispatch<React.SetStateAction<string>>;
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  saveToStorage: () => void;
  leadToEdit: string | null;
  setLeadToEdit: React.Dispatch<React.SetStateAction<string | null>>;
  leadToDelete: string | null;
  setLeadToDelete: React.Dispatch<React.SetStateAction<string | null>>;
  editBusinessName: string;
  setEditBusinessName: React.Dispatch<React.SetStateAction<string>>;
  editBusinessCategory: string;
  setEditBusinessCategory: React.Dispatch<React.SetStateAction<string>>;
  editContactNo: number | string;
  setEditContactNo: React.Dispatch<React.SetStateAction<number | string>>;
  editStage: string;
  setEditStage: React.Dispatch<React.SetStateAction<string>>;
  editClientPlan: string;
  setEditClientPlan: React.Dispatch<React.SetStateAction<string>>;
  editLastContacted: Date | string;
  setEditLastContacted: React.Dispatch<React.SetStateAction<Date | string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  flaggedLeads: {
    lead: LeadsInterface;
    action: string | null;
}[];
}