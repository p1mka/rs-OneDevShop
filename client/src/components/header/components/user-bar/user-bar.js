import { UserProfile, UserTools } from "./components";
import styled from "styled-components";

const UserBarContainer = ({ className }) => {
  return (
    <div className={className}>
      <UserTools />
      <UserProfile />
    </div>
  );
};

export const UserBar = styled(UserBarContainer)`
  display: flex;
  justify-content: space-between;
  width: 40%;
`;
