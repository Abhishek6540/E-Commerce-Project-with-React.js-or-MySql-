import React, { useContext } from 'react'
import NoteContext from './NoteContext/NoteContext';
import {Navbar,Nav,Container} from 'react-bootstrap';

const NavBar = () => {
     const valueContext=useContext(NoteContext);

  return (
    <>
 <Navbar striped bordered hover bg="light" expand="lg" variant="light">
      <Container>
        <Navbar.Brand href="/">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-cJ4yKGCAlsG8s3tiJ7KwMFc0u2TLjQ3uE8G2MdDZ-54J_0g&s" href="/" width={50}/>
      </Navbar.Brand>
        <Navbar.Brand href="/"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/About">About Us</Nav.Link>
            <Nav.Link href="/Contact">Contact Us</Nav.Link>
            <Nav.Link href="/Login">Login</Nav.Link>
            <Nav.Link href="/Register">Register</Nav.Link>

           {/* <button type="button" class="btn btn-primary position-relative">
 Inbox
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    99+
    <span class="visually-hidden"></span>
  </span>
 </button> */}
       <h4>{valueContext.user}</h4>

            <Nav.Link href="/ViewCart">
       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIEzX6jFwpnJ2K-85c8KmT0glGbOYHWy4_D3B4iV0XXCR8Njs&s" className="image" width={50}/>
       </Nav.Link>

     


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    
    </>
  )
}

export default NavBar
