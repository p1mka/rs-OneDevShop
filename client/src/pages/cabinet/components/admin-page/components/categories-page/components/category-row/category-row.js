import { useState } from "react";
import {
  Button,
  Input,
  RowTableData,
  TableData,
} from "../../../../../../../../components";
import { request } from "../../../../../../../../utils";

export const CategoryRow = ({
  categoryId,
  name,
  index,
  onCategoryRemove,
  setShouldUpdate,
  shouldUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState(name);

  const onCategoryNameChange = ({ target }) => setNewCategoryName(target.value);

  const onCategoryEdit = () => {
    setIsEditing(true);
  };

  const onCategorySave = async () => {
    categoryId
      ? request(`/products/categories/${categoryId}`, "PATCH", {
          newCategoryName,
        }).then(() => {
          setIsEditing(false);
          setShouldUpdate(!shouldUpdate);
        })
      : request(`/products/categories`, "POST", {
          newCategoryName,
        }).then(() => {
          setIsEditing(false);
          setShouldUpdate(!shouldUpdate);
        });
  };

  return (
    <tr>
      <TableData>{index + 1}</TableData>
      <TableData>
        {" "}
        {isEditing || !categoryId ? (
          <Input
            width="50%"
            value={newCategoryName}
            onChange={onCategoryNameChange}
          />
        ) : (
          name
        )}
      </TableData>
      <RowTableData>
        {isEditing || !categoryId ? (
          <Button
            title="Сохранить"
            disabled={newCategoryName === "" || newCategoryName === name}
            background="#fff"
            color="#000"
            iconId={"la-save"}
            iconSize="24px"
            fontSize="12px"
            padding="0"
            onClick={onCategorySave}
          />
        ) : (
          <Button
            title="Редактировать"
            background="#fff"
            color="#000"
            iconId={"la-edit"}
            iconSize="24px"
            fontSize="12px"
            padding="0"
            onClick={onCategoryEdit}
          />
        )}
        <Button
          title="Удалить"
          background="#fff"
          color="#000"
          iconId="la-trash-alt"
          iconSize="24px"
          fontSize="12px"
          padding="0"
          onClick={() => onCategoryRemove()}
        />
      </RowTableData>
    </tr>
  );
};
