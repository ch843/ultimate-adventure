import { useState } from 'react';
import {Link} from "react-router-dom";
import logo from '../../assets/Logo.avif';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const linkStyle = 'text-white hover:text-orange-400 active:text-orange-400 mx-5 font-semibold'

    return (
        <header className="fixed w-full bg-gray-800 shadow-md z-50">
            {/* Desktop Navigation */}
            <div className="container mx-auto px-4 py-5 flex justify-center items-center">
                <nav className="hidden md:flex space-x-8 text-2xl items-center">
                    <img src={logo} alt="Mountain Logo" className="h-fit"/>
                    <Link to="/" className={linkStyle}>HOME</Link>
                    <Link to="/book" className={linkStyle}>BOOK YOUR ADVENTURE</Link>
                    <Link to="/reviews" className={linkStyle}>REVIEWS</Link>
                    <Link to="/about" className={linkStyle}>ABOUT</Link>
                </nav>
            </div>

            <div className='md:hidden container mx-auto px-4 py-3 flex justify-between items-center'>
                <img src={logo} alt="Mountain Logo" className="h-auto"/>

                {/* Mobile menu button */}
                <button
                    className="focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        stroke="white"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className="md:hidden bg-gray-800 px-4 pt-4 pb-6 shadow-inner justify-between">
                    <div className="flex flex-col space-y-3">
                        <Link to="/" className={linkStyle}>HOME</Link>
                        <Link to="/book" className={linkStyle}>BOOK YOUR ADVENTURE</Link>
                        <Link to="/reviews" className={linkStyle}>REVIEWS</Link>
                        <Link to="/about" className={linkStyle}>ABOUT</Link>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;