import AdminHeader from "./AdminHeader.tsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <AdminHeader />
      <main className="flex-1 bg-gray-100 ">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
