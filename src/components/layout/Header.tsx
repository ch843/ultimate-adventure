import {FC} from "react";
import {Link} from 'react-router-dom';

const Header: FC = () => {
    return (
        <nav className="bg-gray-800">
            <div className="text-white">
                <Link to="/">Home</Link>
            </div>
            <div>
                <Link to="/book">Book Your Adventure</Link>
            </div>
            <div >
                <Link to="/reviews">Reviews</Link>
            </div>
            <div >
                <Link to="/about">About</Link>
            </div>
        </nav>
    )
}

export default Header