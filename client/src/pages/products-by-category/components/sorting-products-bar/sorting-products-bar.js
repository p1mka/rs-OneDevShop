import { Button, Sidebar } from "../../../../components";

export const SortingProductsBar = ({ products, setSortedProducts }) => {
  const sortProductsByName = () => {
    const sortedByName = [...products].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setSortedProducts(sortedByName);
  };

  const sortProductsByPrice = () => {
    const sortedByPrice = [...products].sort((a, b) => a.price - b.price);
    setSortedProducts(sortedByPrice);
  };
  const sortProductsByDiscount = () => {
    const sortedByPrice = [...products].sort((a, b) => b.discount - a.discount);
    setSortedProducts(sortedByPrice);
  };

  const sortProductsByAvailability = () => {
    const sortedByAvailability = [...products].sort(
      (a, b) => b.amount - a.amount
    );
    setSortedProducts(sortedByAvailability);
  };

  const sortProductsByRating = () => {
    const sortedByRating = [...products].sort((a, b) => b.rating - a.rating);
    setSortedProducts(sortedByRating);
  };

  return (
    <div>
      <Sidebar>
        <Button
          includeIcon={false}
          background="#fff"
          color="#000"
          onClick={sortProductsByName}
        >
          Сортировать по названию
        </Button>
        <Button
          includeIcon={false}
          background="#fff"
          color="#000"
          onClick={sortProductsByPrice}
        >
          Сортировать по цене
        </Button>
        <Button
          includeIcon={false}
          background="#fff"
          color="#000"
          onClick={sortProductsByDiscount}
        >
          Сортировать по размеру скидки
        </Button>
        <Button
          includeIcon={false}
          background="#fff"
          color="#000"
          onClick={sortProductsByAvailability}
        >
          Сортировать по наличию
        </Button>
        <Button
          includeIcon={false}
          background="#fff"
          color="#000"
          onClick={sortProductsByRating}
        >
          Сортировать по рейтингу
        </Button>
      </Sidebar>
    </div>
  );
};
