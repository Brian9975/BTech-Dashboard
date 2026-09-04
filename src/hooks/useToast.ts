import {useState} from 'react'

export default function useToast() {
    const [toastOn, setToastOn] = useState(false)

   const showToast = () => {
    setToastOn(true)
   }

   const hideToast = () => {
    setToastOn(false)
   }
  return {showToast, hideToast, toastOn}
}
