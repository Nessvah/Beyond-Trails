import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonLaranja from "../BotaoLaranja/ButtonLaranja";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../hook/useAuth";
import "./css/editProfile.css";

const EditProfileForm = ({ currentUser, onUpdate }) => {
  const user = useAuth();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório"),
    email: Yup.string()
      .email("Email inválido")
      .required("O email é obrigatório"),
    city: Yup.string().required("A cidade é obrigatória"),

    dateOfBirth: Yup.string().required("A data de nascimento é obrigatória")
  });

  const formik = useFormik({
    initialValues: currentUser || {
      name: "",
      email: "",
      city: "",

      dateOfBirth: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `http://${process.env.REACT_APP_API}/api/users/editar-perfil/${user.userId}`,
          values,
          { withCredentials: true }
        );

        if (response.data.status === "success") {
          toast.success("Perfil atualizado com sucesso!");
          onUpdate(values);
          console.log("Updating profile:", onUpdate(values));
        } else {
          toast.error(
            "Erro ao atualizar o perfil. Tente novamente mais tarde."
          );
        }
      } catch (error) {
        console.error("Erro ao atualizar o perfil:", error);
        toast.error("Erro ao atualizar o perfil. Tente novamente mais tarde.");
      }
    }
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className='form-container'>
        <div className='container-input mb-1'>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Nome'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className='form-input'
          />
        </div>
        {formik.touched.name && formik.errors.name ? (
          <div className='text-danger'>{formik.errors.name}</div>
        ) : null}
        <div className='container-input mb-1'>
          <input
            type='text'
            id='email'
            name='email'
            placeholder='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className='form-input'
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <div className='text-danger'>{formik.errors.email}</div>
        ) : null}
        <div className='container-input mb-1'>
          <input
            type='text'
            id='city'
            name='city'
            placeholder='Cidade'
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className='form-input'
          />
        </div>
        {formik.touched.city && formik.errors.city ? (
          <div className='text-danger'>{formik.errors.city}</div>
        ) : null}

        <div className='container-input mb-1'>
          <input
            type='text'
            id='dateOfBirth'
            name='dateOfBirth'
            placeholder='Data de Nascimento'
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className='form-input'
          />
        </div>
        {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
          <div className='text-danger'>{formik.errors.dateOfBirth}</div>
        ) : null}

        <ButtonLaranja type='submit' label='Atualizar' />
      </form>
      <ToastContainer position='top-center' autoClose={5000} hideProgressBar />
    </div>
  );
};

export default EditProfileForm;
