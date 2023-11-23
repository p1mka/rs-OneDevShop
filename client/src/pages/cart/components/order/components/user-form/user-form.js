import { useDispatch, useSelector } from "react-redux";
import {
  selectProductsInCart,
  selectUser,
} from "../../../../../../store/selectors";
import { FormError, Input } from "../../../../../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { orderFormSchema } from "../../../../../utils";
import { useState } from "react";
import { addOrderAsync } from "../../../../../../store/actions/add-order-async";
import { useNavigate } from "react-router-dom";
import { getVariablePrice } from "../../../../utils";
import { getPriceWithDiscount } from "../../../../../../utils";
import styled from "styled-components";
import { setIsLoading } from "../../../../../../store/actions";

const UserFormContainer = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const productsInCart = useSelector(selectProductsInCart);

  const { summaryPrice } = getVariablePrice(productsInCart);

  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: user.email,
      address: "",
    },
    resolver: yupResolver(orderFormSchema),
  });

  const formError =
    errors?.name?.message ||
    errors?.email?.message ||
    errors?.phone?.message ||
    errors?.address?.message;

  const error = formError || serverError;

  const orderSubmit = ({ name, email, phone, address }) => {
    try {
      dispatch(setIsLoading(true));

      dispatch(
        addOrderAsync({
          products: productsInCart.map((product) => ({
            product: product.id,
            productCount: product.productCount,
            currentPrice: getPriceWithDiscount(product.price, product.discount),
            totalProductPrice:
              getPriceWithDiscount(product.price, product.discount) *
              product.productCount,
          })),
          owner: { name, email, phone, address },
          totalPrice: summaryPrice,
        })
      );
      reset();
      navigate("/orders");
    } catch (e) {
      setServerError(e.message);
    }
  };

  return (
    <div className={className}>
      <form
        id="user-form"
        onSubmit={handleSubmit(orderSubmit)}
        className="text-and-input"
      >
        <label>E-mail:</label> <Input defaultValue={user.email || ""} />
      </form>
      <div className="text-and-input">
        <label>Телефон: </label>{" "}
        <Input
          type="tel"
          placeholder="Номер для связи..."
          {...register("phone")}
        />
      </div>
      <div className="text-and-input">
        <label>Имя: </label>{" "}
        <Input type="text" placeholder="Иван Иванов" {...register("name")} />
      </div>
      <div className="text-and-input">
        <label>Адрес доставки: </label>{" "}
        <Input
          type="text"
          placeholder="Введите адрес..."
          {...register("address")}
        />
      </div>
      {error && <FormError> {error}</FormError>}
    </div>
  );
};

export const UserForm = styled(UserFormContainer)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-wrap: wrap;

  & .text-and-input {
    max-width: 40rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  & .text-and-input input {
    min-width: 25rem;
    max-width: 30rem;
  }
`;
