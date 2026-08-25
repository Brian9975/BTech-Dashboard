import { useTask } from "../context/TaskContext";

export default function useCompleteTask() {
  const {tasks, setTasks} = useTask();

  const completeTask = (id: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              isCompleted: !t.isCompleted,
            }
          : t,
      ),
    );
  };
  return { completeTask };
}
