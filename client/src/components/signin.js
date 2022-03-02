import {React, useState} from "react";
import {Form, Button} from "react-bootstrap";
import WorkoutConns from "../connection/connection";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation} from "react-router-dom";



const Signin = () =>{
    let navigate = useNavigate();
    let location = useLocation()
    const [error, setError] = useState('')
    const errorDiv = 
        <div className = "text-danger">
            {error}
          </div> ;
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    
    var user = {
        name: name,
        password: password,
    }

    const handleSubmit = event => {
        setError('')
        event.preventDefault();
        WorkoutConns.signin(JSON.stringify(user))
        .then(res => {
            console.log(res);
            console.log(location);
            navigate(`/${user.name}`, {state: user.name});
        })
        .catch(e => {
            console.log(e.message);
            setError('Unable to login passowrd or email is incorrect');
        })
    }

    return(
        <div>
            <div>
                <Form onSubmit = {handleSubmit}>
                    <Form.Group className="mb-3">
                    <Form.Label htmlFor="name" >Name</Form.Label>
                    <Form.Control 
                        as = "input"
                        required
                        id="name" 
                        placeholder="Name"
                        value= {name}
                        onChange = {(e) => setName(e.target.value)} 
                    />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control 
                        as = "input"
                        required
                        id="password" 
                        type = "password"
                        placeholder="Password" 
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                    />
                    </Form.Group>
                    {errorDiv}

                    <Button type="submit">Sign In</Button>
                </Form>
            </div>
        </div>
    );
}

export default Signin