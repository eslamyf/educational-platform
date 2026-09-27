import React from 'react';
import { Link } from 'wouter';
import { Play, Clock3, ArrowLeft } from 'lucide-react';
import { StarRating } from '@/components/common/StarRating';
import { formatPrice, courseImageFallback } from '@/lib/data';
export const CourseCard = ({ course, compact = false, className = '' }) => {
    return (<Link href={`/course/${course.id}`} className={`course-card ${compact ? 'compact' : ''} ${className}`}>
      <div className="course-card-image-wrap">
        <img className="course-card-image" src={course.image || courseImageFallback} alt={course.title} loading="lazy"/>
        <span className="card-chip">{course.category}</span>
        <span className="card-play" aria-label="معاينة">
          <Play size={15} fill="currentColor"/>
        </span>
      </div>

      <div className="course-card-content">
        <div className="course-card-category">
          {course.level} · {course.lessons.toLocaleString('ar-EG')} درس
        </div>
        <h3>{course.title}</h3>
        <p className="course-card-description">{course.description}</p>

        <div className="course-card-meta">
          <span>
            <Clock3 size={13}/> {course.duration}
          </span>
          <StarRating rating={course.rating}/>
        </div>

        <div className="course-card-price">
          <span>
            <span className="price">{formatPrice(course.price)}</span>
            {course.oldPrice > course.price && (<span className="old-price">{formatPrice(course.oldPrice)}</span>)}
          </span>
          <span className="course-card-action">
            <ArrowLeft size={17} color="var(--coral, #d86e4d)"/>
          </span>
        </div>
      </div>
    </Link>);
};
export default CourseCard;
