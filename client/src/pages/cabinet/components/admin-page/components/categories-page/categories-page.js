import { useEffect, useState } from "react";
import { request } from "../../../../../../utils";
import { Button, Loader, Table, TableHead } from "../../../../../../components";
import { CategoryRow } from "./components";

export const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    request("/products/categories")
      .then(({ error, data }) => setCategories(data))
      .finally(() => setIsLoading(false));
  }, [shouldUpdate]);

  const onAddCategory = () => {
    setCategories([...categories, { id: "", name: "" }]);
  };

  const onCategoryRemove = async (categoryId, name) => {
    if (!name || !categoryId) {
      const updatedCategories = categories.filter(
        (category) => category.id !== ""
      );
      setCategories(updatedCategories);
      return;
    }

    const removeSubmit = window.confirm(
      `Удалить категорию ${name}? Это также удалит все связанные с ней товары...`
    );

    if (removeSubmit) {
      setIsLoading(true);
      await request(`/products/categories/${categoryId}`, "DELETE");
      setShouldUpdate(!shouldUpdate);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h2>Категории товаров</h2>
      <Button
        iconId={"la-plus"}
        background="#fff"
        color="#000"
        onClick={onAddCategory}
      />

      <Table>
        <thead>
          <tr>
            <TableHead></TableHead>
            <TableHead>Название</TableHead>
            <TableHead></TableHead>
          </tr>
        </thead>
        <tbody>
          {categories.map(({ id: categoryId, name }, index) => (
            <CategoryRow
              key={categoryId}
              categoryId={categoryId}
              name={name}
              onCategoryRemove={() => onCategoryRemove(categoryId, name)}
              index={index}
              shouldUpdate={shouldUpdate}
              setShouldUpdate={setShouldUpdate}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};
