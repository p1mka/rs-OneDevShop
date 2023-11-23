import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeProductFromCart,
  setCart,
  setIsShowNotification,
} from "../../store/actions";
import { selectProductsInCart } from "../../store/selectors";
import { ProductPrice } from "../product-price/product-price";
import { Rating } from "../rating/rating";
import { Button } from "../button/button";
import { Amount } from "../amount/amount";
import styled from "styled-components";

const ProductCardContainer = ({ className, product }) => {
  const dispatch = useDispatch();

  const {
    id: productId,
    title,
    img,
    discount,
    price,
    rating,
    reviewsCount,
    amount,
  } = product;

  const cart = useSelector(selectProductsInCart);

  const isInCart = cart.find((product) => product.id === productId);

  const onAddProductInCart = () => {
    dispatch(
      setCart({
        id: productId,
        img,
        discount,
        title,
        price,
        rating,
        amount,
      })
    );
    dispatch(setIsShowNotification(true));
    clearTimeout();
    setTimeout(() => {
      dispatch(setIsShowNotification(false));
    }, 3500);
  };

  const onRemoveProductFromCart = () => {
    dispatch(removeProductFromCart(productId));
  };

  return (
    <div className={className}>
      <div className="product-image">
        <Link to={`/product/${productId}`}>
          <img src={img} alt="Картинка в пути..." />
        </Link>
        {discount > 0 && <div className="discount-block">-{discount}%</div>}
      </div>
      <div className="product-content">
        <ProductPrice price={price} discount={discount} />
        <div className="product-info-and-button">
          <div className="title">
            <Link to={`/product/${productId}`}>{title}</Link>
          </div>
          <div>
            <Amount amount={amount} />
            <Rating value={rating} reviewsCount={reviewsCount} />
            <Button
              disabled={amount <= 0}
              onClick={isInCart ? onRemoveProductFromCart : onAddProductInCart}
              iconId={
                amount <= 0
                  ? ""
                  : isInCart
                  ? "la-cart-arrow-down"
                  : "la-cart-plus"
              }
              iconSize="34px"
              background={isInCart ? "#EB4AAE" : "#fff"}
              color={isInCart ? "#fff" : "#000"}
              width="10em"
              fontSize="18px"
            >
              {isInCart
                ? "В корзине!"
                : amount <= 0
                ? "Нет в наличии"
                : "В корзину"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductCard = styled(ProductCardContainer)`
  width: 240px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 1rem;
  background: #fff;
  box-shadow: 5px 3px 6px 0px rgba(0, 0, 0, 0.1);
  font-family: rubik;
  transition: transform 0.2s;

  &:hover {
    transform: scale(105%);
    transition: transform 0.2s;
  }

  & .product-image {
    height: 200px;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
  }
  & .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & .discount-block {
    position: absolute;
    bottom: 1rem;
    left: 0.5rem;
    z-index: 100;
    display: flex;
    max-width: 3rem;
    border-radius: 0.25rem;
    background: #eb4aae;
    color: white;
    font-weight: 600;
    font-size: 20px;
    padding: 0.25rem 0.5rem;
  }

  & .product-content {
    padding: 0.5rem;
    margin: 0.5rem;
  }

  & .title {
    display: flex;
    height: 1.3rem;
    align-items: flex-start;
    justify-content: flex-start;
    white-space: nowrap;
    overflow: scroll;
    text-overflow: ellipsis;
  }

  & .product-info-and-button {
    display: flex;
    flex-direction: column;
  }
`;
