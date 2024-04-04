import { Formik } from "formik";
import * as Yup from "yup";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

function FormPromotions({ onSubmit, setShowForm }) {
  const initialValues = {
    promotionName: "",
    description: "",
    endDate: "",
    startDate: "",
    requiredPoints: "",
    image: ""
  };

  const validationSchema = Yup.object({
    promotionName: Yup.string().required("Nome da Promoção é obrigatório"),
    description: Yup.string().required("Descrição é obrigatória"),
    endDate: Yup.date().required("Data de Término é obrigatória"),
    startDate: Yup.date().required("Data de Início é obrigatória"),
    requiredPoints: Yup.number().required(
      "Pontos Necessários são obrigatórios"
    ),
    image: Yup.mixed().nullable()
  });

  function handleFormSubmission(values) {
    console.log("values");
    setShowForm(false);
    onSubmit(values);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
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
        <Form
          noValidate
          onSubmit={handleSubmit}
          className='bg-primary-subtle py-5 px-3 mt-5'
          enctype='multipart/form-data'>
          <Row className='mb-3'>
            <Form.Group
              as={Col}
              md='4'
              controlId='formPromotionName'
              className='pb-5'>
              <Form.Label>Nome da Promoção</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type='text'
                  name='promotionName'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.promotionName}
                  isInvalid={!!errors.promotionName}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.promotionName}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group
              as={Col}
              md='4'
              controlId='formDescription'
              className='pb-5'>
              <Form.Label>Descrição</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type='text'
                  name='description'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.description}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group
              as={Col}
              md='4'
              controlId='formRequiredPoints'
              className='pb-5'>
              <Form.Label>Pontos Necessários</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type='text'
                  name='requiredPoints'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.requiredPoints}
                  isInvalid={!!errors.requiredPoints}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.requiredPoints}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group
              as={Col}
              md='4'
              controlId='formStartDate'
              className='pb-5'>
              <Form.Label>Data de Início</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type='date'
                  name='startDate'
                  onBlur={handleBlur}
                  value={values.startDate}
                  onChange={handleChange}
                  isInvalid={!!errors.startDate}
                  className='fs-2'
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.startDate}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group
              as={Col}
              md='4'
              controlId='formEndDate'
              className='pb-5'>
              <Form.Label>Data de Término</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type='date'
                  name='endDate'
                  onBlur={handleBlur}
                  value={values.endDate}
                  onChange={handleChange}
                  isInvalid={!!errors.endDate}
                  className='fs-2'
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.endDate}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md='4' className='pb-5'>
              <Form.Label>Imagem</Form.Label>
              <Form.Control
                type='file'
                name='image'
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("image", e.target.files[0])}
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
            variant='outline-primary'
            className='mt-4 ms-3 main-btn'>
            Registar
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default FormPromotions;
