import { Icon } from "../../../../../icon/icon";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SocialNetworksContainer = ({ className }) => {
  return (
    <div className={className}>
      <Link target="_blank" to={`https://t.me/p1mka`}>
        <Icon title="Telegram" id="la-telegram" size="26px" social="true" />
      </Link>
      <Link target="_blank" to={`https://vk.com/p1mka`}>
        <Icon title="VK" id="la-vk" size="30px" social="true" />
      </Link>
    </div>
  );
};

export const SocialNetworks = styled(SocialNetworksContainer)`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & i:hover {
    color: #eb4aae;
  }
`;
