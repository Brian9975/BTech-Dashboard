import React, { useState } from "react"
import { getDb } from "../config/indexedDB-config"
import type { ScriptData } from "../types/ScriptInterface"
import { useScript } from "../context/ScriptContext"


export default function useUpdateScript() {
    const [scriptToEdit, setScriptToEdit] = useState<string | null>(null)
    const [editTitle, setEditTitle] = useState("")
    const [editNiche, setEditNiche] = useState("")
    const [editMessage, setEditMessage] = useState("")
    const {setScripts} = useScript()
    const closeModal = () => {
        setScriptToEdit(null)
    }
    const updateScript = async (e:React.SubmitEvent) => {
      e.preventDefault()

      try{
         const db = await getDb()
         const scriptData: ScriptData =  await db?.get("scripts", scriptToEdit as IDBKeyRange | IDBValidKey)
         scriptData.title = editTitle
         scriptData.niche = editNiche
         scriptData.message = editMessage
         scriptData.lastModified = Date.now()

         await db?.put("scripts", scriptData)
         setScripts(prev => prev.map(sc => sc.id === scriptToEdit ? {
            ...sc,
            title: editTitle,
            niche: editNiche,
            message: editMessage,

         } : sc))

         

      }catch (err) {

      }
    }
  return {editTitle, setEditTitle, editNiche, setEditNiche, editMessage, setEditMessage, updateScript, scriptToEdit, closeModal, setScriptToEdit}
}
