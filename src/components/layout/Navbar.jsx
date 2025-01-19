import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from '../../assets/images/logo.png'
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handelLogout = () => {
        logOut()
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <section className="shadow-md bg-base-100">
            <div className="navbar bg-base-100 max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 fixed left-[50%] -translate-x-[50%] z-10">
                <div className="navbar-start flex items-center">
                    <div className="flex items-center">
                        <button className="lg:hidden btn btn-ghost btn-circle ml-auto" onClick={toggleMenu} >
                            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                        <Link to="/" className="btn btn-ghost text-xl">
                            <img className="h-full" src={logo} alt="" />
                        </Link>
                    </div>
                </div>
                <div className={`navbar-center lg:flex ${isMenuOpen ? "absolute" : "hidden"} top-16 left-11`}>
                    <ul className="menu menu-compact lg:menu-horizontal px-1 bg-slate-500/95 lg:bg-transparent rounded-xl lg:rounded-none lg:shadow-none shadow-xl text-white font-semibold lg:text-black">
                        <li>
                            <NavLink to="/donation-requests" className={({ isActive }) => isActive ? "font-semibold text-primary" : ""}>
                                Donation Requests
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? "font-semibold text-primary" : ""}>
                                Blog
                            </NavLink>
                        </li>
                        {user && (
                            <li>
                                <NavLink to="/funding" className={({ isActive }) => isActive ? "font-semibold text-primary" : ""}>
                                    Funding
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL} alt="User Avatar" />
                                    {console.log(user)}
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? "font-semibold text-primary" : ""}>
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <button onClick={handelLogout} className="btn btn-error btn-sm">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <NavLink to="/login" className="btn bg-blood text-white btn-sm">
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Navbar;
