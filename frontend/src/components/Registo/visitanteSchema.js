import * as Yup from "yup";

const visitorSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .trim()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .required("A senha é obrigatória"),

  email: Yup.string().trim().email("Invalid email").required(),
  isSubscribed: Yup.boolean().required(),
  gender: Yup.string().trim().required(),
  dateOfBirth: Yup.string()
    .trim()
    .transform((value, originalValue) => {
      if (originalValue) {
        const [year, month, day] = originalValue.split("-");
        return `${day}/${month}/${year}`;
      }
      return value;
    })
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Date format is invalid. Use DD/MM/YYYY."
    ),
  city: Yup.string().trim().required()
});

export default visitorSchema;
