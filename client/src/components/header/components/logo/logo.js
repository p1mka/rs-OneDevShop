import { Link } from "react-router-dom";
import styled from "styled-components";

const LogoContainer = ({ className }) => {
  return (
    <div className={className}>
      <Link to="/">
        <h1>ODS</h1>
        <h4>one developer's shop</h4>
      </Link>
    </div>
  );
};

export const Logo = styled(LogoContainer)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
  width: 15%;

  & h1 {
    margin: 0;
    padding: 0 5px;
    color: #414141;
    text-align: center;
    font-size: 3rem;
    font-style: normal;
    font-weight: 800;
    line-height: 95%;
    text-shadow: 0px 3px 2px rgba(0, 0, 0, 0.25);
  }

  & h4 {
    display: flex;
    margin: 0;
    color: #000;
    text-align: center;
    font-size: 0.7rem;
    font-style: normal;
    line-height: 0;
    letter-spacing: -0.5px;
    text-shadow: 0px 3px 2px rgba(0, 0, 0, 0.25);
  }
`;
