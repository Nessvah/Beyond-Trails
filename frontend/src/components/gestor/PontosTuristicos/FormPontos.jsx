import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import InputGroup from "react-bootstrap/InputGroup";
import { pontosSchema } from "../../../validationSchemas/pontosSchema";
import Button from "react-bootstrap/Button";
import { locations } from "../../../helpers/enums";

function FormPontos({ onSubmit, setShowForm }) {
  const { Formik } = formik;

  function handleFormSubmission(values) {
    setShowForm(false);
    onSubmit(values);
  }

  return (
    <div className='bg-primary-subtle pt-5 row gap-5 py-5 m-0 create-manager main-section'>
      <header className='container col-10 col-sm-9 col-md-8 mx-auto mt-5'>
        <h1>Criação de Pontos Turísticos</h1>
        <p>Nesta página pode criar um novo Ponto Turístico.</p>
      </header>
      <Formik
        initialValues={{
          local: "",
          imgUrl: "",
          morada: "",
          coordenadas: "",
          horario: "",
          descricao: "",
          telefone: "",
          telemovel: "",
          website: "",
          acessibilidade: "",
          qrcode: "",
          tipo: "",
          pontosAssociados: ""
        }}
        validationSchema={pontosSchema}
        onSubmit={handleFormSubmission}>
        {({
          isSubmitting,
          values,
          errors,
          handleChange,
          setFieldValue,
          handleSubmit,
          handleBlur,
          isValid,
          touched
        }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className='bg-primary-subtle py-5 px-3 mt-5 container col-10 col-sm-9 col-md-8'>
            <Row className='mb-3'>
              <Form.Group className='mb-4'>
                <Form.Label>Local</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type='text'
                    name='local'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.local}
                    isInvalid={!!errors.local}
                    required
                    minLength='2'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.local}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className='mb-4'>
                <Form.Label>Imagem do Local</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    style={{ height: "34px" }}
                    type='file'
                    name='imgUrl'
                    onChange={(e) => setFieldValue("imgUrl", e.target.files[0])}
                    onBlur={handleBlur}
                    isInvalid={!!errors.imgUrl}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.imgUrl}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className='mb-4' controlId='formMorada'>
                <Form.Label>Morada</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type='text'
                    name='morada'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.morada}
                    isInvalid={!!errors.morada}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.morada}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group
                as={Col}
                md='6'
                className='mb-4'
                controlId='formCoordenadas'>
                <Form.Label>Coordenadas</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type='text'
                    name='coordenadas'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.coordenadas}
                    isInvalid={!!errors.coordenadas}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.coordenadas}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group
                as={Col}
                md='6'
                className='mb-4'
                controlId='formHorario'>
                <Form.Label>Horario</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type='text'
                    name='horario'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.horario}
                    isInvalid={!!errors.horario}
                    required
                    pattern='/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/'
                    placeholder='HH:MM'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.horario}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className='mb-4' controlId='formDescricao'>
                <Form.Label>Descrição</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    as='textarea'
                    rows={5}
                    type='text'
                    name='descricao'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.descricao}
                    isInvalid={!!errors.descricao}
                    required
                    minLength='20'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.descricao}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group
                as={Col}
                md='6'
                className='mb-4'
                controlId='formTelefone'>
                <Form.Label>Telefone</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    style={{ height: "34px" }}
                    type='text'
                    name='telefone'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.telefone}
                    isInvalid={!!errors.telefone}
                    minLength='9'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.telefone}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group
                as={Col}
                md='6'
                className='mb-4'
                controlId='formTelemovel'>
                <Form.Label>Telemovel</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    style={{ height: "34px" }}
                    type='text'
                    name='telemovel'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.telemovel}
                    isInvalid={!!errors.telemovel}
                    minLength='9'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.telemovel}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className='mb-4' controlId='formWebsite'>
                <Form.Label>Website</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type='text'
                    name='website'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.website}
                    isInvalid={!!errors.website}
                    minLength='5'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.website}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group
                as={Col}
                md='6'
                className='mb-4'
                controlId='formAcessibilidade'>
                <Form.Label>Acessibilidade</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type='text'
                    name='acessibilidade'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.acessibilidade}
                    isInvalid={!!errors.acessibilidade}
                    minLength='2'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.acessibilidade}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group
                as={Col}
                md='6'
                className='mb-4'
                controlId='formQrCode'>
                <Form.Label>QrCode</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type='text'
                    name='qrcode'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.qrcode}
                    isInvalid={!!errors.qrcode}
                    required
                    minLength='2'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.qrcode}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md='6' className='mb-4' controlId='formTipo'>
                <Form.Label>Tipo de Ponto</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    style={{ height: "34px" }}
                    as='select'
                    name='tipo'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.tipo}
                    isInvalid={!!errors.tipo}
                    required>
                    <option value=''>Selecione um tipo</option>
                    <option value={locations.CastelosMuseus}>
                      Castelos e Museus
                    </option>
                    <option value={locations.PatrimonioReligioso}>
                      Património Religioso
                    </option>
                    <option value={locations.PontosNaturais}>
                      Pontos Naturais
                    </option>
                  </Form.Control>
                  <Form.Control.Feedback type='invalid'>
                    {errors.tipo}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group
                as={Col}
                md='6'
                className='mb-4'
                controlId='formPontosAssociados'>
                <Form.Label>Pontos Associados</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type='text'
                    name='pontosAssociados'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.pontosAssociados}
                    isInvalid={!!errors.pontosAssociados}
                    required
                    minLength='2'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.pontosAssociados}
                  </Form.Control.Feedback>
                </InputGroup>
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
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormPontos;
