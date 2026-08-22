import React, { createContext, useContext, useState } from "react";
import type { TaskInterface } from "../types/TasksInterface";
interface TaskContextType {
  tasks: TaskInterface[];
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
}
const TaskContext = createContext<TaskContextType | null>(null);
export default function TaskContextProvider({
  children,
}: {
  children: React.it add ReactNode;
}) {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
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
