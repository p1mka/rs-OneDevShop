import { useSelector } from "react-redux";
import { selectUserRole } from "../../../../store/selectors";
import { ROLES } from "../../../../constants";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CabinetNavBarContainer = ({ className }) => {
  const userRole = useSelector(selectUserRole);

  return (
    <div className={className}>
      {userRole !== ROLES.GUEST && (
        <>
          <Link to="my-profile">
            <h3>Мой профиль</h3>
          </Link>
          <Link to="my-orders">
            <h3>История заказов</h3>
          </Link>
          {userRole === ROLES.ADMIN && (
            <div>
              <Link to="administrate">
                <h3>Панель администратора</h3>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const CabinetNavBar = styled(CabinetNavBarContainer)`
  max-width: 50%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
`;
