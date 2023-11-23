import { useState } from "react";
import {
  Button,
  RowTableData,
  TableData,
} from "../../../../../../../../components";
import { request } from "../../../../../../../../utils";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../../../../../../../store/actions";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TableDataColumn = styled(TableData)`
  display: flex;
  flex-direction: column;
`;
export const OrderRow = ({
  orderId,
  userLogin,
  createdAt,
  products,
  onOrderRemove,
  status,
  statuses,
  index,
}) => {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [initialStatus, setInitialStatus] = useState(status);

  const isSaveButtonDisabled = selectedStatus === initialStatus;

  const onStatusChange = ({ target }) =>
    setSelectedStatus(Number(target.value));

  const onStatusSave = async (orderId, newOrderStatus) => {
    dispatch(setIsLoading(true));
    await request(`/orders/${orderId}`, "PATCH", {
      newOrderData: { statusId: newOrderStatus },
    })
      .then(() => {
        setInitialStatus(newOrderStatus);
      })
      .finally(() => dispatch(setIsLoading(false)));
  };

  return (
    <tr>
      <TableData>{index + 1}</TableData>
      <TableData>{userLogin}</TableData>
      <TableData>{orderId}</TableData>
      <TableDataColumn>
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            {product.id}
          </Link>
        ))}
      </TableDataColumn>
      <TableData>
        <select value={selectedStatus} onChange={onStatusChange}>
          {statuses.map(({ id: statusId, title }) => (
            <option key={statusId} value={statusId}>
              {title}
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
            onClick={onOrderRemove}
          />
        ) : (
          <Button
            background="#fff"
            color="#000"
            iconId="la-check"
            iconSize="24px"
            fontSize="12px"
            padding="0"
            onClick={() => onStatusSave(orderId, selectedStatus)}
          />
        )}
      </RowTableData>
    </tr>
  );
};
