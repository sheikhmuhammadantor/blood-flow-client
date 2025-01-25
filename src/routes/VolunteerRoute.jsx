import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const VolunteerRoute = ({ children }) => {
    const { role, loading } = useRole();
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (role === 'admin' || role === 'volunteer') {
        return children;
    }

    return <Navigate to="/dashboard" state={{ from: location }} replace={true}></Navigate>
};

VolunteerRoute.propTypes = {
    children: PropTypes.element,
};

export default VolunteerRoute;
