import { Formik, Form, Field, ErrorMessage } from "formik";
import ButtonLaranja from "../BotaoLaranja/ButtonLaranja";
import visitanteSchema from "./visitanteSchema";
import colaboradorSchema from "./partnerSchema";
import { registerVisitor, registerPartner } from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col } from "react-bootstrap";
import registoImg from "../../assets/images/beneficioPartner/registo.png";
const RegistoVisitante = () => {
  const selectedOption = "visitante";
  const validationSchema =
    selectedOption === "visitante" ? visitanteSchema : colaboradorSchema;

  const handleFormSubmit = async (values) => {
    try {
      console.log(values.name);
      console.log(values.gender);

      const formattedDateOfBirth = formatDate(values.dateOfBirth);
      console.log(formattedDateOfBirth);

      console.log(values.city);
      console.log(values.email);
      console.log(values.password);

      if (values.password !== values.repeatPassword) {
        toast.error("As senhas não coincidem.");
        return;
      }

      if (selectedOption === "visitante") {
        values.dateOfBirth = formattedDateOfBirth;
        delete values.repeatPassword;
        await registerVisitor(values);
      } else {
        await registerPartner(values);
      }

      toast.success("Registo bem-sucedido!");
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      toast.error("Ocorreu um erro durante o registo.");
    }
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <Container fluid className='container-registo p-5 mt-5'>
      <Row>
        <Col md='6'>
          <div className='col-12 d-flex align-items-center justify-content-center pt-5 mt-5'>
            <img
              src={registoImg}
              className='img-fluid'
              width={75}
              alt='Image'
            />
          </div>
        </Col>
        <Col className='col-10 col-md-4 pt-5 mx-auto md-6'>
          <h1 className='text-center p-3'>Registo</h1>
          <Formik
            initialValues={{
              name: "",
              gender: "",
              dateOfBirth: "",
              city: "",
              email: "",
              password: "",
              repeatPassword: "",
              isSubscribed: false
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              handleFormSubmit(values);
              setSubmitting(false);
              resetForm();
            }}>
            <Form className='was-validated'>
              <div className='mb-3'>
                <label htmlFor='name'>Nome</label>
                <Field
                  type='text'
                  id='name'
                  name='name'
                  className='form-control'
                  required
                />
                <ErrorMessage
                  name='name'
                  component='div'
                  className='text-danger'
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='gender'>Gênero</label>
                <Field
                  as='select'
                  id='gender'
                  name='gender'
                  className='form-select pt-4 fs-5'
                  required>
                  <option value=''>Selecione seu gênero</option>
                  <option value='m'>Masculino</option>
                  <option value='f'>Feminino</option>
                  <option value='other'>Outro</option>
                </Field>
                <ErrorMessage
                  name='gender'
                  component='div'
                  className='text-danger'
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='dateOfBirth'>Data de Nascimento</label>
                <Field
                  type='date'
                  id='dateOfBirth'
                  name='dateOfBirth'
                  className='form-control pt-4'
                  required
                />
                <ErrorMessage
                  name='dateOfBirth'
                  component='div'
                  className='text-danger'
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='city'>Localidade</label>
                <Field
                  type='text'
                  id='city'
                  name='city'
                  className='form-control'
                  required
                />
                <ErrorMessage
                  name='city'
                  component='div'
                  className='text-danger'
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='email'>Email</label>
                <Field
                  type='email'
                  id='email'
                  name='email'
                  className='form-control'
                  required
                />
                <ErrorMessage
                  name='email'
                  component='div'
                  className='text-danger'
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='password'>Password</label>
                <Field
                  type='password'
                  id='password'
                  name='password'
                  className='form-control pt-4'
                  required
                />
                <ErrorMessage
                  name='password'
                  component='div'
                  className='text-danger'
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='repeatPassword'>Confirmação de Password:</label>
                <Field
                  type='password'
                  id='repeatPassword'
                  name='repeatPassword'
                  className='form-control pt-4'
                  required
                  data-testid='repeatPassword'
                />
              </div>
              <ErrorMessage
                name='repeatPassword'
                component='div'
                className='error'
              />
              <div className='mb-3'>
                <label htmlFor='isSubscribed'>
                  Deseja receber newsletters?
                </label>
                <div>
                  <Field
                    type='checkbox'
                    id='isSubscribed'
                    name='isSubscribed'
                    className='form-check-input'
                  />
                  <label htmlFor='isSubscribed' className='form-check-label'>
                    Sim, desejo receber newsletters
                  </label>
                </div>
                <ErrorMessage
                  name='isSubscribed'
                  component='div'
                  className='text-danger'
                />
              </div>
              <section className='botao-center mt-4 p-5 d-flex justify-content-center align-items-center'>
                <ButtonLaranja label='Criar Conta' type='submit' />
              </section>
            </Form>
          </Formik>
          <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar
          />
        </Col>
      </Row>
    </Container>
  );
};

export default RegistoVisitante;
