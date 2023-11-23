import styled from "styled-components";
import { Icon } from "../../../../../../components";
import { useSelector } from "react-redux";
import {
  selectOrders,
  selectProductsInCart,
} from "../../../../../../store/selectors";
import { useNavigate } from "react-router-dom";

const UserToolsContainer = ({ className }) => {
  const navigate = useNavigate();
  const productsInCartCount = useSelector(selectProductsInCart).length;
  const ordersCount = useSelector(selectOrders).filter(
    (order) => order.status !== "4" && order.status !== "3"
  ).length;

  const onCartButtonClick = () => navigate("/cart");
  const onOrdersButtonClick = () => navigate("/orders");

  return (
    <div className={className}>
      {/* <div className="elements-column">
        <Icon id="la-heart" size="24px" fill={true} />

        <span>Избранное</span>
      </div> */}
      <div className="elements-column">
        <Icon id="la-handshake" size="24px" onClick={onOrdersButtonClick} />
        {ordersCount !== 0 && (
          <div className="circle" onClick={onOrdersButtonClick}>
            {ordersCount}
          </div>
        )}
        <span>Заказы</span>
      </div>
      <div className="elements-column">
        <Icon id="la-shopping-cart" size="24px" onClick={onCartButtonClick} />
        {productsInCartCount !== 0 && (
          <div className="circle" onClick={onCartButtonClick}>
            {productsInCartCount}
          </div>
        )}
        <span>Корзина</span>
      </div>
    </div>
  );
};

export const UserTools = styled(UserToolsContainer)`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-family: rubik;

  & .elements-column {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & .elements-column > span {
    font-size: 12px;
  }

  & .circle {
    position: absolute;
    left: 1.5rem;
    bottom: 1.7rem;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #eb4aae;
    font-size: 12px;
    cursor: pointer;
  }
`;
