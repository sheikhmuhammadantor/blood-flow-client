import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const DonationRequestDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [donationRequest, setDonationRequest] = useState(null);

    const fetchDonationRequestDetails = async (id) => {
        const { data } = await axiosPublic.get(`/donation-request/${id}`);
        return data;
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await fetchDonationRequestDetails(id);
                setDonationRequest(data);
                console.log(data);
            } catch (error) {
                console.error("Failed to fetch donation request details:", error);
            }
        };

        fetchDetails();
    }, [id]);

    const handleDonate = async () => {
        const confirm = await Swal.fire({
            title: "Confirm Donation",
            text: `Donor Name: ${user?.displayName}`,
            showCancelButton: true,
            confirmButtonText: "Confirm Donation",
        });

        if (confirm.isConfirmed) {
            try {
                await axiosPublic.put(`/donation-request/${id}`, {
                    donationStatus: "inprogress",
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
                <p><strong>Location:</strong> {recipientDistrict}, {recipientUpazila}</p>
                <p><strong>Hospital Name:</strong> {hospitalName}</p>
                <p><strong>Address Line:</strong> {addressLine}</p>
                <p><strong>Blood Group:</strong> {bloodGroup}</p>
                <p><strong>Donation Date:</strong> {new Date(donationDate).toLocaleDateString()}</p>
                <p><strong>Donation Time:</strong> {donationTime}</p>
                <p><strong>Status:</strong> {donationStatus}</p>
                <p><strong>Message:</strong> {requestMessage}</p>
            </div>

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
