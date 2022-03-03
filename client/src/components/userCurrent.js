import {React, useState} from "react";
import {useLocation, useOutletContext} from "react-router-dom";
import {Button, Form, Table, FormControl, Stack} from "react-bootstrap";
import WorkoutConns from "../connection/connection";
import Moment from "react-moment";
import Exercise from "./exercise"

const UserCurrent = () =>{
    let location = useLocation();
    const [workout, setWorkout] = useState(null);
    const [nameSession, setNameSession] =useState("");
    const [date, setDate] = useState("");
    const temp_workout = {
        name: location.state,
        nameSession: "Name of Session",
        date: new Date()
    }
    const getWorkout = (id) => {
        WorkoutConns.getWorkout(id)
        .then(response=> {
            setWorkout(response.data);

        })
        .catch(e=>{
            console.log(e.message);
        })
    }

    const addWorkout = (e) => {
        e.preventDefault();
        WorkoutConns.addWorkout(temp_workout)
            .then(response=> {
                console.log(response);
                getWorkout(response.data.result._id);
                setNameSession(temp_workout.nameSession);
                setDate(temp_workout.date);

            })
            .catch(e=>{
                console.log(e.message);
            })
    }
    
    const handleChangeName = (e) => {
        workout.exercises[e.currentTarget.id].nameWorkout = e.currentTarget.value
    }

    const handleChangeWeight = (e) => {
        workout.exercises[e.currentTarget.id].weight = e.currentTarget.value
    }
    
    const handleChangeSets = (e) => {
        workout.exercises[e.currentTarget.id].sets = e.currentTarget.value
    }

    const handleChangeReps = (e) => {
        workout.exercises[e.currentTarget.id].reps = e.currentTarget.value
    }

    const handleChangeRpe = (e) => {
        workout.exercises[e.currentTarget.id].rpe = e.currentTarget.value
    }

    const handleDeleteExercise = (e) => {
        e.preventDefault()
        WorkoutConns.deleteExercise(workout._id, e.currentTarget.id)
        .then(response=> {
            console.log(response);
            getWorkout(workout._id);

        })
        .catch(e=>{
            console.log(e.message);
        })

    }
    const handleAddExercise = (e) => {
        e.preventDefault()
        const exer = new Exercise("exercise", "0", "0", "0", "0")
        WorkoutConns.addExercise(workout._id, exer)
        .then(response=> {
            console.log(response);
            getWorkout(workout._id);

        })
        .catch(e=>{
            console.log(e.message);
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const in_workout = {
            name: location.state,
            nameSession: nameSession,
            date: date
        }
        WorkoutConns.updateWorkout(in_workout, workout._id)
            .then(response=> {
                console.log(response);
            })
            .catch(e=>{
                console.log(e.message);
            })
        workout.exercises.map(el=>{
            const in_exercise = {
                nameWorkout: el.nameWorkout,
                weight: el.weight,
                sets: el.sets,
                reps: el.reps,
                rpe: el.rpe
            }
            WorkoutConns.updateExercise(workout._id, in_exercise, el._id)
                .then(response=>{
                    console.log(response)
                })
                .catch(e=>{
                    console.log(e.message)
                })
            })
        setWorkout(null)
    }
    return(
        <div>
            {workout?
            <Stack gap = {4}>
                <Form onSubmit = {handleSubmit}> 
                    <Stack direction="horizontal" gap = {2}>
                        <Form.Group>
                            <FormControl
                                defaultValue = {workout.nameSession}
                                onChange = {e=>setNameSession(e.currentTarget.value)}
                            >
                            </FormControl>
                        </Form.Group>
                        <Form.Group>
                            <FormControl
                                defaultValue = {workout.date}
                                onChange = {e=>setDate(e.currentTarget.value)}
                            >                                
                            </FormControl>
                        </Form.Group>
                    </Stack>
                    <Table>
                        <thead>
                            <tr>
                                <th>Exercise</th>
                                <th>Weight</th>
                                <th>Sets</th>
                                <th>Reps</th>
                                <th>Rpe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workout.exercises.map((exercise, index) => {
                                return(
                                    <tr key= {index}>
                                        <td>
                                            <Form.Group controlId={index}>
                                                <FormControl
                                                    name = "nameWorkout"
                                                    defaultValue={exercise.nameWorkout}
                                                    onChange={handleChangeName}
                                                
                                                >
                                                </FormControl>
                                            </Form.Group>
                                            
                                        </td>
                                        <td>
                                            <Form.Group controlId={index}>
                                                <FormControl
                                                    name = "weight"
                                                    defaultValue= {exercise.weight}
                                                    onChange={handleChangeWeight}
                                                > 
                                                </FormControl>
                                            </Form.Group>
                                            
                                        </td>
                                        <td>
                                            <Form.Group controlId={index}>
                                                <FormControl
                                                    name = "sets"
                                                    defaultValue={exercise.sets}
                                                    onChange={handleChangeSets}

                                                > 
                                                </FormControl>
                                            </Form.Group>
                                            
                                        </td>
                                        <td>
                                            <Form.Group controlId={index}>
                                                <FormControl
                                                    name = "reps"
                                                    defaultValue= {exercise.reps}
                                                    onChange={handleChangeReps}
                                                    > 
                                                </FormControl>
                                            </Form.Group>

                                            
                                        </td>
                                        <td>
                                            <Form.Group controlId={index}>
                                                <FormControl
                                                    name = "rpe"
                                                    defaultValue= {exercise.rpe}
                                                    onChange={handleChangeRpe}
                                                > 
                                                </FormControl>
                                            </Form.Group>
                                            
                                        </td>
                                        <td>
                                            <Button type="button" variant="outline-danger" id = {exercise._id} onClick={handleDeleteExercise}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                        </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>   
                    </Table>
                    <div className ="d-grid">
                                    <Button variant="outline-success" size="lg" onClick={handleAddExercise}>Add Exercise</Button>
                    </div>
                    <div className ="d-grid">
                                    <Button variant="outline-primary" type = "submit" size="lg">Save Changes</Button>
                    </div>
                </Form>
            </Stack>
            
            :
            <Stack gap={2}>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <h1>No Current Workout</h1>    
                </div>
                <div className="d-grid" >
                    <Button type = "button" onClick = {addWorkout} className="text-center" variant = "success">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        Add Workout
                    </Button>
                </div>
            </Stack>
            }
        </div>
    )
}

export default UserCurrent;