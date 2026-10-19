

interface AddTaskFormProps  {
    addTask: (e: React.SubmitEvent<Element>) => void;
    taskText: string;
    setTaskText: React.Dispatch<React.SetStateAction<string>>;
    deadline: string | Date;
    setDeadline: React.Dispatch<React.SetStateAction<string | Date>>;
    modalIsOpen: boolean;
}

export default function AddTaskForm({addTask, taskText, setTaskText, deadline, setDeadline, modalIsOpen}: AddTaskFormProps) {
  return ( <div
        className={`fixed border-t   flex dark:border-slate-600 border-slate-100 justify-center items-center duration-300 z-50  backdrop-blur-xl py-10 overflow-y-auto    shadow-md shadow-slate-700 ${modalIsOpen ? "bottom-0" : "-bottom-350"} rounded-t-4xl transition-all left-0  right-0`}
      >
        <form onSubmit={addTask}>
          <h1 className="text-center text-lg text-slate-100 dark:text-blue-600 font-bold pb-5">
            Add your Task
          </h1>
          <div>
            <div>
              <label htmlFor="taskText" className="text-slate-100">Task :</label>
            </div>
            <input
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="eg. Code a React Component"
              type="text"
              className="border md:w-full w-xs sm:w-sm text-slate-100 border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg"
              required
            />
          </div>
          <div className="pt-5 ">
            <div>
              <label htmlFor="taskText" className="text-slate-100">Deadline :</label>
            </div>
            <input
              value={deadline as any}
              onChange={(e) => setDeadline(e.target.value)}
              className="md:w-lg sm:w-sm w-xs  bg-slate-50 text-lg text-slate-950  border-slate-600 p-2 outline-0  rounded-lg border"
              type="date"
              required
            />
          </div>

          <div className="flex justify-center  pt-10">
            <button className="bg-blue-600 hover:scale-105 transition-all text-slate-100 dark:text-slate-950 py-1.5 px-4 font-bold w-30 rounded-lg cursor-pointer">
              Add
            </button>
          </div>
        </form>
      </div>

  )
}
