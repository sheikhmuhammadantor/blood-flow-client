import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const MyDonationRequests = () => {
  const [filter, setFilter] = useState("");
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const [districtData, upazilaData] = await Promise.all([
          axios.get("/districts.json"),
          axios.get("/upazilas.json"),
        ]);
        setDistricts(districtData.data);
        setUpazilas(upazilaData.data);
      } catch (error) {
        console.error("Failed to fetch location data", error);
      }
    };
    fetchLocationData();
  }, []);

  const { data: donationRequests = [], refetch } = useQuery({
    queryKey: ["donationRequests"], // The query key
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/my-all-donation-request/${user?.email}`);
      return data;
    },
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosPublic.put(`/donation-request/${id}`, { donationStatus: newStatus });
      toast.success(`Status updated to ${newStatus}`);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status.");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosPublic.delete(`/donation-request/${id}`);
        toast.success("Donation request deleted.");
        refetch();
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete donation request.");
      }
    }
  };

  const getLocation = (districtId, upazilaId) => {
    const district = districts.find((d) => d.id === districtId)?.name || "Unknown District";
    const upazila = upazilas.find((u) => u.id === upazilaId)?.name || "Unknown Upazila";
    return `${district}, ${upazila}`;
  };

  const filteredRequests = filter
    ? donationRequests.filter((req) => req.donationStatus === filter)
    : donationRequests;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Donation Requests</h1>

      <div className="mb-4 flex items-center gap-4">
        <label htmlFor="filter" className="font-medium">
          Filter by Status:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">Recipient Name</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Dolor Name</th>
              <th className="border px-4 py-2">Dolor Email</th>
              <th className="border px-4 py-2">Donation Date</th>
              <th className="border px-4 py-2">Donation Time</th>
              <th className="border px-4 py-2">Blood Group</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests?.map((request) => (
              <tr key={request._id}>
                <td className="border px-4 py-2">{request.recipientName}</td>
                <td className="border px-4 py-2">{getLocation(request.recipientDistrict, request.recipientUpazila)}</td>
                <td className="border px-4 py-2">{new Date(request.donationDate).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{request?.donorName || "Pending"}</td>
                <td className="border px-4 py-2">{request?.donorEmail || "Pending"}</td>
                <td className="border px-4 py-2">{request.donationTime}</td>
                <td className="border px-4 py-2">{request.bloodGroup}</td>
                {/* <td className="capitalize border px-4 py-2">{request.donationStatus}</td> */}

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

                <td className="border px-4 py-2 space-x-2 flex flex-col items-center gap-1 lg:flex-row lg:gap-0">
                  {/* {request.donationStatus === "inprogress" && (
                    <>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleStatusChange(request._id, "done")}
                      >
                        Done
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleStatusChange(request._id, "canceled")}
                      >
                        Cancel
                      </button>
                    </>
                  )} */}
                  <button
                    className="btn bg-lightGreen text-white btn-sm"
                    onClick={() => (window.location.href = `/dashboard/edit-donation-request/${request._id}`)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn bg-blood text-white btn-sm"
                    onClick={() => handleDelete(request._id)}
                  >
                    <FaTrash />
                  </button>
                  <button
                    className="btn btn-sm btn-info text-white"
                    onClick={() => navigate(`/dashboard/donation-request/${request._id}`)}
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDonationRequests;
