import { useState } from "react";

import useModal from "./useModal";
import { dbPromise } from "../config/indexedDB-config";
import { useAuth } from "../context/AuthContext";
import { useTask } from "../context/TaskContext";
import useSyncData from "./useSyncData";

export default function useAddTask() {
  const [taskText, setTaskText] = useState("");
  const [deadline, setDeadline] = useState<Date | string>("");
  const [showAddToast, setShowAddToast] = useState(false)
  const {handleAllSync} = useSyncData()
  const { closeDialog } = useModal();
  const {user} = useAuth()
  const {setTasks} = useTask()

  const addTask = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const taskObject = {
      id: Date.now().toString(),
      task: taskText,
      deadline,
      isCompleted: false,
      createdAt: new Date(),
      lastModified: Date.now(),
      userId: user!.uid ,
      isDeleted: false
    };
    try {

      const db = await dbPromise;
      await db.add("tasks", taskObject)
     
       setTasks(prev => ([...prev, taskObject])) 
     
       setShowAddToast(true)
       setTimeout(() => {
        setShowAddToast(false)
       }, 3000
     )
     
     
    }catch (err) {
     console.log("An Error Occured while adding task! Please try again")
     
    } finally {
      
      setTaskText("");
      setDeadline("");
      closeDialog();
      handleAllSync()
    }
  };
  return { addTask, setTaskText, setDeadline, deadline, taskText, showAddToast };
}
