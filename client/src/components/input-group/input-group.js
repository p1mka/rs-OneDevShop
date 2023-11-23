import styled from "styled-components";
import { Input } from "../input/input";
import { forwardRef } from "react";

const InputGroupContainer = forwardRef(
  ({ className, label, name, register, isPasswordVisible }, ref) => (
    <div className={className}>
      <Input
        className="input"
        required
        type={
          !isPasswordVisible &&
          (name === "password" || name === "passwordCheck")
            ? "password"
            : "text"
        }
        id={name}
        ref={ref}
        {...register(name)}
      />
      <label className="label" htmlFor="username">
        {label}
      </label>
    </div>
  )
);
export const InputGroup = styled(InputGroupContainer)`
  font-size: 18px;
  position: relative;
  --primary: #fff;
  font-family: rubik;

  & label {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    color: #a3a3a3;
    pointer-events: none;
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  &.input: focus {
    border: 2px solid #2f9ca3;
  }

  .input:is(:focus, :valid) ~ label {
    transform: translateY(-120%) scale(0.8);
    background-color: #2f9ca3;
    padding-inline: 1rem;
    color: var(--primary);
    border-radius: 0.25rem;
  }
`;
