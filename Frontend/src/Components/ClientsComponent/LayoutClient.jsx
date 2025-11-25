import React from "react";
import { Outlet } from "react-router-dom";
import NavBarClient from "./NavBarClient";
import FooterClient from "./footerClient";

export default function LayoutClient() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* Navbar */}
      <div>
        <NavBarClient />
      </div>

      {/* Contenu principal */}
      <main className="flex-1 mt-16 p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <div>
        <FooterClient />
      </div>
      
    </div>
  );
}
