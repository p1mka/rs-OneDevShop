import styled from "styled-components";

const IconContainer = ({
  className,
  children,
  id,
  fill = false,
  social = false,
  ...props
}) => {
  const iconFill = fill ? "lar" : social ? "lab" : "las";
  return (
    <div className={className} {...props}>
      <i className={`${iconFill} ${id}`}>{children}</i>
    </div>
  );
};

export const Icon = styled(IconContainer)`
  font-size: ${({ size = "20px" }) => size};
  margin: ${({ margin = "0" }) => margin};
  color: ${({ color }) => color};
  transform: ${({ rotate }) => (rotate ? "rotate(270deg" : "default")});

  & :hover {
    cursor: pointer;
  }
`;
