import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import { updatePontosSchema } from "../../../validationSchemas/pontosSchema";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Spin from "../../Spin";
import { updatePtById } from "../../../utils/pontosApiCalls.mjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { locations } from "../../../helpers/enums";

function UpdatePtForm(x) {
  const [PTData, setPtData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const { Formik } = formik;

  const params = useParams("id");
  const PTId = params.id;

  console.log("id ", PTId);

  useEffect(() => {
    console.log("effect");
    const getPtInfo = async (id) => {
      console.log("callS");
      try {
        const response = await axios.put(
          `http://${process.env.REACT_APP_API}/api/gestor/pontos_turisticos/${id}`
          /* { withCredentials: true } */
        );

        const data = await response.data.data[0];

        setPtData(data);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.error(e.message);
        return e.message;
      }
    };

    getPtInfo(PTId);
  }, []);

  console.log(PTData);
  async function sendDataToUpdate(formData) {
    setIsLoading(true);

    const response = await updatePtById(PTId, formData);
    const updatedPt = await response.data;
    setPtData([updatedPt]);

    if (response.status == "success") {
      toast.success(response.message);
      setIsLoading(false);
      navigate("/gestor/pontos-turisticos");
      x = !x;
    } else {
      setIsLoading(false);
      toast.error(response.message);
    }
  }

  if (isLoading) return <Spin text='A carregar formulário...' />;

  return (
    <div className='mt-5 col-8 mx-auto main-section'>
      {PTData && (
        <section className='px-4 mt-4 w-75'>
          <p className='lead fs-1'>
            Atualizar registo de{" "}
            <span className='text-secondary'>{PTData.local}</span>
          </p>
          <div className='row justify-content-end pe-3'>
            <Formik
              initialValues={PTData}
              validationSchema={updatePontosSchema}
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
                    <Form.Group className='mb-4' controlId='formLocal'>
                      <Form.Label>Local</Form.Label>
                      <Form.Control
                        type='text'
                        name='local'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.local}
                        isInvalid={!!errors.local}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.local}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-4' controlId='formImagem'>
                      <Form.Label>Imagem do Local</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type='text'
                          name='imgUrl'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.imgUrl}
                          isInvalid={!!errors.imgUrl}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.imgUrl}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className='mb-4' controlId='formMorada'>
                      <Form.Label>Morada</Form.Label>
                      <Form.Control
                        type='text'
                        aria-describedby='inputGroupPrepend'
                        name='morada'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isInvalid={!!errors.morada}
                        value={values.morada}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.morada}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md='6'
                      className='mb-4'
                      controlId='formCoordenadas'>
                      <Form.Label>Coordenadas</Form.Label>

                      <Form.Control
                        type='text'
                        name='coordenadas'
                        autoComplete='off'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.coordenadas}
                        value={values.coordenadas}
                      />

                      <Form.Control.Feedback type='invalid'>
                        {errors.coordenadas}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md='6'
                      className='mb-4'
                      controlId='formHorario'>
                      <Form.Label>Horário</Form.Label>

                      <Form.Control
                        type='text'
                        name='horario'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.horario}
                        value={values.horario}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.horario}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-4' controlId='formDescricao'>
                      <Form.Label>Descrição</Form.Label>

                      <Form.Control
                        type='text'
                        name='descricao'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.descricao}
                        value={values.descricao}
                      />

                      <Form.Control.Feedback type='invalid'>
                        {errors.descricao}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md='6'
                      className='mb-4'
                      controlId='formTelefone'>
                      <Form.Label>Telefone</Form.Label>

                      <Form.Control
                        type='text'
                        name='telefone'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.telefone}
                        value={values.telefone}
                      />

                      <Form.Control.Feedback type='invalid'>
                        {errors.telefone}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md='6'
                      className='mb-4'
                      controlId='formTelemovel'>
                      <Form.Label>Telemovel</Form.Label>

                      <Form.Control
                        type='text'
                        name='telemovel'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.telemovel}
                        value={values.telemovel}
                      />

                      <Form.Control.Feedback type='invalid'>
                        {errors.telemovel}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-4' controlId='formWebsite'>
                      <Form.Label>Website</Form.Label>

                      <Form.Control
                        type='text'
                        name='website'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.website}
                        value={values.website}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.website}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md='6'
                      className='mb-4'
                      controlId='formAcessibilidade'>
                      <Form.Label>Acessibilidade</Form.Label>

                      <Form.Control
                        type='text'
                        name='acessibilidade'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.acessibilidade}
                        value={values.acessibilidade}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.acessibilidade}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md='6'
                      className='mb-4'
                      controlId='formQrCode'>
                      <Form.Label>QrCode</Form.Label>

                      <Form.Control
                        type='text'
                        name='qrcode'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.qrcode}
                        value={values.qrcode}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.qrcode}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md='6'
                      className='mb-4'
                      controlId='formTipo'>
                      <Form.Label>Tipo de Ponto</Form.Label>

                      <Form.Control
                        style={{ height: "34px" }}
                        autoComplete='off'
                        as='select'
                        name='tipo'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.tipo}
                        value={values.tipo}
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
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md='6'
                      className='mb-4'
                      controlId='formPontosAssociados'>
                      <Form.Label>Pontos Associados</Form.Label>

                      <Form.Control
                        type='text'
                        name='pontosAssociados'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.pontosAssociados}
                        value={values.pontosAssociados}
                        required
                        minLength='2'
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.pontosAssociados}
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

export { UpdatePtForm };
