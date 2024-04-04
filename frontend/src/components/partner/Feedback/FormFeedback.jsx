import { Formik, Field, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createFeedback } from "../../../utils/feedbackApiCallss.mjs";
import * as Yup from "yup";
import "./css/FeedStyle.css";
import { useAuth } from "../../../hook/useAuth";
import ButtonLaranja from "../../BotaoLaranja/ButtonLaranja";
const FormFeedback = () => {
  const user = useAuth();

  const handleCreateFeedback = async (values, { resetForm }) => {
    try {
      console.log("Dados enviados para o servidor:", values);
      console.log(user.userId, "user ");
      const response = await createFeedback(user.userId, values);

      if (response) {
        resetForm();

        toast.success("Feedback enviado com sucesso!");
      } else {
        console.error("Erro ao criar feedback");
        toast.error("Erro ao criar feedback. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar feedback:", error.message);
      toast.error("Erro ao enviar feedback. Por favor, tente novamente.");
    }
  };

  const validationSchema = Yup.object().shape({
    subject: Yup.string().required("O assunto é obrigatório."),
    description: Yup.string().required("A descrição é obrigatória.")
  });

  return (
    <div className='container pt-5'>
      <div>
        <Formik
          initialValues={{
            subject: "",
            description: ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleCreateFeedback}>
          <Form className='customForm'>
            <div className='container todo'>
              <div className='row'>
                <div className='col-md-12 form-group'>
                  <div className='formGroup p-4 mt-5'>
                    <label htmlFor='subject'>Assunto</label>
                    <Field
                      type='text'
                      name='subject'
                      className='form-control fs-3'
                    />
                    <ErrorMessage
                      name='subject'
                      component='div'
                      className='text-danger'
                    />
                  </div>
                  <div className='formGroup p-4'>
                    <label htmlFor='description'>Descrição</label>
                    <Field
                      as='textarea'
                      name='description'
                      className='form-control fs-3'
                    />
                    <ErrorMessage
                      name='description'
                      component='div'
                      className='text-danger'
                    />
                  </div>
                  <ButtonLaranja
                    type='submit'
                    label=' Enviar Feedback'></ButtonLaranja>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
        <ToastContainer position='top-right' autoClose={3000} />
      </div>
    </div>
  );
};

export default FormFeedback;
