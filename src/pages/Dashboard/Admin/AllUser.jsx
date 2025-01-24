import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEllipsisV } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const AllUsers = () => {
  const [filter, setFilter] = useState("");
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [itemCount, setItemCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(3);

  // a get request for all users count only; with axiosPublic;
  useEffect(() => {
    axiosPublic.get(`/all-users-count`, { params: { status: filter } })
      .then(({ data }) => {
        setItemCount(data?.count);
      });
  }, [axiosPublic, filter]);


  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", filter, currentPage, itemPerPage],
    queryFn: async () => {
      const { data } = await axiosPublic(`/all-users`, {
        params: {
          status: filter,
          skip: (currentPage - 1) * itemPerPage,
          limit: itemPerPage,
        }
      });
      return data;
    },
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/user/${id}/status`, { status: newStatus });
      toast.success(`User status updated to ${newStatus}`);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user status.");
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axiosSecure.patch(`/user/${id}/role`, { role: newRole });
      toast.success(`User role updated to ${newRole}`);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user role.");
    }
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

  if(users.length === 0) return <LoadingSpinner />

  return (
    <section>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">All Users</h1>

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
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Avatar</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full outline outline-2 outline-blood "
                    />
                  </td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="capitalize border px-4 py-2">{user.role}</td>
                  <td className="capitalize border px-4 py-2">{user.status}</td>
                  <td className="border px-4 py-2">
                    <div className="dropdown dropdown-left">
                      <label tabIndex={0} className="btn btn-sm btn-ghost">
                        <FaEllipsisV />
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        {user.status === "active" && (
                          <li>
                            <button
                              onClick={() => handleStatusChange(user._id, "blocked")}
                            >
                              Block
                            </button>
                          </li>
                        )}
                        {user.status === "blocked" && (
                          <li>
                            <button
                              onClick={() => handleStatusChange(user._id, "active")}
                            >
                              Unblock
                            </button>
                          </li>
                        )}
                        {user.role !== "volunteer" && (
                          <li>
                            <button
                              onClick={() => handleRoleChange(user._id, "volunteer")}
                            >
                              Make Volunteer
                            </button>
                          </li>
                        )}
                        {user.role !== "admin" && (
                          <li>
                            <button
                              onClick={() => handleRoleChange(user._id, "admin")}
                            >
                              Make Admin
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <p className="text-center text-xl my-8">Current Page : {currentPage}</p>
        <div className="text-center flex justify-center gap-2">
          <button onClick={handelPrevPage} className="btn btn-sm btn-outline px-6">Prev</button>
          {
            pages?.map(page =>
              <button onClick={() => setCurrentPage(page + 1)} className={`btn btn-sm btn-outline ${currentPage === page + 1 ? 'bg-teal-500' : ''}`} key={page}>
                {page + 1}
              </button>)
          }
          <button onClick={handelNextPage} className="btn btn-sm btn-outline px-6">Next</button>
          <select value={itemPerPage} onChange={handelItemParPage} className="btn btn-sm btn-outline btn-accent">
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9">9</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default AllUsers;
