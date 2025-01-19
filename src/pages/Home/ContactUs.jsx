import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
    return (
        <div className="bg-base-100 py-12">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-blood">Contact Us</h2>
                <p className="text-gray-600 mt-4 text-lg">
                    We’re here to help! Reach out to us with your questions or feedback.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className="bg-base-200 shadow-xl p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>
                    <form>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Your Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Your Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Your Message</span>
                            </label>
                            <textarea
                                placeholder="Type your message here..."
                                className="textarea textarea-bordered h-24"
                            ></textarea>
                        </div>
                        <div className="form-control mt-4">
                            <button className="btn  bg-blood">Send Message</button>
                        </div>
                    </form>
                </div>

                {/* Contact Information */}
                <div className="flex flex-col justify-center items-start bg-base-200 shadow-xl p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
                    <div className="flex items-center mb-4">
                        <FaPhoneAlt className="text-blood text-2xl mr-4" />
                        <p className="text-lg text-gray-700">+880-1234-567890</p>
                    </div>
                    <div className="flex items-center mb-4">
                        <FaEnvelope className="text-blood text-2xl mr-4" />
                        <p className="text-lg text-gray-700">support@bloodflow.com</p>
                    </div>
                    <div className="flex items-center">
                        <FaMapMarkerAlt className="text-blood text-2xl mr-4" />
                        <p className="text-lg text-gray-700">123 Donation Lane, Dhaka, Bangladesh</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
