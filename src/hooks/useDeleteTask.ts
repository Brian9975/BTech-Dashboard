import { useState } from 'react'
import { useTask } from '../context/TaskContext'

export default function useDeleteTask() {
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null)
    const {tasks, setTasks} = useTask()
    const deleteTask = () => {
      setTasks(tasks.filter(t => t.id !== taskToDelete))
      setTaskToDelete(null)
    }
  return {deleteTask, taskToDelete, setTaskToDelete}
}
