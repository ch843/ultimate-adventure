import Header from "./Header.tsx";
import Footer from "./Footer";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-[72px]">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;