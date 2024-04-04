import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ButtonLaranja from "../../BotaoLaranja/ButtonLaranja";
import { getBemVindo, putBemVindo } from "../../../utils/atualizarInfoPartner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../../hook/useAuth";
import { partnerValidationSchema } from "../../../validationSchemas/atualizarInfoPartner";
import imagemAwait from "../../../assets/images/beneficioPartner/await2.png";
const HistoricoRegisto = () => {
  const [loading, setLoading] = useState(true);
  const user = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [isPartnerInReview, setIsPartnerInReview] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getBemVindo(user.userId);
        console.log("Response from getBemVindo:", userData);
        setCurrentUser(userData);
        setLoading(false);

        if (userData.parceiro && userData.parceiro.isApproved === 3) {
          setIsPartnerInReview(true);
        }
      } catch (error) {
        console.error("Erro ao obter os dados do parceiro:", error);
      }
    };
    fetchUser();
  }, [user]);

  const initialValues = {
    name: currentUser && currentUser.parceiro ? currentUser.parceiro.name : "",
    nif: currentUser && currentUser.parceiro ? currentUser.parceiro.nif : "",
    morada:
      currentUser && currentUser.parceiro
        ? currentUser.parceiro.endereco.morada
        : "",
    codigoPostal:
      currentUser && currentUser.parceiro
        ? currentUser.parceiro.endereco.codigoPostal
        : "",
    cidade:
      currentUser && currentUser.parceiro
        ? currentUser.parceiro.endereco.cidade
        : "",
    email:
      currentUser && currentUser.parceiro ? currentUser.parceiro.email : "",
    password:
      currentUser && currentUser.parceiro ? currentUser.parceiro.password : "",
    confirmPassword:
      currentUser && currentUser.parceiro ? currentUser.parceiro.password : "",
    telefone:
      currentUser && currentUser.parceiro
        ? currentUser.parceiro.contacto.telefone
        : "",
    tipoEntidade:
      currentUser && currentUser.parceiro
        ? currentUser.parceiro.tipoEntidade
        : "",
    urlTitularidade:
      currentUser && currentUser.parceiro
        ? currentUser.parceiro.urlTitularidade
        : "",
    urlRepresentante:
      currentUser && currentUser.parceiro
        ? currentUser.parceiro.urlRepresentante
        : ""
  };

  const handleFormSubmission = async (values, actions) => {
    try {
      const response = await putBemVindo(user.userId, values);
      console.log("Dados que estão sendo enviados:", values);
      console.log("Resposta completa:", response);

      if (
        response.message === "Informações do parceiro atualizadas com sucesso"
      ) {
        toast.success("Parceiro atualizado com sucesso!", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER
        });
      } else {
        console.log(
          "Status da resposta não é 200: Resposta não contém 'Informações do parceiro atualizadas com sucesso'"
        );
        toast.error(
          "Erro ao atualizar o parceiro. Tente novamente mais tarde."
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar o parceiro:", error);
      toast.error("Erro ao atualizar o parceiro. Tente novamente mais tarde.");
    } finally {
      actions.setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (isPartnerInReview) {
    return (
      <Container fluid className='container-registo p-5 mt-5'>
        <Row>
          <Col md='3'>
            <NavLink
              to='/parceiro/desempenho'
              className='btn btn-outline-secondary col-auto main-btn'>
              Retroceder
            </NavLink>
          </Col>
          <Col className='col-10 col-md-4 pt-5 mx-auto md-6'>
            <div className='mb-3 text-center'>
              <h4>
                <i className='bi bi-bell-fill text-secondary bi-lg fs-1'></i>O
                seu registo está em análise. <br /> Aguarde por uma resposta do
                nosso gestor!
                <img src={imagemAwait} alt='Imagem de espera' />
              </h4>
            </div>
          </Col>
        </Row>
        <ToastContainer autoClose={3000} closeOnClick={true} />
      </Container>
    );
  }

  return (
    <Container fluid className='container-registo p-5 mt-5'>
      <Row>
        <Col md='3'>
          <NavLink
            to='/parceiro/desempenho'
            className='btn btn-outline-secondary col-auto main-btn'>
            Retroceder
          </NavLink>
        </Col>
        <Col className='col-10 col-md-4 pt-5 mx-auto md-6'>
          <Formik
            initialValues={initialValues}
            validationSchema={partnerValidationSchema}
            onSubmit={handleFormSubmission}>
            <Form className='was-validated border-form'>
              <h1 className='text-center p-3'>Histórico de Registo</h1>
              <div className='mb-3'>
                <label htmlFor='name'>Nome</label>
                <Field
                  type='text'
                  id='name'
                  name='name'
                  className='form-control'
                />
                {currentUser && currentUser.data && currentUser.data.name ? (
                  <ErrorMessage
                    name='name'
                    component='div'
                    className='text-danger'
                  />
                ) : null}
              </div>

              <div className='mb-3'>
                <label htmlFor='nif'>Número de Identificação Fiscal</label>
                <Field
                  type='text'
                  id='nif'
                  name='nif'
                  className='form-control'
                />
                {currentUser && currentUser.data && currentUser.data.nif ? (
                  <ErrorMessage
                    name='nif'
                    component='div'
                    className='text-danger'
                  />
                ) : null}
              </div>

              <div className='mb-3'>
                <label htmlFor='tipoEntidade'>Tipo de Entidade</label>
                <Field
                  as='select'
                  id='tipoEntidade'
                  name='tipoEntidade'
                  className='form-select pt-4 fs-5'>
                  <option value=''>Escolha um tipo de entidade</option>
                  <option value='opcao1'>Artesanato</option>
                  <option value='opcao2'>Hotelaria</option>
                  <option value='opcao3'>Gastronomia</option>
                  <option value='opcao4'>Outro</option>
                </Field>
                {currentUser &&
                currentUser.data &&
                currentUser.data.tipoEntidade ? (
                  <ErrorMessage
                    name='tipoEntidade'
                    component='div'
                    className='text-danger'
                  />
                ) : null}
              </div>
              <div className='mb-3'>
                <label htmlFor='morada'>Morada</label>
                <Field
                  type='text'
                  id='morada'
                  name='morada'
                  className='form-control'
                />
                {currentUser && currentUser.data && currentUser.data.morada ? (
                  <ErrorMessage
                    name='morada'
                    component='div'
                    className='text-danger'
                  />
                ) : null}
              </div>
              <div className='mb-3'>
                <label htmlFor='cidade'>Cidade</label>
                <Field
                  type='text'
                  id='cidade'
                  name='cidade'
                  className='form-control'
                />
                {currentUser && currentUser.data && currentUser.data.cidade ? (
                  <ErrorMessage
                    name='cidade'
                    component='div'
                    className='text-danger'
                  />
                ) : null}
              </div>
              <div className='mb-3'>
                <label htmlFor='codigoPostal'>Código Postal</label>
                <Field
                  type='text'
                  id='codigoPostal'
                  name='codigoPostal'
                  className='form-control'
                />
                {currentUser &&
                currentUser.data &&
                currentUser.data.codigoPostal ? (
                  <ErrorMessage
                    name='codigoPostal'
                    component='div'
                    className='text-danger'
                  />
                ) : null}
              </div>
              <div className='mb-3'>
                <label htmlFor='telefone'>Telefone</label>
                <Field
                  type='text'
                  id='telefone'
                  name='telefone'
                  className='form-control'
                />
                {currentUser &&
                currentUser.data &&
                currentUser.data.telefone ? (
                  <ErrorMessage
                    name='telefone'
                    component='div'
                    className='text-danger'
                  />
                ) : null}
              </div>
              <div className='mb-3'>
                <label htmlFor='email'>Email</label>
                <Field
                  type='email'
                  id='email'
                  name='email'
                  className='form-control'
                />
                {currentUser && currentUser.data && currentUser.data.email ? (
                  <ErrorMessage
                    name='email'
                    component='div'
                    className='text-danger'
                  />
                ) : null}
              </div>
              <div className='mb-3'>
                <label htmlFor='password'>Password</label>
                <Field
                  type='password'
                  id='password'
                  name='password'
                  className='form-control pt-4'
                />
                {currentUser &&
                currentUser.data &&
                currentUser.data.password ? (
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='text-danger'
                  />
                ) : null}
              </div>
              <div className='mb-3'>
                <label htmlFor='repeatPassword'>Confirmação de Password</label>
                <Field
                  type='password'
                  id='repeatPassword'
                  name='repeatPassword'
                  className='form-control pt-4'
                />
                {currentUser &&
                currentUser.data &&
                currentUser.data.confirmPassword ? (
                  <ErrorMessage
                    name='repeatPassword'
                    component='div'
                    className='text-danger'
                  />
                ) : null}
              </div>
              <div className='mb-3'>
                <label htmlFor='urlRepresentante'>Representante Legal</label>
                <input
                  type='file'
                  id='urlRepresentante'
                  name='urlRepresentante'
                  className='form-control'
                  accept='.pdf, .doc, .docx'
                />
                {currentUser &&
                currentUser.data &&
                currentUser.data.urlRepresentante ? (
                  <ErrorMessage
                    name='urlRepresentante'
                    component='div'
                    className='text-danger'
                  />
                ) : null}
              </div>

              <div className='mb-3'>
                <label htmlFor='urlTitularidade'>
                  Documento Comprovativo de Titularidade
                </label>
                <input
                  type='file'
                  id='urlTitularidade'
                  name='urlTitularidade'
                  className='form-control'
                  accept='.pdf, .doc, .docx'
                />
                {currentUser &&
                currentUser.data &&
                currentUser.data.urlTitularidade ? (
                  <ErrorMessage
                    name='urlTitularidade'
                    component='div'
                    className='text-danger'
                  />
                ) : null}
              </div>

              <section className='botao-center mt-4 p-5 d-flex justify-content-center align-items-center'>
                <ButtonLaranja label='Atualizar Registo' type='submit' />
              </section>
            </Form>
          </Formik>
        </Col>
      </Row>
      <ToastContainer autoClose={3000} closeOnClick={true} />
    </Container>
  );
};

export default HistoricoRegisto;
