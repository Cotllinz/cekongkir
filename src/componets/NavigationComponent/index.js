import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../route";
import "./index.css";
const NavigationBar = () => {
  const history = useHistory();
  const auth = useAuth();
  const logOut = () => {
    auth.signout(() => {
      history.push("/");
    });
  };
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
              exact
              activeClassName="actived"
              className="nav_link me-2"
            >
              Home
            </NavLink>
            <NavLink
              to="/history"
              activeClassName="actived"
              className="nav_link me-2"
            >
              History
            </NavLink>
          </Nav>
          {auth.user === "belum login" ? (
            <button
              onClick={() => history.push("/login")}
              className="ms-auto btn_login"
            >
              Login
            </button>
          ) : (
            <button onClick={() => logOut()} className="ms-auto btn_login">
              Log Out
            </button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export { NavigationBar };
