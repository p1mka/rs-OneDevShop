import { Icon } from "../icon/icon";
import { getWordForm } from "../../utils";
import styled from "styled-components";

const RatingContainer = ({
  className,
  value,
  onChange,
  reviewsCount,
  noCount,
  onReviewsCountClick,
}) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Icon
        key={i}
        id={`la-star  ${i <= value ? "las" : "filled"}`}
        color="#EB4AAE"
        onClick={() => (onChange ? onChange(i) : null)}
      />
    );
  }

  return (
    <div className={className}>
      {stars}
      {!noCount && (
        <div
          className={onReviewsCountClick && "reviews-link"}
          onClick={onReviewsCountClick ? onReviewsCountClick : null}
        >
          {reviewsCount}{" "}
          {getWordForm(reviewsCount, "отзыв", "отзыва", "отзывов")}
        </div>
      )}
    </div>
  );
};

export const Rating = styled(RatingContainer)`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  & .reviews-link {
    cursor: pointer;
    text-decoration: underline;
  }
  & .filled {
    color: gray;
  }
  & .filled:hover {
    cursor: ${({ onChange }) => (onChange ? "pointer" : "default")};
  }
`;
