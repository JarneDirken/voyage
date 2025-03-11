import { Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    
    return (
        <nav className="bg-white z-10 p-6 flex items-center justify-between shadow-lg">
            <div>
                Trip planner logo
            </div>
            <div className="flex gap-4">
                <Link to="/" className={`hover:scale-105 transition ease-in-out`}>Home</Link>
                <Link to="/trip" className={`hover:scale-105 transition ease-in-out`}>Planifier voyage</Link>
                <Link to="/trips" className={`hover:scale-105 transition ease-in-out`}>Voyages</Link>
            </div>
            <div className="flex gap-2">
            {!isAuthenticated() ? (
                <>
                    <Link to="/register" className={`hover:scale-105 transition ease-in-out`}>Register</Link>
                    <Link to="/login" className={`hover:scale-105 transition ease-in-out`}>Login</Link>
                </>
                ) : (
                <>
                    <Link to="/profile" className={`hover:scale-105 transition ease-in-out`}>Profile</Link>
                    <button onClick={logout} className="cursor-pointer hover:scale-105 transition ease-in-out">Logout</button>
                </>
            )}
            </div>
        </nav>
    );
}