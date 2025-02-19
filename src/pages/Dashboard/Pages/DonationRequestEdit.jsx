import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';


const EditDonationRequest = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        requesterName: '',
        requesterEmail: '',
        recipientName: '',
        recipientDistrict: '',
        recipientUpazila: '',
        hospitalName: '',
        addressLine: '',
        bloodGroup: '',
        donationDate: '',
        donationTime: '',
        requestMessage: '',
    });

    const [upazilaOptions, setUpazilaOptions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const axiosPublic = useAxiosPublic();

    const updateUpazilaOptions = useCallback((districtId) => {
        const filteredUpazilas = upazilas.filter(
            (upazila) => upazila.district_id === districtId
        );
        setUpazilaOptions(filteredUpazilas);
    }, [upazilas]);

    useEffect(() => {
        const loadGeoData = async () => {
            const districtData = await axios("/districts.json");
            const upazilaData = await axios("/upazilas.json");
            setDistricts(districtData.data);
            setUpazilas(upazilaData.data);
        };
        loadGeoData();
    }, []);

    // No Need tanstack query;
    useEffect(() => {
        axiosPublic.get(`/donation-request/${id}`)
            .then((response) => {
                setFormData(response.data);
                updateUpazilaOptions(response.data.recipientDistrict);
            })
            .catch((error) => console.error('Error fetching donation request:', error));
    }, [id, axiosPublic, updateUpazilaOptions]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'recipientDistrict') {
            updateUpazilaOptions(value);
        }
    };
    console.log(formData);
    const handleSubmit = (e) => {
        e.preventDefault();
        axiosPublic.patch(`/donation-requests/${id}`, formData)
            .then(() => {
                toast.success('Donation request updated successfully!');
                navigate('/dashboard/my-donation-requests');
            })
            .catch((error) => console.error('Error updating donation request:', error));
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-base-300 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Edit Donation Request</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium">Requester Name</label>
                        <input
                            type="text"
                            name="requesterName"
                            value={formData.requesterName}
                            readOnly
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Requester Email</label>
                        <input
                            type="email"
                            name="requesterEmail"
                            value={formData.requesterEmail}
                            readOnly
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Recipient Name</label>
                        <input
                            type="text"
                            name="recipientName"
                            value={formData.recipientName}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">District</label>
                        <select
                            name="recipientDistrict"
                            value={formData.recipientDistrict}
                            onChange={handleInputChange}
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

                    <div>
                        <label className="block font-medium">Upazila</label>
                        <select
                            name="recipientUpazila"
                            value={formData.recipientUpazila}
                            onChange={handleInputChange}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Upazila</option>
                            {upazilaOptions.map((upazila) => (
                                <option key={upazila.id} value={upazila.id}>
                                    {upazila.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Hospital Name</label>
                        <input
                            type="text"
                            name="hospitalName"
                            value={formData.hospitalName}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Address Line</label>
                        <input
                            type="text"
                            name="addressLine"
                            value={formData.addressLine}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Blood Group</label>
                        <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleInputChange}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Blood Group</option>
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                                <option key={group} value={group}>
                                    {group}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Donation Date</label>
                        <input
                            type="date"
                            name="donationDate"
                            value={formData?.donationDate?.split('T')[0]}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Donation Time</label>
                        <input
                            type="time"
                            name="donationTime"
                            value={formData.donationTime}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block font-medium">Request Message</label>
                        <textarea
                            name="requestMessage"
                            value={formData.requestMessage}
                            onChange={handleInputChange}
                            className="textarea textarea-bordered w-full"
                        ></textarea>
                    </div>
                </div>

                <button type="submit" className="btn bg-blood text-white mt-6">
                    Update Donation Request
                </button>
            </form>
        </div>
    );
};

export default EditDonationRequest;
