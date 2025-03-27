import { FC } from "react";
import Header from "./Header.tsx";
import Footer from "./Footer";
import {Outlet} from "react-router-dom";

const Layout: FC= () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;