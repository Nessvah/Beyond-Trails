import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import { useEffect, useState } from "react";
import { UserActions } from "../../context/AuthContext";
import loginHero from "../../assets/images/login-hero.png";
import Form from "react-bootstrap/Form";
import { login, resetPwd } from "../../utils/apiCalls.mjs";
import { toast } from "react-toastify";
import { getFormDataToObj } from "../../utils/forms";
import { UserRole } from "../../helpers/enums";
import { useNavigate } from "react-router-dom";
// import Modal from "react-bootstrap/Modal";
import { CenteredModal } from "../Modals/CenteredModal";

function Login() {
  // the state needed here and the function from reducer
  const { isAuthenticated, role, dispatch } = useAuth();
  const navigate = useNavigate();
  // Keep track of the form fields if they are valid/empty or not
  const [validated, setValidated] = useState(false);
  // this will allow us to disabled the submit button if we are
  // still processing a previous submit form
  const [processForm, setProcessForm] = useState(false);

  // handle open/close modal for entering an email if the user
  // asks for a reset
  const [modalShow, setModalShow] = useState(false);

  // this will allow us to know when there is a new user
  // so that we can redirect them to their respective routes
  const [userData, setUserData] = useState(null);

  /**
   * This function allow us to handle ourselves to check and state the state for
   * the form validation and if everything is ok, we can handle the submission
   * to the server of the json obj with the form data.
   * @param {e} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessForm(true);
    // this will get the ref to the corresponding form to the submit event
    const form = event.currentTarget;

    // If the element fails its constraints, the browser fires a cancelable
    // invalid event at the element, and then returns false.
    if (form.checkValidity() === false) {
      // preventing form submission
      event.preventDefault();

      // this prevents the event from continuing to propagate up the DOM tree.
      // It stops from reaching to parent elements
      event.stopPropagation();
      setProcessForm(false);
    }

    // if everything is ok we can set the validated state to true
    setValidated(true);

    const data = getFormDataToObj(form);

    try {
      const response = await login(data);
      const info = await response.data[0];

      // if the response is successful we can update the login
      // states and the user will be redirected to their page
      dispatch({ type: UserActions.LOGIN, payload: info });
      setUserData(info);
    } catch (e) {
      toast.error(e.data.message);
      setProcessForm(false);
    }
  };

  /**
   * Redirect each user to their route based on their role
   */

  useEffect(() => {
    if (isAuthenticated) {
      console.log(role);
      switch (Number(role)) {
        case UserRole.Admin:
          navigate("/admin");
          break;
        case UserRole.Manager:
          navigate("/gestor");
          break;
        case UserRole.Partner:
          navigate("/parceiro");
          break;
        case UserRole.Visitor:
          navigate("/visitante");
          break;
        default:
          navigate("/");
      }
    }
  }, [userData]);

  /**
   *  we can pass this function to the child modal so that when the user
   *  clicks on the closing button, will return back the value
   * entered in the input.
   * we'll receive an object {email: value} and we can send that to the
   * server and show the response to the user
   * @param {object} email
   */
  async function askResetPwd(email) {
    setModalShow(false);
    try {
      const response = await resetPwd(email);

      toast.success(response.message);
    } catch (e) {
      toast.error(e.response.message);
    }
  }

  return (
    <Container fluid className='p-3 my-5'>
      <Container className='mx-auto'>
        <Row className='justify-content-between'>
          <Col col='10' md='6'>
            <img
              src={loginHero}
              className='img-fluid'
              width={75}
              alt='Phone image'
            />
          </Col>

          <Col className='col-10 col-md-4 pt-5 mx-auto md-6 d-flex flex-column justify-content-center'>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className='d-flex flex-column gap-5'>
                <Form.Group as={Col} controlId='validationEmail'>
                  {/* <Form.Label>First name</Form.Label> */}
                  <Form.Control
                    required
                    name='email'
                    type='email'
                    placeholder='Endereço de email'
                    style={{ textIndent: "10px" }}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Verifique o email!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className='mb-5' controlId='validationPwd'>
                  {/* <Form.Label>First name</Form.Label> */}
                  <Form.Control
                    required
                    name='password'
                    type='password'
                    placeholder='Password'
                    style={{ textIndent: "10px" }}
                  />

                  <Form.Control.Feedback type='invalid'>
                    Verifique a password!
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Col className='gap-3 mx-4 mb-4'>
                <input
                  type='checkbox'
                  name='flexCheck'
                  value=''
                  id='flexCheckDefault'
                  label='Remember me'
                />
                <a className='ps-3' href='#'>
                  Esquecer palavra-passe?
                </a>
              </Col>
              <Button
                type='submit'
                disabled={processForm}
                variant='primary'
                className=' mb-4 w-100 main-btn'
                size='lg'>
                Entrar
              </Button>
            </Form>
            <div className='row align-items-center '>
              <p className='text-center col-auto m-0'>
                Esqueceu-se da palavra passe?
              </p>
              <Button
                onClick={() => {
                  setModalShow(true);
                }}
                style={{ textTransform: "underline" }}
                className='text-secondary border-0 bg-transparent p-0 fs-3 align-self-center col-auto fw-semibold underlined'>
                {" "}
                Peça uma nova.
              </Button>
            </div>
            <div className='divider d-flex justify-content-center my-4'>
              <p className='fw-bold mx-3 mb-0'>OU</p>
            </div>

            <Button
              className='mb-4 w-100 main-btn'
              size='lg'
              style={{ backgroundColor: "#3b5998" }}>
              <i className='bi bi-facebook pe-4' />
              Continuar com facebook
            </Button>

            <Button
              className='mb-4 w-100 main-btn'
              size='lg'
              style={{ backgroundColor: "#F16283" }}>
              <i className='bi bi-instagram pe-4' />
              Continuar com Instagram
            </Button>
            <p className='text-center '>
              Ainda não tem conta?{" "}
              <NavLink
                to={"/registo"}
                style={{ textTransform: "underline" }}
                className='text-secondary fw-semibold underlined'>
                {" "}
                Registe-se aqui.
              </NavLink>
            </p>
          </Col>
        </Row>
      </Container>

      {/* Modal to ask for a pwd*/}
      <CenteredModal show={modalShow} onHide={askResetPwd} />
    </Container>
  );
}

export default Login;
