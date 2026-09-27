import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Sparkles, ArrowLeft, Search } from 'lucide-react';
import { PortalHeader } from '@/components/layout/PortalHeader';
import { PortalGate } from '@/components/layout/PortalLayout';
import { CourseCard } from '@/features/catalog/components/CourseCard';
import { EmptyState } from '@/components/common/EmptyState';
import { useAuth } from '@/hooks/useAuth';
import { courses } from '@/lib/data';
export const WelcomePage = () => {
    const [, navigate] = useLocation();
    const { user, isAuthenticated } = useAuth();
    const [selectedSubject, setSelectedSubject] = useState('كل المواد');
    if (!isAuthenticated || !user) {
        return <PortalGate />;
    }
    // Recommendations filtered by student's stage & track
    const isPrep = user.stage?.includes('إعدادي');
    const isBaccalaureate = user.stage?.includes('بكالوريا');

    const baseRecommendations = courses.filter((course) => {
        const tags = course.tags.join(' ');
        if (isPrep) {
            return course.category === 'مناهج دراسية' && tags.includes('إعدادي');
        }
        if (isBaccalaureate) {
            if (user.track?.includes('الطب')) return tags.includes('أحياء') || tags.includes('علوم');
            if (user.track?.includes('الهندسة')) return tags.includes('رياضيات') || tags.includes('برمجة');
            if (user.track?.includes('الأعمال')) return tags.includes('تسويق') || tags.includes('عمل حر');
            if (user.track?.includes('الآداب')) return tags.includes('لغة عربية') || tags.includes('تصميم');
            return true;
        }
        if (user.track?.includes('علمي علوم')) {
            return tags.includes('علمي علوم') || tags.includes('أحياء');
        }
        if (user.track?.includes('علمي رياضة')) {
            return tags.includes('علمي رياضة') || tags.includes('رياضيات');
        }
        if (user.track?.includes('أدبي')) {
            return tags.includes('لغة عربية') || tags.includes('تسويق');
        }
        return true;
    });

    const uniqueSubjects = [
        'كل المواد',
        ...Array.from(new Set(baseRecommendations.flatMap((course) => course.tags.filter((tag) => ['لغة عربية', 'رياضيات', 'أحياء', 'علمي علوم', 'علمي رياضة', 'تصميم', 'تسويق', 'برمجة', 'عمل حر'].some((item) => tag.includes(item)))))),
    ];
    const recommendations = baseRecommendations.length > 0
        ? baseRecommendations.filter((course) => selectedSubject === 'كل المواد' || course.tags.some((t) => t.includes(selectedSubject)))
        : courses;

    return (<div className="portal-page welcome-page">
      <PortalHeader role="student"/>

      <main className="container welcome-main">
        <div className="welcome-hero">
          <div className="welcome-confetti">
            <Sparkles size={22}/>
            <span>تم إنشاء وتجهيز حسابك بنجاح</span>
          </div>

          <div className="eyebrow">أهلًا بك في نَوَى يا {user.name || 'صاحب الرحلة'}</div>
          <h1 className="display">
            جاهز نبدأ في
            <br />
            <em>{user.stage || 'مرحلتك التعليمية.'}</em>
          </h1>
          <p>
            جهّزنا لك ترشيحات أولية بناءً على اختيارك لـ {user.grade || 'صفك الدراسي'}{' '}
            {user.track ? `· ${user.track}` : ''}. اختار مادة واحدة وابدأ بخطوة صغيرة اليوم.
          </p>

          <div className="welcome-actions">
            <button type="button" className="btn btn-primary" onClick={() => navigate('/dashboard')}>
              اذهب إلى لوحة تحكمي <ArrowLeft size={15}/>
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
            {uniqueSubjects.map((item) => (<button key={item} type="button" className={selectedSubject === item ? 'active' : ''} onClick={() => setSelectedSubject(item)}>
                {item}
              </button>))}
          </div>

          {recommendations.length > 0 ? (<div className="course-grid">
              {recommendations.map((course, index) => (<div className={`reveal reveal-${Math.min(index + 1, 3)}`} key={course.id}>
                  <CourseCard course={course}/>
                </div>))}
            </div>) : (<EmptyState icon={Search} title="لا توجد مسارات لهذه المادة حاليًا" description="اختر مادة أخرى أو اعرض جميع المواد." actionText="عرض كل المواد" onAction={() => setSelectedSubject('كل المواد')}/>)}
        </section>
      </main>
    </div>);
};
export default WelcomePage;
