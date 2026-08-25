import React, { useState } from "react";
import { useTask } from "../context/TaskContext";

export default function useEditTask() {
  const [taskToUpdate, setTaskToUpdate] = useState<string | null>(null);
  const [taskEdit, setTaskEdit] = useState("")
  const [deadlineEdit, setDeadlineEdit] = useState<Date | string>("")
  const { tasks, setTasks } = useTask();
  
  const editTask = (e: React.SubmitEvent) => {
    e.preventDefault();
    
    setTasks(tasks.map(t => t.id === taskToUpdate ? {
        ...t,
        task: taskEdit,
        deadline: deadlineEdit
    } : t))

    setTaskToUpdate(null)
  };
  return { editTask,  taskToUpdate, setTaskToUpdate, setTaskEdit, setDeadlineEdit, taskEdit, deadlineEdit };
}
