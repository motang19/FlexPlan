import {React, useEffect, useState} from "react";
import {useNavigate, Navigate, useLocation, Outlet} from "react-router-dom";
import WorkoutConns from "../connection/connection"
import {Stack} from "react-bootstrap";
const User = () => {
    const {state} = useLocation();
    console.log(state);
    const [num, setNum] = useState(null)
    useEffect(()=>{
        WorkoutConns.getAllWorkout()
            .then(response=>{
                setNum(response.data.total_results)
            })
            .catch(e=>{
                console.log(e.message)
            })
    })
    if (state == null){
        return <Navigate to='/signin'/>
    }
    return(
        <div>
            <Stack style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                <div >
                <h1>{state}</h1>
                </div>
                <div>
                    <p>{num} Workouts</p>
                </div>
            </Stack>
       
        </div>
        
    )
}

export default User;