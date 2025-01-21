import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const BloodDonationRequests = () => {
    const [requests, setRequests] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    useEffect(() => {
        const fetchDonationRequests = async () => {
            try {
                const { data } = await axiosPublic.get("/donation-requests", {
                    params: { donationStatus: "pending" },
                });
                setRequests(data);
            } catch (error) {
                console.error("Error fetching donation requests:", error);
            }
        };

        const fetchLocations = async () => {
            try {
                const districtsData = await fetch("/districts.json").then((res) => res.json());
                const upazilasData = await fetch("/upazilas.json").then((res) => res.json());
                setDistricts(districtsData);
                setUpazilas(upazilasData);
            } catch (error) {
                console.error("Error fetching location data:", error);
            }
        };

        fetchDonationRequests();
        fetchLocations();
    }, []);

    const handleViewDetails = (id) => {
        if (user) {
            navigate(`/dashboard/donation-request/${id}`);
        } else {
            navigate("/login");
        }
    };

    const getDistrictName = (id) => districts.find((d) => d.id === id)?.name || "Unknown";
    const getUpazilaName = (id) => upazilas.find((u) => u.id === id)?.name || "Unknown";

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Blood Donation Requests</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Recipient Name</th>
                            <th>Location</th>
                            <th>Blood Group</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length > 0 ? (
                            requests.map((req, index) => (
                                <tr key={req._id}>
                                    <td>{index + 1}</td>
                                    <td>{req.recipientName}</td>
                                    <td>
                                        {getDistrictName(req.recipientDistrict)}, {getUpazilaName(req.recipientUpazila)}
                                    </td>
                                    <td>{req.bloodGroup}</td>
                                    <td>{new Date(req.donationDate).toLocaleDateString()}</td>
                                    <td>{req.donationTime}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleViewDetails(req._id)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No pending donation requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BloodDonationRequests;
