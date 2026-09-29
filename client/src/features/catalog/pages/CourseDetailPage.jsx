import React from 'react';
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
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StarRating } from '@/components/common/StarRating';
import { CurriculumList } from '@/features/catalog/components/CurriculumList';
import { PurchaseCard } from '@/features/catalog/components/PurchaseCard';
import { ReviewList } from '@/features/catalog/components/ReviewList';
import {
    getCourse,
    discount,
    getReviewLabel,
    studentCountLabel,
    ratingText,
    instructorBio,
    instructorStats,
    reviewsLabel,
    reviewsDescription,
} from '@/lib/data';
import { toast } from 'sonner';

export const CourseDetailPage = () => {
    const [, params] = useRoute('/course/:id');
    const [, setLocation] = useLocation();
    const courseId = params?.id || 'secondary-biology';
    const course = getCourse(courseId);

    const handleBookmark = () => {
        toast.success('تم حفظ المسار في قائمتك المفضلة');
    };

    const handleEnrollNow = () => {
        setLocation(`/checkout?course=${course.id}`);
    };

    const handleOpenFreeLesson = () => {
        setLocation(`/learn/${course.id}`);
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
                            <span>{course.shortTitle}</span>
                        </div>

                        <div className="detail-hero-grid">
                            <div className="detail-copy">
                                <div className="eyebrow">{course.category}</div>
                                <h1 className="display">{course.title}</h1>
                                <p className="detail-description">{course.description}</p>

                                <div className="detail-tags">
                                    {course.tags.map((tag) => (
                                        <span className="tag" key={tag}>
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="detail-meta-line">
                                    <span>
                                        <StarRating rating={course.rating} />{' '}
                                        <b style={{ color: 'var(--ink)' }}>{ratingText}</b> ({getReviewLabel(course)})
                                    </span>
                                    <span>
                                        <Users size={15} /> {studentCountLabel(course.students)}
                                    </span>
                                    <span>
                                        <Clock3 size={15} /> {course.duration}
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
                                {course.outcomes.map((item) => (
                                    <div className="outcome" key={item}>
                                        <CheckCircle2 size={17} />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="info-strip">
                                <div className="info-item">
                                    <BookOpen size={19} />
                                    <strong>{course.lessons.toLocaleString('ar-EG')} درس</strong>
                                    <span>محاضرات مرتبة</span>
                                </div>
                                <div className="info-item">
                                    <Clock3 size={19} />
                                    <strong>{course.duration}</strong>
                                    <span>إجمالي الوقت</span>
                                </div>
                                <div className="info-item">
                                    <GraduationCap size={19} />
                                    <strong>{course.level}</strong>
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
                            <h2>عن المدرّب</h2>
                            <div className="instructor-card">
                                <img
                                    className="instructor-photo"
                                    src={course.instructorAvatar}
                                    alt={course.instructor}
                                />
                                <div>
                                    <h3>{course.instructor}</h3>
                                    <div className="instructor-role">{course.instructorRole}</div>
                                    <p className="instructor-bio">{instructorBio}</p>
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

                        {/* Student Reviews */}
                        <section className="detail-section">
                            <div className="section-head" style={{ marginBottom: 18 }}>
                                <div>
                                    <h2 style={{ marginBottom: 5 }}>{reviewsLabel}</h2>
                                    <p className="muted small">{reviewsDescription}</p>
                                </div>
                                <StarRating rating={course.rating} />
                            </div>
                            <ReviewList reviews={course.reviews} rating={course.rating} />
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
