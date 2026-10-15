import  { useState } from 'react'

export default function useHandleToast() {
    const [display, setDisplay] = useState(false)
    const [toastMessage, setToastMessage] = useState("")


     const handleErrorToast = (message: string) => {
        setDisplay(true)
        setTimeout(() => {
          setDisplay(false)
        }, 6000)
      setToastMessage(message)
    }
 
  return {display, toastMessage, handleErrorToast}
}
