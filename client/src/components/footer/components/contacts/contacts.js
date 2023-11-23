import { Phone, SocialNetworks } from "./components";
import styled from "styled-components";

const ContactsContainer = ({ className }) => {
  return (
    <div className={className}>
      <SocialNetworks />
      <Phone />
    </div>
  );
};

export const Contacts = styled(ContactsContainer)`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
