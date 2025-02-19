import { FaHeartbeat, FaHandsHelping, FaDonate } from "react-icons/fa";

const FeaturedSection = () => {
  return (
    <div className="bg-base-100 my-12 py-2">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blood">Why Choose BloodFlow?</h2>
        <p className="text-gray-600 mt-4 text-lg">
          Empowering lives through safe and easy blood donations. Discover the benefits of joining our community.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="card bg-base-200 shadow-xl p-6 text-center">
          <div className="text-blood text-6xl mb-4">
            <FaHeartbeat />
          </div>
          <h3 className="text-2xl font-semibold">Save Lives</h3>
          <p className="text-gray-600 mt-2">
            Your donation can save up to three lives. Be a hero in someone’s story by donating blood today.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="card bg-base-200 shadow-xl p-6 text-center">
          <div className="text-blood text-6xl mb-4">
            <FaHandsHelping />
          </div>
          <h3 className="text-2xl font-semibold">Community Support</h3>
          <p className="text-gray-600 mt-2">
            Join a community of donors dedicated to making a positive impact on people in need.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="card bg-base-200 shadow-xl p-6 text-center">
          <div className="text-blood text-6xl mb-4">
            <FaDonate />
          </div>
          <h3 className="text-2xl font-semibold">Easy Donations</h3>
          <p className="text-gray-600 mt-2">
            Simplify the donation process with our user-friendly platform and quick donation requests.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
