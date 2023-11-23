import styled from "styled-components";
import { Link } from "react-router-dom";

const ShopInfoContainer = ({ className }) => {
  return (
    <div className={className}>
      <Link to="/about"> О компании</Link>
      <span> One Developer's Shop (c) 2023</span>
      {/* <span> Статьи</span> */}
    </div>
  );
};

export const ShopInfo = styled(ShopInfoContainer)`
  gap: 2rem;
  display: flex;
  //   justify-content: space-between;
  text-align: center;
  font-size: 12px;
`;
