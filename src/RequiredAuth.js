import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ allowRoles }) =>{
    const user = useSelector((state) => state.userProfile.value);
    const location = useLocation()
    return(
        // user?.role === allowRoles ? 
        allowRoles?.includes(user?.role) ?
        <Outlet />
        : 
        user?.name ?
        <Navigate to='/unauthorized' state={{from: location  }} replace />:
        <Navigate to='/login' state={{from: location }} replace />
    )

}

export default RequireAuth