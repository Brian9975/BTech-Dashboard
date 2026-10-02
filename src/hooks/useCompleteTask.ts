import { useTask } from "../context/TaskContext";

import { dbPromise } from "../config/indexedDB-config";
import { useAuth } from "../context/AuthContext";

export default function useCompleteTask() {
  const {tasks, setTasks} = useTask();
  const {user} = useAuth()
  const activeTasks = tasks.filter(t => t.userId === user!.uid)
  const completeTask = async (id: string) => {
    

    const db = await dbPromise

    const data = await db.get("tasks", id);

    data.isCompleted = !data.isCompleted

    await db.put("tasks", data)


    setTasks(
      activeTasks.map((t) =>
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
