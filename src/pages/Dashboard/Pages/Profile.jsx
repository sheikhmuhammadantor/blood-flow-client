import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaSave } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import demoUser from "../../../assets/images/demoUser.png";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const navigate = useNavigate();
    const { user: authUser } = useAuth();
    const axiosPublic = useAxiosPublic();
    const imgbbApiKey = `${import.meta.env.VITE_IMAGE_HOSTING_KEY}`;

    useEffect(() => {
        const loadGeoData = async () => {
            const districtData = await axios("/districts.json");
            const upazilaData = await axios("/upazilas.json");
            setDistricts(districtData.data);
            setUpazilas(upazilaData.data);
        };
        loadGeoData();
    }, []);

    // No Need tanstack query;
    // TODO : Implement tanstack query;
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosPublic.get(`user/${authUser?.email}`);
                setUser(response.data);
                setFormData(response.data);
                const upazilasForDistrict = upazilas?.filter(
                    (u) => u.district_id === response.data.district
                );
                setFilteredUpazilas(upazilasForDistrict);
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch user data.");
            }
        };
        fetchUserData();
    }, [axiosPublic, authUser, upazilas]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "district") {
            const updatedUpazilas = upazilas?.filter(
                (u) => u.district_id === value
            );
            setFilteredUpazilas(updatedUpazilas);
        }
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axiosPublic.post(
                `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
                formData
            );
            const avatarUrl = response.data.data.url;
            setFormData((prev) => ({ ...prev, avatar: avatarUrl }));
            toast.success("Avatar uploaded successfully.");
        } catch (error) {
            console.log(error);
            toast.error("Failed to upload avatar.");
        }
    };

    const handleSave = async () => {

        // eslint-disable-next-line no-unused-vars
        const { _id, ...sefFormDate } = formData;

        try {
            await axiosPublic.put(`user/${authUser?.email}`, sefFormDate);
            setUser(sefFormDate);
            setIsEditing(false);
            navigate('/dashboard/profile')
            toast.success("Profile updated successfully.");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update profile.");
        }
    };

    if (!user) {
        return <LoadingSpinner />;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
                <div className="flex justify-end">
                    {isEditing ? (
                        <button
                            onClick={handleSave}
                            className="btn bg-lightGreen text-white flex items-center space-x-2"
                        >
                            <FaSave /> <span>Save</span>
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn bg-blood text-white flex items-center space-x-2"
                        >
                            <FaEdit /> <span>Edit</span>
                        </button>
                    )}
                </div>
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <img
                            src={formData?.avatar || demoUser}
                            alt="User Avatar"
                            className="w-32 h-32 rounded-full ring-4 ring-blood object-cover"
                        />
                        {isEditing && (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarUpload}
                                className="absolute top-0 right-0 w-8 h-8 bg-primary text-white rounded-full cursor-pointer"
                            />
                        )}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-500"><span className="capitalize font-bold">{user.role}</span></p>
                </div>

                <form className="mt-6 space-y-4">
                    <div className="form-control">
                        <label className="label">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Email</label>
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="input input-bordered w-full bg-gray-200"
                        />
                    </div>
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
                        <div className="form-control w-full">
                            <label className="label">Blood Group</label>
                            <select
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleInputChange}
                                className="select select-bordered w-full"
                                disabled={!isEditing}
                            >
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="input input-bordered w-full"
                                readOnly={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
                        <div className="form-control w-full">
                            <label className="label">District</label>
                            <select
                                name="district"
                                value={formData.district}
                                onChange={handleInputChange}
                                className="select select-bordered w-full"
                                disabled={!isEditing}
                            >
                                <option value="">Select District</option>
                                {districts?.map((district) => (
                                    <option key={district.id} value={district.id}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">Upazila</label>
                            <select
                                name="upazila"
                                value={formData.upazila}
                                onChange={handleInputChange}
                                className="select select-bordered w-full"
                                disabled={!isEditing}
                            >
                                <option value="">Select Upazila</option>
                                {filteredUpazilas?.map((upazila) => (
                                    <option key={upazila?.id} value={upazila?.id}>
                                        {upazila?.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
