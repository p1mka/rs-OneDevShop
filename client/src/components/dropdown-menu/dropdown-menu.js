import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsMenuVisible } from "../../store/selectors";
import { setIsMenuVisible } from "../../store/actions";
import { useLayoutEffect, useState } from "react";

import { SimpleLoader } from "../loaders";
import styled from "styled-components";
import { request } from "../../utils";

const DropdownMenuContainer = ({ className }) => {
  const [categories, setCategories] = useState([]);
  const [isMenuLoading, setIsMenuLoading] = useState(false);
  const isMenuVisible = useSelector(selectIsMenuVisible);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onMenuClose = () => dispatch(setIsMenuVisible(!isMenuVisible));

  useLayoutEffect(() => {
    setIsMenuLoading(true);
    request("/products/categories")
      .then(({ error, data }) => setCategories(data))
      .finally(() => setIsMenuLoading());
  }, [dispatch]);

  const onCategoryClick = (categoryId) => {
    dispatch(setIsMenuVisible(false));
    navigate(`/categories/${categoryId}`);
  };

  return (
    <div className={className} onMouseLeave={onMenuClose}>
      {isMenuLoading ? (
        <SimpleLoader />
      ) : (
        <ul className="categories">
          {categories.map(({ id: categoryId, name }) => {
            return (
              <span
                className="category"
                key={categoryId}
                onClick={() => onCategoryClick(categoryId)}
              >
                <li>{name}</li>
              </span>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export const DropDownMenu = styled(DropdownMenuContainer)`
  font-family: Rubik;
  font-size: 1.2rem;
  font-weight: 700;
  position: fixed;
  z-index: 200;
  left: 5px;
  right: 5px;
  top: 4.5rem;
  display: flex;
  padding: 2rem 0;

  background: #fff;
  box-shadow: -1px 6px 7px 0px rgb(0 0 0 / 25%);
  animation-name: appear;
  animation-duration: 300ms;
  max-height: 10rem;

  & .categories {
    margin-left: 6.5%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1.5rem;
    list-style: none;
  }

  & .category {
    cursor: pointer;
    display: flex;
    padding: 0 5rem 0 0;
    transition: color 0.3s ease;
  }
  & .category:hover {
    color: #eb4aae;
    transition: color 0.3s ease;
  }

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  & a:hover {
    color: #eb4aae;
  }
`;
