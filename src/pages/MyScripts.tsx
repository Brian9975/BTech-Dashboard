import useCopyToClipboard from "../hooks/useCopyToClipboard";

import { useScript } from "../context/ScriptContext";
import useAddScript from "../hooks/useAddScript";
import type { BCategory } from "../types/planStageCateg";
import { useAuth } from "../context/AuthContext";
import { CheckCircleIcon, UserPlus } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import useToast from "../hooks/useToast";

// import { scriptData } from "../ScriptData";
export default function MyScripts() {
  const { copyText, scriptCopied } = useCopyToClipboard();
  const { scripts } = useScript();
  const { showToast, hideToast, toastOn } = useToast();
  const { syncLoading } = useTheme();
  const {
    modalOpen,
    setModalOpen,
    addScript,
    setScriptMessage,
    niche,
    setNiche,
    scriptTitle,
    setScriptTitle,
    scriptMessage,
  } = useAddScript();
  const { user } = useAuth();
  const activeScripts = scripts.filter(
    (s) => s.userId === user!.uid && !s.isDeleted,
  );
  const scriptTitleOption: string[] = [
    "Hook A",
    "Hook B",
    "Hook C",
    "Hook Follow-up 1",
    "Hook Last Follow-up",
    "Preview A",
    "Preview B",
    "Preview C",
    "Preview Follow-up 1",
    "Preview Last Follow-up",
    "Price Inquiry A",
    "Price Inquiry B",
    "Price Inquiry C",
    "Price Follow-up 1",
    "Price Last Follow-up",
    "Payment Details",
    "Checklist after Deposit",
    "Handover",
    "Final Payment + Care Plan Pitch",
  ];

  const bCategoryOption: BCategory[] = [
    {
      id: 1,
      name: "pharmacy",
    },
    {
      id: 2,
      name: "Construction Company",
    },
    {
      id: 3,
      name: "restaurant",
    },
  ];

  return (
    <div className="">
      <div className="flex justify-end">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 rounded-lg cursor-pointer text-slate-100  dark:text-slate-950 py-2 px-4 text-lg font-bold"
        >
          Add Script
        </button>
      </div>

      {/* Add Script Modal */}
      <div
        onClick={() => {
          setModalOpen(false);
        }}
        className={`fixed ${modalOpen ? "flex" : "hidden"}  justify-center items-center inset-0 bg-black/50 z-50`}
      >
        <form
          onSubmit={(e) => {
            addScript(e);
            showToast();
            setTimeout(() => {
              hideToast();
            }, 3000);
          }}
          onClick={(e) => e.stopPropagation()}
          className="dark:bg-slate-900 bg-slate-50 rounded-2xl p-8 md:w-md"
        >
          <h3 className="text-center text-lg font-bold text-blue-600 pb-8">
            Enter Script Details
          </h3>
          <div>
            <label>Script Title:</label>
            <div>
              <select
                value={scriptTitle}
                onChange={(e) => setScriptTitle(e.target.value)}
                className="border w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg"
                required
              >
                <option
                  value=""
                  className="dark:bg-slate-950 bg-slate-100"
                  disabled
                >
                  Select Title
                </option>
                {scriptTitleOption.map((t) => (
                  <option
                    key={t}
                    className={`dark:bg-slate-950 bg-slate-100`}
                    value={t}
                  >
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="pt-5">
            <label>Niche:</label>
            <div>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="border w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg"
                required
              >
                <option
                  value=""
                  className="dark:bg-slate-950 bg-slate-100"
                  disabled
                >
                  Select Niche
                </option>
                {bCategoryOption.map((c) => (
                  <option
                    className={`dark:bg-slate-950 bg-slate-100`}
                    value={c.name}
                  >
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="py-5">
            <label>Message:</label>
            <div>
              <textarea
                value={scriptMessage}
                onChange={(e) => setScriptMessage(e.target.value)}
                className="max-h-30 resize-none border w-full border-slate-600 p-2 outline-0 placeholder-slate-700 rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <button className="bg-slate-950 transition-all hover:opacity-80 hover:scale-95 text-slate-100 dark:bg-slate-100 dark:text-slate-950 px-3 py-1.5 rounded-lg cursor-pointer  text-lg font-bold w-full">
              Add
            </button>
          </div>
        </form>
      </div>

      {/* Render Scripts */}
      {syncLoading && activeScripts.length === 0 ? (
        <div>
          <div
            className={`text-3xl  font-bold text-center h-screen flex justify-center items-center dark:bg-slate-950  dark:text-slate-100 text-slate-950  bg-slate-100`}
          >
            <div
              className={`h-20 w-20 animate-spin rounded-full border-8    border-t-transparent`}
            ></div>
          </div>
        </div>
      ) : activeScripts.length === 0 ? (
        <div className="flex justify-center ">
          <div className="dark:bg-slate-900 bg-slate-50 text-[#9CA3AF] rounded-lg py-5 px-10 sm:text-xl flex flex-col items-center justify-center gap-2  shadow-md my-30 shadow-slate-600">
            <UserPlus size={30} />
            <span>No added scripts at the moment!</span>
          </div>
        </div>
      ) : (
        <main className="grid  md:grid-cols-3 p-5  grid-cols-1  justify-items-center  gap-10">
          {activeScripts.map((sc) => (
            <div key={sc.id}>
              <div className="dark:bg-slate-900 bg-slate-50 shadow-md shadow-slate-600 relative px-3 py-5 rounded-lg max-w-75">
                <p className="tracking-wider overflow-auto">{sc.message}</p>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => copyText(sc.message, sc.id)}
                    className="bg-slate-600 text-slate-100 px-4 py-1 rounded-lg cursor-pointer hover:scale-102 transition-all"
                  >
                    {scriptCopied === sc.id ? "Copied ✓" : "Copy"}
                  </button>
                </div>
                <span className="border-blue-600 border left-1/2 top-0 -translate-y-1/2 -translate-x-1/2  absolute py-1 px-2 rounded-lg text-sm text-ellipsis font-bold">
                  {sc.title}
                </span>
              </div>
            </div>
          ))}
        </main>
      )}

      {/* Toast Notification */}
      {
        <div
          className={`dark:bg-slate-100 bg-slate-950 fixed shadow-md shadow-slate-700 bottom-0 transition-all duration-400 ${toastOn ? "right-0" : "-right-100"}  m-5 rounded-lg py-5 px-4 text-center text-slate-100 dark:text-slate-950`}
        >
          <p className="flex items-center gap-2">
            <CheckCircleIcon className="text-green-600 dark:text-green-800" />
            <span className="font-light text-lg">
              Script Added Successfully!
            </span>
          </p>
        </div>
      }
    </div>
  );
}
