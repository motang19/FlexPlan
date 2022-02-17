import React, {useState} from "react";
import { Form, Button} from "react-bootstrap"
import WorkoutConns from "../connection/connection";
import { useNavigate} from "react-router-dom";

const Signup = () =>{
    let navigate = useNavigate();
    const [error, setError] = useState(null)
    const errorDiv = error 
        ? 
        <div className = "text-danger">
            {error}
          </div> 
        : '';
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassowrd] = useState('');

    var user = {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword
    };
    const handleSubmit = e =>{
        e.preventDefault()
        setError(null);
        WorkoutConns.signup(JSON.stringify(user))
            .then(res => {
                console.log(res);
                navigate(`/${user.name}`, {state: user.name})
            })
            .catch(err => {
                setError(err.message);
            });
    };
    return(
        <div>
            <Form onSubmit = {handleSubmit}>
                <Form.Group className="mb-3">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control 
                    as = "input"
                    required
                    id="name" 
                    placeholder="Name" 
                    value={name}
                    onChange = {(e) => setName(e.target.value)} 
                />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label htmlFor="email" >Email</Form.Label>
                <Form.Control 
                    as = "input"
                    required
                    id="email" 
                    placeholder="Email"
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)} 
                />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control 
                    as = "input"
                    required
                    id="password" 
                    type="password"
                    value= {password}
                    placeholder="Password" 
                    onChange = {(e) => setPassword(e.target.value)}
                />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label htmlFor="confirmPassword" >Confirm Password</Form.Label>
                <Form.Control 
                    as = "input"
                    required
                    id="confirmPassword" 
                    type = "password"
                    value = {confirmPassword}
                    placeholder="Confirm Password" 
                    onChange = {(e) => setConfirmPassowrd(e.target.value)}
                />
                </Form.Group>
                <Button type="submit">Sign Up</Button>
            </Form>
            {errorDiv}
        </div>
    );
}

export default Signup