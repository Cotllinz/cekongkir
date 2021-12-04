import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "./index.css";
const NavigationBar = () => {
  return (
    <Navbar className="border-bottom mb-4">
      <Container className="d-flex align-items-center">
        <Navbar.Brand className="logoTag_Nav">
          <Link to="/">OngkirCek.in</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              to="/"
              className={(isActive) =>
                `nav_link me-2 ${isActive ? "actived" : "notActived"}`
              }
            >
              Home
            </NavLink>
          </Nav>
          <button className="ms-auto btn_login">Login</button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export { NavigationBar };
