import React, { useState } from "react";
import { dbPromise } from "../config/indexedDB-config";
import { useTask } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import useSyncData from "./useSyncData";
import useHandleToast from "./useHandleToast";
export default function useEditTask() {
  const [showEditToast, setShowEditToast] = useState(false)
  const [taskToUpdate, setTaskToUpdate] = useState<string | null>(null);
  const [taskEdit, setTaskEdit] = useState("");
  const [deadlineEdit, setDeadlineEdit] = useState<Date | string>("");
  const {tasks, setTasks} = useTask()
 const [editErrorToastDisplay, editErrorToastMessage, handleToast] = useHandleToast() as [
       boolean, 
       string,
       (message: string) => void,
     ]
 
  const {user} = useAuth()
  const {handleAllSync} = useSyncData()
  const activeTasks = tasks.filter(l => l.userId === user!.uid)

  const editTask = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try{

      const db = await dbPromise;
      const data = await db.get("tasks", taskToUpdate as IDBKeyRange | IDBValidKey)
  
      data.task = taskEdit,
      data.deadline = deadlineEdit,
      data.lastModified = Date.now()
      await db.put("tasks", data)
  
     setTasks(activeTasks.map(t => t.id === taskToUpdate ? {
      ...t,
      task: taskEdit,
      deadline: deadlineEdit,
     } : t))
      setShowEditToast(true)
      setTimeout(() => {
      setShowEditToast(false)
      }, 3000)
    } catch(err) {
     handleToast("An error Occured while editing task!Please try again")
    } finally {

      setTaskToUpdate(null);
      handleAllSync()
    }
  };
  return {
    editErrorToastDisplay,
    editErrorToastMessage,
    editTask,
    taskToUpdate,
    setTaskToUpdate,
    setTaskEdit,
    setDeadlineEdit,
    taskEdit,
    deadlineEdit,
    showEditToast
  };
}
