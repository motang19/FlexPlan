import React from "react";
import {Navbar, Nav, Container, NavDropdown, Offcanvas} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route, Link} from "react-router-dom";

import Home from "./components/home";
import Signup from "./components/signup";
import Signin from "./components/signin";


function App() {
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
              <Nav.Link as = {Link} to="/home" >Home</Nav.Link>
                <Nav.Link as = {Link} to="/signup" >Signup</Nav.Link>
                <Nav.Link as ={Link} to="/signin" >Signin</Nav.Link>
                <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
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
          </Routes>
        </Container>
    </div>
  );
}

export default App;
