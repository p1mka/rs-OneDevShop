import * as yup from "yup";

export const authSchema = yup.object().shape({
  login: yup.string().required("Логин должен быть заполнен"),
  password: yup.string().required("Пароль должен быть заполнен"),
});
