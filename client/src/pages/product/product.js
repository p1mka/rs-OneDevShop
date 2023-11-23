import { useEffect, useRef, useState } from "react";
import { Button, Loader, ProductPrice, Rating } from "../../components";
import { useParams } from "react-router-dom";
import { request } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, selectProductsInCart } from "../../store/selectors";
import {
  removeProductFromCart,
  setCart,
  setIsShowNotification,
  setProduct,
} from "../../store/actions";
import { Reviews } from "./components/reviews/reviews";
import { ProductsCard } from "../main/components";
import styled from "styled-components";

const ProductContainer = ({ className }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const reviewsRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const product = useSelector(selectProduct);

  useEffect(() => {
    setIsLoading(true);
    const requestData = async () => {
      await request(`/products/${params.id}`)
        .then(({ error, data }) => {
          dispatch(setProduct(data));
          request(`/products?&category=${data.category.id}&limit=7`).then(
            ({ error, data }) => setSimilarProducts(data)
          );
        })
        .finally(() => setIsLoading(false));
    };
    requestData();
  }, [params.id, dispatch]);

  const cart = useSelector(selectProductsInCart);

  const {
    id: productId,
    title,
    description,
    price,
    rating,
    discount,
    img,
    reviews,
    amount,
  } = product;

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
    setTimeout(() => {
      dispatch(setIsShowNotification(false));
    }, 3500);
  };

  const onReviewsCountClick = () => {
    setTimeout(() => {
      reviewsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  const onRemoveProductFromCart = () => {
    dispatch(removeProductFromCart(productId));
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className={className}>
      <div className="img-and-product-info">
        <img src={img} alt={"Картинка в пути..."} />
        {discount > 0 && <div className="discount-block">-{discount}%</div>}
        <div className="product-info">
          <h1>{title}</h1>
          <p>{description}</p>
          <ProductPrice price={price} discount={discount} color="#eb4aae" />
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
            background={isInCart ? "#EB4AAE" : "#2f9ca3"}
            width="10em"
            fontSize="18px"
          >
            {amount <= 0
              ? "Нет в наличии"
              : isInCart
              ? "В корзине!"
              : "В корзину"}
          </Button>
          <div className="rating">
            Рейтинг:{" "}
            <Rating
              value={rating}
              reviewsCount={reviews.length}
              onReviewsCountClick={onReviewsCountClick}
            />{" "}
            <p onClick={onReviewsCountClick}></p>
          </div>
        </div>
      </div>
      <ProductsCard products={similarProducts} header="Похожие товары" />
      <Reviews
        reviewsRef={reviewsRef}
        reviews={reviews}
        productId={productId}
      />
    </div>
  );
};

export const Product = styled(ProductContainer)`
  font-family: rubik;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 4rem 0;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.25);
  gap: 0.5rem;

  & .img-and-product-info {
    display: flex;
    position: relative;
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
  & .product-info {
    padding: 1rem;
  }
  & .product-price {
    display: flex;
    justify-content: flex-start;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 150%;
    text-align: center;
    color: #eb4aae;
    font-size: 28px;
  }

  & .old-price {
    display: flex;
    text-decoration: line-through solid #2f9ca3;
    margin: 0 0 0 0.5rem;
    font-size: 0.9rem;
    color: #0000008c;
  }
  & .rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  & .img-and-product-info img {
    max-width: 30%;
    max-height: 100%;
    object-fit: cover;
    border-radius: 1.5rem;
  }
`;
