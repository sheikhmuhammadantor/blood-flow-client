import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const RegistrationForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    const { user, loading, setLoading, createUser, updateUserProfile } = useAuth();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        avatar: null,
        bloodGroup: "A+",
        district: "",
        upazila: "",
        password: "",
        confirmPassword: "",
    });



    // Load district and upazila data
    useEffect(() => {
        const loadGeoData = async () => {
            const districtData = await axios("/districts.json");
            const upazilaData = await axios("/upazilas.json");
            setDistricts(districtData.data);
            setUpazilas(upazilaData.data);
        };
        loadGeoData();
    }, []);

    useEffect(() => {
        const filtered = upazilas.filter(
            (upazila) => upazila.district_id === formData.district
        );
        setFilteredUpazilas(filtered);
    }, [formData.district, upazilas]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const uploadData = new FormData();
            uploadData.append("image", file);
            try {
                const response = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`,
                    uploadData
                );
                setFormData({ ...formData, avatar: response.data.data.display_url });
                console.log("Image uploaded successfully:", response.data.data.display_url);
            } catch (error) {
                console.error("Avatar upload failed:", error);
            }
        }
    };

    if (user) return <Navigate to={from} replace={true} />
    if (loading) return <LoadingSpinner />

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            // Register user
            await createUser(formData.email, formData.password);

            // Update user profile
            await updateUserProfile(
                formData.name,
                formData.avatar,
            );

            // eslint-disable-next-line no-unused-vars
            const { password, confirmPassword, ...safeFormData } = formData;
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/users`, safeFormData);

            navigate(from, { replace: true })
            if (res.data.insertedId) toast.success("Registration successful!");
        } catch (error) {
            console.error("Registration failed:", error);
        } finally { setLoading(false) };
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-100">
            <div className="w-full max-w-md p-6 bg-base-200 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-blood">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="input input-bordered w-full focus:outline-blood"
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="input input-bordered w-full focus:outline-blood"
                    />
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="file-input file-input-bordered w-full focus:outline-blood"
                    />
                    <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                        required
                        className="select select-bordered w-full focus:outline-blood"
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
                    <select
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        required
                        className="select select-bordered w-full focus:outline-blood"
                    >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                            <option key={district.id} value={district.id}>
                                {district.name}
                            </option>
                        ))}
                    </select>
                    <select
                        name="upazila"
                        value={formData.upazila}
                        onChange={handleInputChange}
                        required
                        className="select select-bordered w-full focus:outline-blood"
                    >
                        <option value="">Select Upazila</option>
                        {filteredUpazilas.map((upazila) => (
                            <option key={upazila.id} value={upazila.id}>
                                {upazila.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="input input-bordered w-full focus:outline-blood"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="input input-bordered w-full focus:outline-blood"
                    />
                    <button type="submit" className="btn bg-blood text-white w-full">
                        Register
                    </button>
                </form>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16'></div>
                    <p className='px-3 text-sm'>
                        or Have an accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16'></div>
                </div>
                <p className='px-6 text-sm text-center text-base-content'>
                    Already Have an Account?{' '}
                    <Link
                        to='/login'
                        className='hover:underline hover:text-blood text-gray-600 font-bold'
                    >
                        login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegistrationForm;
