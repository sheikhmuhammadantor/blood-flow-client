import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const useStatus = () => {
    const { user } = useAuth();
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatus = async () => {
            if (!user?.email) {
                setStatus(null);
                setLoading(false);
                return;
            }

            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/${user.email}`);
                setStatus(data.status);
            } catch (err) {
                console.error("Error fetching user status:", err);
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, [user?.email]);

    return { status, loading, error };
};

export default useStatus;
