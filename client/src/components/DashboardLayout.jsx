import { useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../context/authContext";

const DashboardLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace /> 
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#1A1821] text-white relative">
      
      <Navbar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />

      <div className="flex-1 flex flex-col h-full overflow-hidden md:ml-[280px]">
        {/* Mobile Header with Burger Icon */}
        <header className="md:hidden flex items-center justify-between px-6 h-20 bg-[#15131A] border-b border-gray-800/60 shrink-0 sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FDCF11] text-[#15131A] flex items-center justify-center font-black text-xl">S</div>
            <span className="text-xl font-extrabold tracking-tight">Studybot</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -mr-2 text-gray-300 hover:text-white">
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;