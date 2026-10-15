import  { useState } from 'react'

export default function useHandleToast() {
    const [display, setDisplay] = useState(false)
    const [toastMessage, setToastMessage] = useState("")


     const handleToast = (message: string) => {
        setDisplay(true)
        setTimeout(() => {
          setDisplay(false)
        }, 6000)
      setToastMessage(message)
    }
 
  return [display, toastMessage, handleToast]
}
