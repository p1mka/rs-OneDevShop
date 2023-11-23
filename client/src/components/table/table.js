import styled from "styled-components";
import { Icon } from "../icon/icon";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeadContainer = ({ className, sortDirection, onSort, header }) => {
  return (
    <th className={className}>
      <div className="header-row">
        {header}
        {sortDirection && (
          <Icon
            id={sortDirection === "up" ? "la-angle-up" : "la-angle-down"}
            onClick={onSort}
          />
        )}
      </div>
    </th>
  );
};

export const TableHead = styled(TableHeadContainer)`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;

  & .header-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const TableData = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
  max-width: 10rem;

  & img {
    display: flex;
    width: 80px;
    height: 80px;
    object-fit: contain;
  }
  & select {
    font-family: rubik;
    font-size: 16px;
    min-height: 2rem;
    border: 2px solid #2f9ca3;
    border-radius: 0.5rem;
    background: none;
  }

  & .products {
    display: flex;
    flex-direction: column;
  }
`;

export const RowTableData = styled.td`
  display: flex;
  gap: 0.5rem;
  padding: 8px;

  position: relative;
`;
