import { useEffect, useState } from "react";
import { getCorrectPageName, request } from "../../utils";
import { useLocation, useParams } from "react-router-dom";
import { Loader, ProductCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../store/actions";
import { selectIsLoading } from "../../store/selectors";
import styled from "styled-components";

const FilteredProductsContainer = ({ className }) => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const {
    state: { header = "" },
  } = location;

  useEffect(() => {
    dispatch(setIsLoading(true));
    request(`/products/?filter=${params.filter}`)
      .then(({ error, data }) => setFilteredProducts(data))
      .finally(() => dispatch(setIsLoading(false)));
  }, [params.filter, dispatch]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={className}>
      <h1>{getCorrectPageName(params.filter)}</h1>
      <div className="products">
        {filteredProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export const FilteredProducts = styled(FilteredProductsContainer)`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  font-family: rubik;

  & .products {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 5rem;
  }
`;
