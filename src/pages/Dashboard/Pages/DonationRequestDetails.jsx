import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import axios from "axios";

const DonationRequestDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [donationRequest, setDonationRequest] = useState(null);
    const [upazilas, setUpazilas] = useState("");
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const [districtsData, upazilasData] = await Promise.all([
                    axios("/districts.json"),
                    axios("/upazilas.json"),
                ]);
                setDistricts(districtsData.data);
                setUpazilas(upazilasData.data);
            } catch (error) {
                console.error("Error fetching location data:", error);
            }
        };
        fetchLocations();
    }, []);

    // No Need tanstack query;
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const { data } = await axiosPublic.get(`/donation-request/${id}`);
                setDonationRequest(data);
            } catch (error) {
                console.error("Failed to fetch donation request details:", error);
            }
        };

        fetchDetails();
    }, [id, axiosPublic]);

    const getLocation = (districtId, upazilaId) => {
        const district = districts.find((d) => d.id === districtId)?.name || "Unknown District";
        const upazila = upazilas.find((u) => u.id === upazilaId)?.name || "Unknown Upazila";
        return `${district}, ${upazila}`;
    };

    const handleDonate = async () => {

        if (!user) {
            Swal.fire("Error", "You need to login to donate.", "error");
            return;
        }

        const confirm = await Swal.fire({
            title: "Confirm Donation",
            html: `Donor Name: <strong>${user?.displayName}</strong><br>Donor Email: <strong>${user?.email}</strong>`,
            showCancelButton: true,
            confirmButtonText: "Confirm Donation",
        });

        if (confirm.isConfirmed) {
            try {
                await axiosPublic.put(`/donation-request/${id}`, {
                    donationStatus: "inprogress",
                    donorEmail: user.email,
                    donorName: user.displayName,
                });
                Swal.fire("Success", "Donation request is now in progress!", "success");
                navigate("/dashboard");
            } catch (error) {
                Swal.fire("Error", "Failed to confirm donation.", "error");
                console.error("Error updating donation request:", error);
            }
        }
    };

    if (!donationRequest) {
        return <p>Loading...</p>;
    }

    const {
        requesterName,
        recipientName,
        recipientDistrict,
        recipientUpazila,
        hospitalName,
        addressLine,
        bloodGroup,
        donationDate,
        donationTime,
        requestMessage,
        donationStatus,
    } = donationRequest;

    return (
        <div className="p-6 space-y-6">
            <button
                className="btn btn-sm btn-outline mb-4 flex items-center"
                onClick={() => navigate(-1)}
            >
                <FaArrowLeft className="mr-2" /> Back
            </button>
            <h1 className="text-2xl font-semibold mb-4">Donation Request Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><strong>Requester Name:</strong> {requesterName}</p>
                <p><strong>Recipient Name:</strong> {recipientName}</p>
                <p><strong>Location:</strong> {getLocation(recipientDistrict, recipientUpazila)}</p>
                <p><strong>Hospital Name:</strong> {hospitalName}</p>
                <p><strong>Address Line:</strong> {addressLine}</p>
                <p><strong>Blood Group:</strong> {bloodGroup}</p>
                <p><strong>Donation Date:</strong> {new Date(donationDate).toLocaleDateString()}</p>
                <p><strong>Donation Time:</strong> {donationTime}</p>
                <p><strong>Status:</strong> {donationStatus}</p>
                <p><strong>Message:</strong> {requestMessage}</p>
            </div>

            {(donationStatus === "pending" && user?.email) && (
                <form className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label">Donor Name</label>
                        <input
                            type="text"
                            value={user?.displayName}
                            readOnly
                            className="input input-bordered w-full bg-gray-200"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Donor Email</label>
                        <input
                            type="email"
                            value={user?.email}
                            readOnly
                            className="input input-bordered w-full bg-gray-200"
                        />
                    </div>
                </form>
            )}

            {donationStatus === "pending" && (
                <button
                    className="btn bg-blood text-white mt-6"
                    onClick={handleDonate}
                >
                    Donate Now
                </button>
            )}
        </div>
    );
};

export default DonationRequestDetails;
