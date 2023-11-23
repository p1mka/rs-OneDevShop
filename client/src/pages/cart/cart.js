import { useSelector } from "react-redux";
import { selectProductsInCart } from "../../store/selectors";
import { ProductsTable, SummarizeBlock } from "./components";
import { Outlet, useMatch } from "react-router-dom";
import styled from "styled-components";

const CartContainer = ({ className }) => {
  const match = useMatch("/cart");
  const productsInCart = useSelector(selectProductsInCart);

  return (
    <div className={className}>
      <h1>Корзина товаров</h1>
      {!productsInCart.length ? (
        <h3>Вы не добавили ни одного товара...</h3>
      ) : (
        <div className="cart">
          {match ? (
            <ProductsTable productsInCart={productsInCart} />
          ) : (
            <Outlet />
          )}
          <SummarizeBlock productsInCart={productsInCart} />
        </div>
      )}
    </div>
  );
};

export const Cart = styled(CartContainer)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  font-family: rubik;
  gap: 2rem;

  & .cart {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  & .products-table {
    width: calc(100% - 200px);
    vertical-align: top;
  }

  & .products-table th {
    padding: 2rem 0;
  }
`;
