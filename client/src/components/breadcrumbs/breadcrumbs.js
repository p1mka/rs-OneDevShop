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
        {location.pathname !== "/" && (
          <span>
            <Link to="/">Главная</Link>
            <Icon id="la-arrow-right" size="14px" />
          </span>
        )}
        {pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <span key={pathname}>
              {/* <Icon id="la-arrow-right" size="14px" /> */}
              {isLast ? (
                getCorrectPageName(pathname)
              ) : (
                <Link to={routeTo}>
                  <span>
                    {" "}
                    {getCorrectPageName(pathname)}
                    <Icon id="la-arrow-right" size="14px" />
                  </span>
                </Link>
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
  align-items: center;
  margin-top: 6rem;
  font-size: 14px;
  font-family: rubik;

  & span {
    border-radius: 0.5rem;
    padding: 0.25rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
`;
