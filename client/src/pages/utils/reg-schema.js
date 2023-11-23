import * as yup from "yup";
import { passwordRegExp } from "../../constants";

export const regSchema = yup.object().shape({
  email: yup
    .string()
    .required("E-mail должен быть заполнен!")
    .email("Неверный формат e-mail"),
  login: yup
    .string()
    .required("Логин должен быть заполнен")
    .matches(/\w+$/, "Логин должен содержать только буквы и цифры")
    .min(4, "Длина логина должна быть не менее 4 символов")
    .max(15, "Длина логина должна быть не более 15 символов"),
  password: yup
    .string()
    .required("Пароль должен быть заполнен")
    .matches(
      passwordRegExp,
      "Пароль должен состоять из заглавных букв, строчных букв и цифр"
    )
    .min(6, "Длина пароля должна быть не менее 6 символов")
    .max(20, "Длина пароля должна быть не более 20 символов"),
  passwordCheck: yup
    .string()
    .required("Необходимо повторить пароль")
    .oneOf([yup.ref("password"), null], "Введенные пароли не совпадают."),
});
