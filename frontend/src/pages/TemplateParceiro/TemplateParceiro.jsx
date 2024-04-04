import { Outlet, Link } from "react-router-dom";
import logo from "../../assets/images/homepage/logo.png";
import "../../components/NavbarComp/navbar.scss";
import "../../scss/partials/_global.scss";
import Footer from "../../components/FooterComp/Footer";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function TemplateParceiro() {
  return (
    <div className='App'>
      <Navbar
        expand='lg'
        className='bg-white ms-n1 shadow p-3 rounded p-sm-3 ps-lg-5 pe-lg-5 '>
        <Container
          fluid
          className='d-flex justify-content-between align-items-center navbar'>
          <Navbar.Brand>
            <Link to='/'>
              <img src={logo} alt='' className='navbar__logo' />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse
            id='navbarScroll'
            className='collapse navbar-collapse justify-content-end gap-xl-5'>
            <Nav className='ms-auto gap-4 pt-4 ps-4 ms-lg-0 gap-lg-2 pt-lg-0 ps-lg-0'>
              <Nav className='text-center pe-5 d-flex align-items-center justify-content-center fs-4'>
                <Link to='/parceiro/promocoes'>Promoções</Link>
              </Nav>
              <Nav className='text-center pe-5 me-5 d-flex align-items-center justify-content-center fs-4'>
                <Link to='/parceiro/informacoes'>Suas Informações</Link>
              </Nav>
              <Nav className='text-center pe-5 me-5 d-flex align-items-center justify-content-center fs-4'>
                <Link to='/parceiro/feedbacks'>Feedback</Link>
              </Nav>
              <Nav className='text-center pe-5 me-5 d-flex align-items-center justify-content-center fs-4'>
                <Link to='/parceiro/validar-codigo'>
                  Registo Código Visitante
                </Link>
              </Nav>
              <Nav className='text-center d-flex align-items-center justify-content-center fs-4'>
                <Link to='/parceiro/desempenho'>Consultar Desempenho</Link>
              </Nav>
              <Container className='d-flex justify-content-center gap-5 gap-lg-3'>
                <Nav className='text-center w-25'>
                  <NavDropdown title={<i className='bi bi-person-circle' />}>
                    <NavDropdown.Item>
                      <Link>Parceiro</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link>Gestor</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link>Admin</Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Container>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default TemplateParceiro;
