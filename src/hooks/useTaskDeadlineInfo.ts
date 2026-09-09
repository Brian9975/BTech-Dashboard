import type { TaskInterface } from "../types/TasksInterface"
export default function useTaskDeadlineInfo() {
    const taskDeadlineInfo = (t: TaskInterface) => {
        const today = new Date().getTime()
        const deadline = new Date(t.deadline).getTime()
        let mInSecond = 1000
        let mInMinute = mInSecond * 60
        let mInHour = mInMinute * 60
        let mInDay = mInHour * 24

        const timeDiff = deadline - today

        const days = timeDiff / mInDay
        
        if (new Date().toLocaleDateString() === new Date(t.deadline).toLocaleDateString() && !t.isCompleted) {
            return `Today is the Deadline`
        } 
        if (days < 0 && !t.isCompleted) {
            return `Task passed deadline by ${(days * -1).toFixed()} days`
        } 
        if (days <= 3 && !t.isCompleted) {
           return `Task deadline in ${days.toFixed()} days`
        }

        return null
    }
    return {taskDeadlineInfo}
}
