import React from 'react';
import { Star } from 'lucide-react';
export const StarRating = ({ rating = 5, showText = true, className = '', starSize = 13, }) => {
    return (<span className={`rating ${className}`} aria-label={`${rating} من 5 نجوم`}>
      <Star size={starSize} fill="currentColor" color="currentColor"/>
      {showText && <span>{rating.toLocaleString('ar-EG', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span>}
    </span>);
};
export default StarRating;
