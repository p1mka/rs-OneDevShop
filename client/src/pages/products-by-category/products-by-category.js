import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setProducts } from "../../store/actions";
import { getWordForm, request } from "../../utils";
import { useParams } from "react-router-dom";
import { selectIsLoading } from "../../store/selectors";
import { Button, ErrorMessage, Loader } from "../../components";
import { CategoryProductCard, SortingProductsBar } from "./components";
import styled from "styled-components";

const ProductsByCategoryContainer = ({ className }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(null);

  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(setIsLoading(true));
    request(`/products?&category=${params.id}&page=${page}&limit=10`)
      .then(({ error, data, count }) => {
        if (error) {
          setError("Товары временно недоступны, мы уже исправляем ситуацию...");
          return;
        }
        dispatch(setProducts(data));
        setSortedProducts(data);
        setCategoryName(data[0]?.category?.name || "");
        setTotalProducts(count);
      })
      .finally(() => dispatch(setIsLoading(false)));
  }, [dispatch, params.id, page]);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <ErrorMessage>{error}</ErrorMessage>
  ) : (
    <div className={className}>
      {!sortedProducts.length ? (
        <h2>В этой категории товары временно отсутствуют...</h2>
      ) : (
        <>
          <div className="header">
            <h1>{categoryName}</h1>
            <h2>
              {totalProducts}{" "}
              {getWordForm(totalProducts, "товар", "товара", "товаров")}
            </h2>
          </div>
          <div className="pagination">
            {totalProducts >= 3 && (
              <>
                <Button
                  includeIcon={false}
                  disabled={page === 1}
                  onClick={() => setPage((prevPage) => prevPage - 1)}
                >
                  Предыдущая страница
                </Button>
                <Button
                  includeIcon={false}
                  disabled={sortedProducts.length < 10}
                  onClick={() => setPage((prevPage) => prevPage + 1)}
                >
                  Следующая страница
                </Button>
              </>
            )}
          </div>

          <SortingProductsBar
            products={sortedProducts}
            setSortedProducts={setSortedProducts}
          />

          <div className="products-list">
            {sortedProducts.map((product) => (
              <CategoryProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="pagination">
            <Button
              includeIcon={false}
              disabled={page === 1}
              onClick={() => setPage((prevPage) => prevPage - 1)}
            >
              Предыдущая страница
            </Button>
            <Button
              includeIcon={false}
              disabled={sortedProducts.length < 10}
              onClick={() => setPage((prevPage) => prevPage + 1)}
            >
              Следующая страница
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export const ProductsByCategory = styled(ProductsByCategoryContainer)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-family: rubik;
  padding: 2rem 0;
  gap: 1rem;

  & .header {
    display: flex;
    align-items: center;
    gap: 4rem;
  }

  & .products-list {
    margin-left: 11rem;
    display: flex;
    flex-direction: column;

    gap: 1rem;
  }

  & .pagination {
    display: flex;
    gap: 1rem;
    margin: 0 auto;
  }
`;
