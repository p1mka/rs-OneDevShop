import { useNavigate } from "react-router-dom";
import { Button, Loader } from "../../../../components";
import { cancelOrderAsync } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectIsLoading } from "../../../../store/selectors";

const OrderCardContainer = ({
  className,
  orderId,
  status,
  products,
  totalPrice,
  createdAt,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const statusTitle =
    status === "0"
      ? "В обработке"
      : status === "1"
      ? "Отправлен"
      : status === "2"
      ? "Доставлен"
      : status === "3"
      ? "Отменён"
      : "Выполнен";

  const totalCountOfProducts = products.reduce(
    (acc, product) => (acc += product.productCount),
    0
  );

  const onProductImageClick = (productId) => navigate(`/product/${productId}`);

  const onOrderCancel = (orderId) => {
    const cancelConfirm = window.confirm(
      `Вы действительно хотите отменить заказ ${orderId}?`
    );
    if (cancelConfirm) {
      dispatch(cancelOrderAsync(orderId));
    }
    return;
  };

  return isLoading ? (
    <Loader />
  ) : (
    <li className={className}>
      <h3>
        Заказ {orderId.slice(0, 9)} от {createdAt}
      </h3>{" "}
      <div className="order">
        <div className="images">
          {products.map(({ id: productId, img, title, productCount }) => (
            <div key={productId || Date.now()} className="order-img-and-count">
              <div className="order-image" title={title}>
                <img
                  src={img}
                  alt="Картинка в пути..."
                  onClick={
                    productId ? () => onProductImageClick(productId) : null
                  }
                />
              </div>
              {productCount} шт. в заказе
            </div>
          ))}
        </div>
        <div className="order-info">
          <h4>Количество товаров: {totalCountOfProducts}</h4>
          <h4>Сумма заказа: {totalPrice.toFixed(2)} ₽</h4>
        </div>
        <div className="status-and-cancel">
          <p className="status">{statusTitle}</p>
          {status !== "5" && status !== "4" && status !== "3" && (
            <Button
              iconId="la-times-circle"
              background="#fff"
              color="#000"
              onClick={() => onOrderCancel(orderId)}
            >
              Отменить заказ
            </Button>
          )}
        </div>
      </div>
    </li>
  );
};
export const OrderCard = styled(OrderCardContainer)`
  width: 100%;

  & .status-and-cancel {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  & .status {
    display: flex;
    align-items: center;
    color: #fff;
    padding: 0 0.5rem;
    height: 2rem;
    border-radius: 0.25rem;
    background: #2f9ca3;
  }
  & .order {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border-radius: 0.5rem;
    padding: 2rem;
    gap: 1.5rem;
  }

  & .order-img-and-count {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  & .images {
    display: flex;
    gap: 2rem;
  }

  & .order-image img {
    width: 7rem;
    height: 7rem;
    object-fit: contain;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: 0.1s ease-in-out;
  }
  & .order-image img:hover {
    transform: scale(150%);
    transition: 0.1s ease-in;
  }

  & .order-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  & h4 {
    margin: 0.5rem;
    font-weight: 500;
  }
`;
