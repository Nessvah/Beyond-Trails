import { Formik, Form, Field, ErrorMessage } from "formik";
import ButtonLaranja from "../BotaoLaranja/ButtonLaranja";
import { registerPartner } from "./api";
import colaboradorSchema from "./partnerSchema";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistoPartner = () => {
  const validationSchema = colaboradorSchema;

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("nif", values.nif);
      formData.append("tipoEntidade", values.tipoEntidade);
      formData.append("endereco[morada]", values.morada);
      formData.append("endereco[codigoPostal]", values.codigoPostal);
      formData.append("endereco[cidade]", values.cidade);
      formData.append("contacto[telefone]", values.telefone);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("urlRepresentante", values.urlRepresentante);
      formData.append("urlTitularidade", values.urlTitularidade);
      delete values.repeatPassword;
      const response = await registerPartner(formData);

      if (response) {
        toast.success("Registo bem-sucedido. Por favor, verifique seu email!");
      } else {
        toast.error("Ocorreu um erro durante o registo.");
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      toast.error("Ocorreu um erro durante o registo.");
    }
  };

  return (
    <div className='container-registo bg-primary text-white p-5 mt-5'>
      <h1 className='text-center p-3'>Registo</h1>

      <Formik
        initialValues={{
          name: "",
          nif: "",
          tipoEntidade: "",
          morada: "",
          codigoPostal: "",
          cidade: "",
          telefone: "",
          email: "",
          password: "",
          urlRepresentante: null,
          urlTitularidade: null
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm, setFieldValue }) => {
          handleFormSubmit(values);
          setSubmitting(false);
          setFieldValue("repeatPassword", "");
          resetForm(values);
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
            <ErrorMessage name='name' component='div' className='text-danger' />
          </div>

          <div className='mb-3'>
            <label htmlFor='nif'>Número de Identificação Fiscal</label>
            <Field
              type='text'
              id='nif'
              name='nif'
              className='form-control'
              required
            />
            <ErrorMessage name='nif' component='div' className='text-danger' />
          </div>

          <div className='mb-3'>
            <label htmlFor='tipoEntidade'>Tipo de Entidade</label>
            <Field
              as='select'
              id='tipoEntidade'
              name='tipoEntidade'
              className='form-select pt-4'
              required>
              <option value=''>Escolha um tipo de entidade</option>
              <option value='opcao1'>Artesanato</option>
              <option value='opcao2'>Hotelaria</option>
              <option value='opcao3'>Gastronomia</option>
              <option value='opcao4'>Outro</option>
            </Field>
            <ErrorMessage
              name='tipoEntidade'
              component='div'
              className='text-danger'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='morada'>Morada</label>
            <Field
              type='text'
              id='morada'
              name='morada'
              className='form-control'
              required
            />
            <ErrorMessage
              name='morada'
              component='div'
              className='text-danger'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='cidade'>Cidade</label>
            <Field
              type='text'
              id='cidade'
              name='cidade'
              className='form-control'
              required
            />
            <ErrorMessage
              name='cidade'
              component='div'
              className='text-danger'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='codigoPostal'>Código Postal</label>
            <Field
              type='text'
              id='codigoPostal'
              name='codigoPostal'
              className='form-control'
              required
            />
            <ErrorMessage
              name='codigoPostal'
              component='div'
              className='text-danger'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='telefone'>Telefone</label>
            <Field
              type='text'
              name='telefone'
              className='form-control'
              required
            />
            <ErrorMessage
              name='contacto.telefone'
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
            <label htmlFor='repeatPassword'>Confirmação de Password</label>
            <Field
              type='password'
              id='repeatPassword'
              name='repeatPassword'
              className='form-control pt-4'
              required
            />
            <ErrorMessage
              name='repeatPassword'
              component='div'
              className='text-danger'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='urlRepresentante'>Representante Legal</label>
            <Field
              type='file'
              id='urlRepresentante'
              name='urlRepresentante'
              className='form-control'
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='urlTitularidade'>
              Documento Comprovativo de Titularidade
            </label>
            <Field
              type='file'
              id='urlTitularidade'
              name='urlTitularidade'
              className='form-control'
            />
          </div>

          <section className='botao-center mt-4 p-5 d-flex justify-content-center align-items-center'>
            <ButtonLaranja label='Criar Conta' type='submit' />
          </section>
        </Form>
      </Formik>
      <ToastContainer position='top-center' autoClose={5000} hideProgressBar />
    </div>
  );
};

export default RegistoPartner;
