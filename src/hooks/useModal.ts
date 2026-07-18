
import { useLead } from '../context/LeadContext'

export default function useModal() {
const { setModalIsOpen} = useLead()
const openDialog = (): void => {
  setModalIsOpen(true)
}
const closeDialog = ():void => {
  setModalIsOpen(false)
}
  return { setModalIsOpen, openDialog, closeDialog}
}
