import { Routes, Route } from "react-router-dom";
import {
  Breadcrumbs,
  CartNotification,
  DropDownMenu,
  Footer,
  Header,
  ModalWindow,
} from "./components";
import {
  Authorize,
  Cabinet,
  Cart,
  FilteredProducts,
  Main,
  Orders,
  Product,
  ProductsByCategory,
  Registration,
} from "./pages";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsMenuVisible,
  selectIsShowNotification,
} from "./store/selectors";
import { useLayoutEffect } from "react";
import { getUserOrdersAsync, setUser } from "./store/actions";
import { updateCart } from "./store/actions/update-cart";
import { Order } from "./pages/cart/components";
import { AdminPage, UserProfile } from "./pages/cabinet/components";
import styled from "styled-components";

const AppColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Page = styled.div`
  display: flex;
  flex: 1 0 auto;
  padding: 0 10% 0 10%;
  // margin-top: 6rem;
`;

function Shop() {
  const dispatch = useDispatch();
  const isShowNotification = useSelector(selectIsShowNotification);

  useLayoutEffect(() => {
    const currentUserJSON = sessionStorage.getItem("user");
    if (!currentUserJSON) {
      return;
    }

    const userData = JSON.parse(currentUserJSON);
    dispatch(setUser(userData));
    dispatch(getUserOrdersAsync(userData.id));
  }, [dispatch]);

  useLayoutEffect(() => {
    const cartJSON = localStorage.getItem("cart");
    if (!cartJSON) {
      return;
    }
    const cart = JSON.parse(cartJSON);
    dispatch(updateCart(cart));
  }, [dispatch]);

  const isMenuVisible = useSelector(selectIsMenuVisible);

  return (
    <AppColumn>
      <Header />
      {isMenuVisible && <DropDownMenu />}
      {isShowNotification && <CartNotification />}

      <Breadcrumbs />
      <Page>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route element={<ModalWindow />}>
            <Route path="authorize" element={<Authorize />} />
            <Route path="registration" element={<Registration />} />
          </Route>
          <Route path="/:filter" element={<FilteredProducts />} />
          <Route path="/product/:id" element={<Product />} />
          <Route
            path="/product/*"
            element={<div>Страница не существует...</div>}
          />
          <Route path="/cart" element={<Cart />}>
            <Route path="order" element={<Order />} />
          </Route>
          <Route path="/orders" element={<Orders />} />
          <Route path="/cabinet" element={<Cabinet />}>
            <Route path="my-orders" element={<Orders />} />
            <Route path="my-profile" element={<UserProfile />} />
            <Route path="administrate" element={<AdminPage />} />
          </Route>
          <Route path="/categories/:id" element={<ProductsByCategory />} />
          <Route
            path="/categories/*"
            element={<div>Страница не существует...</div>}
          />
          <Route path="*" element={<div>Ошибка</div>} />
        </Routes>
      </Page>
      <Footer />
    </AppColumn>
  );
}

export default Shop;
