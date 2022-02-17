import {React, useState, useEffect} from "react";
import {Navbar, Nav, Container, Button, Offcanvas} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route, Link, useNavigate, Navigate, useLocation} from "react-router-dom";

import Home from "./components/home";
import Signup from "./components/signup";
import Signin from "./components/signin";
import User from "./components/user";
import UserCurrent from "./components/userCurrent";
import UserHistory from "./components/userHistory";



function App() {
  
  let {state} = useLocation();
  console.log(state);
  let navigate = useNavigate();
  const [user, setUser] = useState('')
  useEffect(()=>{
    if (state !== null){
      setUser(state);
    }
  },[state]);
  const Logout = () =>{
    setUser('');
    navigate(`/home`, {state: null});
  };
  
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand={false}>
        <Container fluid>
          <Navbar.Brand href="/home"> Workout Planner</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Workout</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {user ? (
                    <>
                      <Nav.Link onClick = {()=>{navigate(`/${user}/workout-history`, {state: user})}}>History</Nav.Link>
                      <Nav.Link onClick = {()=>{navigate(`/${user}/workout-current`, {state: user})}}>Workout</Nav.Link>
                      <Nav.Link onClick = {()=>{navigate(`/${user}`, {state: user})}}>Profile</Nav.Link>
                      <Button variant="outline-danger" onClick={Logout}>Logout</Button>
                    </>
                  ):(
                    <>
                      <Nav.Link as = {Link} to="/home" >Home</Nav.Link>
                      <Nav.Link as = {Link} to="/signup" >Signup</Nav.Link>
                      <Nav.Link as ={Link} to="/signin" >Signin</Nav.Link>
                    </>
                  )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
        
        <Container>
          <Routes>
            <Route path= "/home" element = {<Home/>}/>
            <Route path = "/signup" element = {<Signup />}/>
            <Route path = "/signin" element = {<Signin/>}/>
            <Route path ="/:name" element = {<User/>}/>
            <Route path = "/:name/workout-history" element = {<UserHistory/>}/>
            <Route path = "/:name/workout-current" element = {<UserCurrent/>}/>
          </Routes>
        </Container>
    </div>
  );
}

export default App;
