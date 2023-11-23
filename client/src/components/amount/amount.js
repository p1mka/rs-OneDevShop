import styled from "styled-components";

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const DotContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Dot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 2px;
  background-color: ${({ color }) => color};
`;

export const Amount = ({ amount }) => {
  let dots = [];
  let color = "";

  if (amount > 10) {
    dots = Array(5).fill(null);
    color = "#2f9ca3";
  } else if (amount > 5) {
    dots = Array(3).fill(null);
    color = "#d6c929";
  } else if (amount < 5 && amount > 0) {
    dots = Array(1).fill(null);
    color = "#eb4aae";
  } else {
    dots = Array(0).fill(null);
  }

  return (
    <AmountContainer>
      <p>
        Наличие:{" "}
        {amount > 10
          ? "Много"
          : amount > 5
          ? "Средне"
          : amount > 0 && amount < 5
          ? "Мало"
          : "Нет в наличии"}
      </p>
      <DotContainer>
        {dots.map((dot, index) => (
          <Dot key={index} color={color} />
        ))}
      </DotContainer>
    </AmountContainer>
  );
};
