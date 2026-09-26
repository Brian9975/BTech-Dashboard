import React, { useState } from "react";
import { dbPromise } from "../config/indexedDB-config";


export default function useEditTask() {
  const [showEditToast, setShowEditToast] = useState(false)
  const [taskToUpdate, setTaskToUpdate] = useState<string | null>(null);
  const [taskEdit, setTaskEdit] = useState("");
  const [deadlineEdit, setDeadlineEdit] = useState<Date | string>("");
  

  const editTask = async (e: React.SubmitEvent) => {
    e.preventDefault();


    const db = await dbPromise;
    const data = await db.get("tasks", taskToUpdate as IDBKeyRange | IDBValidKey)

    data.task = taskEdit,
    data.deadline = deadlineEdit,
    data.lastModified = Date.now()
    await db.put("tasks", data)


    setShowEditToast(true)
    setTimeout(() => {
    setShowEditToast(false)
    }, 3000)
    setTaskToUpdate(null);
  };
  return {
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
