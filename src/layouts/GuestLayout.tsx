import { AuthContext } from "@/providers/AuthProvider";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const GuestLayout = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            // navigate("/secure/dashboard");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div>
            <Outlet />
        </div>
    );
};
