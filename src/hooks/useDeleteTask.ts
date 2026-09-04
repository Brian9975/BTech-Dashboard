import { useState } from "react";
import { dbPromise } from "../config/indexedDB-config";
// import { useTask } from "../context/TaskContext";

export default function useDeleteTask() {
  const [showDelToast, setShowDelToast] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  // const { tasks, setTasks } = useTask();
  const deleteTask = async () => {
    const db = await dbPromise;
    await db.delete("tasks", taskToDelete as IDBKeyRange | IDBValidKey)

    setShowDelToast(true)
    setTimeout(() => {
      setShowDelToast(false)
    }, 3000)
    setTaskToDelete(null);
  };
  return { deleteTask, taskToDelete, setTaskToDelete, showDelToast };
}
