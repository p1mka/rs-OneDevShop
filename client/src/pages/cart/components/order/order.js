import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectUserRole } from "../../../../store/selectors";
import { ROLES } from "../../../../constants";
import { Link } from "react-router-dom";
import { UserForm } from "./components";

const OrderContainer = ({ className }) => {
  const userRole = useSelector(selectUserRole);

  return (
    <div className={className}>
      <h1>Оформление заказа</h1>
      {userRole === ROLES.GUEST ? (
        <div>
          <h2>
            Для оформления заказа необходимо{" "}
            <Link to="/authorize">авторизоваться...</Link>
          </h2>
        </div>
      ) : (
        <>
          <UserForm />
        </>
      )}
    </div>
  );
};

export const Order = styled(OrderContainer)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: calc(100% - 200px);
  font-family: rubik;
  gap: 2rem;
  transition: 0.5s ease;
`;
