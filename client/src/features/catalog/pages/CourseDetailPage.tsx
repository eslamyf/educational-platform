import React from 'react';
import { useRoute, Link } from 'wouter';
import {
  ChevronLeft,
  Star,
  Users,
  Clock3,
  ShoppingBag,
  Bookmark,
  Play,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Lightbulb,
  ArrowLeft,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StarRating } from '@/components/common/StarRating';
import { CurriculumList } from '@/features/catalog/components/CurriculumList';
import { PurchaseCard } from '@/features/catalog/components/PurchaseCard';
import { ReviewList } from '@/features/catalog/components/ReviewList';
import { FaqAccordion } from '@/features/catalog/components/FaqAccordion';
import { CourseCard } from '@/features/catalog/components/CourseCard';
import {
  getCourse,
  relatedCourses,
  discount,
  getReviewLabel,
  studentCountLabel,
  previewLabel,
  previewDuration,
  ratingText,
  instructorBio,
  instructorStats,
  reviewsLabel,
  reviewsDescription,
  relatedLabel,
  relatedDescription,
} from '@/lib/data';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

export const CourseDetailPage: React.FC = () => {
  const [, params] = useRoute('/course/:id');
  const courseId = params?.id || 'creative-strategy';
  const course = getCourse(courseId);
  const { addToCart, isCourseInCart } = useCart();
  const related = relatedCourses(course);
  const alreadyInCart = isCourseInCart(course.id);

  const handleBookmark = () => {
    toast.success('تم حفظ المسار في قائمتك المفضلة');
  };

  const handlePlayPreview = () => {
    toast.info('تشغيل فيديو المعاينة التوضيحي');
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

                <div className="hero-actions" style={{ marginTop: 24 }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => addToCart(course)}
                  >
                    {alreadyInCart ? 'موجود في السلة' : 'أضف للسلة'}{' '}
                    <ShoppingBag size={15} />
                  </button>
                  <button type="button" className="btn btn-outline" onClick={handleBookmark}>
                    <Bookmark size={15} /> حفظ المسار
                  </button>
                </div>
              </div>

              <div className="detail-visual">
                <div className="detail-image-wrap">
                  <img
                    className="detail-image"
                    src={course.image}
                    alt={course.title}
                  />
                  <button type="button" className="preview-button" onClick={handlePlayPreview}>
                    <span>
                      <Play size={12} fill="currentColor" />
                    </span>
                    {previewLabel}
                    <small>{previewDuration}</small>
                  </button>
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
        <div className="container detail-layout" style={{ paddingTop: 68, paddingBottom: 90 }}>
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

            {/* Audience & Prerequisites */}
            <section className="detail-section">
              <h2>هل هذا المسار مناسب لك؟</h2>
              <div className="two-col-copy">
                <div className="soft-panel">
                  <h3>
                    <Users size={17} /> مناسب لك إذا كنت...
                  </h3>
                  <ul>
                    {course.audience.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="soft-panel">
                  <h3>
                    <Lightbulb size={17} /> متطلبات قبل أن تبدأ
                  </h3>
                  <ul>
                    {course.requirements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Curriculum Accordion & Quiz */}
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

            {/* FAQs */}
            <section className="detail-section">
              <h2>أسئلة شائعة قبل البداية</h2>
              <FaqAccordion />
            </section>

            {/* Related Courses */}
            {related.length > 0 && (
              <section className="detail-section">
                <div className="section-head" style={{ marginBottom: 18 }}>
                  <div>
                    <h2 style={{ marginBottom: 5 }}>{relatedLabel}</h2>
                    <p className="muted small">{relatedDescription}</p>
                  </div>
                  <Link href="/courses" className="link-arrow">
                    كل المسارات <ArrowLeft size={14} />
                  </Link>
                </div>
                <div className="related-grid">
                  {related.map((item) => (
                    <CourseCard key={item.id} course={item} compact />
                  ))}
                </div>
              </section>
            )}
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
