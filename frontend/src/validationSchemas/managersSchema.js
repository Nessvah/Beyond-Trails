import * as yup from "yup";

const managerSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "O nome precisa de pelo menos 2 letras.")
    .required("Este campo é obrigatório"),

  lastName: yup
    .string()
    .min(2, "O nome precisa de pelo menos 2 letras.")
    .required("Este campo é obrigatório"),

  nif: yup
    .string()
    .matches(/^[0-9]+$/, "O NIF deve conter apenas números")
    .min(9, "O NIF deve conter pelo menos 9 dígitos.")
    .required("Este campo é obrigatório"),
  address: yup.string().required("Este campo é obrigatório"),

  state: yup.string().required("Este campo é obrigatório"),

  zip: yup.string().required("Este campo é obrigatório"),

  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "O número de telefone deve conter apenas números")
    .min(9, "O número de telefone deve conter pelo menos 9 dígitos.")
    .required("Este campo é obrigatório"),

  tourismDistrict: yup.string().required("Este campo é obrigatório"),

  email: yup
    .string()
    .required("Este campo é obrigatório")
    .email("Insira um email válido"),

  password: yup
    .string()
    .min(8, "Password tem que ter no mínimo 8 caracteres.")
    .required("Este campo é obrigatório")
});

export const updateManagerSchema = yup.object().shape({
  firstName: yup.string().nullable(), // Allow empty strings

  lastName: yup.string().nullable(),

  nif: yup.string().nullable(),
  address: yup.string().nullable(),

  state: yup.string().nullable(),

  zip: yup.string().nullable(),

  phoneNumber: yup.string().nullable(),

  tourismDistrict: yup.string().nullable(),

  email: yup.string().nullable()
});

export default managerSchema;
