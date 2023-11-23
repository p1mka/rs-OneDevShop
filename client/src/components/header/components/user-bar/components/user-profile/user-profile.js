import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Icon } from "../../../../../../components";
import { logout, setIsModalOpen } from "../../../../../../store/actions";
import { selectUser } from "../../../../../../store/selectors";

import { ROLES } from "../../../../../../constants";
import styled from "styled-components";

const UserProfileContainer = ({ className }) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const { login, roleId } = user;

  const dispatch = useDispatch();

  const onAuthButtonClick = () => {
    dispatch(setIsModalOpen());
    navigate("/authorize");
  };

  const onMyCabinetButtonClick = () => {
    navigate("/cabinet/my-profile");
  };

  const onLogoutButtonClick = () => {
    dispatch(logout());
    sessionStorage.removeItem("user");
    dispatch(setIsModalOpen(true));
    navigate("/authorize");
  };

  return (
    <div className={className}>
      <Icon
        onClick={roleId !== ROLES.GUEST ? onMyCabinetButtonClick : null}
        id="la-user-circle"
        size="52px"
      />
      <div className="authorize-block">
        <div className="login-block">
          {login}
          {roleId !== ROLES.GUEST && (
            <Icon
              onClick={onLogoutButtonClick}
              id="la-sign-out-alt"
              size="24px"
            />
          )}
        </div>
        {roleId === ROLES.GUEST ? (
          <Button
            includeIcon={false}
            nohover="true"
            onClick={onAuthButtonClick}
          >
            Вход
          </Button>
        ) : (
          <Button
            includeIcon={false}
            nohover="true"
            onClick={onMyCabinetButtonClick}
          >
            Мой кабинет
          </Button>
        )}
      </div>
    </div>
  );
};

export const UserProfile = styled(UserProfileContainer)`
  display: flex;
  align-items: center;
  margin-left: 10%;
  font-weight: bold;

  & .authorize-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  & .login-block {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 18px;
  }
`;
