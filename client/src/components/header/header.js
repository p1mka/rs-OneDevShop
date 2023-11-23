import { UserBar, Logo, MenuButton, Search } from "./components";
import styled from "styled-components";

const HeaderContainer = ({ className }) => {
  return (
    <header className={className}>
      <Logo />
      <MenuButton />
      <Search />
      <UserBar />
    </header>
  );
};

export const Header = styled(HeaderContainer)`
  position: fixed;
  left: 5px;
  right: 5px;
  z-index: 300;
  display: flex;
  align-items: center;
  background: #fff;
  padding: 1rem 10%;
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
`;
