import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const BloodDonationRequests = () => {
    const [requests, setRequests] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [sort, setSort] = useState("");
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    // No Need tanstack query;
    useEffect(() => {
        const fetchDonationRequests = async () => {
            try {
                const { data } = await axiosPublic.get("/donation-requests", {
                    params: { donationStatus: "pending", sort },
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
    }, [axiosPublic, sort]);

    const handleViewDetails = (id) => {
        navigate(`/donation-request/${id}`);
    };

    const getDistrictName = (id) => districts.find((d) => d.id === id)?.name || "Unknown";
    const getUpazilaName = (id) => upazilas.find((u) => u.id === id)?.name || "Unknown";

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Blood Donation Requests</h1>
            {/* Sorting */}
            <div className="mb-4 flex items-center gap-4">
                <label htmlFor="sorting" className="font-medium">
                    Sort by Date:
                </label>
                <select
                    id="sorting"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="select select-bordered"
                >
                    <option value="">None</option>
                    <option value="asc">ASC</option>
                    <option value="desc">DEC</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto table-zebra w-full">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">#</th>
                            <th className="border px-4 py-2">Recipient Name</th>
                            <th className="border px-4 py-2">Location</th>
                            <th className="border px-4 py-2">Blood Group</th>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Time</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length > 0 ? (
                            requests.map((req, index) => (
                                <tr key={req._id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{req.recipientName}</td>
                                    <td className="border px-4 py-2">
                                        {getDistrictName(req.recipientDistrict)}, {getUpazilaName(req.recipientUpazila)}
                                    </td>
                                    <td className="border px-4 py-2">{req.bloodGroup}</td>
                                    <td className="border px-4 py-2">{new Date(req.donationDate).toLocaleDateString()}</td>
                                    <td className="border px-4 py-2">{req.donationTime}</td>
                                    <td className="border px-4 py-2">
                                        <button
                                            className="btn bg-blood text-white btn-sm"
                                            onClick={() => handleViewDetails(req._id)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center border px-4 py-2">
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
