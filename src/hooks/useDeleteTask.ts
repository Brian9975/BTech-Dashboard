import { useState } from "react";
import { dbPromise } from "../config/indexedDB-config";
import { useTask } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import useSyncData from "./useSyncData";

export default function useDeleteTask() {
  const [showDelToast, setShowDelToast] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const { tasks, setTasks } = useTask();
  const {user} = useAuth()
  const {handleAllSync} = useSyncData()
  const activeTasks = tasks.filter(l => l.userId === user!.uid)
  const deleteTask = async () => {
    const db = await dbPromise;
    
    try {

      const taskData = await db.get("tasks", taskToDelete as IDBKeyRange | IDBValidKey)
      
      taskData.isDeleted = true
      taskData.lastModified = Date.now()
      db.put("tasks", taskData)
      setTasks(activeTasks.filter(t => t.id !== taskToDelete))
       setShowDelToast(true)
       setTimeout(() => {
         setShowDelToast(false)
       }, 3000)
    } catch (err) {
       console.log("An error occured while deleting task! Please try again")
    } finally {
    setTaskToDelete(null);
    handleAllSync()
    }
  };
  return { deleteTask, taskToDelete, setTaskToDelete, showDelToast };
}
