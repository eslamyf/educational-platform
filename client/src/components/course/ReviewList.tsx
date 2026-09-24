import React from 'react';
import { StarRating } from '@/components/common/StarRating';
import type { Review } from '@/types';

interface ReviewListProps {
  reviews: Review[];
  rating?: number;
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews, rating = 4.9 }) => {
  return (
    <div className="reviews-grid">
      {reviews.map((review) => (
        <div className="review" key={review.name}>
          <div className="review-head">
            <div className="reviewer">
              {review.avatar ? (
                <img src={review.avatar} alt={review.name} className="avatar-img" />
              ) : (
                <div className="avatar-initial">{review.name[0]}</div>
              )}
              <div>
                <div className="reviewer-name">{review.name}</div>
                <div className="reviewer-role">{review.role}</div>
              </div>
            </div>
            <StarRating rating={review.rating} />
          </div>
          <p>{review.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
