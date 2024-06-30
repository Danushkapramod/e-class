import { useState } from "react";
import Sidebar from "../ui/layouts/Sidebar";
import { Outlet } from "react-router-dom";
import Nav from "../ui/layouts/Nav";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  return (
    <div className=" flex  h-dvh w-full text-dark-text-primary">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className=" flex   grow flex-col bg-dark-primary">
        <Nav sidebarHandler={toggleSidebar} />
        <div className="relative grow overflow-auto bg-white/[0.03] p-4 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
