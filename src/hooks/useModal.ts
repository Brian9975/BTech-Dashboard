import { useLead } from "../context/LeadContext";

export default function useModal() {
  const { setModalIsOpen, modalIsOpen } = useLead();
  const openDialog = (): void => {
    setModalIsOpen(true);
  };
  const closeDialog = (): void => {
    setModalIsOpen(false);
  };
  return { setModalIsOpen, modalIsOpen, openDialog, closeDialog };
}
