import { Button, FormError, Icon, Loader } from "../../components";
import { useForm } from "react-hook-form";
import { authSchema } from "../utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserOrdersAsync,
  setIsModalOpen,
  setIsPasswordVisible,
  setUser,
} from "../../store/actions";
import { selectIsPasswordVisible } from "../../store/selectors";
import { useState } from "react";
import { request } from "../../utils";
import { InputGroup } from "../../components";
import styled from "styled-components";

const AuthorizeContainter = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [serverError, setServerError] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(authSchema),
  });
  const [isAwait, setIsAwait] = useState(false);

  const isPasswordVisible = useSelector(selectIsPasswordVisible);

  const formError = errors?.login?.message || errors?.password?.message;
  const error = formError || serverError;

  const onFormSubmit = async ({ login, password }) => {
    setIsAwait(true);
    dispatch(setIsPasswordVisible(false));
    await request("/login", "POST", { login, password })
      .then(({ error, data }) => {
        if (error) {
          setServerError(error);
          return;
        }
        dispatch(setUser(data));
        sessionStorage.setItem("user", JSON.stringify(data));
        dispatch(getUserOrdersAsync(data.id));
        reset();
        dispatch(setIsModalOpen(false));
        navigate("/");
      })
      .finally(() => setIsAwait(false));
  };

  const onPassViewClickOrExit = () =>
    dispatch(setIsPasswordVisible(!isPasswordVisible));

  const onRegButtonCLick = () => {
    dispatch(setIsPasswordVisible(false));
  };

  return (
    <div className={className}>
      {isAwait && <Loader />}
      <h2>Авторизация</h2>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="inputs">
          <InputGroup label="Логин" name="login" register={register} />
          <InputGroup
            label="Пароль"
            name="password"
            register={register}
            isPasswordVisible={isPasswordVisible}
          />
          <Icon
            id={isPasswordVisible ? "la-eye-slash" : "la-eye"}
            onClick={onPassViewClickOrExit}
          />

          <Button
            includeIcon={false}
            width="100%"
            padding=".5rem 0"
            type="submit"
            disabled={!!formError}
          >
            Войти!
          </Button>
        </div>

        {!!error && <FormError>{error}</FormError>}
      </form>
      <hr />
      <div className="registration-question-block">
        Еще не зарегистрированы?
        <Link onClick={onRegButtonCLick} to="/registration">
          <Button
            includeIcon={false}
            padding="0.5rem 2rem"
            onClick={onPassViewClickOrExit}
          >
            Регистрация!
          </Button>
        </Link>
      </div>
    </div>
  );
};

export const Authorize = styled(AuthorizeContainter)`
  display: flex;
  flex-direction: column;
  font-family: rubik;

  & input {
    display: flex;
    margin: 0.5rem 0;
  }

  & i {
    position: absolute;
    top: 9.1rem;
    right: 12rem;
  }

  & form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  & hr {
    width: 100%;
  }

  & .registration-question-block {
    display: flex;
    padding: 0.5rem 0;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
  }
`;
