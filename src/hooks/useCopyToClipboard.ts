import  { useState } from 'react'

export default function useCopyToClipboard() {
 const [scriptCopied, setScriptCopied] = useState<string | null>(null)
 const copyText = async (val: string, id: string) => {
  try{
  await navigator.clipboard.writeText(val)
 setScriptCopied(id)
 setTimeout(() => {
  setScriptCopied(null)
 }, 3000)
 console.log("Copied Successfully")
  }catch(err){
console.log(`Failed To Copy ${err}`)
  }
 }
  return {copyText, scriptCopied}
}
