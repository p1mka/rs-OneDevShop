// TODO Transition for Content

import { useState } from "react";
import { Button, Content, Sidebar } from "../../../../components";
import {
  ProductsPage,
  UsersPage,
  CategoriesPage,
  OrdersPage,
} from "./components";
import styled from "styled-components";

const AdminPageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const AdminPage = () => {
  const [selectedPage, setSelectedPage] = useState("products");
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  const onSideBarOpen = () => setSidebarIsOpen(!sidebarIsOpen);

  const onPageChange = (page) => {
    setSelectedPage(page);
    setSidebarIsOpen(false);
  };

  return (
    <AdminPageContainer>
      <Sidebar style={{ width: sidebarIsOpen ? 200 : 30 }}>
        <Button
          iconId={sidebarIsOpen ? "la-angle-double-left" : "la-bars"}
          iconSize="18px"
          onClick={onSideBarOpen}
        />
        {sidebarIsOpen && (
          <>
            <Button
              background="#fff"
              color="#000"
              includeIcon={false}
              onClick={() => onPageChange("products")}
            >
              Все товары
            </Button>
            <Button
              background="#fff"
              color="#000"
              includeIcon={false}
              onClick={() => onPageChange("categories")}
            >
              Категории товаров
            </Button>
            <Button
              background="#fff"
              color="#000"
              includeIcon={false}
              onClick={() => onPageChange("users")}
            >
              Пользователи
            </Button>
            <Button
              background="#fff"
              color="#000"
              includeIcon={false}
              onClick={() => onPageChange("orders")}
            >
              Заказы
            </Button>
          </>
        )}
      </Sidebar>
      <Content style={{ marginLeft: sidebarIsOpen ? 250 : 80 }}>
        {selectedPage === "products" && <ProductsPage />}
        {selectedPage === "users" && <UsersPage />}
        {selectedPage === "categories" && <CategoriesPage />}
        {selectedPage === "orders" && <OrdersPage />}
      </Content>
    </AdminPageContainer>
  );
};
