import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile & Desktop Flex Container */}
      <div className="flex flex-col sm:flex-row">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-4 sm:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
