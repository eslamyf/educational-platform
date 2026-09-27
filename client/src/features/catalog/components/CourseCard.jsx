import React from 'react';
import { Link } from 'wouter';
import { Play, Clock3, BookOpen, ArrowLeft, Users, Sparkles } from 'lucide-react';
import { StarRating } from '@/components/common/StarRating';
import { formatPrice, courseImageFallback } from '@/lib/data';

export const CourseCard = ({ course, compact = false, className = '' }) => {
    return (
        <Link href={`/course/${course.id}`} className={`course-card ${compact ? 'compact' : ''} ${className}`}>
            <div className="course-card-image-wrap">
                <img
                    className="course-card-image"
                    src={course.image || courseImageFallback}
                    alt={course.title}
                    loading="lazy"
                />
                <span className="card-chip">{course.category}</span>
                
                {course.oldPrice > course.price && (
                    <span className="card-discount-tag">
                        وفر {Math.round(((course.oldPrice - course.price) / course.oldPrice) * 100)}٪
                    </span>
                )}

                <span className="card-play" aria-label="معاينة الفيديو">
                    <Play size={14} fill="currentColor" />
                </span>
            </div>

            <div className="course-card-content">
                {/* Instructor Bar */}
                <div className="course-card-instructor">
                    <img
                        className="instructor-mini-avatar"
                        src={course.instructorAvatar}
                        alt={course.instructor}
                        loading="lazy"
                    />
                    <div className="instructor-mini-info">
                        <span className="instructor-mini-name">{course.instructor}</span>
                        <span className="instructor-mini-role">{course.instructorRole}</span>
                    </div>
                </div>

                <h3>{course.title}</h3>
                <p className="course-card-description">{course.description}</p>

                {/* Course Metadata */}
                <div className="course-card-meta">
                    <span>
                        <BookOpen size={13} /> {course.lessons.toLocaleString('ar-EG')} محاضرة
                    </span>
                    <span>
                        <Clock3 size={13} /> {course.duration}
                    </span>
                    <span>
                        <Users size={13} /> {course.students.toLocaleString('ar-EG')}
                    </span>
                </div>

                {/* Price & Action Row */}
                <div className="course-card-price">
                    <div className="price-block">
                        <span className="price">{formatPrice(course.price)}</span>
                        {course.oldPrice > course.price && (
                            <span className="old-price">{formatPrice(course.oldPrice)}</span>
                        )}
                    </div>
                    <div className="course-card-cta">
                        <span>التفاصيل</span>
                        <ArrowLeft size={14} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;
