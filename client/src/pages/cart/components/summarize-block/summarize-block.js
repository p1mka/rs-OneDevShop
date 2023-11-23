import { useMatch, useNavigate } from "react-router-dom";
import { ROLES } from "../../../../constants";
import { selectUserRole } from "../../../../store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../components";
import { getWordForm } from "../../../../utils";
import { getSummaryCountOfProducts, getVariablePrice } from "../../utils";
import styled from "styled-components";
import { setIsModalOpen } from "../../../../store/actions";

const SummarizeBlockContainer = ({ className, productsInCart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const match = useMatch("/cart");
  const userRole = useSelector(selectUserRole);

  const { summaryPrice, summaryDiscount, priceWithoutDiscount } =
    getVariablePrice(productsInCart);
  const summaryCountOfProducts = getSummaryCountOfProducts(productsInCart);

  const onCheckoutButtonClick = () => {
    navigate("order");
  };

  const onAuthorizeButtonClick = () => {
    dispatch(setIsModalOpen(true));
    navigate("/authorize");
  };

  return (
    <div className={className}>
      <div className="total-products-and-price">
        <p>
          {summaryCountOfProducts}{" "}
          {getWordForm(summaryCountOfProducts, "товар", "товара", "товаров")}
        </p>
        <h4>{priceWithoutDiscount.toFixed(2)} ₽</h4>
      </div>
      {summaryDiscount !== 0 && (
        <div className="total-discount ">
          <p>Скидка</p>
          <h4>- {summaryDiscount.toFixed(2)} ₽</h4>
        </div>
      )}
      <div className="total-products-and-price">
        <h2>Итог</h2>
        <h3>{summaryPrice.toFixed(2)} ₽</h3>
      </div>
      {match ? (
        userRole === ROLES.GUEST ? (
          <Button includeIcon={false} onClick={onAuthorizeButtonClick}>
            Для оформления заказа авторизуйтесь...
          </Button>
        ) : (
          <Button iconId="la-check" onClick={onCheckoutButtonClick}>
            Оформить заказ
          </Button>
        )
      ) : (
        <Button type="submit" form="user-form" iconId="la-handshake">
          Подтвердить заказ!
        </Button>
      )}
    </div>
  );
};

export const SummarizeBlock = styled(SummarizeBlockContainer)`
  width: 200px;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;

  & .total-products-and-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px solid #2f9ca3;
  }
  & .total-discount {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .total-discount h4 {
    color: #eb4aae;
  }
  & h4 {
    margin: 0;
  }
`;
