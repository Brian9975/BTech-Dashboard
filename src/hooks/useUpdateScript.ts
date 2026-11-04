import React, { useState } from "react"
import { getDb } from "../config/indexedDB-config"
import type { ScriptData } from "../types/ScriptInterface"
import { useScript } from "../context/ScriptContext"
import useHandleToast from "./useHandleToast"


export default function useUpdateScript() {
    const [scriptToEdit, setScriptToEdit] = useState<string | null>(null)
    const [editTitle, setEditTitle] = useState("")
    const [editNiche, setEditNiche] = useState("")
    const [editMessage, setEditMessage] = useState("")
    const [showEditToast, setShowEditToast] = useState(false)
    const {setScripts} = useScript()
    const [editErrDisplay, editErrMessage, handleToast] = useHandleToast() as [
        boolean, 
        string,
        (message: string) => void,
    ]

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

         setShowEditToast(true)
         setTimeout(() => {
           setShowEditToast(false)
         }, 3000)
      }catch (err) {
        handleToast("An error occured while editing script, please try again!")
      } finally {
        closeModal()
      }
  return {editErrDisplay, editErrMessage , editTitle, setEditTitle, editNiche, setEditNiche, editMessage, setEditMessage, updateScript, scriptToEdit, closeModal, setScriptToEdit, showEditToast}
}
}
