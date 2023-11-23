import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Loader } from "../../components";
import { Banner, ProductsCard } from "./components";
import { selectIsLoading, selectProducts } from "../../store/selectors";
import { Outlet } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { setIsLoading, setProducts } from "../../store/actions";
import { request } from "../../utils";
import styled from "styled-components";

const MainContainer = ({ className }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectIsLoading);

  useLayoutEffect(() => {
    dispatch(setIsLoading(true));
    request("/products")
      .then(({ error, data }) => {
        if (error) {
          setError("Товары временно недоступны, мы уже исправляем ситуацию...");
          return;
        }
        return dispatch(setProducts(data));
      })
      .finally(() => dispatch(setIsLoading(false)));
  }, [dispatch]);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <ErrorMessage className="error">{error}</ErrorMessage>
  ) : (
    <div className={className}>
      <Banner />
      <Outlet />

      <div className="products-cards">
        <ProductsCard
          products={products
            .filter((product) => product.rating > 2)
            .slice(0, 8)}
          header={"Лучшее"}
        />
        <ProductsCard
          products={products
            .filter((product) => product.discount > 0)
            .slice(0, 8)}
          header={"Скидки"}
        />
        <ProductsCard products={products.slice(0, 8)} header={"Новинки"} />
      </div>
    </div>
  );
};

export const Main = styled(MainContainer)`
  width: 100%;
  display: flex;
  margin-top: 20rem;
  flex-direction: column;
  align-items: flex-start;
`;
