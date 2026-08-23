import  { useState } from 'react'
import { useTask } from '../context/TaskContext'
import useModal from './useModal'

export default function useAddTask() { 
 const [taskText, setTaskText] = useState("")
 const [deadline, setDeadline] = useState<Date | string>("")
 const {setTasks} = useTask()
 const {closeDialog} = useModal()
    const addTask = (e: React.SubmitEvent) => {
      e.preventDefault()
      const taskObject = {
        id: Date.now().toString(),
        task: taskText,
        deadline,
        createdAt: new Date()
      }

      setTasks(prev => ([...prev, 
        taskObject
      ]))
    
    setTaskText("")
    setDeadline("")
    closeDialog()
    }
  return {addTask, setTaskText, setDeadline, deadline, taskText}
}
