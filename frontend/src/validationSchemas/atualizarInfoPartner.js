import * as Yup from "yup";

export const partnerValidationSchema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  nif: Yup.string().required("Campo obrigatório"),
  morada: Yup.string().required("Campo obrigatório"),
  codigoPostal: Yup.string().required("Campo obrigatório"),
  cidade: Yup.string().required("Campo obrigatório"),
  email: Yup.string().email("Email inválido").required("Campo obrigatório"),
  password: Yup.string().required("Campo obrigatório"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "As senhas não coincidem"
  ),
  telefone: Yup.string().required("Campo obrigatório"),
  tipoEntidade: Yup.string().required("Campo obrigatório"),
  telemovel: Yup.string(),
  website: Yup.string(),
  horario: Yup.string(),
  urlImagem: Yup.mixed()
});
