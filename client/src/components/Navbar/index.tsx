import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavbarComponent = () => {

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{height: '9vh'}}>
      <Container>
        <Navbar.Brand href="/home">Flyp-Automation</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/automation">Automation</Nav.Link>
            <Nav.Link as={Link} to="/scraping">Scraping</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;