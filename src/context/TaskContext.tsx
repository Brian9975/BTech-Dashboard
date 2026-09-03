import React, { createContext, useContext, useEffect, useState } from "react";
import type { TaskContextType } from "../types/TaskContextType";
import type { TaskInterface } from "../types/TasksInterface";
import { dbPromise } from "../config/indexedDB-config";

const TaskContext = createContext<TaskContextType | null>(null);
export default function TaskContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<TaskInterface[]>(
      [],
  );
  const [taskLoading, setTaskLoading] = useState(true)
  const contextValues = { tasks, setTasks, taskLoading };


  const getAllTasks = async () => {
    const db = await dbPromise;
    const data = await db.getAll("tasks")

    setTasks(data)
    setTaskLoading(false)
  }

  useEffect(() => {
    getAllTasks()
  }, [tasks])
  return <TaskContext value={contextValues}>{children}</TaskContext>;
}

export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("TaskContext must be within the TaskContextProvider");
  }
  return context;
};
