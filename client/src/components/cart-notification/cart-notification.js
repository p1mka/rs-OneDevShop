import { useEffect } from "react";
import styled from "styled-components";
import { Button } from "../button/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectProductsInCart } from "../../store/selectors";
import { setIsShowNotification } from "../../store/actions";

const CartNotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 250px;
  position: fixed;
  top: 6rem;
  right: 1rem;
  background-color: #fff;
  color: #414141;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 999;
  font-family: rubik;
  animation: fadein 0.5s ease-in-out;

  & .products-in-cart {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }
  & .products-in-cart img {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80px;
    height: 80px;
    object-fit: fill;
  }

  & @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const CartNotification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector(selectProductsInCart);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setIsShowNotification(false));
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch]);

  const onButtonClick = () => navigate("/cart");

  return (
    <CartNotificationContainer>
      {cart.map((product) => (
        <div key={product.id} className="products-in-cart">
          <img src={product.img} alt="" />
          <div>{product.title}</div>
        </div>
      ))}
      <Button
        includeIcon={false}
        background="#fff"
        padding="1rem "
        color="#000"
        fontSize="16px"
        onClick={onButtonClick}
      >
        Перейти в корзину
      </Button>
    </CartNotificationContainer>
  );
};
