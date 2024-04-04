import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as formik from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spin from "../../../Spin";
import { updateEventById } from "../../../../utils/eventosApiCalls.mjs";
import Button from "react-bootstrap/Button";
import { Form, Col, Row, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  nome: Yup.string().required("O nome é obrigatório."),
  shortDescription: Yup.string().required("A descrição é obrigatória."),
  local: Yup.string().required("O local é obrigatório."),
  hora: Yup.string().matches(
    /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
    "Formato de hora inválido (HH:MM)."
  ),
  bilhete: Yup.string().test(
    "isValidTicket",
    "O bilhete deve ser 'Entrada Livre' ou um valor válido (XX€)",
    (value) => {
      if (value === "Entrada Livre") {
        return true;
      }
      return /^(\d+(\.\d{1,2})?)€$/.test(value);
    }
  ),
  image: Yup.string().required("A imagem é obrigatória."),
  cartazUrl: Yup.string()
});

function UpdateEventForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  console.log("1 adsdadasdasas");
  //TODO
  let state = location.state;
  const { Formik, ErrorMessage } = formik;

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    setIsLoading(true);

    const formJson = Object.fromEntries(formData.entries());

    const response = await updateEventById(state._id, formJson);
    if (response.status === "success") {
      toast.success("Dados atualizados com sucesso!");
      navigate("/gestor/eventos");
    }

    const id = state._id;
    state = formJson;
    state._id = id;

    setIsLoading(false);
  }

  return (
    <div className='mt-5 container'>
      <Link to='/gestor/eventos'>
        <Button variant='secondary' className='main-btn'>
          Retroceder
        </Button>
      </Link>

      {isLoading ? (
        <Spin text='Carregando formulário...' />
      ) : (
        <section className='mt-4'>
          <p className='lead fs-1'>
            Atualizar evento de{" "}
            <span className='text-secondary'>{state.nome}</span>
          </p>
          <div className='row justify-content-end pe-3'>
            <Formik
              initialValues={state}
              validationSchema={validationSchema}
              enableReinitialize={true}>
              {({ values, isSubmitting, handleChange }) => (
                <Form
                  className='bg-primary-subtle py-5 px-3 mt-5 w-85'
                  onSubmit={handleSubmit}>
                  <Row className='mb-3 d-flex justify-content-center'>
                    <Form.Group className='mb-3'>
                      <Form.Label>Nome</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type='text'
                          name='nome'
                          onChange={handleChange}
                          className='form-control'
                          value={values.nome}
                        />
                      </InputGroup>
                      <ErrorMessage
                        name='nome'
                        component='div'
                        className='invalid'
                      />
                    </Form.Group>
                  </Row>
                  <Row className='mb-3 d-flex justify-content-center'>
                    <Form.Group className='mb-3' controlId='formDescricao'>
                      <Form.Label>Descrição</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          as='textarea'
                          rows={5}
                          type='text'
                          name='shortDescription'
                          onChange={handleChange}
                          value={values.shortDescription}
                        />
                        <Form.Control.Feedback type='invalid'></Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Row className='mb-3 d-flex justify-content-center'>
                    <Form.Group as={Col} md='4' controlId='formBilhete'>
                      <Form.Label>€ bilhete</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type='text'
                          name='bilhete'
                          onChange={handleChange}
                          className='form-control'
                          value={values.bilhete}
                        />
                      </InputGroup>
                      <ErrorMessage
                        name='bilhete'
                        component='div'
                        className='invalid'
                      />
                    </Form.Group>
                    <Form.Group as={Col} md='4' controlId='formLocal'>
                      <Form.Label>Local</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type='text'
                          name='local'
                          onChange={handleChange}
                          className='form-control'
                          value={values.local}
                        />
                      </InputGroup>
                      <ErrorMessage
                        name='local'
                        component='div'
                        className='invalid'
                      />
                    </Form.Group>
                    <Form.Group as={Col} md='4' controlId='formHora'>
                      <Form.Label>Horas</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type='text'
                          name='hora'
                          onChange={handleChange}
                          className='form'
                          value={values.hora}
                        />
                      </InputGroup>
                      <ErrorMessage
                        name='hora'
                        component='div'
                        className='invalid'
                      />
                    </Form.Group>
                  </Row>
                  <Row className='mb-3 d-flex justify-content-center'>
                    {/* Adicionar imgUrl e cartazUrl*/}
                  </Row>
                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    variant='secondary'
                    className='mt-4 ms-3 main-btn'>
                    Atualizar dados
                  </Button>
                </Form>
              )}
            </Formik>
          </div>{" "}
          {/* exibir notificações na parte superior */}
          <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
        </section>
      )}
    </div>
  );
}

export default UpdateEventForm;
