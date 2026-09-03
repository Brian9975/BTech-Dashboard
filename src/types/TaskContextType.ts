import type { TaskInterface } from "../types/TasksInterface";
export interface TaskContextType {
  tasks: TaskInterface[];
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
  taskLoading: boolean;
}