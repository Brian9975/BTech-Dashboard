import {
  AlertTriangleIcon,
  AlignJustifyIcon,
  BookTemplate,
  LayoutDashboard,
  Moon,
  UserCheck2,
  
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isOpenMobile, setIsOpenMobile] = useState(false)
  
  return (
    <div className="bg-slate-950 flex text-slate-50 min-h-screen">

      { isOpenMobile && <div onClick={() => {
         setIsOpenMobile(false)
      }} className={` z-50 md:hidden inset-0 bg-black/50 fixed`}></div>}
      <div className={`bg-slate-900 z-50 transition-all hidden md:block  ${sidebarOpen ? "md:w-xs" : "w-0"} border-r border-blue-500 overflow-y-auto h-screen`}>
        <Link to="/mydash" className={`${sidebarOpen ? "block" : "hidden"}`}>
          <h1 className="text-3xl">
            <div className="flex bg-slate-950 border border-blue-500 m-8 p-3 rounded-lg justify-center gap-2 items-center">
              <LayoutDashboard size={26} />
              <div>
                <span className="text-blue-500 font-bold">BTech</span> Dash
              </div>
            </div>
          </h1>
        </Link>
             <div className={`${sidebarOpen ? "" : ""}`}>
        <Link className="flex bg-slate-950 m-5 px-3 py-2 shadow-md shadow-slate-800 rounded-lg gap-2 text-lg items-center" to="/mydash">
        <LayoutDashboard size={18}/>
        <span>My Dashboard</span>
        </Link>
         <Link className="flex bg-slate-950 m-5 px-3 py-2 shadow-md shadow-slate-800 rounded-lg gap-2 text-lg items-center" to="/today">
        <AlertTriangleIcon size={18}/>
        <span>Today</span>
        </Link>
         <Link className="flex bg-slate-950 m-5 px-3 py-2 shadow-md shadow-slate-800 rounded-lg gap-2 text-lg items-center" to="/leads">
        <UserCheck2 size={18}/>
        <span>Leads</span>
        </Link>
         <Link className="flex bg-slate-950 m-5 px-3 py-2 shadow-md shadow-slate-800 rounded-lg gap-2 text-lg items-center" to="/myscripts">
        <BookTemplate size={18}/>
        <span>My Scripts</span>
        </Link>
        </div>
       
      </div>

      {/* Mobile Sidebar */}
       <div className={`bg-slate-900 z-50 transition-all fixed md:hidden  ${isOpenMobile ? "w-sm" : "w-0"} border-r border-blue-500 overflow-y-auto h-screen`}>
        <Link to="/mydash" onClick={() => setIsOpenMobile(false)}>
          <h1 className="text-3xl">
            <div className="flex bg-slate-950 border border-blue-500 m-8 p-3 rounded-lg justify-center gap-2 items-center">
              <LayoutDashboard size={26} />
              <div>
                <span className="text-blue-500 font-bold">BTech</span> Dash
              </div>
            </div>
          </h1>
        </Link>
             <div >
        <Link onClick={() => setIsOpenMobile(false)}  className="flex bg-slate-950 m-5 px-3 py-2 shadow-md shadow-slate-800 rounded-lg gap-2 text-lg items-center" to="/mydash">
        <LayoutDashboard size={18}/>
        <span>My Dashboard</span>
        </Link>
         <Link onClick={() => setIsOpenMobile(false)} className="flex bg-slate-950 m-5 px-3 py-2 shadow-md shadow-slate-800 rounded-lg gap-2 text-lg items-center" to="/today">
        <AlertTriangleIcon size={18}/>
        <span>Today</span>
        </Link>
         <Link onClick={() => setIsOpenMobile(false)} className="flex bg-slate-950 m-5 px-3 py-2 shadow-md shadow-slate-800 rounded-lg gap-2 text-lg items-center" to="/leads">
        <UserCheck2 size={18}/>
        <span>Leads</span>
        </Link>
         <Link onClick={() => setIsOpenMobile(false)} className="flex bg-slate-950 m-5 px-3 py-2 shadow-md shadow-slate-800 rounded-lg gap-2 text-lg items-center" to="/myscripts">
        <BookTemplate size={18}/>
        <span>My Scripts</span>
        </Link>
        </div>
       
      </div>


      <div className="overflow-y-auto h-screen flex-1 flex-col">
        <div className="sticky z-50   bg-slate-900 top-0 flex items-center p-5 justify-between "><div><button onClick={() => {
          
          setSidebarOpen(!sidebarOpen)
          
        }} className="cursor-pointer hidden md:block border border-slate-700 p-2 rounded-lg"><AlignJustifyIcon size={25}/></button>
        
        <button onClick={() => {
          
          setIsOpenMobile(!isOpenMobile)
          
        }} className="cursor-pointer block md:hidden border border-slate-700 p-2 rounded-lg"><AlignJustifyIcon size={25}/></button>
        </div> <div><button className="cursor-pointer border border-slate-700 p-2 rounded-lg"><Moon size={25}/></button></div></div>
        <main className="p-5">{children}</main>
      </div>
    </div>
  );
}
