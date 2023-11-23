import styled from "styled-components";

const LoaderContainer = ({ className }) => {
  return (
    <div className={className}>
      <div className="loader"></div>
    </div>
  );
};

export const Loader = styled(LoaderContainer)`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 400;
  top: 0;
  left: 0;

  & .loader {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border: 10px solid gray;
    border-radius: 50%;
    border-left-color: #2f9ca3;
    animation: loader 1s infinite;

    @keyframes loader {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
