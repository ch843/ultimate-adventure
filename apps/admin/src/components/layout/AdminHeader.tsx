import { Link, useLocation } from "react-router-dom";
import { Button } from "@ultimate-adventure/shared-components";
import logo from "../../assets/Logo.avif";

const AdminHeader = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Adventures" },
    { path: "/members", label: "Members" },
    { path: "/trips", label: "Trips" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Ultimate Adventure" className="h-10" />
            <span className="font-semibold text-xl hidden md:inline-block">
              Admin
            </span>
          </Link>
        </div>

        <nav className="flex items-center space-x-1 flex-1">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "default" : "ghost"}
              asChild
            >
              <Link to={item.path}>{item.label}</Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
