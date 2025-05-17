import {FC} from "react";
import {Link} from "react-router-dom";
import logo from "../../assets/Logo.avif";

const Footer: FC = () => {
    return (
        <>
            <footer className="bg-gray-800">
                <div className="px-24 py-12">
                    <div className="flex justify-between">
                        <div className="flex flex-col items-start">
                            <h1 className="text-white text-2xl pb-5">Ultimate Adventure Guides</h1>
                            <Link to="/book" className="text-white text-xl">BOOK</Link>
                            <Link to="/" className="text-white text-xl">PAY SHARON</Link>
                        </div>
                        <div className="flex items-center">
                            <Link to="/">
                                <img src={logo} alt="Mountain Logo" className="h-fit w-36"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer