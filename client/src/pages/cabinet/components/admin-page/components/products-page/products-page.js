import {
  Button,
  Input,
  Loader,
  Table,
  TableHead,
} from "../../../../../../components";
import { useEffect, useRef, useState } from "react";
import {
  addProductAsync,
  removeProductAsync,
  setIsLoading,
  setProducts,
  updateProductAsync,
} from "../../../../../../store/actions";
import { request } from "../../../../../../utils";
import { ProductEditPage, ProductRow } from "./components";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoading,
  selectProducts,
} from "../../../../../../store/selectors";
import styled from "styled-components";

const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & input {
    height: auto;
  }
`;

export const ProductsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
    request("/products")
      .then(({ error, data }) => {
        dispatch(setProducts(data));
      })
      .finally(() => dispatch(setIsLoading(false)));
  }, [dispatch]);

  const [isProductEditing, setIsProductEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [searchPhrase, setSearchPhrase] = useState("");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirections, setSortDirections] = useState({
    title: "up",
    category: "up",
    price: "up",
    discount: "up",
    amount: "up",
    rating: "up",
  });

  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectIsLoading);

  const editRef = useRef(null);

  const initialProduct = {
    id: "",
    img: "",
    title: "",
    description: "",
    category: "",
    price: 0,
    rating: 0,
    amount: 0,
    reviews: [],
  };

  const searchedProducts = searchPhrase
    ? products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchPhrase.toLowerCase()) ||
          String(product.price)
            .toLowerCase()
            .includes(searchPhrase.toLowerCase())
      )
    : products;

  const onProductCreate = () => {
    setIsProductEditing(true);
    setSelectedProduct(initialProduct);
    setTimeout(() => {
      editRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const onProductEdit = (product) => {
    setIsProductEditing(true);
    setSelectedProduct(product);

    setTimeout(() => {
      editRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
  };

  const onSort = (columnName) => {
    setSortedColumn(columnName);
    setSortDirections({
      ...sortDirections,
      [columnName]: sortDirections[columnName] === "up" ? "down" : "up",
    });
  };

  const sortedProducts = searchedProducts.sort((a, b) => {
    if (sortedColumn) {
      const valueA = a[sortedColumn];
      const valueB = b[sortedColumn];
      if (sortDirections[sortedColumn] === "up") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    }
    return 0;
  });

  const onProductSave = async (updatedProduct) => {
    dispatch(setIsLoading(true));
    updatedProduct.id
      ? await dispatch(updateProductAsync(updatedProduct))
      : await dispatch(addProductAsync(updatedProduct));
    dispatch(setIsLoading(false));
    setIsProductEditing(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onProductRemove = async (productId, title) => {
    const confirmDelete = window.confirm(`Удалить ${title}?`);
    if (confirmDelete) {
      dispatch(setIsLoading(true));
      await dispatch(removeProductAsync(productId));
      dispatch(setIsLoading(false));
    }
  };

  const onCancel = () => {
    setIsProductEditing(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <ProductsHeader>
        <h2>Список товаров магазина</h2>
        <Input
          placeholder="Поиск по таблице"
          width="20rem"
          type="search"
          value={searchPhrase}
          onChange={onSearch}
        />
        <Button
          iconId="la-plus"
          background="#fff"
          color="#414141"
          onClick={onProductCreate}
        >
          Добавить товар
        </Button>
      </ProductsHeader>
      <Table>
        <thead>
          <tr>
            <TableHead />
            <TableHead
              header="Название"
              sortDirection={sortDirections.title}
              onSort={() => onSort("title")}
            />
            <TableHead
              header="Категория"
              sortDirection={sortDirections.category}
              onSort={() => onSort("category")}
            />
            <TableHead header="Изображение" />
            <TableHead
              header="Цена"
              sortDirection={sortDirections.price}
              onSort={() => onSort("price")}
            />
            <TableHead
              header="Скидка"
              sortDirection={sortDirections.discount}
              onSort={() => onSort("discount")}
            />
            <TableHead
              header="Количество"
              sortDirection={sortDirections.amount}
              onSort={() => onSort("amount")}
            />
            <TableHead
              header="Рейтинг"
              sortDirection={sortDirections.rating}
              onSort={() => onSort("rating")}
            />
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product, index) => (
            <ProductRow
              key={product.id}
              product={product}
              index={index}
              onProductEdit={() => onProductEdit(product)}
              onProductRemove={() => onProductRemove(product.id, product.title)}
            />
          ))}
        </tbody>
      </Table>
      {isProductEditing && (
        <ProductEditPage
          editRef={editRef}
          product={selectedProduct}
          onProductSave={(updatedProduct) => onProductSave(updatedProduct)}
          onCancel={onCancel}
        />
      )}
    </div>
  );
};
