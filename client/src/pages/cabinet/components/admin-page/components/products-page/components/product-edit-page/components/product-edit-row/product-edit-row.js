import styled from "styled-components";
import { Input } from "../../../../../../../../../../components";

const ProductEditRowContainer = ({
  className,
  label,
  value,
  setEditedProduct,
  editedProduct,
}) => {
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  return (
    <div className={className}>
      <label>{label}</label>
      <Input name={value} value={value} onChange={onInputChange} />
    </div>
  );
};

export const ProductEditRow = styled(ProductEditRowContainer)`
  display: flex;
  flex-direction: column;
`;
