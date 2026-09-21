import { dbPromise } from "../config/indexedDB-config"
import {useState} from "react"

export default function useAddScript() {
    const [ modalOpen, setModalOpen ] = useState(false)
    const [scriptTitle, setScriptTitle] = useState("")
    const [niche, setNiche] = useState("")
    const [scriptMessage, setScriptMessage] = useState("")
    const addScript = async () => {
      const db = await dbPromise
      const scriptObject = {
        title: scriptTitle,
        niche: niche,
        message: scriptMessage
      }   
      
      
     await db.add("scripts", scriptObject)
     setModalOpen(false)
    }
  return {addScript, modalOpen, setModalOpen, setScriptTitle, setNiche, setScriptMessage}
}
