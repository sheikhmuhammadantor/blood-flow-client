import { FaHeartbeat } from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutUs = () => {
    return (
        <div>
            {/* About Us */}
            <section className="py-12 bg-gray-100 text-center rounded-xl shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center">
                        <FaHeartbeat className="text-red-500 text-5xl mb-4" />
                        <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
                        <p className="mt-4 text-lg">BloodFlow connects donors with those in need, making every drop count.</p>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                            BloodFlow is a life-saving platform connecting blood donors with those in urgent need. Our mission is to ensure that no life is lost due to a lack of blood. By creating a seamless and efficient donor network, we aim to make blood donation more accessible and hassle-free.
                        </p>
                        <p className="mt-2 text-lg text-gray-600 max-w-2xl">
                            Join us in making a difference—every drop counts, and together, we can save lives.
                        </p>
                        <Link to='/donation-requests' className="btn bg-blood text-white mt-6">Donate Now</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;