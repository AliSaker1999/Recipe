import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";


import { Outlet } from "react-router-dom";

const DashboardLayout = () => {


  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
