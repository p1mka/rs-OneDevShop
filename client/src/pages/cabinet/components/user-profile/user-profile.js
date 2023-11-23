import { useDispatch, useSelector } from "react-redux";
import { selectOrders, selectUser } from "../../../../store/selectors";
import styled from "styled-components";
import { FormError, Icon, Input, Loader } from "../../../../components";
import { getWordForm } from "../../../../utils";
import { useState } from "react";
import { updateUserAsync } from "../../../../store/actions";

const UserProfileContainer = ({ className }) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const ordersLength = useSelector(selectOrders).length;

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [serverError, setServerError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const onEdit = () => {
    setIsEditing(true);
  };

  const onSave = async () => {
    try {
      setIsUpdating(true);
      await dispatch(updateUserAsync(user.id, editedUser));
      setIsEditing(false);
      setIsUpdating(false);
    } catch (e) {
      setServerError(e.message);
      return;
    }
  };

  const onCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <div className={className}>
      <Icon id="la-user-circle" size="150px" />

      <div className="user-info">
        {isUpdating && <Loader />}
        {isEditing ? (
          <div className="user-edit">
            <Input
              type="text"
              name="login"
              value={editedUser.login}
              onChange={onInputChange}
            />
            <Input
              type="text"
              name="email"
              value={editedUser.email}
              onChange={onInputChange}
            />

            <Icon
              id="la-times"
              size="24px"
              color="red"
              title="Отменить изменения"
              onClick={onCancel}
            />
          </div>
        ) : (
          <>
            <h1>{user.login}</h1>
            <p>{user.email}</p>
            <p>
              {ordersLength}{" "}
              {getWordForm(ordersLength, "заказ", "заказа", "заказов")}
            </p>
          </>
        )}
        <Icon
          title={isEditing ? "Сохранить" : "Редактировать данные"}
          id={isEditing ? "la-save" : "la-marker"}
          size="24px"
          color={isEditing ? "#eb4aae" : "#2f9ca3"}
          onClick={isEditing ? onSave : onEdit}
        />
      </div>
      {serverError && <FormError>{serverError}</FormError>}
    </div>
  );
};

export const UserProfile = styled(UserProfileContainer)`
  max-width: 50%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem;
  border: 3px solid #2f9ca3;
  border-radius: 0.5rem;
  position: relative;

  & .user-info i {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
  }
  & .user-info i:hover {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    padding: 0.15rem;
    color: #eb4aae;
    transition: 0.1s;
  }

  & .user-edit {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  & .user-edit i {
    position: absolute;
    top: 0.25rem;
    right: 2rem;
    color: #eb4aae;
    transition: 0.1s;
  }

  & .loader {
    position: absolute;
  }

  & .user-edit i:hover {
    position: absolute;
    top: 0.25rem;
    right: 2rem;
    padding: 0.15rem;
    color: #eb4aae;
    transform: scale(105%);
    transition: 0.1s;
  }
  & p {
    font-size: 18px;
  }
`;
