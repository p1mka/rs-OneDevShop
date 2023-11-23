import { Button, Icon, Input } from "../../../../../../../../components";
import { useEffect, useState } from "react";
import { request } from "../../../../../../../../utils";
import styled from "styled-components";

const ProductEditPageContainer = ({
  className,
  editRef,
  product,
  onProductSave,
  onCancel,
}) => {
  const [editedProduct, setEditedProduct] = useState(product);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setEditedProduct(product);
    request(`/products/categories`).then(({ error, data }) =>
      setCategories(data)
    );
  }, [product]);

  const {
    title,
    description,
    category,
    img,
    price,
    discount = "0",
    amount,
  } = editedProduct;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };
  const onCategoryChange = ({ target }) => {
    const selectedCategory = categories.find(
      (category) => category.id === target.value
    );
    setEditedProduct({ ...editedProduct, category: selectedCategory });
  };

  return (
    <div className={className}>
      <Icon id="la-times" size="24px" color="#eb4aae" onClick={onCancel} />
      <h3>Товар {product.title}</h3>
      <div className="product-info" ref={editRef}>
        <div className="image-and-save-button">
          <img src={img} alt="Здесь должна быть картинка" />
          <Button
            includeIcon={false}
            type="submit"
            padding="1rem"
            onClick={() => onProductSave(editedProduct)}
          >
            Сохранить
          </Button>
        </div>

        <div className="rows-column">
          <div className="title">
            <label>URL изображения</label>
            <Input
              name="img"
              value={img}
              onChange={onInputChange}
              required={true}
            />
          </div>
          <div className="title">
            <label>Название </label>
            <Input
              name="title"
              value={title}
              onChange={onInputChange}
              required={true}
            />
          </div>
          <div className="title">
            <label>Категория </label>
            <select
              name="category"
              value={category.id || ""}
              onChange={onCategoryChange}
              required={true}
            >
              {!product.id && <option value="">Выберите категорию</option>}
              {categories.map(({ id: categoryId, name: categoryName }) => {
                return (
                  <option key={categoryId} value={categoryId}>
                    {categoryName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="price-and-discount-and-amount">
            <div className="title">
              <label>Цена </label>
              <Input
                name="price"
                value={price}
                onChange={onInputChange}
                required={true}
              />
              <label>₽</label>
            </div>
            <div className="title">
              <label>Скидка </label>
              <Input
                name="discount"
                type="number"
                value={discount}
                onChange={onInputChange}
                required={true}
              />
              %
            </div>
            <div className="title">
              <label>Остаток: </label>
              <Input
                name="amount"
                type="number"
                value={amount}
                onChange={onInputChange}
                required={true}
              />
              <label>шт.</label>
            </div>
          </div>
        </div>
      </div>
      <div className="description">
        <label>Описание</label>
        <textarea
          name="description"
          value={description}
          onChange={onInputChange}
          required={true}
        />
      </div>
    </div>
  );
};
export const ProductEditPage = styled(ProductEditPageContainer)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 2rem;
  min-height: 30rem;
  border: 3px solid #2f9ca3;
  border-radius: 0.5rem;
  margin: 3rem 0;
  position: relative;
  background: #f0f0f0;

  & i {
    position: absolute;
    right: 1rem;
    top: 1rem;
    cursor: pointer;
  }

  & .product-info {
    display: flex;
    gap: 3rem;
  }

  & .rows-column {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    flex-direction: column;
  }
  & .image-and-save-button {
    max-width: 250px;
    display: flex;
    flex-direction: column;

    gap: 0.5rem;
  }
  & .image-and-save-button img {
    max-width: 250px;
    object-fit: cover;
  }
  & .title {
    display: flex;
    flex-direction: column;
  }
  & .price-and-discount-and-amount {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  & select {
    border: none;
    font-size: 16px;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
  & textarea {
    width: 100%;
    min-height: 8rem;
    margin: 1rem 0;
    padding: 0.5rem;
    border: 2px solid #2f9ca3;
    border-radius: 0.5rem;
  }
`;
