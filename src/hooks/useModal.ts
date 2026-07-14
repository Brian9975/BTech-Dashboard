import { useState } from 'react'

export default function useModal() {
const [modalIsOpen, setModalIsOpen] = useState(false)
const openDialog = (): void => {
  setModalIsOpen(true)
}
const closeDialog = ():void => {
  setModalIsOpen(false)
}
  return {modalIsOpen, openDialog, closeDialog}
}
