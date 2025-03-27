import {FC} from "react";
import {Link} from 'react-router-dom';

const Header: FC = () => {
    return (
        <nav>
            <div>
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