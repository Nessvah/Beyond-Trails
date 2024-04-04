import { Formik, Form, Field, ErrorMessage } from "formik";
import { updatePartnerById } from "../../../utils/atualizarInfoPartner";
import { useState, useEffect } from "react";
import { useAuth } from "../../../hook/useAuth";
import { getPartnerById } from "../../../utils/atualizarInfoPartner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { partnerValidationSchema } from "../../../validationSchemas/atualizarInfoPartner";

function FeedbackComp() {
  const [loading, setLoading] = useState(true);
  const user = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageChange = (event, setFieldValue) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setFieldValue("urlImagem", selectedImage);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getPartnerById(user.userId);
        console.log(user.userId, "id");
        setCurrentUser(userData);
        setLoading(false);
        console.log(userData);
      } catch (error) {
        console.error("Erro ao obter dados do usuário:", error);
        setLoading(false);
      }
    };
    fetchUser();
  }, [user]);

  const initialValues = {
    name: currentUser ? currentUser?.data?.name : "",
    nif: currentUser ? currentUser?.data?.nif : "",
    morada: currentUser ? currentUser?.data?.endereco?.morada : "",
    codigoPostal: currentUser ? currentUser?.data?.endereco?.codigoPostal : "",
    cidade: currentUser ? currentUser?.data?.endereco?.cidade : "",
    email: currentUser ? currentUser?.data?.email : "",
    password: currentUser ? currentUser?.data?.password : "",
    confirmPassword: currentUser ? currentUser?.data?.confirmPassword : "",
    telefone: currentUser ? currentUser?.data?.contacto?.telefone : "",
    tipoEntidade: currentUser ? currentUser?.data?.tipoEntidade : "",
    telemovel: currentUser ? currentUser?.data?.contacto?.telemovel : "",
    website: currentUser ? currentUser?.data?.contacto?.website : "",
    horario: currentUser ? currentUser?.data?.horario : "",
    descricao: currentUser ? currentUser?.data?.descricao : "",
    urlImagem: ""
  };

  const handleFormSubmission = async (values, actions) => {
    try {
      const enderecoUpdate = {
        morada: values.morada,
        codigoPostal: values.codigoPostal,
        cidade: values.cidade
      };

      const contactoUpdate = {
        telefone: values.telefone,
        telemovel: values.telemovel,
        website: values.website
      };

      const parceiroUpdate = {
        name: values.name,
        nif: values.nif,
        tipoEntidade: values.tipoEntidade,
        endereco: enderecoUpdate,
        contacto: contactoUpdate,
        horario: values.horario,
        descricao: values.descricao,
        email: values.email,
        // urlImagem: values.urlImagem,
        urlTitularidade: values.urlTitularidade,
        urlRepresentante: values.urlRepresentante,
        urlImagem: image
          ? image
          : currentUser
          ? currentUser?.data?.urlImagem
          : ""
      };

      const response = await updatePartnerById(user.userId, parceiroUpdate);

      console.log("Dados que estão sendo enviados:", values);
      console.log("Resposta completa:", response);

      if (
        response.message === "Informações do parceiro atualizadas com sucesso!"
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
  return (
    <section className='container d-flex justify-content-center align-items-center'>
      <Formik
        initialValues={initialValues}
        validationSchema={partnerValidationSchema}
        onSubmit={handleFormSubmission}>
        {({ setFieldValue }) => (
          <Form className='customForm'>
            <div className='container todo'>
              <div className='row'>
                <div className='col-md-12 form-group'>
                  <div className='formGroup p-3 mt-5'>
                    <label htmlFor='name'>Nome da Entidade</label>
                    <Field
                      type='text'
                      name='name'
                      className='form-control fs-3'
                    />
                    <ErrorMessage
                      name='name'
                      component='div'
                      className='text-danger'
                    />
                  </div>
                  <div className='formGroup p-3'>
                    <label htmlFor='nif'>
                      Número de identificação fiscal da entidade
                    </label>
                    <Field
                      type='text'
                      name='nif'
                      className='form-control fs-3'
                    />
                    <ErrorMessage
                      name='nif'
                      component='div'
                      className='text-danger'
                    />
                  </div>
                  <div className='formGroup p-3'>
                    <label htmlFor='morada'>Morada</label>
                    <Field
                      type='text'
                      name='morada'
                      className='form-control fs-3'
                    />
                    <ErrorMessage
                      name='morada'
                      component='div'
                      className='text-danger'
                    />
                  </div>
                  <div className='formGroup p-3'>
                    <label htmlFor='codigoPostal'>Cidade</label>
                    <Field
                      type='text'
                      name='codigoPostal'
                      className='form-control fs-3'
                    />
                    <ErrorMessage
                      name='codigoPostal'
                      component='div'
                      className='text-danger'
                    />
                  </div>
                  <div className='formGroup p-3'>
                    <label htmlFor='cidade'>Código Postal</label>
                    <Field
                      type='text'
                      name='cidade'
                      className='form-control fs-3'
                    />
                    <ErrorMessage
                      name='cidade'
                      component='div'
                      className='text-danger'
                    />
                  </div>
                  <div className='formGroup p-3'>
                    <label htmlFor='email'>Email</label>
                    <Field
                      type='email'
                      name='email'
                      className='form-control fs-3'
                    />
                    <ErrorMessage
                      name='email'
                      component='div'
                      className='text-danger'
                    />
                  </div>
                  <div className='formGroup p-3'>
                    <label htmlFor='password'>Password</label>
                    <Field
                      type='password'
                      name='password'
                      className='form-control fs-3'
                    />
                    <ErrorMessage
                      name='password'
                      component='div'
                      className='text-danger'
                    />
                  </div>
                  <div className='formGroup p-3'>
                    <label htmlFor='confirmPassword'>
                      Confirmação de Password
                    </label>
                    <Field
                      type='password'
                      name='confirmPassword'
                      className='form-control fs-3'
                    />
                    <ErrorMessage
                      name='confirmPassword'
                      component='div'
                      className='text-danger'
                    />
                  </div>
                  <div className='formGroup p-3'>
                    <label htmlFor='descricao'>Descrição</label>
                    <Field
                      type='text'
                      name='descricao'
                      className='form-control fs-3'
                    />
                  </div>

                  <div className='formGroup p-3'>
                    <label htmlFor='telefone'>Telefone</label>
                    <Field
                      type='text'
                      name='telefone'
                      className='form-control fs-3'
                    />
                    <ErrorMessage
                      name='telefone'
                      component='div'
                      className='text-danger'
                    />
                  </div>
                  <div className='formGroup p-3'>
                    <label htmlFor='tipo-entidade'>Tipo de Entidade:</label>
                    <select
                      id='tipo-entidade'
                      name='tipoEntidade'
                      className='form-select p-4'
                      required>
                      <option value=''>Open this select menu</option>
                      <option value='opcao1'>Artesanato</option>
                      <option value='opcao2'>Hotelaria</option>
                      <option value='opcao3'>Gastronomia</option>
                      <option value='opcao4'>Outro</option>
                    </select>
                    <div className='invalid-feedback'>
                      Please select an entity type.
                    </div>
                  </div>

                  <div className='formGroup p-3'>
                    <label htmlFor='telemovel'>Telemóvel</label>
                    <Field
                      type='text'
                      name='telemovel'
                      className='form-control fs-3'
                    />
                  </div>
                  <div className='formGroup p-3'>
                    <label htmlFor='website'>Website</label>
                    <Field
                      type='text'
                      name='website'
                      className='form-control fs-3'
                    />
                  </div>
                  <div className='formGroup p-3'>
                    <label htmlFor='horario'>Horário</label>
                    <Field
                      type='text'
                      name='horario'
                      className='form-control fs-3'
                    />
                  </div>
                  <div className='formGroup p-3'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <label
                          htmlFor='urlEstabelecimento'
                          className='form-label'>
                          Documento comprovativo da titularidade do
                          estabelecimento
                        </label>
                        <div className='input-group'>
                          <Field
                            type='text'
                            name='urlEstabelecimento'
                            className='form-control fs-3'
                          />
                          <button
                            className='btn btn-outline-secondary'
                            type='button'
                            id='uploadEstabelecimentoButton'>
                            <i className='bi bi-upload'></i>
                          </button>
                          <a
                            href='#'
                            className='btn btn-outline-secondary'
                            id='downloadEstabelecimentoLink'
                            download>
                            <i className='bi bi-download'></i>
                          </a>
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <label
                          htmlFor='urlRepresentante'
                          className='form-label pb-5'>
                          Declaração do representante legal
                        </label>
                        <div className='input-group'>
                          <Field
                            type='text'
                            name='urlRepresentante'
                            className='form-control fs-3'
                          />
                          <button
                            className='btn btn-outline-secondary'
                            type='button'
                            id='uploadRepresentanteButton'>
                            <i className='bi bi-upload'></i>
                          </button>
                          <a
                            href='#'
                            className='btn btn-outline-secondary'
                            id='downloadRepresentanteLink'
                            download>
                            <i className='bi bi-download'></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='formGroup p-3'>
                    <label htmlFor='urlImagem'>Escolher Imagem</label>
                    <div className='input-group'>
                      <input
                        type='file'
                        name='urlImagem'
                        accept='image/*'
                        onChange={(event) =>
                          handleImageChange(event, setFieldValue)
                        }
                        className='form-control'
                      />
                      {image && (
                        <img
                          src={URL.createObjectURL(image)}
                          alt='Imagem selecionada'
                          height={200}
                        />
                      )}
                      {!image && currentUser && currentUser.data.urlImagem && (
                        <img
                          src={`http://localhost:5858/uploads/${currentUser.data.urlImagem}`}
                          alt='Imagem selecionada'
                          height={200}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-center'>
                <button
                  type='submit'
                  className='btn btn-secondary btn-block button-personalizado d-flex justify-content-center'
                  name='action'>
                  Atualizar <i className='bi bi-pencil'></i>
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer autoClose={false} closeOnClick={false} />
    </section>
  );
}

export default FeedbackComp;
