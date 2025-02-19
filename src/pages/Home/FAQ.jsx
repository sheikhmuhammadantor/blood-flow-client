import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

const FAQSection = () => {
  const faqs = [
    { question: "Who can donate blood?", answer: "Anyone who is healthy, between 18-65 years old, and meets the eligibility criteria can donate blood." },
    { question: "How often can I donate blood?", answer: "You can donate whole blood every 8 weeks and platelets every 2 weeks, up to 24 times a year." },
    { question: "Is blood donation safe?", answer: "Yes, donating blood is completely safe. Sterile needles and equipment are used for each donation." },
    { question: "What should I do before donating?", answer: "Drink plenty of water, eat a healthy meal, and avoid alcohol before your donation." },
    { question: "How long does the donation process take?", answer: "The entire process takes about 45 minutes to an hour, with the actual blood donation lasting around 10 minutes." },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center py-12 px-4 rounded-xl shadow-lg my-12">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center">
          <FaQuestionCircle className="text-blood text-5xl mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
          <p className="mt-2 text-lg text-gray-600">Find answers to common queries about blood donation.</p>
        </div>
        <div className="mt-8 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="collapse collapse-arrow bg-white shadow-md rounded-lg">
              <input type="checkbox" checked={openIndex === index} onChange={() => toggleFAQ(index)} />
              <div className="collapse-title text-lg font-medium text-gray-800">
                {faq.question}
              </div>
              <div className="collapse-content text-gray-600">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;