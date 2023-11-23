import { useState } from "react";
import {
  Button,
  RowTableData,
  TableData,
} from "../../../../../../../../components";
import { request } from "../../../../../../../../utils";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../../../../../../../store/actions";

export const UserRow = ({
  userId,
  login,
  email,
  registeredAt,
  onUserRemove,
  roleId,
  roles,
  index,
}) => {
  const dispatch = useDispatch();
  const [selectedRoleId, setSelectedRoleId] = useState(roleId);
  const [initialRoleId, setInitialRoleId] = useState(roleId);

  const isSaveButtonDisabled = selectedRoleId === initialRoleId;

  const onRoleChange = ({ target }) => setSelectedRoleId(Number(target.value));

  const onRoleSave = async (userId, newUserRoleId) => {
    dispatch(setIsLoading(true));
    await request(`/users/${userId}`, "PATCH", {
      newUserData: { roleId: newUserRoleId },
    })
      .then(() => {
        setInitialRoleId(newUserRoleId);
      })
      .finally(() => dispatch(setIsLoading(false)));
  };

  return (
    <tr>
      <TableData>{index + 1}</TableData>
      <TableData>{login}</TableData>
      <TableData>{email}</TableData>
      <TableData>{registeredAt}</TableData>
      <TableData>
        <select value={selectedRoleId} onChange={onRoleChange}>
          {roles.map(({ id: roleId, name: roleName }) => (
            <option key={roleId} value={roleId}>
              {roleName}
            </option>
          ))}
        </select>
      </TableData>
      <RowTableData>
        {isSaveButtonDisabled ? (
          <Button
            background="#fff"
            color="#000"
            iconId="la-trash-alt"
            iconSize="24px"
            fontSize="12px"
            padding="0"
            onClick={onUserRemove}
          />
        ) : (
          <Button
            background="#fff"
            color="#000"
            iconId="la-check"
            iconSize="24px"
            fontSize="12px"
            padding="0"
            onClick={() => onRoleSave(userId, selectedRoleId)}
          />
        )}
      </RowTableData>
    </tr>
  );
};
