import { Link, useMatch } from "react-router-dom";
import { Icon, ProductCard, ReviewsLoader } from "../../../../components";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../../../store/selectors";
import styled from "styled-components";

const ProductsCardContainer = ({ className, products = [], header }) => {
  const isLoading = useSelector(selectIsLoading);
  const match = useMatch("/product/:id");

  return isLoading ? (
    <ReviewsLoader />
  ) : (
    <div className={className}>
      <div className="header-row">
        <h2>{header}</h2>

        {!match && (
          <Link
            to={`/${
              header === "Лучшее"
                ? "best"
                : header === "Скидки"
                ? "discounts"
                : header === "Новинки"
                ? "newest"
                : null
            }`}
            state={{ header: header }}
          >
            Все {header.toLowerCase()} <Icon id="la-angle-right" />
          </Link>
        )}
      </div>
      <div id="scroll-container" className="products-row">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
      <hr />
    </div>
  );
};

export const ProductsCard = styled(ProductsCardContainer)`
  font-family: rubik;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  // overflow-x: scroll;

  & .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0.5rem;
  }

  & .products-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    // overflow-x: scroll;
    padding: 1rem 0 1rem 1rem;
  }

  & h2 {
    margin: 0;
  }

  & hr {
    border: 1px solid #e5e5e5;
    width: 100%;
    border-radius: 1rem;
  }

  & a {
    display: flex;
    align-items: center;
  }
`;
