import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const AdminRoute = ({ children }) => {
    const { role, loading } = useRole();
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (role === 'admin') {
        return children;
    }

    return <Navigate to="/dashboard" state={{ from: location }} replace={true}></Navigate>
};

AdminRoute.propTypes = {
    children: PropTypes.element,
};

export default AdminRoute;
