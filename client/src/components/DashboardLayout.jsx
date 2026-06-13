import { Outlet, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../context/authContext";

const DashboardLayout = () => {
  const { isAuthenticated,isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" /> 
  }
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#1A1821] text-white">
      
      <Navbar />

      <main className="flex-1 overflow-y-auto p-6 ml-[280px]">
        <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardLayout;