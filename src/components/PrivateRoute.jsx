import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext.jsx'

const PrivateRoute = ({children}) => {
    const {session} = UserAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Set a timeout to prevent infinite loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2 seconds timeout

        return () => clearTimeout(timer);
    }, []);

    // If session is still undefined after timeout, redirect to signup
    if (session === undefined && isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    // If session is undefined and not loading, user is not authenticated
    if (session === undefined && !isLoading) {
        return <Navigate to="/signup" />;
    }

    // If session exists, show the protected content
    return session ? <>{children}</> : <Navigate to="/signup" />;
};

export default PrivateRoute