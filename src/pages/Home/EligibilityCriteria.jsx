import { FaCheckCircle } from "react-icons/fa";

const EligibilityCriteria = () => {
    const criteria = [
        "You must be between 18 and 65 years old.",
        "Your weight must be at least 50 kg (110 lbs).",
        "You should be in good general health and feeling well.",
        "No recent tattoos or piercings in the last 6 months.",
        "No major surgeries in the past 6 months.",
        "No recent infections or fever.",
        "You must wait at least 12 weeks between donations for men and 16 weeks for women.",
    ];

    return (
        <div className="bg-gray-100 flex flex-col items-center py-12 px-4 rounded-xl shadow-lg my-12">
            <div className="container mx-auto max-w-3xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Eligibility Criteria</h2>
                    <p className="mt-2 text-lg text-gray-600">Check if you meet the requirements to donate blood.</p>
                </div>
                <div className="mt-8 space-y-4">
                    {criteria.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 hover:shadow-lg transition">
                            <FaCheckCircle className="text-blood text-2xl" />
                            <p className="text-lg text-gray-800">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EligibilityCriteria;
