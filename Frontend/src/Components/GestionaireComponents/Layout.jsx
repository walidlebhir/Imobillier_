import React from 'react'
import { Outlet } from 'react-router-dom'

import NavbarManager  from './Navbarmanager'
import SidebareManger from './SidebarM'



export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Navbar fixe en haut */}
        <NavbarManager />
        {/* Contenu principal avec sidebar et contenu dynamique */}
        <div className="flex flex-1 pt-14 overflow-hidden"> 

            {/* Sidebar fixe à gauche */}
            <SidebareManger />
            
            {/* Zone de contenu principale avec défilement */}
            <main className="flex-1 overflow-y-auto p-6  md:p-6 bg-gray-50 ml-64"> {/* Ajout de ml-64 pour compenser la sidebar */}
                <Outlet />
            </main>

        </div>
    </div>
  )
}
