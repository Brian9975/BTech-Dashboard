import { useState } from "react";
// import { useTask } from "../context/TaskContext";
import useModal from "./useModal";
import { dbPromise } from "../config/indexedDB-config";

export default function useAddTask() {
  const [taskText, setTaskText] = useState("");
  const [deadline, setDeadline] = useState<Date | string>("");
  const [showAddToast, setShowAddToast] = useState(false)
  // const { setTasks } = useTask();
  const { closeDialog } = useModal();
  const addTask = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const taskObject = {
      id: Date.now().toString(),
      task: taskText,
      deadline,
      isCompleted: false,
      createdAt: new Date(),
    };
 const db = await dbPromise;
 await db.add("tasks", taskObject)

    
  setShowAddToast(true)
  setTimeout(() => {
   setShowAddToast(false)
  }, 3000
)
    setTaskText("");
    setDeadline("");
    closeDialog();
  };
  return { addTask, setTaskText, setDeadline, deadline, taskText, showAddToast };
}
