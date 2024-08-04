import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Logout = () => {
    const { LogoutUser } = useAuth();
    useEffect(() => {
        LogoutUser();
    }, [LogoutUser]);
    toast.success("Successfully Logged Out");
    return (
        <>
            <Navigate to="/login" />
        </>
    );
};