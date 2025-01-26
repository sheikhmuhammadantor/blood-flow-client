import { useEffect, useState } from "react";
import { FaUsers, FaHandHoldingHeart, FaTint } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";

const DashboardHomeAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { role } = useRole()
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalFunding: 0,
        totalBloodRequests: 0,
    });

    // No Need tanstack query;
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [usersRes, fundingRes, requestsRes] = await Promise.all([
                    axiosSecure("/admin/users/count"),
                    axiosSecure("/admin/funding/total"),
                    axiosSecure("/admin/blood-requests/count"),
                ]);

                setStats({
                    totalUsers: usersRes.data.count,
                    totalFunding: fundingRes.data.total,
                    totalBloodRequests: requestsRes.data.count,
                });
            } catch (error) {
                console.error("Error fetching dashboard statistics:", error);
            }
        };

        fetchStats();
    }, [axiosSecure]);

    return (
        <div className="p-4">
            {/* Welcome Section */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-md text-center mb-6">
                <h1 className="text-2xl font-bold text-blue-800">Welcome to the Dashboard!</h1>
                <p className="text-blue-500"><span className="text-blood text-xl capitalize">{role} :</span> {user?.displayName}</p>
                <p className="text-blue-700 mt-2">Manage and oversee all activities at a glance.</p>
            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Users */}
                <div className="card bg-blue-500 text-white shadow-md">
                    <div className="card-body flex items-center">
                        <FaUsers className="text-4xl mr-4" />
                        <div>
                            <h2 className="text-lg font-bold">Total Donors</h2>
                            <p className="text-2xl">{stats.totalUsers}</p>
                        </div>
                    </div>
                </div>

                {/* Total Funding */}
                <div className="card bg-green-500 text-white shadow-md">
                    <div className="card-body flex items-center">
                        <FaHandHoldingHeart className="text-4xl mr-4" />
                        <div>
                            <h2 className="text-lg font-bold">Total Funding</h2>
                            <p className="text-2xl">${stats.totalFunding}</p>
                        </div>
                    </div>
                </div>

                {/* Total Blood Requests */}
                <div className="card bg-red-500 text-white shadow-md">
                    <div className="card-body flex items-center">
                        <FaTint className="text-4xl mr-4" />
                        <div>
                            <h2 className="text-lg font-bold">Blood Requests</h2>
                            <p className="text-2xl">{stats.totalBloodRequests}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHomeAdmin;
