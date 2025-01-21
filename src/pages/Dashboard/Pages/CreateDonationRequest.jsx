import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import '/node_modules/react-datepicker/dist/react-datepicker.css';
import { FaRegCalendarAlt, FaClock } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const CreateDonationRequest = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const [formData, setFormData] = useState({
        recipientName: "",
        recipientDistrict: "",
        recipientUpazila: "",
        hospitalName: "",
        addressLine: "",
        bloodGroup: "A+",
        donationDate: new Date(),
        donationTime: "",
        requestMessage: "",
    });

    // Load district and upazila data
    useEffect(() => {
        const loadGeoData = async () => {
            const districtData = await axios("/districts.json");
            const upazilaData = await axios("/upazilas.json");
            setDistricts(districtData.data);
            setUpazilas(upazilaData.data);
        };
        loadGeoData();
    }, []);

    // Filter upazilas based on selected district
    useEffect(() => {
        const filtered = upazilas.filter(
            (upazila) => upazila.district_id === formData.recipientDistrict
        );
        setFilteredUpazilas(filtered);
    }, [formData.recipientDistrict, upazilas]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const donationRequest = {
            requesterName: user.displayName,
            requesterEmail: user.email,
            ...formData,
        };

        try {
            const res = await axiosPublic.post("/create-donate-request", donationRequest);
            if (res.data.insertedId) toast.success("Donation request created successfully!");
        } catch (error) {
            console.error("Failed to create donation request:", error);
            toast.error("Failed to create donation request. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-blood">Create Donation Request</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label">Requester Name</label>
                        <input
                            type="text"
                            value={user?.displayName}
                            readOnly
                            className="input input-bordered w-full bg-gray-200"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Requester Email</label>
                        <input
                            type="email"
                            value={user?.email}
                            readOnly
                            className="input input-bordered w-full bg-gray-200"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Recipient Name</label>
                        <input
                            type="text"
                            name="recipientName"
                            value={formData.recipientName}
                            onChange={handleInputChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Recipient District</label>
                        <select
                            name="recipientDistrict"
                            value={formData.recipientDistrict}
                            onChange={handleInputChange}
                            required
                            className="select select-bordered w-full"
                        >
                            <option value="">Select District</option>
                            {districts.map((district) => (
                                <option key={district.id} value={district.id}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">Recipient Upazila</label>
                        <select
                            name="recipientUpazila"
                            value={formData.recipientUpazila}
                            onChange={handleInputChange}
                            required
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Upazila</option>
                            {filteredUpazilas.map((upazila) => (
                                <option key={upazila.id} value={upazila.id}>
                                    {upazila.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">Hospital Name</label>
                        <input
                            type="text"
                            name="hospitalName"
                            value={formData.hospitalName}
                            onChange={handleInputChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Full Address Line</label>
                        <input
                            type="text"
                            name="addressLine"
                            value={formData.addressLine}
                            onChange={handleInputChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Blood Group</label>
                        <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleInputChange}
                            required
                            className="select select-bordered w-full"
                        >
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">Donation Date</label>
                        <div className="relative">
                            <FaRegCalendarAlt className="absolute top-3 left-3 text-gray-500" />
                            <DatePicker
                                selected={formData.donationDate}
                                onChange={(date) =>
                                    setFormData({ ...formData, donationDate: date })
                                }
                                className="input input-bordered w-full pl-10"
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">Donation Time (24h)</label>
                        <div className="relative">
                            <FaClock className="absolute top-3 left-3 text-gray-500" />
                            <input
                                type="time"
                                name="donationTime"
                                value={formData.donationTime}
                                onChange={handleInputChange}
                                required
                                className="input input-bordered w-full pl-10"
                            />
                        </div>
                    </div>
                    <div className="form-control lg:col-span-2">
                        <label className="label">Request Message</label>
                        <textarea
                            name="requestMessage"
                            value={formData.requestMessage}
                            onChange={handleInputChange}
                            required
                            className="textarea textarea-bordered w-full"
                        ></textarea>
                    </div>
                    <div className="lg:col-span-2">
                        <button type="submit" className="btn bg-blood text-white w-full">
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDonationRequest;
