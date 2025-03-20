import "./NavBar.css";

import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navigation-bar">
            <ul>
                <li> <Link to="/viewProduct">View products</Link></li>
                <li> <Link to="/addProduct">Add product</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;