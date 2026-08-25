import React, { createContext, useContext, useState } from "react";
import type { TaskContextType } from "../types/TaskContextType";
import type { TaskInterface } from "../types/TasksInterface";

const TaskContext = createContext<TaskContextType | null>(null);
export default function TaskContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<TaskInterface[]>(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks") as string)
      : [],
  );
  const contextValues = { tasks, setTasks };
  return <TaskContext value={contextValues}>{children}</TaskContext>;
}

export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("TaskContext must be within the TaskContextProvider");
  }
  return context;
};
