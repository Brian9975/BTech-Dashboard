import { useState } from "react";
import { dbPromise } from "../config/indexedDB-config";
// import { useTask } from "../context/TaskContext";

export default function useDeleteTask() {
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  // const { tasks, setTasks } = useTask();
  const deleteTask = async () => {
    const db = await dbPromise;
    await db.delete("tasks", taskToDelete as IDBKeyRange | IDBValidKey)


    // setTasks(tasks.filter((t) => t.id !== taskToDelete));
    setTaskToDelete(null);
  };
  return { deleteTask, taskToDelete, setTaskToDelete };
}
