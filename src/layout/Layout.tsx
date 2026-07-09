import { LayoutDashboard } from "lucide-react";
import React from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-950 flex text-slate-50 min-h-screen">
      <div className="bg-slate-900 w-xs overflow-y-auto h-screen"><h1 className="text-3xl"><div className="flex bg-slate-950 border border-blue-500 m-8 p-3 rounded-lg justify-center gap-2 items-center"><LayoutDashboard size={26}/><div><span className="text-blue-500 font-bold">BTech</span> Dash</div></div></h1></div>
      <div className="overflow-y-auto h-screen flex-1">
        <div className="sticky bg-slate-900 top-0">Topbar</div>
        <main>{children}</main>
      </div>
    </div>
  );
}
