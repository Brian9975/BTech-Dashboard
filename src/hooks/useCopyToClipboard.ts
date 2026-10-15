import  { useState } from 'react'
import useHandleToast from './useHandleToast'

export default function useCopyToClipboard() {
 const [scriptCopied, setScriptCopied] = useState<string | null>(null)
 const [display, toastMessage, handleToast] = useHandleToast() as [
     boolean, 
     string,
     (message: string) => void,
   ]
 const copyText = async (val: string, id: string) => {
  try{
  await navigator.clipboard.writeText(val)
 setScriptCopied(id)
 setTimeout(() => {
  setScriptCopied(null)
 }, 3000)
 
  }catch(err){
handleToast(`Failed To Copy! Please try again.`)
  }
 }
  return [ display, toastMessage, copyText, scriptCopied]
}
