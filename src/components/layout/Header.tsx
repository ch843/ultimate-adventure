import { useState } from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed w-full bg-white shadow-md z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <h1 className="text-primary text-2xl font-bold">Ultimate Adventure Guides</h1>
                </div>

                {/* Desktop Navigation */}
                <nav className="md:flex space-x-8">
                    <Link to="/" className="text-dark hover:text-primary font-medium py-2">Home</Link>
                    <Link to="/book" className="text-dark hover:text-primary font-medium py-2">Book Your Adventure</Link>
                    <Link to="/reviews" className="text-dark hover:text-primary font-medium py-2">Reviews</Link>
                    <Link to="/about" className="text-dark hover:text-primary font-medium py-2">About</Link>
                </nav>

                {/* Mobile menu button */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
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
                <nav className="md:hidden bg-white px-4 pt-2 pb-4 shadow-inner">
                    <div className="flex flex-col space-y-3">
                        <Link to="/" className="text-dark hover:text-primary font-medium py-2">Home</Link>
                        <Link to="/book" className="text-dark hover:text-primary font-medium py-2">Book Your Adventure</Link>
                        <Link to="/reviews" className="text-dark hover:text-primary font-medium py-2">Reviews</Link>
                        <Link to="/about" className="text-dark hover:text-primary font-medium py-2">About</Link>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;