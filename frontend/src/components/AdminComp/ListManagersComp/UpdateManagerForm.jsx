import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import { updateManagerSchema } from "../../../validationSchemas/managersSchema";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Spin from "../../Spin";
import { updateManagerById } from "../../../utils/apiCalls.mjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect, useParams } from "react-router-dom";
import ManagersForm from "./ManagersForm";

function UpdateManagerForm(x) {
  // keep track of the manager data and loading data
  const [managerData, setManagerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { Formik } = formik;

  const params = useParams("id");
  const managerId = params.id;

  console.log("id ", managerId);

  useEffect(() => {
    const getManagerInfo = async (id) => {
      try {
        const response = await axios.get(
          `http://${process.env.REACT_APP_API}/api/admin/managers/${id}`,
          { withCredentials: true }
        );
        const data = await response.data.data[0];
        setManagerData(data);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.error(e.message);
        return e.message;
      }
    };

    getManagerInfo(managerId);
  }, [managerId]);

  console.log(managerData);
  async function sendDataToUpdate(formData) {
    setIsLoading(true);

    const response = await updateManagerById(managerId, formData);
    const updatedManager = await response.data;
    setManagerData([updatedManager]);

    if (response.status == "success") {
      toast.success(response.message);
      setIsLoading(false);
      x = !x;
    } else {
      setIsLoading(false);
      toast.error(response.message);
    }
  }

  if (isLoading) return <Spin text='A carregar formulário...' />;

  return (
    <div className='mt-5 col-8 mx-auto'>
      {managerData && (
        <section className='px-4 mt-4 w-75'>
          <p className='lead fs-1'>
            Atualizar registo de{" "}
            <span className='text-secondary'>
              {managerData.firstName} {managerData.lastName}
            </span>
          </p>
          <div className='row justify-content-end pe-3'>
            <Formik
              initialValues={managerData}
              validationSchema={updateManagerSchema}
              enableReinitialize={true}
              onSubmit={sendDataToUpdate}>
              {/* Children of formik component + their props */}
              {({
                isSubmitting,
                errors,
                handleChange,
                values,
                handleSubmit,
                handleBlur
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
                        onChange={handleChange}
                        isInvalid={!!errors.nif}
                        value={values.nif}
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.address}
                        value={values.address}
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.state}
                        value={values.state}
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.zip}
                        value={values.zip}
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.phoneNumber}
                        value={values.phoneNumber}
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.tourismDistrict}
                        value={values.tourismDistrict}
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.email}
                        value={values.email}
                      />

                      <Form.Control.Feedback type='invalid'>
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
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
          </div>
        </section>
      )}

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
    </div>
  );
}

export { UpdateManagerForm };
