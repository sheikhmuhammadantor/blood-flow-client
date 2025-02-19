const LandingPage = () => {
    return (
        <div>
            {/* About Us
            <section className="py-12 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold">About Us</h2>
            </section> */}

            {/* How It Works */}
            <section className="py-12 text-center">
                <h2 className="text-3xl font-bold">How It Works</h2>
                <p className="mt-4 text-lg">1. Register as a donor  2. Request blood  3. Save lives</p>
            </section>

            {/* Testimonials */}
            <section className="py-12 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold">Testimonials</h2>
                <p className="mt-4 text-lg">{`"BloodFlow helped me find a donor in minutes!"`} - A grateful recipient</p>
            </section>

            {/* Our Impact */}
            <section className="py-12 text-center">
                <h2 className="text-3xl font-bold">Our Impact</h2>
                <p className="mt-4 text-lg">5000+ lives saved, 10,000+ donors registered.</p>
            </section>

            {/* Donation Process */}
            <section className="py-12 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold">Donation Process</h2>
                <p className="mt-4 text-lg">Learn about the steps involved in blood donation.</p>
            </section>

            {/* Eligibility Criteria */}
            <section className="py-12 text-center">
                <h2 className="text-3xl font-bold">Eligibility Criteria</h2>
                <p className="mt-4 text-lg">Check if you are eligible to donate blood.</p>
            </section>

            {/* FAQ */}
            <section className="py-12 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
                <p className="mt-4 text-lg">Find answers to common queries about blood donation.</p>
            </section>

            {/* Join As A Volunteer */}
            <section className="py-12 text-center">
                <h2 className="text-3xl font-bold">Join As A Volunteer</h2>
                <p className="mt-4 text-lg">Become a part of our life-saving community.</p>
            </section>

            {/* Latest Blog & News */}
            <section className="py-12 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold">Latest Blog & News</h2>
                <p className="mt-4 text-lg">Stay updated with the latest in blood donation.</p>
            </section>

            {/* Download Our App */}
            <section className="py-12 text-center">
                <h2 className="text-3xl font-bold">Download Our App</h2>
                <p className="mt-4 text-lg">Get our app for easier blood donation and requests.</p>
            </section>
        </div>
    );
};

export default LandingPage;
