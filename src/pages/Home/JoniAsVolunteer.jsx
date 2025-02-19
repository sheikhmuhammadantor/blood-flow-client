import toast from "react-hot-toast";

const JoinAsVolunteer = () => {

    const handelSubmit = (e) => {
        e.preventDefault();
        toast.success('Request Submitted Successfully');
        e.target.reset();
    }

  return (
    <div className="bg-gray-100 flex flex-col items-center py-12 px-4 my-12 rounded-xl shadow-lg">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Join As A Volunteer</h2>
          <p className="mt-2 text-lg text-gray-600">
            Become a part of our mission to save lives. Join us as a volunteer and make a difference in your community.
          </p>
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Volunteer With Us?</h3>
          <ul className="list-disc list-inside text-lg text-gray-600 space-y-2">
            <li>Help organize blood donation drives.</li>
            <li>Educate and spread awareness about blood donation.</li>
            <li>Support donors during the donation process.</li>
            <li>Be a part of a life-saving community.</li>
          </ul>
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Volunteer Request Form</h3>
          <form onSubmit={handelSubmit} className="space-y-4">
            <input type="text" placeholder="Full Name" className="input input-bordered w-full" required />
            <input type="email" placeholder="Email Address" className="input input-bordered w-full" required />
            <input type="tel" placeholder="Phone Number" className="input input-bordered w-full" required />
            <textarea placeholder="Why do you want to volunteer?" className="textarea textarea-bordered w-full" rows="3" required></textarea>
            <button type="submit" className="btn bg-blood text-white w-full">Submit Request</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinAsVolunteer;
