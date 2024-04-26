import { SideBar } from "../preExistingComponents/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Layout;
