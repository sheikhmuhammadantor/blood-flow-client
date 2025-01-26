import { useState, useEffect } from "react";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SearchPage = () => {
    const [bloodGroup, setBloodGroup] = useState("");
    const [district, setDistrict] = useState("");
    const [upazila, setUpazila] = useState("");
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [donors, setDonors] = useState([]);
    const axiosPublic = useAxiosPublic();

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
    const handleSearch = async () => {
        try {
            const { data } = await axiosPublic(`/donors/search`, {
                params: {
                    bloodGroup,
                    district,
                    upazila,
                },
            });
            setDonors(data);
        } catch (error) {
            console.error("Error fetching donors:", error);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-semibold mb-6">Search Donors</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Blood Group Selector */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Blood Group</label>
                        <select
                            className="select select-bordered w-full"
                            value={bloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value)}
                        >
                            <option value="">Select Blood Group</option>
                            {[
                                "A+",
                                "A-",
                                "B+",
                                "B-",
                                "AB+",
                                "AB-",
                                "O+",
                                "O-",
                            ].map((group) => (
                                <option key={group} value={group}>
                                    {group}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* District Selector */}
                    <div>
                        <label className="block text-sm font-medium mb-2">District</label>
                        <select
                            className="select select-bordered w-full"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                        >
                            <option value="">Select District</option>
                            {districts.map((dist) => (
                                <option key={dist.id} value={dist.id}>
                                    {dist.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Upazila Selector */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Upazila</label>
                        <select
                            className="select select-bordered w-full"
                            value={upazila}
                            onChange={(e) => setUpazila(e.target.value)}
                        >
                            <option value="">Select Upazila</option>
                            {upazilas
                                .filter((upa) => upa.district_id === district)
                                .map((upa) => (
                                    <option key={upa.id} value={upa.id}>
                                        {upa.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <button
                    className="btn bg-blood text-white mt-6"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            {/* Donors List */}
            {donors.length > 0 ? (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Found Donors</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {donors?.map((donor) => (
                            <div key={donor._id} className="bg-white shadow-md rounded-lg p-4 border">
                                <p><strong>Name:</strong> {donor.name}</p>
                                <p><strong>Email:</strong> {donor.email}</p>
                                <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
                                <p>
                                    <strong>Location: </strong>
                                    <span>
                                        {upazilas
                                            .filter((upa) => upa.district_id === donor.district)
                                            .find((upa) => upa.id === donor.upazila)?.name},{' '}
                                    </span>
                                    <span>
                                        {districts.find((dist) => dist.id === donor.district)?.name}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : ''}
        </div>
    );
};

export default SearchPage;
