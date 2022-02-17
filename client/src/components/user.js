import React from "react";
import {useNavigate, Navigate, useLocation, Outlet} from "react-router-dom";

const User = () => {
    const {state} = useLocation();
    console.log(state);

    if (state == null){
        return <Navigate to='/signin'/>
    }
    return(
        <div>
            user
        </div>
    )
}

export default User;