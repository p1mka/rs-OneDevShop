import { Amount, Button, ProductPrice, Rating } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { selectProductsInCart } from "../../../../store/selectors";
import {
  removeProductFromCart,
  setCart,
  setIsShowNotification,
} from "../../../../store/actions";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CategoryProductCardContainer = ({ className, product }) => {
  const dispatch = useDispatch();

  const {
    id: productId,
    img,
    title,
    description,
    price,
    discount,
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
          <img src={img} alt="img" />
        </Link>
      </div>
      <div className="product-info">
        <Link to={`/product/${productId}`}>
          <h4>{title}</h4>
        </Link>
        <Rating value={rating} reviewsCount={reviewsCount} />
        <p>{description}</p>
      </div>
      <div className="product-price-and-cart">
        <ProductPrice price={price} discount={discount} />{" "}
        <Amount amount={amount} />
        <Button
          disabled={amount <= 0}
          onClick={isInCart ? onRemoveProductFromCart : onAddProductInCart}
          iconId={
            amount <= 0 ? "" : isInCart ? "la-cart-arrow-down" : "la-cart-plus"
          }
          iconSize="22px"
          background={isInCart ? "#EB4AAE" : "#fff"}
          color={isInCart ? "#fff" : "#000"}
          width="10em"
          fontSize="18px"
        >
          {amount <= 0
            ? "Нет в наличии"
            : isInCart
            ? "В корзине!"
            : "В корзину"}
        </Button>
      </div>
    </div>
  );
};

export const CategoryProductCard = styled(CategoryProductCardContainer)`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  word-break: break-all;

  & .product-image {
    display: flex;
  }
  & img {
    max-width: 15rem;
    max-height: 15rem;
    object-fit: cover;
  }

  & .product-info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    word-break: break-word;
    width: 20rem;
  }

  & .product-info p {
    word-break: break-all;
    font-size: 14px;
    max-height: 150px;
    overflow-y: scroll;
    max-width: 20rem;
  }

  & .product-info h4 {
    margin: 0;
  }

  & .product-price-and-cart {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    // width: 10rem;
  }
`;
