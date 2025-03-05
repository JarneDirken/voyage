import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="p-6 flex items-center justify-between shadow-lg">
            <div>
                Trip planner logo
            </div>
            <div className="flex gap-4">
                <Link to="/">Home</Link>
                <Link to="/trip">Planifier voyage</Link>
                <Link to="/trips">Voyages</Link>
            </div>
            <div className="flex gap-2">
                <span>Login</span>
                <span>Register</span>
            </div>
        </nav>
    );
}