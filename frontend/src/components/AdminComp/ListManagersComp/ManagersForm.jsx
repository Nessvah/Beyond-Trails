import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import managerSchema from "../../../validationSchemas/managersSchema";

function ManagersForm({ onSubmit, setShowForm }) {
  const { Formik } = formik;

  function handleFormSubmission(values) {
    // pass values to the parent component
    setShowForm(false);
    onSubmit(values);
  }

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        nif: "",
        address: "",
        state: "",
        zip: "",
        phoneNumber: "",
        tourismDistrict: "",
        email: "",
        password: ""
      }}
      validationSchema={managerSchema}
      onSubmit={handleFormSubmission}>
      {/* Children of formik component + their props */}
      {({
        isSubmitting,
        values,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
        isValid,
        touched
      }) => (
        <Form
          noValidate
          onSubmit={handleSubmit}
          className='bg-primary-subtle py-5 px-3 mt-5'>
          <Row className='mb-3'>
            <Form.Group as={Col} md='4' controlId='formFirstName'>
              <Form.Label>Primeiro Nome</Form.Label>
              <Form.Control
                type='text'
                name='firstName'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='4' controlId='formLastName'>
              <Form.Label>Último nome</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type='text'
                  name='lastName'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.lastName}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md='4' controlId='formNif'>
              <Form.Label>NIF</Form.Label>

              <Form.Control
                type='number'
                aria-describedby='inputGroupPrepend'
                name='nif'
                onBlur={handleBlur}
                value={values.nif}
                onChange={handleChange}
                isInvalid={!!errors.nif}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.nif}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col} md='6' controlId='formAddress'>
              <Form.Label>Morada:</Form.Label>

              <Form.Control
                type='text'
                name='address'
                autoComplete='off'
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.address}
              />

              <Form.Control.Feedback type='invalid'>
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='3' controlId='formState'>
              <Form.Label>Distrito</Form.Label>

              <Form.Control
                type='text'
                name='state'
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.state}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.state}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='3' controlId='formZip'>
              <Form.Label>Código-Postal</Form.Label>

              <Form.Control
                type='text'
                name='zip'
                value={values.zip}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.zip}
              />

              <Form.Control.Feedback type='invalid'>
                {errors.zip}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col} md='6' controlId='formPhoneNumber'>
              <Form.Label>Telemóvel/Telefone</Form.Label>

              <Form.Control
                type='text'
                name='phoneNumber'
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.phoneNumber}
              />

              <Form.Control.Feedback type='invalid'>
                {errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='3' controlId='formTourismDistrict'>
              <Form.Label>Distrito da região Turística</Form.Label>

              <Form.Control
                type='text'
                name='tourismDistrict'
                value={values.tourismDistrict}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.tourismDistrict}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.tourismDistrict}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col} md='6' controlId='formEmail'>
              <Form.Label>Email</Form.Label>

              <Form.Control
                autoComplete='off'
                type='text'
                name='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.email}
              />

              <Form.Control.Feedback type='invalid'>
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='3' controlId='formPassword'>
              <Form.Label>Password</Form.Label>

              <Form.Control
                type='password'
                name='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.password}
              </Form.Control.Feedback>
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
            variant='outline-primary'
            className='mt-4 ms-3 main-btn'>
            Registar
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default ManagersForm;
