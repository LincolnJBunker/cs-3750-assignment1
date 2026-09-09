import { Navigate, useLocation } from "react-router";
import type { User } from "../api";

export const Welcome = () => {
    const location = useLocation();
    const user = location.state as User | null;

    // ensure that user is logged in, otherwise navigate to login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
        <h1>Welcome {user.firstName}, {user.lastName}</h1>
        </>
    )
}
