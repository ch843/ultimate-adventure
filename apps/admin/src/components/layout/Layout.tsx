import AdminHeader from "./AdminHeader.tsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="flex-1 bg-background ">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
