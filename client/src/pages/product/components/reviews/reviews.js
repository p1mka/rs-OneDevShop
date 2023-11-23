import {
  Button,
  Icon,
  Input,
  Rating,
  ReviewsLoader,
} from "../../../../components";
import { useState } from "react";
import { addReviewAsync, removeReviewAsync } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLogin, selectUserRole } from "../../../../store/selectors";
import { Link } from "react-router-dom";
import { ROLES } from "../../../../constants";
import { capitalizeFirstLetter } from "../../../../utils";

import styled from "styled-components";

const ReviewsContainer = ({ className, reviews, productId, reviewsRef }) => {
  const dispatch = useDispatch();
  const userRole = useSelector(selectUserRole);
  const userLogin = useSelector(selectUserLogin);

  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [isReviewLoading, setIsReviewLoading] = useState(false);

  const onReviewChange = ({ target }) => {
    setReviewText(target.value);
  };

  const onAddReviewButtonClick = async () => {
    setReviewText("");
    setReviewRating(0);
    setIsReviewLoading(true);
    await dispatch(addReviewAsync(productId, reviewText, reviewRating));
    setIsReviewLoading(false);
  };

  const onRatingChange = (value) => setReviewRating(value);

  const onReviewRemove = async (reviewId) => {
    setIsReviewLoading(true);

    await dispatch(removeReviewAsync(productId, reviewId));

    setIsReviewLoading(false);
  };

  return (
    <div className={className}>
      <h1 ref={reviewsRef}>Отзывы</h1>
      <hr />
      {!reviews.length && <h3>Отзывов пока нет... Оставьте первым!</h3>}

      {reviews.map(
        ({ id: reviewId, author, content, createdAt, reviewRating }) => (
          <div key={reviewId} className="reviews">
            <div className="review-owner">
              <Icon id="la-user" size="34px" />
              <h3>{author}</h3>
              {(userRole === ROLES.ADMIN || userLogin === author) && (
                <Icon
                  onClick={() => onReviewRemove(reviewId)}
                  id="la-trash-alt"
                />
              )}
            </div>
            <div className="rating-and-date">
              <Rating value={reviewRating} noCount={true} />
              {createdAt}
            </div>

            <div className="review-content">
              {capitalizeFirstLetter(content)}
            </div>
          </div>
        )
      )}

      {userRole !== ROLES.GUEST ? (
        isReviewLoading ? (
          <ReviewsLoader />
        ) : (
          <>
            <div className="review-user-rating">
              <h3> Ваша оценка:</h3>
              <Rating
                onChange={onRatingChange}
                value={reviewRating}
                noCount={true}
              />
            </div>
            <Input
              placeholder=" Напишите отзыв здесь..."
              value={reviewText}
              onChange={onReviewChange}
            />
            <Button
              type="submit"
              width="20rem"
              disabled={!reviewText}
              onClick={onAddReviewButtonClick}
            >
              Добавить
            </Button>
          </>
        )
      ) : (
        <div>
          Для добавления отзыва <Link to="/authorize">авторизуйтесь...</Link>
        </div>
      )}
    </div>
  );
};

export const Reviews = styled(ReviewsContainer)`
  font-family: rubik;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  margin: 1rem 0 0 0;
  padding: 1rem;
  border-radius: 0.5rem;

  & .review-owner {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  & .review-user-rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
  }
  & .rating-and-date {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  & .review-content {
    font-size: 18px;
    word-wrap: break-word;
  }

  & h3 {
    margin: 0;
  }

  & hr {
    color: black;
    width: 100%;
  }
`;
