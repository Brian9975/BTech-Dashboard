import React, { useState } from "react";
import { dbPromise } from "../config/indexedDB-config";
// import { useTask } from "../context/TaskContext";

export default function useEditTask() {
  const [taskToUpdate, setTaskToUpdate] = useState<string | null>(null);
  const [taskEdit, setTaskEdit] = useState("");
  const [deadlineEdit, setDeadlineEdit] = useState<Date | string>("");
  // const { tasks, setTasks } = useTask();

  const editTask = async (e: React.SubmitEvent) => {
    e.preventDefault();


    const db = await dbPromise;
    const data = await db.get("tasks", taskToUpdate as IDBKeyRange | IDBValidKey)

    data.task = taskEdit,
    data.deadline = deadlineEdit,

    await db.put("tasks", data)
    // setTasks(
    //   tasks.map((t) =>
    //     t.id === taskToUpdate
    //       ? {
    //           ...t,
    //           task: taskEdit,
    //           deadline: deadlineEdit,
    //         }
    //       : t,
    //   ),
    // );

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
  };
}
