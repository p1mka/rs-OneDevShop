import { useLocation, Link } from "react-router-dom";
import { Icon } from "../icon/icon";
import { getCorrectPageName } from "../../utils";
import styled from "styled-components";

const BreadcrumbsContainer = ({ className }) => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    location.pathname !== "/" && (
      <div className={className}>
        {pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <span key={pathname}>
              <span>{!isLast && <Link to="/">Главная</Link>}</span>
              <Icon id="la-arrow-right" />
              {isLast ? (
                <span>{getCorrectPageName(pathname)}</span>
              ) : (
                <Link to={routeTo}>{getCorrectPageName(pathname)}</Link>
              )}
            </span>
          );
        })}
      </div>
    )
  );
};

export const Breadcrumbs = styled(BreadcrumbsContainer)`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 6rem;
  font-family: rubik;

  & span {
    border-radius: 0.5rem;
    background: #fff;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;
