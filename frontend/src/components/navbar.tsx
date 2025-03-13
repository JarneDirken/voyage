import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { FiLogOut } from "react-icons/fi";

export default function Navbar() {
    const location = useLocation();
    const { isAuthenticated, logout } = useAuth();
    const isActive = (path: string) => location.pathname === path ? "font-semibold" : "";
    
    return (
        <nav className="bg-white z-90 p-6 flex items-center justify-between shadow-lg border border-gray-300">
            <div>
                Trip planner logo
            </div>
            <div className="flex gap-4 items-center">
                <Link to="/" className={`${isActive("/")} hover:scale-105 transition ease-in-out`}>Home</Link>
                <Link to="/tripsPublic" className={`${isActive("/tripsPublic")} hover:scale-105 transition ease-in-out`}>Public Voyages</Link>
                {isAuthenticated() && (
                    <>
                         <Link to="/trip" className={`${isActive("/trip")} hover:scale-105 transition ease-in-out`}>Planifier voyage</Link>
                         <Link to="/trips" className={`${isActive("/trips")} hover:scale-105 transition ease-in-out`}>Voyages</Link>
                    </>
                )}
            </div>
            <div className="flex gap-2 items-center">
            {!isAuthenticated() ? (
                <>
                    <Link to="/register" className={`${isActive("/register")} hover:scale-105 transition ease-in-out`}>Register</Link>
                    <Link to="/login" className={`${isActive("/login")} hover:scale-105 transition ease-in-out`}>Login</Link>
                </>
                ) : (
                <>
                    <Link to="/profile" className={`${isActive("/profile")} hover:scale-105 transition ease-in-out`}>Profile</Link>
                    <FiLogOut onClick={logout} className="cursor-pointer hover:scale-105 transition ease-in-out text-red-600 text-xl"/>
                </>
            )}
            </div>
        </nav>
    );
}