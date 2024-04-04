import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updatePartnerById } from "../../../utils/atualizarInfoPartner";
import { useState, useEffect } from "react";
import { useAuth } from "../../../hook/useAuth";
import { getPartnerById } from "../../../utils/atualizarInfoPartner";
import { partnerValidationSchema } from "../../../validationSchemas/atualizarInfoPartner";
import image1 from "../../../assets/images/team/avatar-su.png";
import "./css/updatePerfil.css";
const UserProfileForm = () => {
  const [loading, setLoading] = useState(true);
  const user = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
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
        urlImagem: selectedImage
          ? selectedImage
          : currentUser
          ? currentUser.data.urlImagem
          : "image1.jpg"
      };

      const response = await updatePartnerById(user.userId, parceiroUpdate);
      console.log("enderecoUpdate:", enderecoUpdate);
      console.log("contactoUpdate:", contactoUpdate);
      console.log("parceiroUpdate:", parceiroUpdate);

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
    <div className='row'>
      <div className='col-md-6 seccao-update'>
        <div className='card-todo mb-'>
          <h4 className='card-header'>Foto de Perfil</h4>
          <Formik
            initialValues={initialValues}
            validationSchema={partnerValidationSchema}
            onSubmit={handleFormSubmission}>
            {({ setFieldValue }) => (
              <Form className='card-body'>
                {/* ... (outros campos do formulário) */}

                <div className='formGroup p-3 mt-5'>
                  <label htmlFor='urlImagem'>Foto de Perfil</label>
                  <input
                    id='fileInput'
                    name='urlImagem'
                    type='file'
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];

                      if (file) {
                        setFieldValue("urlImagem", file); // Atualizar o valor 'urlImagem' com o arquivo
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImage(reader.result);
                        };
                        reader.readAsDataURL(file); // Carregar a imagem selecionada
                      }
                    }}
                    style={{ display: "none" }}
                  />
                  <label htmlFor='fileInput' className='upload-button'>
                    Upload Imagem
                  </label>
                </div>

                {/* Mostrar apenas o preview da imagem selecionada */}
                {image && (
                  <img
                    src={image}
                    alt='Preview'
                    className='img-account-profile'
                    style={{ width: "200px" }}
                  />
                )}

                {/* Caso não haja imagem selecionada, exibir 'urlImage' ou imagem padrão */}
                {!image && (
                  <img
                    src={
                      image ||
                      `http://localhost:5858/uploads/${
                        initialValues.urlImagem || "image1.jpg"
                      }`
                    }
                    alt=''
                    height={250}
                    width={250}
                    className='img-account-profile'
                  />
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className='col-md-6 mt-5 pt-5'>
        <div className='card-todo mb-4'>
          <h4 className='card-header'>Detalhes de Conta</h4>

          <Formik
            initialValues={initialValues}
            validationSchema={partnerValidationSchema}
            onSubmit={handleFormSubmission}>
            {({ setFieldValue }) => (
              <Form className='card-body'>
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
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='formGroup'>
                            <label htmlFor='codigoPostal'>Código Postal</label>
                            <Field
                              type='text'
                              name='codigoPostal'
                              className='form-control fs-3  form-control-sm'
                            />
                            <ErrorMessage
                              name='codigoPostal'
                              component='div'
                              className='text-danger'
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='formGroup'>
                            <label htmlFor='cidade'>Cidade</label>
                            <Field
                              type='text'
                              name='cidade'
                              className='form-control fs-3  form-control-sm'
                            />
                            <ErrorMessage
                              name='cidade'
                              component='div'
                              className='text-danger'
                            />
                          </div>
                        </div>
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
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='formGroup '>
                            <label htmlFor='telefone'>Telefone</label>
                            <Field
                              type='text'
                              name='telefone'
                              className='form-control fs-3  form-control-sm'
                            />
                            <ErrorMessage
                              name='telefone'
                              component='div'
                              className='text-danger'
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='formGroup'>
                            <label htmlFor='nif'>
                              Número de identificação fiscal da entidade
                            </label>
                            <Field
                              type='text'
                              name='nif'
                              className='form-control fs-3  form-control-sm'
                            />
                            <ErrorMessage
                              name='nif'
                              component='div'
                              className='text-danger'
                            />
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-6 pt-5 '>
                          <div className='formGroup '>
                            <label htmlFor='tipo-entidade'>
                              Tipo de Entidade:
                            </label>
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
                        </div>
                        <div className='col-md-6 pt-5 '>
                          <div className='formGroup '>
                            <label htmlFor='telemovel'>Telemóvel</label>
                            <Field
                              type='text'
                              name='telemovel'
                              className='form-control fs-3  form-control-sm'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6 pt-5 '>
                          <div className='formGroup'>
                            <label htmlFor='website'>Website</label>
                            <Field
                              type='text'
                              name='website'
                              className='form-control fs-3'
                            />
                          </div>
                        </div>
                        <div className='col-md-6 pt-5'>
                          <div className='formGroup '>
                            <label htmlFor='horario'>Horário</label>
                            <Field
                              type='text'
                              name='horario'
                              className='form-control fs-3  form-control-sm'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='formGroup '>
                        <div className='row'>
                          <div className='col-md-6'>
                            <label
                              htmlFor='urlEstabelecimento'
                              className='formGroups'>
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
                              className='form-label pb-4'>
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
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;
