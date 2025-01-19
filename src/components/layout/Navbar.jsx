// import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // Adjust the path as needed
import logo from '../../assets/images/logo.png'

const Navbar = () => {
    const { user, logOut } = useAuth(); // Assuming `useAuth` provides `user` and `logout` methods

    const handelLogout = () => {
        logOut()
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return (
        <div className="navbar bg-base-100 shadow-md max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl">
                    <img className="h-full" src={logo} alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <NavLink to="/donation-requests" className={({ isActive }) => isActive ? "font-semibold text-blood" : ""}>
                            Donation Requests
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/blogs" className={({ isActive }) => isActive ? "font-semibold text-blood" : ""}>
                            Blog
                        </NavLink>
                    </li>
                    {user && (
                        <li>
                            <NavLink to="/funding" className={({ isActive }) => isActive ? "font-semibold text-blood" : ""}>
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
                                <img src={user.avatar || "/default-avatar.png"} alt="User Avatar" />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <NavLink to="/dashboard" className={({ isActive }) => isActive ? "font-semibold text-blood" : ""}>
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
    );
};

export default Navbar;
