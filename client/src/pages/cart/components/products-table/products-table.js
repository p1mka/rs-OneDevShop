import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  decreaseProductCount,
  increaseProductCount,
  removeProductFromCart,
} from "../../../../store/actions";
import { Button, ProductPrice } from "../../../../components";
import styled from "styled-components";

const ProductsTableContainer = ({ className, productsInCart }) => {
  const dispatch = useDispatch();

  const increaseCount = (productId) =>
    dispatch(increaseProductCount(productId));

  const decreaseCount = (productId) =>
    dispatch(decreaseProductCount(productId));

  const onDeleteButtonClick = (productId) => {
    dispatch(removeProductFromCart(productId));
  };

  return (
    <table className="products-table">
      <thead>
        <tr>
          <th>Изображение</th>
          <th>Наименование</th>
          <th>Цена</th>
          <th>Количество</th>
          <th>Удалить</th>
        </tr>
      </thead>
      <tbody>
        {productsInCart.map(
          ({
            id: productId,
            amount,
            title,
            price,
            discount,
            img,
            productCount,
          }) => {
            return (
              <tr className={className} key={productId}>
                <td>
                  <img className="product-image" src={img} alt="" />
                </td>
                <td className="product-title">
                  <Link to={`/product/${productId}`}>
                    <span>{title}</span>
                  </Link>
                </td>
                <td>
                  <ProductPrice
                    price={price}
                    discount={discount}
                    fontSize="18px"
                    color="#eb4aae"
                  />
                </td>

                <td>
                  <div className="product-count">
                    <Button
                      iconId="la-minus"
                      iconSize="14px"
                      onClick={() => decreaseCount(productId)}
                      disabled={productCount === 1}
                    />
                    {productCount} шт
                    <Button
                      iconId="la-plus"
                      iconSize="14px"
                      onClick={() => increaseCount(productId)}
                      disabled={productCount === amount}
                    />
                  </div>
                </td>

                <td className="navigation">
                  <Button
                    onClick={() => onDeleteButtonClick(productId)}
                    iconId="la-trash-alt"
                    iconSize="24px"
                    padding="0"
                  />
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
};

export const ProductsTable = styled(ProductsTableContainer)`
  & tr {
    margin: 10rem;
  }

  & .product-image {
    display: flex;
    margin: 0 auto;
    object-fit: cover;
    max-width: 100px;
    max-height: 100px;
  }

  & .product-title {
    padding: 0 0 0 2rem;
    max-width: 10rem;
  }
  & .product-count {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  & .navigation {
    width: 15%;
    text-align: -webkit-center;
  }
`;
