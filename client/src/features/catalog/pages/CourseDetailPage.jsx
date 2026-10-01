import React, { useState } from 'react';
import { useRoute, useLocation, Link } from 'wouter';
import {
    ChevronLeft,
    Users,
    Clock3,
    Bookmark,
    Play,
    BookOpen,
    GraduationCap,
    ShieldCheck,
    CheckCircle2,
    ArrowLeft,
    Sparkles,
    Star,
    Send,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StarRating } from '@/components/common/StarRating';
import { CurriculumList } from '@/features/catalog/components/CurriculumList';
import { PurchaseCard } from '@/features/catalog/components/PurchaseCard';
import { ReviewList } from '@/features/catalog/components/ReviewList';
import { useLearning } from '@/hooks/useLearning';
import { useAuth } from '@/hooks/useAuth';
import {
    discount,
    getReviewLabel,
    studentCountLabel,
    ratingText,
    instructorStats,
    reviewsLabel,
    reviewsDescription,
} from '@/lib/data';
import { toast } from 'sonner';

export const CourseDetailPage = () => {
    const [, params] = useRoute('/course/:id');
    const [, setLocation] = useLocation();
    const courseId = params?.id || 'secondary-biology';
    const { getCourseById, getCourseReviews, addCourseReview } = useLearning();
    const { user } = useAuth();
    const course = getCourseById(courseId);

    // Interactive Review Form state
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);

    const reviews = getCourseReviews ? getCourseReviews(course.id) : (course.reviews || []);

    const handleBookmark = () => {
        toast.success('تم حفظ المسار في قائمتك المفضلة');
    };

    const handleEnrollNow = () => {
        setLocation(`/checkout?course=${course.id}`);
    };

    const handleOpenFreeLesson = () => {
        setLocation(`/learn/${course.id}`);
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!reviewText.trim()) {
            toast.error('يرجى كتابة نص التقييم');
            return;
        }

        setIsSubmittingReview(true);
        addCourseReview(course.id, {
            name: user?.name || 'طالب نَوَى',
            role: user?.grade ? `طالب — ${user.grade}` : 'طالب ثانوية عامة',
            rating: reviewRating,
            text: reviewText.trim(),
            avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        });

        setReviewText('');
        setIsSubmittingReview(false);
    };

    return (
        <div className="page-fade">
            <Header />

            <main>
                {/* Course Hero */}
                <section className="course-detail-hero">
                    <div className="container">
                        <div className="breadcrumbs">
                            <Link href="/">الرئيسية</Link>
                            <ChevronLeft size={13} />
                            <Link href="/courses">الكورسات</Link>
                            <ChevronLeft size={13} />
                            <span>{course.shortTitle || course.title}</span>
                        </div>

                        <div className="detail-hero-grid">
                            <div className="detail-copy">
                                <div className="eyebrow">{course.category}</div>
                                <h1 className="display">{course.title}</h1>
                                <p className="detail-description">{course.description}</p>

                                <div className="detail-tags">
                                    {(course.tags || []).map((tag) => (
                                        <span className="tag" key={tag}>
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="detail-meta-line">
                                    <span>
                                        <StarRating rating={course.rating || 5.0} />{' '}
                                        <b style={{ color: 'var(--ink)' }}>{course.rating || 5.0}</b> ({getReviewLabel(course)})
                                    </span>
                                    <span>
                                        <Users size={15} /> {studentCountLabel(course.students || 0)}
                                    </span>
                                    <span>
                                        <Clock3 size={15} /> {course.duration || '٤ ساعات'}
                                    </span>
                                </div>

                                <div className="hero-actions" style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                    <button type="button" className="btn btn-primary" onClick={handleEnrollNow}>
                                        اشترك في المسار الآن <ArrowLeft size={16} />
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={handleOpenFreeLesson}>
                                        <Play size={15} fill="currentColor" /> شاهد المحاضرة المجانية
                                    </button>
                                    <button type="button" className="btn btn-outline" onClick={handleBookmark}>
                                        <Bookmark size={15} /> حفظ
                                    </button>
                                </div>
                            </div>

                            <div className="detail-visual">
                                <div className="detail-image-wrap" onClick={handleOpenFreeLesson} style={{ cursor: 'pointer' }}>
                                    <img className="detail-image" src={course.image} alt={course.title} />
                                    <div className="preview-button">
                                        <span>
                                            <Play size={12} fill="currentColor" />
                                        </span>
                                        شاهد المحاضرة المجانية
                                        <small>تعلّم حقيقي</small>
                                    </div>
                                </div>
                                <div className="detail-sticker">
                                    {discount(course)}٪
                                    <br />
                                    خصم الآن
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Course Detail Layout with Sidebar */}
                <div className="container detail-layout" style={{ paddingTop: 48, paddingBottom: 80 }}>
                    <div className="detail-main">
                        {/* Outcomes & Highlights */}
                        <section className="detail-section">
                            <h2>ماذا ستخرج به من هذا المسار؟</h2>
                            <div className="outcomes-grid">
                                {(course.outcomes || []).map((item) => (
                                    <div className="outcome" key={item}>
                                        <CheckCircle2 size={17} />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="info-strip">
                                <div className="info-item">
                                    <BookOpen size={19} />
                                    <strong>{(course.lessons || 12).toLocaleString('ar-EG')} درس</strong>
                                    <span>محاضرات مرتبة</span>
                                </div>
                                <div className="info-item">
                                    <Clock3 size={19} />
                                    <strong>{course.duration || '٤ ساعات'}</strong>
                                    <span>إجمالي الوقت</span>
                                </div>
                                <div className="info-item">
                                    <GraduationCap size={19} />
                                    <strong>{course.level || 'المرحلة الثانوية'}</strong>
                                    <span>مستوى المسار</span>
                                </div>
                                <div className="info-item">
                                    <ShieldCheck size={19} />
                                    <strong>شهادة إتمام</strong>
                                    <span>رقمية معتمدة</span>
                                </div>
                            </div>
                        </section>

                        {/* Curriculum Accordion */}
                        <CurriculumList course={course} />

                        {/* Instructor Bio */}
                        <section className="detail-section">
                            <h2>عن المدرّب والمحاضر</h2>
                            <div className="instructor-card">
                                <img
                                    className="instructor-photo"
                                    src={course.instructorAvatar || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=85'}
                                    alt={course.instructor}
                                />
                                <div>
                                    <h3>{course.instructor}</h3>
                                    <div className="instructor-role">{course.instructorRole}</div>
                                    <p className="instructor-bio">{course.instructorBio || 'خبير تدريس المناهج وإعداد بنوك أسئلة الامتحانات بنظام الفهم والتطبيق العملي.'}</p>
                                    <div className="instructor-stats">
                                        {instructorStats.map((stat) => (
                                            <div key={stat.label}>
                                                <strong>{stat.value}</strong>
                                                <span>{stat.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Student Reviews & Add Review Form */}
                        <section className="detail-section">
                            <div className="section-head" style={{ marginBottom: 18 }}>
                                <div>
                                    <h2 style={{ marginBottom: 5 }}>{reviewsLabel}</h2>
                                    <p className="muted small">{reviewsDescription}</p>
                                </div>
                                <StarRating rating={course.rating || 5.0} />
                            </div>

                            {/* Add Review Box */}
                            <form onSubmit={handleReviewSubmit} className="add-review-box">
                                <div className="review-box-header">
                                    <Sparkles size={16} />
                                    <span>أضف تجربتك ورأيك في هذا المسار:</span>
                                </div>
                                <div className="review-stars-selector">
                                    <span>تقييمك:</span>
                                    <div className="stars-buttons">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                type="button"
                                                key={star}
                                                className={`star-select-btn ${reviewRating >= star ? 'selected' : ''}`}
                                                onClick={() => setReviewRating(star)}
                                            >
                                                <Star size={18} fill={reviewRating >= star ? '#eab308' : 'none'} color="#eab308" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <textarea
                                    rows={2}
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="اكتب تجربتك مع الشرح والتدريبات ومستوى الاستفادة..."
                                    required
                                />
                                <button type="submit" className="btn btn-primary btn-small" disabled={isSubmittingReview}>
                                    <Send size={13} /> إرسال التقييم
                                </button>
                            </form>

                            <ReviewList reviews={reviews} rating={course.rating} />
                        </section>
                    </div>

                    {/* Sticky Purchase Card Sidebar */}
                    <aside className="detail-side">
                        <PurchaseCard course={course} />
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CourseDetailPage;
