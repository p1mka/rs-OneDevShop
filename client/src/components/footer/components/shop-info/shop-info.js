import styled from "styled-components";

const ShopInfoContainer = ({ className }) => {
  return (
    <div className={className}>
      <span> О компании</span>
      <span> Контакты</span>
      <span> Статьи</span>
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
