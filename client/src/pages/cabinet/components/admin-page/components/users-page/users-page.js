import { useEffect, useState } from "react";
import { request } from "../../../../../../utils";
import { Loader, Table, TableHead } from "../../../../../../components";

import { useDispatch } from "react-redux";
import { removeUserAsync } from "../../../../../../store/actions";
import { UserRow } from "./components/user-row/user-row";

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [roles, setRoles] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    Promise.all([request("/users"), request("/users/roles")])
      .then(([usersRes, rolesRes]) => {
        setUsers(usersRes.data);
        setRoles(rolesRes.data);
      })
      .finally(() => setIsLoading(false));
  }, [shouldUpdate]);

  const onUserRemove = async (userId) => {
    setIsLoading(true);
    await dispatch(removeUserAsync(userId));
    setShouldUpdate(!shouldUpdate);
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h2>Список пользователей</h2>
      <Table>
        <thead>
          <tr>
            <TableHead />
            <TableHead header="Логин" />
            <TableHead header="Email" />
            <TableHead header="Дата регистрации" />
            <TableHead header="Статус" />
          </tr>
        </thead>
        <tbody>
          {users.map(
            ({ id: userId, login, email, registeredAt, roleId }, index) => (
              <UserRow
                key={userId}
                userId={userId}
                roles={roles}
                login={login}
                email={email}
                roleId={roleId}
                registeredAt={registeredAt}
                onUserRemove={() => onUserRemove(userId)}
                index={index}
              />
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};
