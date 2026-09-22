import  { useState } from 'react'

export default function useCopyToClipboard() {
 const [scriptCopied, setScriptCopied] = useState<number | null>(null)
 const copyText = async (val: string, id: number) => {
  try{
  await navigator.clipboard.writeText(val)
 setScriptCopied(id)
 setTimeout(() => {
  setScriptCopied(null)
 }, 3000)
 
  }catch(err){
console.log(`Failed To Copy ${err}`)
  }
 }
  return {copyText, scriptCopied}
}
