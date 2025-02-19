import { FaTint } from "react-icons/fa";

const DonationProcess = () => {
  const steps = [
    { title: "Registration", description: "Sign up and fill out a short health questionnaire.", icon: <FaTint className="text-blood text-3xl" /> },
    { title: "Health Checkup", description: "A quick health screening to ensure you're eligible.", icon: <FaTint className="text-blood text-3xl" /> },
    { title: "Donation", description: "The actual blood donation takes about 10 minutes.", icon: <FaTint className="text-blood text-3xl" /> },
    { title: "Rest & Refresh", description: "Enjoy some snacks and refreshments after donating.", icon: <FaTint className="text-blood text-3xl" /> },
    { title: "Save Lives", description: "Your donation will help save lives in need.", icon: <FaTint className="text-blood text-3xl" /> },
  ];

  return (
    <div className="bg-gray-100 flex flex-col items-center py-12 px-4 my-12 rounded-xl shadow-lg">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Donation Process</h2>
          <p className="mt-2 text-lg text-gray-600">Follow these simple steps to donate blood and save lives.</p>
        </div>
        <div className="mt-8 space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 hover:shadow-lg transition">
              {step.icon}
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">{step.title}</h3>
                <p className="text-lg text-gray-600 mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationProcess;
