import { forwardRef } from "react";
import styled from "styled-components";

const InputContainer = forwardRef(
  ({ className, type, children, title, ...props }, ref) => (
    <input
      className={className}
      type={type ? type : "default"}
      title={title}
      {...props}
      ref={ref}
    >
      {children}
    </input>
  )
);

export const Input = styled(InputContainer)`
  all: unset;
  width: ${({ width }) => width};
  height: 1.5rem;
  padding: 0.5rem;
  border: ${({ border = "1px solid #2f9ca3" }) => border};
  border-radius: 0.25rem;
  box-shadow: 0px 3px 10px 0px rgba(112, 192, 91, 0.2);
  font-size: 18px;
  outline: none;
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);

  & input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  & input[type="number"],
  input[type="number"]:hover,
  input[type="number"]:focus {
    appearance: none;
    -moz-appearance: textfield;
  }
`;
