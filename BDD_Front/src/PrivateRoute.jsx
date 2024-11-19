import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, isAllowed }) => {
    return isAllowed ? children : <Navigate to="/editaradmin" />;
};

export default PrivateRoute;
