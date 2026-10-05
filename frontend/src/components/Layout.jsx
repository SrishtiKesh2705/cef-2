import {Outlet, Link} from "react-router-dom";
import"./Layout.css";

function Layout(){
    return (
        <div className="app">
            <nav className="navbar">
                <h2>Campus Event Finder</h2>
                <div className="nav-links">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/student">Student</Link>
                    <Link to="/admin">Admin</Link>
                </div>
            </nav>

            <main className="content">
                <Outlet/>
            </main>
        </div>
    );
}

export default Layout;