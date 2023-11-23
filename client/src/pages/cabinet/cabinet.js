import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectUserRole } from "../../store/selectors";
import { ROLES } from "../../constants";
import { Outlet } from "react-router-dom";
import { CabinetNavBar } from "./components";

const CabinetContainer = ({ className }) => {
  const userRole = useSelector(selectUserRole);

  return (
    <div className={className}>
      {userRole === ROLES.GUEST ? (
        <div>Доступ запрещен, авторизуйтесь</div>
      ) : (
        <>
          <h1> Мой кабинет</h1>
          <CabinetNavBar />
          <Outlet />
        </>
      )}
    </div>
  );
};

export const Cabinet = styled(CabinetContainer)`
  width: 100%;
  font-family: rubik;
`;
