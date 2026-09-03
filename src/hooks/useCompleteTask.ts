// import { useTask } from "../context/TaskContext";

import { dbPromise } from "../config/indexedDB-config";

export default function useCompleteTask() {
  // const {tasks, setTasks} = useTask();

  const completeTask = async (id: string) => {
    

    const db = await dbPromise

    const data = await db.get("tasks", id);

    data.isCompleted = !data.isCompleted

    await db.put("tasks", data)







    // setTasks(
    //   tasks.map((t) =>
    //     t.id === id
    //       ? {
    //           ...t,
    //           isCompleted: !t.isCompleted,
    //         }
    //       : t,
    //   ),
    // );
  };
  return { completeTask };
}
