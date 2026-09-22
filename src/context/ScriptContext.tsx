import React, { createContext, useContext, useState, useEffect } from 'react'
import { dbPromise } from '../config/indexedDB-config'

interface ScriptContextType {
   scripts: ScriptData[],


}

interface ScriptData {
  id: number,
  message: string,
  niche: string,
  title: string
}
const ScriptContext = createContext<ScriptContextType | null>(null)
export default function ScriptContextProvider({children}: {children: React.ReactNode}) {
const [scripts, setScripts] = useState<ScriptData[]>([])
const [scriptLoading, setScriptLoading] = useState(true)
  const contextValues = {scripts, scriptLoading}
const getAllScripts = async () => {
   const db = await dbPromise
   const data = await db.getAll("scripts")

   setScripts(data)

   setScriptLoading(false)
}
  useEffect(() => {
     getAllScripts()
  }, [scripts])
  return (
    <ScriptContext value={contextValues}>{children}</ScriptContext>
  )
}

export const useScript = () => {
const context = useContext(ScriptContext)

if (!context) {
  throw new Error("ScriptContext must be within ScriptContextProvider")
}
  return context
}