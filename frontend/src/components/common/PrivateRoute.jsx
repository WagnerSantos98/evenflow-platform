import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hook/auth/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return null; // ou um componente de loading
    }

    if (!user) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute; 