import { dbPromise } from "../config/indexedDB-config"
import React, {useState} from "react"
import { useAuth } from "../context/AuthContext"
import { useScript } from "../context/ScriptContext"
import useSyncData from "./useSyncData"
import useHandleToast from "./useHandleToast"
export default function useAddScript() {
    const {user} = useAuth()
    const {setScripts} = useScript()
    const [ modalOpen, setModalOpen ] = useState(false)
    const [scriptTitle, setScriptTitle] = useState("")
    const [niche, setNiche] = useState("")
    const [scriptMessage, setScriptMessage] = useState("")
    const {handleAllSync} = useSyncData()
    const {display, handleToast, toastMessage} = useHandleToast()
    const addScript = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {

          const db = await dbPromise
          const scriptObject = {
            id: Date.now().toString(),
            title: scriptTitle,
            niche: niche,
            message: scriptMessage,
            userId: user!.uid,
            lastModified: Date.now(),
            isDeleted: false,
          }   
            await db.add("scripts", scriptObject)
            setScripts(prev => ([...prev, scriptObject]))

            setScriptTitle("")
            setNiche("")
            setScriptMessage("")
        } catch( err) {
            handleToast("An Error occured whilst Adding script! Please try again")

        } finally {




          setModalOpen(false)
          handleAllSync()
        }
      
      
    }
  return {display, toastMessage, addScript, scriptTitle, niche, scriptMessage, modalOpen, setModalOpen, setScriptTitle, setNiche, setScriptMessage}
}
