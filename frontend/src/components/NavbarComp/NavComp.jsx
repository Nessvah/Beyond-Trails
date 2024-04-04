import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./navbar.scss";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserLinks } from "./navLinks";
import { useAuth } from "../../hook/useAuth";
import { UserRole } from "../../helpers/enums";

function NavComponent({ role }) {
  // const { isAuthenticated, role } = useAuth();
  // Default to guest links if role is not found
  // const links = isAuthenticated
  //   ? UserLinks[role]
  //   : UserLinks[UserRole.NotAuthenticated];

  const links = UserLinks[role];

  return (
    <Navbar
      expand='lg'
      className='bg-white ms-n1 shadow p-3 rounded p-sm-3 ps-lg-5 pe-lg-5 '>
      <Container fluid className='d-flex align-items-center navbar'>
        <Navbar.Brand>
          <Link to='/'>
            <img src={logo} alt='' className='navbar__logo' />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse
          id='navbarScroll'
          className='collapse navbar-collapse justify-content-end gap-xl-5 '>
          <Nav
            className='col-6 col-lg-10 ms-auto gap-md-3 gap-lg-5 pt-4 ps-4 ms-lg-0 pt-lg-0 ps-lg-0 justify-content-xl-end align-items-center'
            navbarScroll>
            {links.map((link, index) => {
              if (link.items) {
                return (
                  <NavDropdown key={index} title={link.text}>
                    {link.items.map((item, itemI) => {
                      return (
                        <NavDropdown.Item key={itemI}>
                          <Link to={item.to}>{item.text}</Link>
                        </NavDropdown.Item>
                      );
                    })}
                  </NavDropdown>
                );
              } else {
                return (
                  <Nav key={index}>
                    <Link to={link.to}>{link.text}</Link>
                  </Nav>
                );
              }
            })}

            <Container className='d-flex col-2 m-0 justify-content-center align-items-center gap-5 '>
              <div>
                <NavDropdown
                  title={
                    <i
                      className='bi bi-person-circle'
                      aria-label='press for login'
                    />
                  }>
                  <NavDropdown.Item>
                    <Link to='/login'>Login</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to='/perfil'>Perfil</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to='/parceiro'>Parceiro</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to='/gestor'>Gestor</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
              <div>
                <Link to='/favoritos'>
                  {" "}
                  <i className='bi bi-suit-heart' />
                </Link>
              </div>
            </Container>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavComponent;
