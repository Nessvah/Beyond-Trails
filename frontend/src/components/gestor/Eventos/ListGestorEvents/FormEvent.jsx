import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import InputGroup from "react-bootstrap/InputGroup";
//esquema de validação para os campos do formulário
import eventSchema from "../../../../validationSchemas/eventSchema";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function FormEvents({ onSubmit, setShowForm }) {
  const navigate = useNavigate();
  const { Formik } = formik;

  //função para ser chamada quando o formulário é enviado. Define o comportamento de submissão, incluindo o fecho do formulário, chamando onSubmit
  function handleFormSubmission(values) {
    setShowForm(false);
    onSubmit(values);
    console.log(values);
    // Navegar para a página /gestor/eventos
    navigate("/gestor/eventos");
    // Fazer um refresh na página
    window.location.reload();
  }

  return (
    <div className='bg-primary-subtle pt-5 row gap-5 py-5 m-0 create-manager main-section'>
      <header className='container col-10 col-sm-9 col-md-8 mx-auto mt-5'>
        <h1>Criação de eventos</h1>
        <p>Aqui pode criar novos eventos.</p>
      </header>
      <Formik
        initialValues={{
          nome: "",
          shortDescription: "",
          local: "",
          hora: "",
          bilhete: "",
          images: "",
          images1: ""
        }}
        validationSchema={eventSchema}
        onSubmit={handleFormSubmission}>
        {({
          isSubmitting,
          values,
          setFieldValue,
          errors,
          handleChange,
          handleSubmit,
          handleBlur,
          isValid,
          touched
        }) => (
          <form
            noValidate
            onSubmit={handleSubmit}
            className='bg-primary-subtle py-5 px-3 mt-5 container col-10 col-sm-9 col-md-8'
            encType='multipart/form-data'>
            <Row className='mb-3'>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='nome'>Nome</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type='text'
                    name='nome'
                    id='nome'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nome}
                    isInvalid={!!errors.nome}
                    required
                    minLength='3'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.nome}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className='mb-3' controlId='formDescricao'>
                <Form.Label htmlFor='shortDescription'>Descrição</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    as='textarea'
                    rows={5}
                    type='text'
                    name='shortDescription'
                    id='shortDescription'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.shortDescription}
                    isInvalid={!!errors.shortDescription}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.shortDescription}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md='4' controlId='formBilhete'>
                <Form.Label htmlFor='bilhete'>€ bilhete</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type='text'
                    name='bilhete'
                    id='bilhete'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.bilhete}
                    isInvalid={!!errors.bilhete}
                    required
                    minLength='3'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.bilhete}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md='4' controlId='formLocal'>
                <Form.Label htmlFor='local'>Local</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type='text'
                    name='local'
                    id='local'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.local}
                    isInvalid={!!errors.local}
                    required
                    minLength='3'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.local}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md='4' controlId='formHora'>
                <Form.Label htmlFor='hora'>Horas</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type='text'
                    name='hora'
                    id='hora'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.hora}
                    isInvalid={!!errors.hora}
                    required
                    pattern='\d{2}:\d{2}'
                    placeholder='HH:MM'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.horas}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md='4' className='pb-5'>
                <Form.Label htmlFor='images'>Imagem</Form.Label>
                <Form.Control
                  type='file'
                  name='images'
                  id='images'
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("images", e.target.files[0])}
                  isInvalid={!!errors.image}
                  className='fs-2'
                />
              </Form.Group>
              <Form.Group as={Col} md='4' className='pb-5'>
                <Form.Label htmlFor='images1'>Cartaz</Form.Label>
                <Form.Control
                  type='file'
                  name='images1'
                  id='images1'
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("images1", e.target.files[0])}
                  isInvalid={!!errors.image}
                  className='fs-2'
                />
              </Form.Group>
            </Row>

            <Button
              type='submit'
              disabled={
                isSubmitting ||
                !isValid ||
                (Object.keys(touched).length === 0 &&
                  touched.constructor === Object)
              }
              variant='outline-secondary'
              className='main-btn mt-5'>
              Criar
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default FormEvents;
