import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { CirclePlay, Play, Star, ArrowLeft, } from 'lucide-react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAuth } from '@/hooks/useAuth';
import { useLearning } from '@/hooks/useLearning';
import { courses } from '@/lib/data';
export const StudentDashboardPage = () => {
    const [location] = useLocation();
    const searchParams = new URLSearchParams(window.location.search);
    const initialTab = searchParams.get('tab') || 'overview';
    const [activeTab, setActiveTab] = useState(initialTab);
    const { user } = useAuth();
    const { modules, completedLessons, quizAnswers } = useLearning();
    const enrolled = [courses[0], courses[1]];
    const course = enrolled[0];
    const lastLesson = modules[1]?.lessons[1] ?? modules[0].lessons[0];
    const totalCompleted = completedLessons.length;
    const progressPercent = Math.min(100, Math.round((totalCompleted / 32) * 100) || 72);
    return (<PortalLayout activeTab={activeTab === 'overview' ? 'overview' : activeTab} role="student">
      {/* Top Header */}
      <div className="portal-heading">
        <div>
          <div className="eyebrow">مساحة الطالب</div>
          <h1 className="display">أهلًا يا {user?.name || 'سارة'}، نكمّل؟</h1>
          <p className="muted">آخر مرة توقفتِ عند: {lastLesson.title}</p>
        </div>
        <div className="portal-date">
          اليوم، ٢٣ سبتمبر ٢٠٢٦
          <br />
          <span>إيقاعك الأسبوعي مستمر بنجاح 🔥</span>
        </div>
      </div>

      {/* Dashboard Metrics Strip */}
      <div className="student-stats">
        <div>
          <span>الكورسات النشطة</span>
          <strong>{enrolled.length.toLocaleString('ar-EG')}</strong>
          <small>مسارات تتقدمين فيها</small>
        </div>
        <div>
          <span>إجمالي الإنجاز</span>
          <strong>{progressPercent.toLocaleString('ar-EG')}٪</strong>
          <small>أعلى من الأسبوع الماضي</small>
        </div>
        <div>
          <span>ساعات التعلّم</span>
          <strong>٤.٥</strong>
          <small>ساعة هذا الأسبوع</small>
        </div>
        <div>
          <span>أيام متتالية</span>
          <strong>٣</strong>
          <small>استمري على هذا الإيقاع</small>
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <section className="portal-section">
        <div className="portal-section-head">
          <div>
            <div className="eyebrow">تابعي من حيث توقفتِ</div>
            <h2 className="section-title">كورساتي المشترَك بها</h2>
          </div>
          <Link href="/courses" className="link-arrow">
            استكشاف المزيد من المسارات <ArrowLeft size={14}/>
          </Link>
        </div>

        <div className="student-course-grid">
          {enrolled.map((item, index) => {
            const currentProgress = index === 0 ? progressPercent : 38;
            return (<article className="student-course-card" key={item.id}>
                <div className="student-course-image">
                  <img src={item.image} alt={item.title}/>
                  <span>{index === 0 ? 'قيد التعلّم' : 'بدأتِ مؤخرًا'}</span>
                </div>
                <div className="student-course-body">
                  <div className="student-course-top">
                    <span>{item.category}</span>
                    <span className="student-rating-badge">
                      <Star size={13} fill="var(--yellow, #efc75e)" color="var(--yellow, #efc75e)"/>{' '}
                      {item.rating}
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="student-course-next-lesson">
                    <Play size={14}/> {index === 0 ? lastLesson.title : 'التصميم ليس تزيينًا'}
                  </p>
                  <div className="course-progress">
                    <span style={{ width: `${currentProgress}%` }}/>
                  </div>
                  <div className="student-course-bottom">
                    <small>
                      {index === 0
                    ? `${totalCompleted} من ${item.lessons} درس`
                    : `١٠ من ${item.lessons} درس`}
                    </small>
                    <Link href={`/learn/${item.id}`} className="btn btn-primary btn-small">
                      متابعة التعلّم <ArrowLeft size={13}/>
                    </Link>
                  </div>
                </div>
              </article>);
        })}
        </div>
      </section>

      {/* Split Section: Next Lesson Action & Recent Activity */}
      <section className="portal-section split-section">
        <div className="next-lesson-card">
          <div className="next-lesson-art">
            <CirclePlay size={36}/>
          </div>
          <div>
            <div className="eyebrow">الخطوة التالية المقترحة</div>
            <h3>{lastLesson.title}</h3>
            <p>من {course.shortTitle} · مدة الدرس {lastLesson.duration}</p>
            <Link href={`/learn/${course.id}`} className="link-arrow">
              ابدأي المحاضرة الآن <ArrowLeft size={14}/>
            </Link>
          </div>
        </div>

        <div className="activity-card">
          <div className="portal-section-head">
            <h3>آخر نشاطاتك</h3>
            <span className="muted small">هذا الأسبوع</span>
          </div>

          <div className="activity-line">
            <span className="activity-dot coral"/>
            <div>
              <strong>أنهيتِ درسًا بنجاح</strong>
              <p>كيف نرى المشكلة قبل أن نصنع المحتوى؟</p>
            </div>
            <time>أمس</time>
          </div>

          <div className="activity-line">
            <span className="activity-dot olive"/>
            <div>
              <strong>حصلتِ على درجة كاملة في اختبار</strong>
              <p>البوصلة: ما الذي نريد أن نغيّره؟</p>
            </div>
            <time>منذ يومين</time>
          </div>
        </div>
      </section>
    </PortalLayout>);
};
export default StudentDashboardPage;
