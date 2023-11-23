import styled from "styled-components";
import { Icon } from "../../../../../icon/icon";

const PhoneContainer = ({ className }) => {
  return (
    <div className={className}>
      <Icon id="la-phone" size="24px" />
      <span>8 906 579 69 99</span>
    </div>
  );
};

export const Phone = styled(PhoneContainer)`
  display: flex;
  align-items: center;

  @media screen and (max-width: 767px) {
    display: none;
  }
`;
