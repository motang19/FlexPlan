import React from "react";
import {useLocation, useOutletContext} from "react-router-dom";

const UserCurrent = () =>{
    let location = useLocation();
    location.state = useOutletContext();
    return(
        <div>
            user current
        </div>
    )
}

export default UserCurrent;