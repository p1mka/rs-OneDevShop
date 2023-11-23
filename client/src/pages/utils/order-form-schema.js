import * as yup from "yup";

export const orderFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("E-mail должен быть заполнен!")
    .email("Неверный формат e-mail"),
  name: yup
    .string()
    .required("Заполните имя!")
    .min(1, "Длина поля должна быть не менее 1 символа")
    .max(25, "Длина поля должна быть не более 25 символов"),
  phone: yup.string().required("Введите номер телефона!"),
  address: yup
    .string()
    .required("Заполните адрес доставки!")
    .min(1, "Заполните адрес доставки!"),
});
