import {React, useState} from "react";
import {Form, Button, Container, Alert} from "react-bootstrap";
import WorkoutConns from "../connection/connection";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate} from "react-router-dom";


const Signin = () =>{
    let navigate = useNavigate();
    const [error, setError] = useState('')
    const errorDiv = 
        <div className = "text-danger">
            {error}
          </div> ;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    var user = {
        email: email,
        password: password
    }

    const handleSubmit = event => {
        setError('')
        event.preventDefault();
        WorkoutConns.signin(JSON.stringify(user))
        .then(response => {
            console.log(response);
            navigate(`/${user.name}`);
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
                    <Form.Label htmlFor="email" >Email</Form.Label>
                    <Form.Control 
                        as = "input"
                        required
                        id="email" 
                        placeholder="Email"
                        value= {email}
                        onChange = {(e) => setEmail(e.target.value)} 
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

                    <Button type="submit">Sign Up</Button>
                </Form>
            </div>
        </div>
    );
}

export default Signin