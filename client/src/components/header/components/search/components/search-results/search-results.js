import styled, { keyframes } from "styled-components";
import { ProductCard } from "../../../../../product-card/product-card";
import { SimpleLoader } from "../../../../../loaders";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const SearchResultsContainer = ({
  className,
  isSearchResultsLoading,
  results = [],
  onOutsideClick,
}) => {
  return (
    <div className={className} onMouseLeave={() => onOutsideClick()}>
      {isSearchResultsLoading ? (
        <SimpleLoader />
      ) : (
        <>
          {!results.length && <h3>Товаров по Вашему запросу не найдено...</h3>}
          {!isSearchResultsLoading &&
            results.map((product) => (
              <div className="finded-product" key={product.id}>
                <ProductCard product={product} onClick={onOutsideClick} />
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export const SearchResults = styled(SearchResultsContainer)`
  display: ${({ show }) => (show ? "flex" : "none")};
  gap: 0.5rem;
  padding: 1rem 10%;
  flex-wrap: wrap;
  position: fixed;
  background: #f0f0f0;
  min-height: 6rem;
  top: 5.8rem;
  left: 5px;
  right: 5px;
  box-shadow: 5px 3px 6px 0px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  z-index: 300;
  animation: ${({ show }) => (show ? fadeIn : fadeOut)} 0.5s ease forwards;
`;
