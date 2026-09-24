import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Sparkles, ArrowLeft, Play, Search } from 'lucide-react';
import { PortalHeader } from '@/components/layout/PortalHeader';
import { PortalGate } from '@/components/layout/PortalLayout';
import { CourseCard } from '@/components/course/CourseCard';
import { EmptyState } from '@/components/common/EmptyState';
import { useAuth } from '@/hooks/useAuth';
import { courses, formatPrice } from '@/lib/data';

export const WelcomePage: React.FC = () => {
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState('كل المواد');

  if (!isAuthenticated || !user) {
    return <PortalGate />;
  }

  // Recommendations filtered by student's stage & track
  const baseRecommendations = courses.filter((course) => {
    const tags = course.tags.join(' ');
    if (user.stage === 'إعدادي') {
      return course.category === 'مواد إعدادية' || tags.includes('إعدادي');
    }
    if (user.track?.includes('علمي علوم')) {
      return tags.includes('علمي علوم') || tags.includes('أحياء') || course.category === 'ثانوية عامة';
    }
    if (user.track?.includes('علمي رياضة')) {
      return tags.includes('علمي رياضة') || tags.includes('رياضيات') || course.category === 'ثانوية عامة';
    }
    return course.category === 'ثانوية عامة' || course.category === 'تسويق وصناعة محتوى';
  });

  const uniqueSubjects = [
    'كل المواد',
    ...Array.from(
      new Set(
        baseRecommendations.flatMap((course) =>
          course.tags.filter((tag) =>
            ['لغة عربية', 'رياضيات', 'أحياء', 'علمي علوم', 'علمي رياضة', 'تصميم', 'تسويق'].some(
              (item) => tag.includes(item)
            )
          )
        )
      )
    ),
  ];

  const recommendations = baseRecommendations.filter(
    (course) => selectedSubject === 'كل المواد' || course.tags.some((t) => t.includes(selectedSubject))
  );

  return (
    <div className="portal-page welcome-page">
      <PortalHeader role="student" />

      <main className="container welcome-main">
        <div className="welcome-hero">
          <div className="welcome-confetti">
            <Sparkles size={22} />
            <span>تم إنشاء وتجهيز حسابك بنجاح</span>
          </div>

          <div className="eyebrow">أهلًا بك في نَوَى يا {user.name || 'صاحب الرحلة'}</div>
          <h1 className="display">
            جاهز نبدأ من
            <br />
            <em>{user.stage === 'إعدادي' ? 'مرحلتك الإعدادية.' : 'مسارك الثانوي.'}</em>
          </h1>
          <p>
            جهّزنا لك ترشيحات أولية بناءً على اختيارك لـ {user.grade || 'صفك الدراسي'}{' '}
            {user.track ? `· ${user.track}` : ''}. اختار مادة واحدة وابدأ بخطوة صغيرة اليوم.
          </p>

          <div className="welcome-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/dashboard')}
            >
              اذهب إلى لوحة تحكمي <ArrowLeft size={15} />
            </button>
            <Link href="/courses" className="btn btn-secondary">
              استكشف كل الكورسات
            </Link>
          </div>
        </div>

        <section className="welcome-recommendations">
          <div className="section-head">
            <div>
              <div className="eyebrow">مقترحة خصيصًا لك</div>
              <h2 className="section-title">ابدأ من المادة الأقرب لهدفك.</h2>
            </div>
            <span className="muted small">
              {recommendations.length.toLocaleString('ar-EG')} مسارات مناسبة
            </span>
          </div>

          <div className="welcome-subject-filters">
            <span>فلترة سريعة:</span>
            {uniqueSubjects.map((item) => (
              <button
                key={item}
                type="button"
                className={selectedSubject === item ? 'active' : ''}
                onClick={() => setSelectedSubject(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {recommendations.length > 0 ? (
            <div className="course-grid">
              {recommendations.map((course, index) => (
                <div className={`reveal reveal-${Math.min(index + 1, 3)}`} key={course.id}>
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Search}
              title="لا توجد مسارات لهذه المادة حاليًا"
              description="اختر مادة أخرى أو اعرض جميع المواد."
              actionText="عرض كل المواد"
              onAction={() => setSelectedSubject('كل المواد')}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default WelcomePage;
