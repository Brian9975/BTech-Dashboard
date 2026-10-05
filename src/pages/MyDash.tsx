import {
  AlarmClock,
  CheckCircle2,
  CheckCircleIcon,
  ClipboardList,
  Coffee,
  DeleteIcon,
  Edit,
  ListChecks,
  MoveRight,
  Plus,
  Sun,
  Users,
  Wallet,
} from "lucide-react";
import { useLead } from "../context/LeadContext";
import { Link, useNavigate } from "react-router-dom";
import { leadStage } from "../LeadStage";

import useModal from "../hooks/useModal";
import { useTask } from "../context/TaskContext";
import useAddTask from "../hooks/useAddTask";
import { useEffect } from "react";
import useEditTask from "../hooks/useEditTask";
import useStatCount from "../hooks/useStatCount";
import useDeleteTask from "../hooks/useDeleteTask";
import useCompleteTask from "../hooks/useCompleteTask";
import AddTaskForm from "../components/AddTaskForm";
import useTaskDeadlineInfo from "../hooks/useTaskDeadlineInfo";

import { useAuth } from "../context/AuthContext";
export default function MyDash() {
  const navigate = useNavigate();
  const { tasks, taskLoading } = useTask();
  const {
    addTask,
    setDeadline,
    setTaskText,
    deadline,
    taskText,
    showAddToast,
  } = useAddTask();
  const {
    editTask,
    setTaskToUpdate,
    taskToUpdate,
    setTaskEdit,
    setDeadlineEdit,
    taskEdit,
    deadlineEdit,
    showEditToast,
  } = useEditTask();
  const { openDialog, closeDialog, modalIsOpen } = useModal();

  const { isLoading, flaggedLeads } = useLead();
  const {
    newCount,
    contactedCount,
    reviewCount,
    buildingCount,
    closedOffPlanCount,
    closedOnPlanCount,
    paymentDoneCount,
    deadCount,
    noInterestCount,
    f1AfterContactCount,
    f1AfterPreviewCount,
    f1AfterPriceCount,
    lastFAPriceCount,
    lastFAfterContactCount,
    lastFAfterPreviewCount,
    fAfterChecklistCount,
    checklistCount,
    depositCount,
    priceCount,
    negotiatingCount,
    repliedCount,
    previewCount,
    totalEarningsCount,
    todayCount,
    totalTasksCount,
    totalLeadsCount,
  } = useStatCount();
  const { deleteTask, taskToDelete, setTaskToDelete, showDelToast } =
    useDeleteTask();
  const { completeTask } = useCompleteTask();
  const { taskDeadlineInfo } = useTaskDeadlineInfo();
  const {user} = useAuth()
  
    const activeTasks = tasks.filter(
    (t) => t.userId === user!.uid && !t.isDeleted,
  );

   const activeFlaggedLeads = flaggedLeads.filter(
    (l) => l.lead.userId === user!.uid && !l.lead.isDeleted,
  );
  const taskToUpdateObject = activeTasks.find((t) => t.id === taskToUpdate);

  const flaggedTasks = activeTasks
    .map((t) => ({
      task: t,
      message: taskDeadlineInfo(t),
    }))
    .filter((t) => t.message !== null);

  useEffect(() => {
    if (taskToUpdateObject) {
      setTaskEdit(taskToUpdateObject.task);
      setDeadlineEdit(taskToUpdateObject.deadline);
    }
  }, [taskToUpdate]);

  return (
    <div>
     
      {/* Stats */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 items-start gap-4">
        <div className="dark:bg-slate-950 bg-slate-100 border-[#3B82F6] cursor-pointer hover:scale-105 transition-all shadow-md shadow-slate-600 border-l-3 rounded-lg  py-2 px-4 flex flex-col justify-between gap-2">
          <p style={{ color: "#3B82F6" }}>Total Leads</p>
          <div className="flex justify-between items-center">
            {/* <s.icon color={s.color} /> */}
            <Users color={"#3B82F6"} />
            <span className="text-2xl font-bold">{totalLeadsCount}</span>
          </div>
        </div>
        <div className="dark:bg-slate-950 bg-slate-100 border-[#6366F1] cursor-pointer hover:scale-105 transition-all shadow-md shadow-slate-600 border-l-3 rounded-lg  py-2 px-4 flex flex-col justify-between gap-2">
          <p style={{ color: "#6366F1" }}>Total Tasks</p>
          <div className="flex justify-between items-center">
            {/* <s.icon color={s.color} /> */}
            <ListChecks color={"#6366F1"} />
            <span className="text-2xl font-bold">{totalTasksCount}</span>
          </div>
        </div>
        <div className="dark:bg-slate-950 bg-slate-100 border-[#E8A33D] cursor-pointer hover:scale-105 transition-all shadow-md shadow-slate-600 border-l-3 rounded-lg  py-2 px-4 flex flex-col justify-between gap-2">
          <p style={{ color: "#E8A33D" }}>Today</p>
          <div className="flex justify-between items-center">
            {/* <s.icon color={s.color} /> */}
            <Sun color="#E8A33D" />
            <span className="text-2xl font-bold">{todayCount}</span>
          </div>
        </div>
        <div className="dark:bg-slate-950 bg-slate-100 border-[#F59E0B] cursor-pointer hover:scale-105 transition-all shadow-md shadow-slate-600 border-l-3 rounded-lg  py-2 px-4 flex flex-col justify-between gap-2">
          <p style={{ color: "#F59E0B" }}>Deadline Alert</p>
          <div className="flex justify-between items-center">
            {/* <s.icon color={s.color} /> */}
            <AlarmClock color="#F59E0B" />
            <span className="text-2xl font-bold">{flaggedTasks.length}</span>
          </div>
        </div>
        <div className="dark:bg-slate-950 bg-slate-100 border-[#10B981] cursor-pointer hover:scale-105 transition-all shadow-md shadow-slate-600 border-l-3 rounded-lg  py-2 px-4 flex flex-col justify-between gap-2">
          <p style={{ color: "#10B981" }}>Total Earnings</p>
          <div className="flex justify-between items-center">
            {/* <s.icon color={s.color} /> */}
            <Wallet color="#10B981" />
            <span className=" flex flex-col  font-bold ">
              <span>KSH </span>
              {totalEarningsCount}
            </span>
          </div>
        </div>
        {leadStage.map((s) => (
          <div
            onClick={() => navigate(`/stage/${s.name}`)}
            key={s.id}
            style={{ borderColor: s.color }}
            className="dark:bg-slate-950 bg-slate-100 cursor-pointer hover:scale-105 transition-all shadow-md shadow-slate-600 border-l-3 rounded-lg  py-2 px-4 flex flex-col justify-between gap-2"
          >
            <p style={{ color: s.color }}>{s.name}</p>
            <div className="flex justify-between items-center">
              <s.icon color={s.color} />
              <span className="text-2xl font-bold">
                {s.name == "New"
                  ? newCount
                  : s.name == "Contacted"
                    ? contactedCount
                    : s.name == "Follow up 1 after Contact"
                      ? f1AfterContactCount
                      : s.name == "Last Follow up after Contact"
                        ? lastFAfterContactCount
                        : s.name == "Replied"
                          ? repliedCount
                          : s.name == "Preview Sent"
                            ? previewCount
                            : s.name == "Follow up 1 after Preview"
                              ? f1AfterPreviewCount
                              : s.name == "Last Follow up after Preview"
                                ? lastFAfterPreviewCount
                                : s.name == "Price Sent"
                                  ? priceCount
                                  : s.name == "Follow up 1 after Price"
                                    ? f1AfterPriceCount
                                    : s.name == "Last Follow up after Price"
                                      ? lastFAPriceCount
                                      : s.name == "Negotiating"
                                        ? negotiatingCount
                                        : s.name == "Deposit paid"
                                          ? depositCount
                                          : s.name == "Checklist Sent"
                                            ? checklistCount
                                            : s.name ==
                                                "Follow up after Checklist"
                                              ? fAfterChecklistCount
                                              : s.name == "Building Phase"
                                                ? buildingCount
                                                : s.name == "Review Phase"
                                                  ? reviewCount
                                                  : s.name ==
                                                      "Payment Complete + Pitch Care Plan"
                                                    ? paymentDoneCount
                                                    : s.name ==
                                                        "Closed + On Plan"
                                                      ? closedOnPlanCount
                                                      : s.name ==
                                                          "Closed + Off Plan"
                                                        ? closedOffPlanCount
                                                        : s.name == "Dead"
                                                          ? deadCount
                                                          : s.name ==
                                                              "Not Interested"
                                                            ? noInterestCount
                                                            : null}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Todays view  */}
      <div className="flex flex-col md:flex-row  items-center gap-15  py-10">
        <div className="p-5">
          <h1 className="text-xl pb-3 font-bold ">Today</h1>
          <div
            className={`h-35 border p-3 rounded-lg border-slate-600  overflow-y-auto`}
          >
            {isLoading ? (
              <div>
                <h1>Loading...</h1>
              </div>
            ) : activeFlaggedLeads.length === 0 ? (
              <div>
                <div>
                  <p className="py-3 border px-1 rounded-lg mb-3 gap-2 font-bold  text-[#10B981] tracking-wide flex flex-col items-center">
                    <Coffee size={30} color="#10B981" />
                    <span>No Leads to work on today!</span>
                  </p>
                </div>
              </div>
            ) : (
              activeFlaggedLeads.map(({ lead }) => (
                <div key={lead.id}>
                  <p className="flex gap-15 items-center">
                    <span className="text-lg">{lead.name}</span>{" "}
                    <Link
                      to={`/Lead/${lead.id}`}
                      className="hover:text-blue-600 hover:scale-120 transition-all"
                    >
                      <MoveRight size={35} />
                    </Link>
                  </p>
                </div>
              ))
            )}

            <div
              className={
                "text-center dark:text-slate-950 border-t border-amber-500 pt-2 pb-2"
              }
            >
              {flaggedTasks.map((t) => (
                <div
                  key={t.task.id}
                  className="bg-amber-500 rounded-lg py-2 my-2 "
                >
                  <p className="font-bold mx-2">{t.task.task}</p>
                  <span className="bg-slate-100 p-1 mx-2  rounded-lg">
                    {t.message}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-5">
            <Link
              to="/today"
              className="bg-blue-600 hover:bg-blue-800 dark:text-slate-950 text-slate-100 rounded-lg text-lg font-bold p-2.5  transition-all"
            >
              Go To Today
            </Link>
          </div>
        </div>

        {/* Task feature */}
        <div className="dark:bg-slate-900 bg-slate-50 shadow-md shadow-slate-600 relative max-h-70 overflow-y-auto flex-1 rounded-lg">
          <div className="sticky p-3 top-0 backdrop-blur-xl">
            <div className="flex justify-end ">
              <button
                onClick={openDialog}
                className=" cursor-pointer hover:text-blue-600 transition-all hover:scale-115"
              >
                <Plus size={30} />
              </button>
            </div>

            <h1 className="text-xl font-bold  text-blue-600">Your Tasks</h1>
          </div>
          <ul className="flex p-5 text-center flex-col gap-5">
            {taskLoading ? (
              <div>
                <p>Loading...</p>
              </div>
            ) : activeTasks.length === 0 ? (
              <div>
                <p className="text-lg font-bold tracking-wide text-[#9CA3AF] flex flex-col items-center gap-2">
                  <ClipboardList size={30} color="#9CA3AF" />
                  <span>No tasks Added at the moment!</span>
                </p>
              </div>
            ) : (
              activeTasks.map(
                (t) =>
                  !t.isDeleted && (
                    <div
                      key={t.id}
                      className="dark:bg-slate-950 bg-slate-100 shadow-md shadow-slate-600 p-2 rounded-lg"
                    >
                      <li
                        onClick={() => completeTask(t.id)}
                        className={`flex gap-2 ${t.isCompleted && "text-slate-600 line-through"}  cursor-pointer  hover:scale-95 transition-all items-start text-lg`}
                      >
                        <CheckCircle2 className="hidden md:block" size={25} />{" "}
                        <CheckCircle2 className="md:hidden" size={30} />
                        <span>{t.task}</span>{" "}
                      </li>
                      <span className="flex justify-between pt-3">
                        <button
                          onClick={() => {
                            setTaskToUpdate(t.id);
                          }}
                          className="cursor-pointer hover:scale-110"
                        >
                          <Edit />
                        </button>

                        <div className="bg-amber-500 text-slate-950 rounded-lg px-1">
                          <p className="flex flex-col items-center">
                            <span className="text-sm">Deadline</span>
                            <span>{t.deadline.toString()}</span>
                          </p>
                        </div>
                        <button
                          onClick={() => setTaskToDelete(t.id)}
                          className="cursor-pointer hover:scale-110"
                        >
                          <DeleteIcon />
                        </button>
                      </span>
                    </div>
                  ),
              )
            )}
          </ul>
        </div>
      </div>

      {/* Add Task Modal */}
      <div
        onClick={closeDialog}
        className={`fixed ${modalIsOpen ? "block" : "hidden"} bg-black/50 z-50 inset-0`}
      ></div>
      <AddTaskForm
        addTask={addTask}
        taskText={taskText}
        setTaskText={setTaskText}
        deadline={deadline}
        setDeadline={setDeadline}
        modalIsOpen={modalIsOpen}
      />

      {/* Edit Task Modal */}
      <div
        onClick={() => setTaskToUpdate(null)}
        className={`fixed ${taskToUpdate ? "block" : "hidden"} bg-black/50 z-50 inset-0`}
      ></div>
      <div
        className={`fixed border-t  flex dark:border-slate-600 border-slate-100 justify-center items-center duration-300 z-50  backdrop-blur-xl py-10 overflow-y-auto    shadow-md shadow-slate-700 ${taskToUpdate ? "bottom-0" : "-bottom-350"} rounded-t-4xl transition-all left-0  right-0`}
      >
        <form onSubmit={editTask}>
          <h1 className="text-center text-lg text-slate-100 dark:text-blue-600 font-bold pb-5">
            Update Task
          </h1>
          <div>
            <div>
              <label htmlFor="taskText" className="text-slate-100">
                Task :
              </label>
            </div>
            <input
              value={taskEdit}
              onChange={(e) => setTaskEdit(e.target.value)}
              placeholder="eg. Code a React Component"
              type="text"
              className="border text-slate-100 w-sm md:w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg"
              required
            />
          </div>
          <div className="pt-5">
            <div>
              <label htmlFor="taskText" className="text-slate-100">
                Deadline :
              </label>
            </div>
            <input
              value={deadlineEdit as any}
              onChange={(e) => setDeadlineEdit(e.target.value)}
              className="md:w-lg w-sm  bg-slate-50 text-lg text-slate-950  border-slate-600 p-2 outline-0  rounded-lg border"
              type="date"
              required
            />
          </div>

          <div className="flex justify-center  pt-10">
            <button className="bg-blue-600 hover:scale-105 transition-all dark:text-slate-950 text-slate-100 py-1.5 px-4 font-bold w-30 rounded-lg cursor-pointer">
              Update
            </button>
          </div>
        </form>
      </div>

      {/* Delete Task Modal */}
      <div
        className={`fixed ${taskToDelete ? "block" : "hidden"} bg-black/50 z-50 inset-0`}
      ></div>
      <div
        className={`fixed border-t  flex dark:border-slate-600 border-slate-100 justify-center items-center duration-300 z-50  backdrop-blur-xl py-10 overflow-y-auto shadow-md shadow-slate-700 ${taskToDelete ? "bottom-0" : "-bottom-350"} rounded-t-4xl transition-all left-0  right-0`}
      >
        <div>
          <p className="text-lg text-slate-100  font-bold">
            Are you sure you want to continue ?
          </p>
          <div className="flex justify-between  pt-10">
            <div>
              <button
                onClick={() => setTaskToDelete(null)}
                className="dark:bg-slate-900 bg-slate-50 hover:scale-105 transition-all w-25 py-2 rounded-lg md:w-30 cursor-pointer font-bold"
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                onClick={deleteTask}
                className="dark:bg-slate-100 bg-slate-950 w-25 hover:scale-105 transition-all py-2 text-slate-100 dark:text-slate-950 cursor-pointer rounded-lg md:w-30 font-bold"
              >
                Sure
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Toast */}
      <div
        className={`dark:bg-slate-100 bg-slate-950 z-50 fixed shadow-md shadow-slate-700 top-0 transition-all duration-400 ${showAddToast ? "right-0" : "-right-100"}  m-5 rounded-lg py-5 px-4 text-center text-slate-100 dark:text-slate-950`}
      >
        <p className="flex items-center gap-2">
          <CheckCircleIcon className="dark:text-green-800 text-green-600" />
          <span className="font-light text-lg">Task Added Successfully!</span>
        </p>
      </div>
      {/*Edit Task Toast */}
      <div
        className={`dark:bg-slate-100 bg-slate-950 z-50 fixed shadow-md shadow-slate-700 top-0 transition-all duration-400 ${showEditToast ? "right-0" : "-right-100"}  m-5 rounded-lg py-5 px-4 text-center text-slate-100 dark:text-slate-950`}
      >
        <p className="flex items-center gap-2">
          <CheckCircleIcon className="dark:text-green-800 text-green-600" />
          <span className="font-light text-lg">Task Updated Successfully!</span>
        </p>
      </div>
      {/*Delete Task Toast */}
      <div
        className={`dark:bg-slate-100 bg-slate-950 z-50 fixed shadow-md shadow-slate-700 top-0 transition-all duration-400 ${showDelToast ? "right-0" : "-right-100"}  m-5 rounded-lg py-5 px-4 text-center text-slate-100 dark:text-slate-950`}
      >
        <p className="flex items-center gap-2">
          <CheckCircleIcon className="dark:text-green-800 text-green-600" />
          <span className="font-light text-lg">Task Deletion Completed!</span>
        </p>
      </div>
    </div>
  );
}
