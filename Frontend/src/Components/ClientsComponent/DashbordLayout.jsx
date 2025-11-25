import React from "react";
import { Outlet } from "react-router-dom";
import NavBarClient from "./NavBarClient";
import SideBarClient from "./SideBarClient";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar fixe en haut */}
      <NavBarClient />
      {/* Contenu principal avec sidebar et contenu dynamique */}
      <div className="flex flex-1 pt-14 overflow-hidden"> 
        {/* Sidebar fixe à gauche */}
        <SideBarClient />
        
        {/* Zone de contenu principale avec défilement */}
        <main className="flex-1 overflow-y-auto p-6 md:p-6 bg-gray-50 ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
}