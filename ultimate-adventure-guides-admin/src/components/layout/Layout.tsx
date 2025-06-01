import Header from "./Header.tsx";
import Footer from "./Footer";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen w-screen max-w-full overflow-x-hidden">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;