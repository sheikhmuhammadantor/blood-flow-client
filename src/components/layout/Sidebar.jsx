import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
// import { FcSettings } from 'react-icons/fc'
// import { BsGraphUp } from 'react-icons/bs'
// import MenuItem from './Menu/MenuItem'

import useAuth from '../../hooks/useAuth'

// import AdminMenu from './Menu/AdminMenu'
import { Link, NavLink } from 'react-router-dom'
// import SellerMenu from './Menu/SellerMenu'
// import CustomerMenu from './Menu/CustomerMenu'
import logo from '../../assets/images/logo.png'
import { FaBars } from 'react-icons/fa'
const Sidebar = () => {
    const { logOut } = useAuth()
    const [isActive, setActive] = useState(true)

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }
    return (
        <aside>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to="/" className="btn btn-ghost text-xl">
                            <img className="h-full" src={logo} alt="logo" />
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <FaBars className='h-5 w-5' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center mx-auto'>
                            <Link to="/" className="btn btn-ghost text-xl">
                                <img className="h-full" src={logo} alt="" />
                            </Link>
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>
                        <ul className="menu bg-base-200 rounded-box space-y-2">
                            <li><NavLink to='/'>a</NavLink></li>
                            <li><NavLink to='create-donation-request'>Create Donation Request</NavLink></li>
                            <li><NavLink to='profile'>Profile</NavLink></li>
                        </ul>
                    </div>
                </div>

                <div>
                    <hr />
                    <button
                        onClick={logOut}
                        className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'>
                        <GrLogout className='w-5 h-5' />
                        <span className='mx-4 font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
