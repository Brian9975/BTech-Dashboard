import { useTask } from "../context/TaskContext";

import { dbPromise } from "../config/indexedDB-config";
import { useAuth } from "../context/AuthContext";
import useSyncData from "./useSyncData";
import useHandleToast from "./useHandleToast";

export default function useCompleteTask() {
  const {tasks, setTasks} = useTask();
  const {user} = useAuth()
  const {display, handleToast, toastMessage} = useHandleToast()
  const activeTasks = tasks.filter(t => t.userId === user!.uid)
  const {handleAllSync} = useSyncData()
  const completeTask = async (id: string) => {
    
   try {

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
   } catch (err) {

    handleToast("An error occured while completing task! Please try again")
   } finally {
    handleAllSync()
   }
  };
  return [ display, toastMessage, completeTask ];
}
