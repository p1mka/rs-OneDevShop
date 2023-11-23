import { useEffect, useState } from "react";
import { request } from "../../../../../../utils";
import { Loader, Table, TableHead } from "../../../../../../components";
import { useDispatch } from "react-redux";
import { OrderRow } from "./components/order-row/order-row";
import { removeOrderAsync } from "../../../../../../store/actions";

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [statuses, setStatuses] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    Promise.all([request("/orders"), request("/orders/statuses")])
      .then(([ordersRes, statusesRes]) => {
        if (ordersRes.error || statusesRes.error) {
          console.error(ordersRes.error || statusesRes.error);
        }
        setOrders(ordersRes.data);
        setStatuses(statusesRes.data);
      })
      .finally(() => setIsLoading(false));
  }, [shouldUpdate]);

  const onOrderRemove = async (orderId) => {
    setIsLoading(true);
    await dispatch(removeOrderAsync(orderId));
    setShouldUpdate(!shouldUpdate);
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h2>Заказы пользователей</h2>
      <Table>
        <thead>
          <tr>
            <TableHead />
            <TableHead header="Пользователь" />
            <TableHead header="ID заказа" />
            <TableHead header="ID товаров" />
            <TableHead header="Статус заказа" />
          </tr>
        </thead>
        <tbody>
          {orders.map(
            (
              { id: orderId, userLogin, products, createdAt, status },
              index
            ) => (
              <OrderRow
                key={orderId}
                orderId={orderId}
                statuses={statuses}
                userLogin={userLogin}
                products={products}
                status={status}
                createdAt={createdAt}
                onOrderRemove={() => onOrderRemove(orderId)}
                index={index}
              />
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};
