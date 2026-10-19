import React, { createContext, useContext, useEffect, useState } from "react";
import type { TaskContextType } from "../types/TaskContextType";
import type { TaskInterface } from "../types/TasksInterface";
import { getDb } from "../config/indexedDB-config";

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
    const db = await getDb();
    const data = await db?.getAll("tasks")

    setTasks(data as TaskInterface[])
    setTaskLoading(false)
  }

  useEffect(() => {
    getAllTasks()
  }, [])
  return <TaskContext value={contextValues}>{children}</TaskContext>;
}

export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("TaskContext must be within the TaskContextProvider");
  }
  return context;
};
