import { useMatch } from "react-router-dom";
import styled from "styled-components";

const { getPriceWithDiscount } = require("../../utils");

const ProductPriceContainer = ({ className, price, discount, ...props }) => {
  const cartMatch = useMatch("/cart");

  return (
    <div className={className} {...props}>
      {discount > 0 ? (
        <div className={cartMatch ? "cart-price" : "default-price"}>
          {getPriceWithDiscount(price, discount)} ₽
          <div className="old-price">{price}</div>
        </div>
      ) : (
        <div className="default-price">{price} ₽</div>
      )}
    </div>
  );
};

export const ProductPrice = styled(ProductPriceContainer)`
  display: flex;

  flex-wrap: wrap;
  color: ${({ discount }) => (discount > 0 ? "#eb4aae" : "#000")};
  font-size: ${({ fontSize = "1.25rem" }) => fontSize};
  font-weight: 600;
  line-height: 150%;

  & .default-price {
    display: flex;
  }

  & .cart-price {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  & .old-price {
    display: flex;
    text-decoration: line-through solid #2f9ca3;
    margin: 0 0 0 0.5rem;
    font-size: 0.9rem;
    color: #0000008c;
  }
`;
