import { FC, ReactNode } from "react";
import Header from "./Header.tsx";
import Footer from "./Footer";

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 p-4">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;