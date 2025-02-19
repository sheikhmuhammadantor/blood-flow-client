import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content pt-12">
            <div className="container px-4 max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">About BloodFlow</h3>
                        <p className="text-gray-600">
                            BloodFlow connects donors and recipients, making blood donation simple, safe, and impactful. Join us in saving lives one drop at a time.
                        </p>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Useful Links</h3>
                        <ul>
                            <li className="mb-2">
                                <Link to="/donation-requests" className="hover:underline">
                                    Donation Requests
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/blogs" className="hover:underline">
                                    Blogs
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/about-us" className="hover:underline">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact-us" className="hover:underline">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blood text-2xl">
                                <FaFacebookF />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blood text-2xl">
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blood text-2xl">
                                <FaInstagram />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blood text-2xl">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t border-base-300 py-4 text-center">
                    <p className="text-gray-600">&copy; {new Date().getFullYear()} BloodFlow. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
