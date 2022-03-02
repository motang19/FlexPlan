import {React, useState, useEffect}  from "react";
import { Modal, Dropdown, Button, Form, Table, Stack, FormControl} from "react-bootstrap"
import WorkoutConns from "../connection/connection";
import Moment from "react-moment";
import {useLocation} from "react-router-dom";
import Exercise from "./exercise"

const UserHistory = () =>{
    const location = useLocation();
    const [workouts, setWorkouts] = useState([]);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [query, setQuery] = useState("");
    const [query_name, setQuery_Name] = useState("");
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [date, setDate] = useState("");
    const [nameSession, setNameSession] = useState("")
    const [modal_workout, setModal_Workout] = useState(null);
    const [edit_workout, setEdit_Workout] = useState(null);
    const [show5, setShow5] = useState(false);
    const [exercise, setExercise] = useState([]);
    const workout = {
        name: location.state,
        date: date,
        nameSession: nameSession
    }




    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setQuery_Name("nameSession");
    }
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => {
        setShow2(true);
        setQuery_Name("date");
    }
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    const handleClose4 = ()=> {
        setShow4(false);
        setModal_Workout(null);
    }
    const handleShow4 = (e) => {
        setShow4(true);
        console.log(e.currentTarget.id);
        getModal_Workout(e.currentTarget.id);
    }
    const handleClose5 = () =>{
        setShow5(false);
        setEdit_Workout(null);
    }
    const handleShow5 = (e) => {
        setShow5(true);
        getEdit_Workout(e.currentTarget.id);
    }

    useEffect(()=>{
        WorkoutConns.getAllWorkout()
            .then(response=>{
                 setWorkouts(response.data.workouts);
            })
            .catch(e =>{
                console.log(e.message);
            })
    },[]);
    const filter = (e) =>{
        e.preventDefault();
        console.log(query_name);
        console.log(query)
        WorkoutConns.filter(query, query_name)
            .then(response=>{
                setWorkouts(response.data.workouts);
                console.log(response)
            })
            .catch(e =>{
                console.log(e.message);
            })
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        WorkoutConns.updateWorkout(workout, edit_workout._id)
            .then(response=>{
                console.log(response)
            })
            .catch(e=>{
                console.log(e.message)
            })
        exercise.map(el=>{
            const in_exercise = {
                nameWorkout: el.nameWorkout,
                weight: el.weight,
                sets: el.sets,
                reps: el.reps,
                rpe: el.rpe
            }
            WorkoutConns.updateExercise(edit_workout._id, in_exercise, el._id)
                .then(response=>{
                    console.log(response)
                })
                .catch(e=>{
                    console.log(e.message)
                })
            })
        
    }
    const handleDelete = (e) => {
        e.preventDefault()
        WorkoutConns.deleteWorkout(e.currentTarget.id)
            .then(response=>{
                console.log(response)
            })
            .catch(e=>{
                console.log(e)
            })
    }
    const addWorkout = (e) =>{
        e.preventDefault();
        WorkoutConns.addWorkout(JSON.stringify(workout))
            .then(response=>{
                console.log(response);
            })
            .catch(e=>{
                console.log(e.message);
            })

    }
    const getModal_Workout = (id) =>{
        WorkoutConns.getWorkout(id)
            .then(response => {
                setModal_Workout(response.data)
            })
            .catch(e=>{
                console.log(e.message)
            })
    }
    const getEdit_Workout = (id) =>{
        WorkoutConns.getWorkout(id)
            .then(response => {
                setEdit_Workout(response.data)
                setExercise(response.data.exercises)
            })
            .catch(e=>{
                console.log(e.message)
            })
    }
    const handleChangeName = (e) => {
        
        exercise[e.currentTarget.id].nameWorkout = e.currentTarget.value
        
    }
    const handleChangeWeight = (e) => {
        exercise[e.currentTarget.id].weight = e.currentTarget.value
        
    }
    const handleChangeSets = (e) => {
        exercise[e.currentTarget.id].sets = e.currentTarget.value

    }
    const handleChangeReps = (e) => {
        exercise[e.currentTarget.id].reps = e.currentTarget.value

    }
    const handleChangeRpe = (e) => {
        exercise[e.currentTarget.id].rpe = e.currentTarget.value

    }
    const handleAddExercise = () =>{
        const def_exercise = new Exercise("exercise", "0", "0", "0", "0")
        WorkoutConns.addExercise(edit_workout._id, def_exercise)
            .then(response=>{
                console.log(response);
                getEdit_Workout(edit_workout._id)
            })
            .catch(e => {
                console.log(e.message);
            })
    }
    const handleDeleteExercise = (e) =>{
        WorkoutConns.deleteExercise(edit_workout._id, e.currentTarget.id)
            .then(response=>{
                console.log(response);
                getEdit_Workout(edit_workout._id)
            })
            .catch(e => {
                console.log(e.message);
            })
    }
    return(
        <div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <h1 >Workout History</h1>
            </div>
            <Stack gap={2}>
                <div>
                    <Stack direction="horizontal" gap={2}>
                        <div>
                            <Dropdown className="d-inline mx-2">
                                <Dropdown.Toggle id="dropdown-autoclose-true">
                                Filter
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as={Button} onClick={handleShow}>Search by Session Name</Dropdown.Item>
                                    <Modal show={show} onHide={handleClose} animation={false}>
                                            <Modal.Header closeButton>
                                            <Modal.Title>Search by Session</Modal.Title>
                                            </Modal.Header>
                                            <Form onSubmit ={filter}>
                                                <Modal.Body>
                                                    <FormControl
                                                        as="input"
                                                        value = {query}
                                                        onChange = {(e)=>setQuery(e.target.value)}
                                                        placeholder = "Enter Session Name"
                                                    ></FormControl>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>
                                                    <Button variant="primary" type="submit" >
                                                        Search
                                                    </Button>
                                                </Modal.Footer>
                                            </Form>
                                    </Modal>
                                    <Dropdown.Item as={Button} onClick={handleShow2}>Search by Date
                                    </Dropdown.Item>
                                    <Modal show={show2} onHide={handleClose2} animation={false}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Search by Date</Modal.Title>
                                            </Modal.Header>
                                            <Form onSubmit ={filter}>
                                                <Modal.Body>
                                                    <FormControl
                                                        type = "date"
                                                        value = {query}
                                                        onChange = {(e)=>setQuery(e.target.value)}
                                                    ></FormControl>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose2}>
                                                        Close
                                                    </Button>
                                                    <Button variant="primary" type="submit" >
                                                        Search
                                                    </Button>
                                                </Modal.Footer>
                                            </Form>
                                    </Modal>
                                </Dropdown.Menu>
                            </Dropdown>  
                        </div>
                        <div className="ms-auto">
                            <Button variant="outline-success" onClick={handleShow3}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                                Add Workout
                            </Button>
                            <Modal show={show3} onHide={handleClose3} animation={false}>
                                <Modal.Header closeButton>
                                <Modal.Title>Add Workout</Modal.Title>
                                </Modal.Header>
                                <Form onSubmit ={addWorkout}>
                                    <Modal.Body>
                                        <Form.Group>
                                            <FormControl
                                                type="date"
                                                value = {date}
                                                onChange = {(e)=>setDate(e.target.value)}
                                                placeholder = "Enter Session date"
                                            ></FormControl>
                                        </Form.Group>
                                        <Form.Group>
                                            <FormControl
                                                as="input"
                                                value = {nameSession}
                                                onChange = {(e)=>setNameSession(e.target.value)}
                                                placeholder = "Enter Session Name"
                                            ></FormControl>
                                        </Form.Group>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose3}>
                                            Close
                                        </Button>
                                        <Button variant="primary" type="submit" >
                                            Search
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                        </div>
                    </Stack>

                </div> 
                <div>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Session Name</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workouts.map((workouts, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <Moment add={{days:1}} format='YYYY/MM/DD'>{workouts.date}</Moment>
                                    </td>
                                    <td>
                                        <Button type = "button" variant = "Link" id={workouts._id} onClick={handleShow4}>{workouts.nameSession}</Button>

                                    </td>
                                    <td>
                                        <Button type="button" variant="outline-info" id={workouts._id} onClick = {handleShow5}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                        </Button>
                                    </td>
                                    <td>
                                        <Button type='button' variant="outline-danger"  id= {workouts._id} onClick = {handleDelete}>
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
                </div>
            </Stack>
            {modal_workout?
                <Modal show={show4} onHide={handleClose4} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{modal_workout.nameSession}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                                {modal_workout.exercises.map((exercise, index) => {
                                    return(
                                        <tr key= {index}>
                                            <td>{exercise.nameWorkout}</td>
                                            <td>{exercise.weight}</td>
                                            <td>{exercise.sets}</td>
                                            <td>{exercise.reps}</td>
                                            <td>{exercise.rpe}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose4}>
                        Close
                        </Button>
                        <Button variant="primary" onClick={handleClose4}>
                        Save Changes
                        </Button>
                    </Modal.Footer>`
                </Modal>: 
            null}
            {edit_workout?
                <Modal show={show5} onHide={handleClose5} centered>
                <Form onSubmit = {handleUpdate}>
                    <Modal.Header closeButton>
                        <Stack direction="horizontal" gap = {2}>
                            <Modal.Title>
                                <FormControl
                                defaultValue ={edit_workout.nameSession}
                                onChange = {e=>setNameSession(e.target.value)}
                                >
                                </FormControl>
                            </Modal.Title>
                            <FormControl
                                defaultValue = {edit_workout.date}
                                onChange = {e => setDate(e.target.value)}
                            >
                            </FormControl>
                        </Stack>
                        
                    </Modal.Header>
                    <Modal.Body>
                    <Stack gap={2}>
                    
                    <Table>
                            <thead>
                                <tr>
                                    <th>Exercise</th>
                                    <th>Weight</th>
                                    <th>Sets</th>
                                    <th>Reps</th>
                                    <th>Rpe</th>
                                    <th>Update</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {edit_workout.exercises.map((exercise, index) => {
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
                    </Stack>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose5}>
                        Close
                        </Button>
                        <Button variant="primary" type="submit">
                        Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
                </Modal>
                : 
            null}
        </div>
        
    )
};

export default UserHistory;