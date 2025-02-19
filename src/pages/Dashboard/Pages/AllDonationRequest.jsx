import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const AllDonationRequests = () => {
  const [filter, setFilter] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [sort, setSort] = useState("");
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { role } = useRole()
  const [itemCount, setItemCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(3);

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

  useEffect(() => {
    axiosPublic.get(`/all-donation-count`, { params: { status: filter } })
      .then(({ data }) => {
        setItemCount(data?.count);
      });
  }, [axiosPublic, filter]);

  const { data: donationRequests = [], refetch, isLoading } = useQuery({
    queryKey: ["donationRequests", filter, sort, currentPage, itemPerPage],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/all-blood-donation-request`, {
        params: {
          filter,
          sort,
          skip: (currentPage - 1) * itemPerPage,
          limit: itemPerPage,
        }
      });
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
    console.log(id);
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
        const { deletedCount } = await axiosPublic.delete(`/donation-request/${id}`);
        if (deletedCount > 0) toast.success("Donation request deleted.");
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

  const numberOfPage = Math.ceil(itemCount / itemPerPage);
  const pages = [...Array(numberOfPage).keys()];

  const handelItemParPage = e => {
    setItemPerPage(parseInt(e.target.value))
    setCurrentPage(1)
  }

  const handelPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handelNextPage = () => {
    if (currentPage < numberOfPage) setCurrentPage(currentPage + 1)
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Donation Requests</h1>

      <div className="flex gap-6">
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
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">#</th>
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
            {donationRequests?.map((request, index) => (
              <tr key={request._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{request.recipientName}</td>
                <td className="border px-4 py-2">{getLocation(request.recipientDistrict, request.recipientUpazila)}</td>
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
                <td className="border px-4 py-2 space-x-2 flex flex-col items-center gap-1 lg:flex-row lg:gap-0">
                  {(role === 'admin') &&
                    <button
                      className="btn bg-lightGreen text-white btn-sm"
                      onClick={() => (window.location.href = `/dashboard/edit-donation-request/${request._id}`)}
                    >
                      <FaEdit />
                    </button>
                  }
                  {(role === 'admin') &&
                    <button
                      className="btn bg-blood text-white btn-sm"
                      onClick={() => handleDelete(request._id)}
                    >
                      <FaTrash />
                    </button>
                  }
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
      <div className="text-center flex justify-center gap-2 pt-8">
        <button onClick={handelPrevPage} className="btn btn-sm bg-white text-blood ring ring-blood px-6">Prev</button>
        {
          pages?.map(page =>
            <button onClick={() => setCurrentPage(page + 1)} className={`btn btn-sm ${currentPage === page + 1 ? 'bg-blood text-white hover:bg-blood hover:text-white' : ''}`} key={page}>
              {page + 1}
            </button>)
        }
        <button onClick={handelNextPage} className="btn btn-sm bg-white text-blood ring ring-blood px-6">Next</button>
        <select value={itemPerPage} onChange={handelItemParPage} className="btn btn-sm bg-white text-blood ring ring-blood focus:outline-none">
          <option value="3">3</option>
          <option value="6">6</option>
          <option value="9">9</option>
        </select>
      </div>
    </div>
  );
};

export default AllDonationRequests;
