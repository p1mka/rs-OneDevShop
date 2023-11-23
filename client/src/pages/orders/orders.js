import { useSelector } from "react-redux";
import {
  selectIsLoading,
  selectOrders,
  selectUser,
} from "../../store/selectors";
import { Loader } from "../../components";
import { OrderCard } from "./components/order-card/order-card";
import { ROLES } from "../../constants";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

const OrdersContainer = ({ className }) => {
  const match = useMatch("/cabinet/my-orders");
  const isLoading = useSelector(selectIsLoading);
  const orders = useSelector(selectOrders);
  const user = useSelector(selectUser);

  const currentOrders = match
    ? orders
    : orders.filter((order) => order.status !== "4" && order.status !== "3");

  return isLoading ? (
    <Loader />
  ) : user.roleId === ROLES.GUEST ? (
    <h2>
      Для просмотра ваших заказов <Link to="/authorize">авторизуйтесь...</Link>
    </h2>
  ) : (
    <ul className={className}>
      <h1> Ваши заказы</h1>
      {!currentOrders.length ? (
        match ? (
          <h2>История заказов отсутствует...</h2>
        ) : (
          <h2>У вас пока нет активных заказов...</h2>
        )
      ) : (
        currentOrders.map(
          ({ id: orderId, products, totalPrice, status, createdAt }) => (
            <OrderCard
              key={orderId || Date.now()}
              orderId={orderId}
              products={products}
              totalPrice={totalPrice}
              createdAt={createdAt}
              status={status}
            />
          )
        )
      )}
    </ul>
  );
};

export const Orders = styled(OrdersContainer)`
  display: flex;
  flex-direction: column;
  font-family: rubik;
`;
