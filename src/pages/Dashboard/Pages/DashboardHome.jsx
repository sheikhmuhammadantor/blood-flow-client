import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useRole from "../../../hooks/useRole";
import DashboardHomeAdmin from "../Admin/DashobardHomeAdmin";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';

const DashboardHome = () => {
    const { user } = useAuth();
    const [donationRequests, setDonationRequests] = useState([]);
    const [upazilas, setUpazilas] = useState("");
    const [districts, setDistricts] = useState([]);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { role } = useRole();

    const { data: locationsData } = useQuery({
        queryKey: ['locations'],
        queryFn: async () => {
            const [districtsData, upazilasData] = await Promise.all([
                axios.get("/districts.json"),
                axios.get("/upazilas.json"),
            ]);
            return { districts: districtsData.data, upazilas: upazilasData.data };
        },
    });

    useEffect(() => {
        if (locationsData) {
            setDistricts(locationsData.districts);
            setUpazilas(locationsData.upazilas);
        }
    }, [locationsData]);

    const fetchRequests = async () => {
        const response = await axiosPublic.get(`/donation-request`, {
            params: { email: user?.email, limit: 3 },
        });
        return response.data;
    };

    const { data: donationRequestsData, refetch } = useQuery({
        queryKey: ['donationRequests', user?.email],
        queryFn: fetchRequests,
        enabled: !!user?.email,
    });

    useEffect(() => {
        if (donationRequestsData) {
            setDonationRequests(donationRequestsData);
        }
    }, [donationRequestsData]);

    const handleStatusChange = async (id, status) => {
        try {
            await axiosPublic.put(`/donation-request/${id}`, { status });
            setDonationRequests((prev) =>
                prev.map((request) =>
                    request._id === id ? { ...request, donationStatus: status } : request
                )
            );
            Swal.fire("Success", `Donation status updated to ${status}!`, "success");
        } catch (error) {
            console.error("Failed to update status", error);
            Swal.fire("Error", "Failed to update donation status.", "error");
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (confirm.isConfirmed) {
            try {
                await axiosPublic.delete(`/donation-request/${id}`);
                refetch();
                Swal.fire("Deleted!", "Your donation request has been deleted.", "success");
            } catch (error) {
                console.error("Failed to delete donation request", error);
                Swal.fire("Error", "Failed to delete donation request.", "error");
            }
        }
    };

    if (role === 'admin' || role === 'volunteer') return (
        <DashboardHomeAdmin />
    )

    return (
        <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <div className="flex items-center space-x-4">
                <img
                    src={user?.photoURL}
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full ring-2 ring-blood"
                />
                <h1 className="text-2xl font-semibold">
                    Welcome, {user?.displayName}!
                </h1>
            </div>

            {/* Recent Donation Requests Section */}
            {donationRequests.length > 0 ? (
                <div className="overflow-x-auto">
                    <h2 className="text-xl font-semibold mb-4">Recent Donation Requests</h2>
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Recipient Name</th>
                                <th className="border px-4 py-2">Location</th>
                                <th className="border px-4 py-2">Donor Name</th>
                                <th className="border px-4 py-2">Donor Email</th>
                                <th className="border px-4 py-2">Date</th>
                                <th className="border px-4 py-2">Time</th>
                                <th className="border px-4 py-2">Blood Group</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donationRequests?.map((request, index) => (
                                <tr key={request._id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{request.recipientName}</td>
                                    <td className="border px-4 py-2">
                                        <span>
                                            {upazilas
                                                .filter((upa) => upa.district_id === request.recipientDistrict)
                                                .find((upa) => upa.id === request.recipientUpazila)?.name},{' '}
                                        </span>
                                        <span>
                                            {districts.find((dist) => dist.id === request.recipientDistrict)?.name}
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2">{request?.donorName || "Pending"}</td>
                                    <td className="border px-4 py-2">{request?.donorEmail || "Pending"}</td>
                                    <td className="border px-4 py-2">{new Date(request.donationDate).toLocaleDateString()}</td>
                                    <td className="border px-4 py-2">{request.donationTime}</td>
                                    <td className="border px-4 py-2">{request.bloodGroup}</td>
                                    <td className="border px-4 py-2 capitalize">
                                        {request.donationStatus === "inprogress" ? (
                                            <select
                                                className="select select-bordered"
                                                value={request.donationStatus}
                                                onChange={(e) =>
                                                    handleStatusChange(request._id, e.target.value)
                                                }
                                            >
                                                <option value="inprogress">In Progress</option>
                                                <option value="done">Done</option>
                                                <option value="canceled">Canceled</option>
                                            </select>
                                        ) : (
                                            request.donationStatus
                                        )}
                                    </td>
                                    <td className="border px-4 py-2 space-x-2 flex flex-col items-center gap-1 justify-center lg:flex-row lg:gap-0">
                                        <button
                                            className="btn btn-sm bg-lightGreen text-white"
                                            onClick={() => navigate(`edit-donation-request/${request._id}`)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="btn btn-sm bg-blood text-white"
                                            onClick={() => handleDelete(request._id)}
                                        >
                                            <FaTrash />
                                        </button>
                                        <button
                                            className="btn btn-sm btn-info text-white"
                                            onClick={() => navigate(`donation-request/${request._id}`)}
                                        >
                                            <FaEye />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-blood">You haven’t made any donation requests yet.</p>
            )}

            {/* View All Requests Button */}
            {
                donationRequests.length > 0 &&
                <div>
                    <Link
                        to="my-donation-requests"
                        className="btn bg-blood text-white mt-4"
                    >
                        View My All Requests
                    </Link>
                </div>
            }
        </div>
    );
};

export default DashboardHome;
