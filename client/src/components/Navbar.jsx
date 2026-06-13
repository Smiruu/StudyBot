import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../context/authContext';

const Navbar = () => {
    const location = useLocation();

    const { user, logout } = useAuth();
    
    // Helper function to check and apply active navigation states
    const isActive = (path) => {
        return location.pathname === path
            ? "bg-[#2A2635] text-[#FDCF11] font-bold"
            : "text-gray-400 hover:text-white hover:bg-[#25212E]/50";
    };

    return (
        <nav className="hidden md:flex flex-col h-full py-8 bg-[#15131A] fixed left-0 top-0 w-[280px] border-r border-gray-800/60 z-10 text-white">

            {/* Branding Header Area */}
            <div className="px-6 mb-8 flex items-center space-x-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FDCF11] text-[#15131A] flex items-center justify-center font-black text-xl">
                    S
                </div>
                <div>
                    <h1 className="text-xl font-extrabold tracking-tight">Studybot</h1>
                    <p className="text-xs text-gray-400">Academic Assistant</p>
                </div>
            </div>

            {/* Action Button: Stays at top context
            <div className="px-6 mb-8">
                <button className="w-full bg-[#FDCF11] text-[#15131A] font-bold py-3 rounded-2xl flex items-center justify-center space-x-2 hover:bg-[#e2b90f] transition-colors shadow-lg shadow-[#FDCF11]/10">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    <span>New Chat</span>
                </button>
            </div> */}

            {/* Navigation Links List */}
            <ul className="flex-1 px-4 space-y-2 text-sm font-medium">
                <li>
                    <Link to="/dashboard" className={`flex items-center py-3 px-4 rounded-2xl transition-colors ${isActive('/dashboard')}`}>
                        <span className="material-symbols-outlined mr-3 text-[22px]">book</span> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/quizzes" className={`flex items-center py-3 px-4 rounded-2xl transition-colors ${isActive('/quizzes')}`}>
                        <span className="material-symbols-outlined mr-3 text-[22px]">quiz</span> Quizzes
                    </Link>
                </li>
                <li>
                    <Link to="/analytics" className={`flex items-center py-3 px-4 rounded-2xl transition-colors ${isActive('/analytics')}`}>
                        <span className="material-symbols-outlined mr-3 text-[22px]">bar_chart</span> Analytics
                    </Link>
                </li>
                <li>
                    <Link to="/settings" className={`flex items-center py-3 px-4 rounded-2xl transition-colors ${isActive('/settings')}`}>
                        <span className="material-symbols-outlined mr-3 text-[22px]">settings</span> Settings
                    </Link>
                </li>
            </ul>

            {/* Persistent Bottom Controls Footer */}
            <div className="mt-auto px-4 space-y-2 text-sm font-medium border-t border-gray-800/60 pt-4">
                {/* User Card Profile Item added back from blueprint */}
                <div className="flex items-center py-2 px-4 text-gray-300">
                    <span className="material-symbols-outlined mr-3 text-[22px]">account_circle</span>
                    <span className="truncate">{user.username}</span>
                </div>

                <Link to="/help" className={`flex items-center py-3 px-4 rounded-2xl transition-colors ${isActive('/help')}`}>
                    <span className="material-symbols-outlined mr-3 text-[22px]">help</span>
                    Help
                </Link>

                <button
                    onClick={() => { logout() }}
                    className="w-full flex items-center py-3 px-4 rounded-2xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
                >
                    <span className="material-symbols-outlined mr-3 text-[22px]">logout</span>
                    Sign Out
                </button>
            </div>
        </nav>
    );
};

export default Navbar;