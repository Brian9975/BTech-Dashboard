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

  
  return (
    <div className="bg-slate-950 flex text-slate-50 min-h-screen">
      <div className={`bg-slate-900 transition-all  ${sidebarOpen ? "w-xs" : "w-0"} border-r border-blue-500 overflow-y-auto h-screen`}>
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
             <div className={`${sidebarOpen ? "block" : "hidden"}`}>
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
      <div className="overflow-y-auto h-screen flex-1">
        <div className="sticky bg-slate-900 top-0 flex items-center p-5 justify-between "><div><button onClick={() => setSidebarOpen(!sidebarOpen)} className="cursor-pointer border border-slate-700 p-2 rounded-lg"><AlignJustifyIcon size={25}/></button></div> <div><button className="cursor-pointer border border-slate-700 p-2 rounded-lg"><Moon size={25}/></button></div></div>
        <main className="p-5">{children}</main>
      </div>
    </div>
  );
}
