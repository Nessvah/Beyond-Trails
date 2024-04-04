// import * as Yup from "yup";

// const colaboradorSchema = Yup.object().shape({
//   name: Yup.string()
//     .trim()
//     .min(2, "O nome é muito curto")
//     .max(50, "O nome é muito longo")
//     .required("O nome é obrigatório"),

//   nif: Yup.number()
//     .typeError("O NIF deve ser um número")
//     .required("O NIF é obrigatório"),

//   tipoEntidade: Yup.string(),

//   endereco: Yup.object().shape({
//     morada: Yup.string(),
//     codigoPostal: Yup.string().trim(),
//     // .matches(
//     //   /^[0-9a-zA-Z\s]*$/,
//     //   "O código postal é inválido. Deve conter apenas letras, números e espaços"
//     // ),
//     cidade: Yup.string()
//   }),

//   contacto: Yup.object().shape({
//     telefone: Yup.string()
//       .trim()
//       .matches(/^[0-9]*$/, "O telefone deve conter apenas números")
//   }),

//   email: Yup.string()
//     .trim()
//     .email("O email é inválido")
//     .required("O email é obrigatório"),
//   password: Yup.string()
//     .trim()
//     .min(8, "A senha deve ter pelo menos 8 caracteres")
//     .required("A senha é obrigatória"),

//   urlTitularidade: Yup.string().url("A URL é inválida"),
//   urlRepresentante: Yup.string().url("A URL é inválida")
// });

// export default colaboradorSchema;

import * as Yup from "yup";

const colaboradorSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  nif: Yup.string().matches(
    /^[0-9]+$/,
    "NIF must only contain numeric characters"
  ),

  tipoEntidade: Yup.string(),
  endereco: Yup.object().shape({
    morada: Yup.string(),
    codigoPostal: Yup.string(),
    cidade: Yup.string()
  }),
  contacto: Yup.object().shape({
    telefone: Yup.string()
  }),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Too Short!"),
  urlTitularidade: Yup.string(),
  urlRepresentante: Yup.string()
});

export default colaboradorSchema;
