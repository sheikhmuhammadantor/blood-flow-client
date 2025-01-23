import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null); // State to store the user role
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.email) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/${user.email}`);
        setRole(data.role); // Update the role from the response
      } catch (err) {
        console.error("Error fetching user role:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    fetchRole();
  }, [user?.email]); // Run the effect whenever the email changes

  return { role, loading, error };
};

export default useRole;
