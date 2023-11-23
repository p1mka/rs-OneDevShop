import styled from "styled-components";
import { Contacts, ShopInfo, Weather } from "./components";

export const FooterContainer = ({ className }) => {
  return (
    <footer className={className}>
      <Weather />
      <ShopInfo />
      <Contacts />
    </footer>
  );
};

export const Footer = styled(FooterContainer)`
  font-family: rubik;
  height: 4.5rem;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  padding: 0 10%;
  box-shadow: 0px -3px 7px 0px rgba(0, 0, 0, 0.25);
`;
