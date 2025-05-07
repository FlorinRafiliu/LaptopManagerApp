import "./NavBar.css";

import { Link } from "react-router-dom";

function NavBar() {

    const user = JSON.parse(localStorage.getItem("user") || null);
    function logout() {
        localStorage.clear("user");
    }

    return (
        <nav className="navigation-bar">
            <ul>
                {user != null && <li> <Link to="/viewProduct">View products</Link></li>}
                {user != null && <li> <Link to="/addProduct">Add product</Link></li>}
                {user != null && <li> <Link to="/login" onClick={logout}>Logout</Link></li>}
                {user != null && user.role === "admin" && <li> <Link to="/monitoredUsers">Monitored Users</Link></li>}
                {/* <li> <Link to="/viewProduct">View products</Link></li>
                <li> <Link to="/addProduct">Add product</Link></li>
                <li> <Link to="/login" onClick={logout}>Logout</Link></li> */}
            </ul>
        </nav>
    );
};

export default NavBar;