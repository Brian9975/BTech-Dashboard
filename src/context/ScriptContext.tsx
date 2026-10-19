import React, { createContext, useContext, useState, useEffect } from 'react'
import { getDb } from '../config/indexedDB-config'
import type { ScriptData } from '../types/ScriptInterface'
interface ScriptContextType {
   scripts: ScriptData[],
   scriptLoading: boolean,
   setScripts: React.Dispatch<React.SetStateAction<ScriptData[]>>,
}

const ScriptContext = createContext<ScriptContextType | null>(null)
export default function ScriptContextProvider({children}: {children: React.ReactNode}) {
const [scripts, setScripts] = useState<ScriptData[]>([])
const [scriptLoading, setScriptLoading] = useState(true)
  const contextValues = {scripts, scriptLoading, setScripts}
const getAllScripts = async () => {
   const db = await getDb()
   const data = await db?.getAll("scripts")

   setScripts(data as ScriptData[])

   setScriptLoading(false)
}
  useEffect(() => {
     getAllScripts()
  }, [])
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