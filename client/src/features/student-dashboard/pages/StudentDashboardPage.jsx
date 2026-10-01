import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import {
    CirclePlay,
    Play,
    Star,
    ArrowLeft,
    CheckCircle2,
    Clock,
    FileText,
    Download,
    Award,
    Sparkles,
    BookOpen,
    ListChecks,
    GraduationCap,
    RotateCcw,
    Check,
    AlertCircle,
    ChevronRight,
} from 'lucide-react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAuth } from '@/hooks/useAuth';
import { useLearning } from '@/hooks/useLearning';
import { egyptEducationOptions } from '@/lib/data';
import { toast } from 'sonner';

export const StudentDashboardPage = () => {
    const [location, setLocation] = useLocation();

    // Helper to get tab from current URL search
    const getTabFromUrl = () => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        return params.get('tab') || 'overview';
    };

    const [activeTab, setActiveTab] = useState(getTabFromUrl);
    const { user, updateProfile } = useAuth();
    const { allCourses, enrolledCourses, completedLessons } = useLearning();

    // Listen to location changes & popstate
    useEffect(() => {
        setActiveTab(getTabFromUrl());
        const handlePopState = () => {
            setActiveTab(getTabFromUrl());
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [location]);

    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
        const newUrl = tabKey === 'overview' ? '/dashboard' : `/dashboard?tab=${tabKey}`;
        window.history.pushState({}, '', newUrl);
    };

    // Enrolled courses resolved dynamically
    const enrolled = useMemo(() => {
        const list = (enrolledCourses || [])
            .map((id) => (allCourses || []).find((c) => c.id === id))
            .filter(Boolean);
        return list.length > 0 ? list : [allCourses?.[0] || { id: 'secondary-biology', title: 'الأحياء — تالتة ثانوي', lessons: 36 }];
    }, [enrolledCourses, allCourses]);

    const course = enrolled[0];
    const lastLesson = course?.modules?.[0]?.lessons?.[1] ?? course?.modules?.[0]?.lessons?.[0] ?? { title: 'الدعامة في النبات والتركيب الخلوي', duration: '20:00' };
    const totalCompleted = (completedLessons || []).length || 6;
    const progressPercent = Math.min(100, Math.round((totalCompleted / (course?.lessons || 36)) * 100) || 75);

    // Profile form state for profile tab
    const [profileData, setProfileData] = useState({
        name: user?.name || 'سارة أحمد',
        email: user?.email || 'sara@example.com',
        phone: user?.phone || '01012345678',
        governorate: user?.governorate || 'القاهرة',
        stage: user?.stage || 'الثانوية العامة',
        grade: user?.grade || 'الصف الثالث الثانوي',
        track: user?.track || 'علمي علوم',
        nationalId: user?.nationalId || '30401011234567',
    });

    const [courseFilter, setCourseFilter] = useState('all'); // 'all' | 'in_progress' | 'completed'
    const [quizFilter, setQuizFilter] = useState('all'); // 'all' | 'passed' | 'pending' | 'sheets'

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        updateProfile(profileData);
        toast.success('تم تحديث البيانات والمرحلة الدراسية بنجاح!');
    };

    // Real curriculum quizzes list
    const studentQuizzes = [
        {
            id: 'quiz-bio-1',
            title: 'اختبار الأحياء: الدعامة في النبات والتنسيق الهرموني',
            course: 'الأحياء — الصف الثالث الثانوي',
            module: 'الوحدة الأولى',
            questionsCount: 5,
            duration: '10 دقائق',
            score: 5,
            totalScore: 5,
            status: 'passed',
            date: 'منذ يومين',
            courseId: 'secondary-biology',
        },
        {
            id: 'quiz-phys-1',
            title: 'اختبار الفيزياء: قوانين كيرشوف وتوزيع التيار',
            course: 'الفيزياء — الصف الثالث الثانوي',
            module: 'التيار الكهربي',
            questionsCount: 5,
            duration: '12 دقيقة',
            score: 4,
            totalScore: 5,
            status: 'passed',
            date: 'منذ ٤ أيام',
            courseId: 'secondary-physics',
        },
        {
            id: 'quiz-chem-1',
            title: 'اختبار الكيمياء: العناصر الانتقالية وأكاسيد الحديد',
            course: 'الكيمياء — الصف الثالث الثانوي',
            module: 'العناصر الانتقالية',
            questionsCount: 5,
            duration: '8 دقائق',
            score: null,
            totalScore: 5,
            status: 'pending',
            date: 'متاح للحل الآن',
            courseId: 'secondary-chemistry',
        },
        {
            id: 'quiz-math-1',
            title: 'اختبار الرياضيات: مشتقات الدوال المثلثية والمعدلات الزمنية',
            course: 'الرياضيات — الصف الثالث الثانوي',
            module: 'التفاضل والتكامل',
            questionsCount: 5,
            duration: '15 دقيقة',
            score: null,
            totalScore: 5,
            status: 'pending',
            date: 'متاح للحل الآن',
            courseId: 'secondary-math',
        },
        {
            id: 'quiz-arab-1',
            title: 'اختبار اللغة العربية: إعمال المشتقات وفن البلاغة',
            course: 'اللغة العربية — الصف الأول الثانوي',
            module: 'النحو والبلاغة',
            questionsCount: 5,
            duration: '10 دقائق',
            score: 5,
            totalScore: 5,
            status: 'passed',
            date: 'منذ أسبوع',
            courseId: 'secondary-arabic',
        },
    ];

    // Downloadable homework worksheets & summary PDFs
    const homeworkSheets = [
        {
            title: 'مذكرة أسئلة بنك المعرفة وتدريبات الامتحانات — الأحياء',
            stage: 'الصف الثالث الثانوي (علمي علوم)',
            size: '4.2 MB',
            lessons: 'شاملة الفصول ١ و٢',
        },
        {
            title: 'شيت مسائل كيرشوف والدوائر المغلقة مع نماذج الإجابة — الفيزياء',
            stage: 'الصف الثالث الثانوي',
            size: '3.8 MB',
            lessons: 'شاملة الباب الأول',
        },
        {
            title: 'الخرائط الذهنية وتلخيص معادلات الكيمياء العضوية — الكيمياء',
            stage: 'الصف الثالث الثانوي',
            size: '5.1 MB',
            lessons: 'شاملة التحليل العضوي',
        },
        {
            title: 'شيت التطبيقات الأسبوعية ونماذج القراءة المتحررة — اللغة العربية',
            stage: 'المرحلة الثانوية',
            size: '2.9 MB',
            lessons: 'شاملة النحو والبلاغة',
        },
    ];

    return (
        <PortalLayout activeTab={activeTab} onTabChange={handleTabChange} role="student">
            {/* =========================================================
                TAB 1: نظرة عامة (OVERVIEW)
                ========================================================= */}
            {activeTab === 'overview' && (
                <div className="tab-content-fade">
                    <div className="portal-heading">
                        <div className="portal-heading-text">
                            <div className="eyebrow">مساحة الطالب التفاعلية</div>
                            <h1 className="display">أهلًا يا {user?.name || 'سارة أحمد'}، نكمّل؟</h1>
                            <p className="muted">
                                مرحلتك: <strong>{user?.stage || 'الثانوية العامة'}</strong> · {user?.grade || 'الصف الثالث الثانوي'}
                            </p>
                        </div>
                        <div className="portal-date">
                            اليوم: {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            <br />
                            <span>إيقاعك الأسبوعي مستمر بنجاح 🔥</span>
                        </div>
                    </div>

                    {/* Dashboard Metrics Strip */}
                    <div className="student-stats">
                        <div>
                            <span>الكورسات النشطة</span>
                            <strong>{enrolled.length.toLocaleString('ar-EG')}</strong>
                            <small>مسارات قيد التقدّم</small>
                        </div>
                        <div>
                            <span>إجمالي الإنجاز</span>
                            <strong>{progressPercent.toLocaleString('ar-EG')}٪</strong>
                            <small>أعلى من الأسبوع الماضي</small>
                        </div>
                        <div>
                            <span>ساعات التعلّم</span>
                            <strong>١٤.٥</strong>
                            <small>ساعة هذا الأسبوع</small>
                        </div>
                        <div>
                            <span>أيام متتالية</span>
                            <strong>٥</strong>
                            <small>استمر على هذا الإيقاع</small>
                        </div>
                    </div>

                    {/* Next Lesson Recommended Hero Card */}
                    <section className="portal-section split-section" style={{ marginTop: 24 }}>
                        <div className="next-lesson-card">
                            <div className="next-lesson-art">
                                <CirclePlay size={38} />
                            </div>
                            <div>
                                <div className="eyebrow">المحاضرة التالية المقترحة</div>
                                <h3>{lastLesson.title}</h3>
                                <p>من منهج: <strong>{course.title}</strong> · المدة: {lastLesson.duration}</p>
                                <Link href={`/learn/${course.id}`} className="btn btn-primary btn-small" style={{ marginTop: 12 }}>
                                    متابعة المحاضرة الآن <ArrowLeft size={14} />
                                </Link>
                            </div>
                        </div>

                        <div className="activity-card">
                            <div className="portal-section-head">
                                <h3>آخر نشاطاتك</h3>
                                <span className="muted small">هذا الأسبوع</span>
                            </div>

                            <div className="activity-line">
                                <span className="activity-dot coral" />
                                <div>
                                    <strong>إتمام محاضرة الأحياء بنجاح</strong>
                                    <p>الدعامة في النبات والتركيب الخلوي</p>
                                </div>
                                <time>أمس</time>
                            </div>

                            <div className="activity-line">
                                <span className="activity-dot olive" />
                                <div>
                                    <strong>الحصول على درجة كاملة (٥/٥) في اختبار</strong>
                                    <p>اختبار الدعامة والتنسيق الهرموني</p>
                                </div>
                                <time>منذ يومين</time>
                            </div>

                            <div className="activity-line">
                                <span className="activity-dot" style={{ background: 'var(--yellow)' }} />
                                <div>
                                    <strong>تحميل ملخص المراجعة</strong>
                                    <p>مذكرة أسئلة بنك المعرفة في الأحياء</p>
                                </div>
                                <time>منذ ٤ أيام</time>
                            </div>
                        </div>
                    </section>

                    {/* Quick Access to My Courses */}
                    <section className="portal-section" style={{ marginTop: 28 }}>
                        <div className="overview-courses-banner">
                            <div className="overview-courses-info">
                                <div className="eyebrow">مكتبتك التعليمية</div>
                                <h3>لديك {enrolled.length.toLocaleString('ar-EG')} مسارات تعليمية قيد التعلّم</h3>
                                <p className="muted">
                                    استعرض جميع الكورسات المشترك بها، المحاضرات المسجلة، وشيتات المراجعة في صفحة كورساتي.
                                </p>
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => handleTabChange('courses')}
                            >
                                <BookOpen size={16} /> فتح كورساتي ({enrolled.length.toLocaleString('ar-EG')})
                            </button>
                        </div>
                    </section>
                </div>
            )}

            {/* =========================================================
                TAB 2: كورساتي (MY COURSES)
                ========================================================= */}
            {activeTab === 'courses' && (
                <div className="tab-content-fade">
                    <div className="portal-heading">
                        <div>
                            <div className="eyebrow">مساراتك التعليمية المشترَك بها</div>
                            <h1 className="display">كورساتي والمناهج الدراسية</h1>
                            <p className="muted">
                                تابع تقدمك في جميع المواد الدراسية، شاهد المحاضرات، وحمّل المذكرات المرفقة لكل منهج.
                            </p>
                        </div>
                        <Link href="/courses" className="btn btn-primary">
                            استكشاف مواد جديدة <ArrowLeft size={15} />
                        </Link>
                    </div>

                    {/* Filter Pills */}
                    <div className="grade-chips" style={{ margin: '18px 0 24px' }}>
                        <button
                            type="button"
                            className={courseFilter === 'all' ? 'active' : ''}
                            onClick={() => setCourseFilter('all')}
                        >
                            كل الكورسات المشتركة ({enrolled.length.toLocaleString('ar-EG')})
                        </button>
                        <button
                            type="button"
                            className={courseFilter === 'in_progress' ? 'active' : ''}
                            onClick={() => setCourseFilter('in_progress')}
                        >
                            قيد الدراسة والتقدّم (٣)
                        </button>
                        <button
                            type="button"
                            className={courseFilter === 'completed' ? 'active' : ''}
                            onClick={() => setCourseFilter('completed')}
                        >
                            المكتملة والشهادات (١)
                        </button>
                    </div>

                    {/* Enrolled Courses Full Grid */}
                    <div className="student-course-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
                        {enrolled.map((item, index) => {
                            const progressMap = [75, 45, 30, 90];
                            const currentProgress = progressMap[index % progressMap.length];
                            return (
                                <Link href={`/learn/${item.id}`} className="student-course-card" key={item.id}>
                                    <div className="student-course-image">
                                        <img src={item.image} alt={item.title} />
                                        <span>{currentProgress >= 90 ? 'مكتمل تقريبًا' : 'قيد الدراسة'}</span>
                                    </div>
                                    <div className="student-course-body">
                                        <div className="student-course-top">
                                            <span>{item.category}</span>
                                            <span className="student-rating-badge">
                                                <Star size={13} fill="var(--yellow, #efc75e)" color="var(--yellow, #efc75e)" /> {item.rating}
                                            </span>
                                        </div>
                                        <h3>{item.title}</h3>
                                        <p className="student-course-next-lesson">
                                            <Play size={14} /> المعلم: <strong>{item.instructor}</strong>
                                        </p>
                                        <div className="course-progress">
                                            <span style={{ width: `${currentProgress}%` }} />
                                        </div>
                                        <div className="student-course-bottom">
                                            <small>{Math.round((item.lessons * currentProgress) / 100)} من {item.lessons} محاضرة ({currentProgress}٪)</small>
                                            <span className="btn-dashboard-resume">
                                                متابعة المحاضرة <ArrowLeft size={13} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* =========================================================
                TAB 3: الاختبارات والواجبات (QUIZZES & HOMEWORK)
                ========================================================= */}
            {activeTab === 'quizzes' && (
                <div className="tab-content-fade">
                    <div className="portal-heading">
                        <div>
                            <div className="eyebrow">تقييم الفهم والمتابعة الدورية</div>
                            <h1 className="display">الاختبارات والواجبات المدرسية</h1>
                            <p className="muted">
                                بنك الأسئلة والامتحانات التفاعلية بنمط ورقة امتحانات الثانوية العامة والبكالوريا المصرية، مع إمكانية تحميل شيتات الواجب بصيغة PDF.
                            </p>
                        </div>
                    </div>

                    {/* Metrics Strip */}
                    <div className="student-stats" style={{ marginBottom: 24 }}>
                        <div>
                            <span>اختبارات منجزة</span>
                            <strong>٣</strong>
                            <small>تم اجتيازها بنجاح</small>
                        </div>
                        <div>
                            <span>متوسط الدرجات</span>
                            <strong>٩٥٪</strong>
                            <small>مستوى ممتاز (A+)</small>
                        </div>
                        <div>
                            <span>واجبات تم تسليمها</span>
                            <strong>١٢</strong>
                            <small>تم تصحيحها بالكامل</small>
                        </div>
                        <div>
                            <span>مهام متبقية</span>
                            <strong>٢</strong>
                            <small>متاحة للحل الآن</small>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="grade-chips" style={{ marginBottom: 20 }}>
                        <button
                            type="button"
                            className={quizFilter === 'all' ? 'active' : ''}
                            onClick={() => setQuizFilter('all')}
                        >
                            كل الاختبارات والمهام ({studentQuizzes.length.toLocaleString('ar-EG')})
                        </button>
                        <button
                            type="button"
                            className={quizFilter === 'passed' ? 'active' : ''}
                            onClick={() => setQuizFilter('passed')}
                        >
                            اختبارات تم اجتيازها (٣)
                        </button>
                        <button
                            type="button"
                            className={quizFilter === 'pending' ? 'active' : ''}
                            onClick={() => setQuizFilter('pending')}
                        >
                            اختبارات بانتظار الحل (٢)
                        </button>
                        <button
                            type="button"
                            className={quizFilter === 'sheets' ? 'active' : ''}
                            onClick={() => setQuizFilter('sheets')}
                        >
                            شيتات الواجب والـ PDF ({homeworkSheets.length.toLocaleString('ar-EG')})
                        </button>
                    </div>

                    {/* Quizzes List */}
                    {quizFilter !== 'sheets' && (
                        <div className="quizzes-grid" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {studentQuizzes
                                .filter((q) => {
                                    if (quizFilter === 'passed') return q.status === 'passed';
                                    if (quizFilter === 'pending') return q.status === 'pending';
                                    return true;
                                })
                                .map((q) => (
                                    <div
                                        key={q.id}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: 16,
                                            padding: '18px 22px',
                                            borderRadius: 18,
                                            background: 'var(--white)',
                                            border: '1px solid var(--line)',
                                            boxShadow: 'var(--shadow)',
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                            <div
                                                style={{
                                                    display: 'grid',
                                                    placeItems: 'center',
                                                    width: 44,
                                                    height: 44,
                                                    borderRadius: 12,
                                                    background: q.status === 'passed' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(216, 110, 77, 0.12)',
                                                    color: q.status === 'passed' ? '#16a34a' : 'var(--coral-dark)',
                                                    flex: 'none',
                                                }}
                                            >
                                                {q.status === 'passed' ? <CheckCircle2 size={24} /> : <Clock size={22} />}
                                            </div>
                                            <div>
                                                <h3 style={{ margin: '0 0 4px', fontSize: '0.98rem', color: 'var(--ink)' }}>
                                                    {q.title}
                                                </h3>
                                                <div style={{ display: 'flex', gap: 12, fontSize: '0.74rem', color: 'var(--muted)' }}>
                                                    <span>{q.course}</span>
                                                    <span>· {q.questionsCount} أسئلة اختيار من متعدد</span>
                                                    <span>· {q.duration}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                            {q.status === 'passed' ? (
                                                <div style={{ textAlign: 'center' }}>
                                                    <span
                                                        style={{
                                                            display: 'inline-block',
                                                            padding: '4px 10px',
                                                            borderRadius: 999,
                                                            background: 'rgba(34, 197, 94, 0.12)',
                                                            color: '#16a34a',
                                                            fontSize: '0.74rem',
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        الدرجة: {q.score} من {q.totalScore} (١٠٠٪)
                                                    </span>
                                                </div>
                                            ) : (
                                                <span
                                                    style={{
                                                        display: 'inline-block',
                                                        padding: '4px 10px',
                                                        borderRadius: 999,
                                                        background: 'rgba(239, 199, 94, 0.18)',
                                                        color: 'var(--ink)',
                                                        fontSize: '0.74rem',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    متاح للحل الآن
                                                </span>
                                            )}

                                            <Link
                                                href={`/learn/${q.courseId}`}
                                                className={`btn btn-small ${q.status === 'passed' ? 'btn-secondary' : 'btn-primary'}`}
                                            >
                                                {q.status === 'passed' ? 'مراجعة الإجابات' : 'بدء الاختبار الآن'} <ArrowLeft size={13} />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}

                    {/* Downloadable Worksheets Section */}
                    {(quizFilter === 'all' || quizFilter === 'sheets') && (
                        <div style={{ marginTop: 32 }}>
                            <div className="portal-section-head">
                                <div>
                                    <div className="eyebrow">مذكرات وأوراق العمل المرفقة</div>
                                    <h3 style={{ margin: 0, fontSize: '1.15rem' }}>تحميل شيتات التدريب وامتحانات بنك المعرفة</h3>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
                                {homeworkSheets.map((sheet, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: 12,
                                            padding: '16px',
                                            borderRadius: 16,
                                            background: 'var(--white)',
                                            border: '1px solid var(--line)',
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div
                                                style={{
                                                    display: 'grid',
                                                    placeItems: 'center',
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 10,
                                                    background: '#fae6dc',
                                                    color: 'var(--coral-dark)',
                                                    flex: 'none',
                                                }}
                                            >
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--ink)' }}>
                                                    {sheet.title}
                                                </strong>
                                                <small style={{ color: 'var(--muted)', fontSize: '0.67rem' }}>
                                                    {sheet.stage} · {sheet.size}
                                                </small>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className="btn btn-outline btn-small"
                                            onClick={() => toast.success(`جاري تحميل: ${sheet.title}`)}
                                            title="تحميل الملف PDF"
                                        >
                                            <Download size={14} /> تحميل
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* =========================================================
            {/* =========================================================
                TAB 4: بياناتي والمرحلة (PROFILE & STAGE - LOCKED)
                ========================================================= */}
            {activeTab === 'profile' && (
                <div className="tab-content-fade">
                    <div className="profile-heading">
                        <div>
                            <div className="eyebrow">مساحتك وملفك الشخصي</div>
                            <h1 className="display">بيانات الطالب والمرحلة التعليمية</h1>
                            <p className="muted">
                                بطاقة بياناتك الرسمية المسجلة والمعتمدة في منصة نَوَى لتأمين المحاضرات وتوثيق الاختبارات.
                            </p>
                        </div>
                        <div className="profile-avatar">{(user?.name || 'اسلام')[0]}</div>
                    </div>

                    {/* Official Locked Verification Banner */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 14,
                            padding: '16px 20px',
                            borderRadius: 16,
                            background: 'rgba(216, 110, 77, 0.08)',
                            border: '1px solid rgba(216, 110, 77, 0.25)',
                            marginBottom: 24,
                        }}
                    >
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 10,
                                background: '#fae6dc',
                                color: 'var(--coral-dark)',
                                display: 'grid',
                                placeItems: 'center',
                                flex: 'none',
                            }}
                        >
                            <Lock size={20} />
                        </div>
                        <div>
                            <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--ink)', marginBottom: 2 }}>
                                بيانات الحساب موثقة ومقفلة ضد التعديل المباشر
                            </strong>
                            <span style={{ fontSize: '0.74rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                                لحماية حسابك وتوثيق الشهادات ومنع مشاركة الحسابات، لا يمكن تعديل الاسم أو الرقم القومي أو المرحلة يدويًا. للتعديل، يرجى مراسلة الدعم الفني.
                            </span>
                        </div>
                    </div>

                    <div className="profile-card">
                        <div className="profile-card-head">
                            <div>
                                <h2>البيانات الأساسية</h2>
                                <p>معلومات التواصل والتسجيل الرسمي.</p>
                            </div>
                            <span className="profile-saved profile-saved-active" style={{ color: '#16a34a', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.76rem', fontWeight: 700 }}>
                                <ShieldCheck size={16} /> حساب موثق ومعتمد
                            </span>
                        </div>

                        <div className="profile-grid">
                            <label>
                                الاسم بالكامل
                                <div style={{ position: 'relative' }}>
                                    <input
                                        value={user?.name || 'اسلام ياسر'}
                                        readOnly
                                        disabled
                                        style={{ background: 'var(--paper-deep)', cursor: 'not-allowed', color: 'var(--ink)', fontWeight: 600, paddingLeft: 36 }}
                                    />
                                    <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                                </div>
                            </label>

                            <label>
                                البريد الإلكتروني
                                <div style={{ position: 'relative' }}>
                                    <input
                                        value={user?.email || 'eslam@example.com'}
                                        readOnly
                                        disabled
                                        style={{ background: 'var(--paper-deep)', cursor: 'not-allowed', color: 'var(--ink)', fontWeight: 600, paddingLeft: 36 }}
                                    />
                                    <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                                </div>
                            </label>

                            <label>
                                رقم الهاتف المسجل
                                <div style={{ position: 'relative' }}>
                                    <input
                                        value={user?.phone || '01028103634'}
                                        readOnly
                                        disabled
                                        style={{ background: 'var(--paper-deep)', cursor: 'not-allowed', color: 'var(--ink)', fontWeight: 600, paddingLeft: 36 }}
                                    />
                                    <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                                </div>
                            </label>

                            <label>
                                المحافظة
                                <div style={{ position: 'relative' }}>
                                    <input
                                        value={user?.governorate || 'القاهرة'}
                                        readOnly
                                        disabled
                                        style={{ background: 'var(--paper-deep)', cursor: 'not-allowed', color: 'var(--ink)', fontWeight: 600, paddingLeft: 36 }}
                                    />
                                    <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                                </div>
                            </label>
                        </div>

                        <div className="profile-card-head profile-study-head">
                            <div>
                                <h2>النظام والمرحلة التعليمية المعتمدة</h2>
                                <p>النظام الدراسي والصف المخصص لحسابك.</p>
                            </div>
                        </div>

                        <div className="stage-choice profile-stage-choice">
                            {egyptEducationOptions.stages.map((stg) => {
                                const info = egyptEducationOptions.stageMap[stg];
                                const currentStage = user?.stage || 'البكالوريا المصرية';
                                const isActive = currentStage === stg;
                                return (
                                    <div
                                        key={stg}
                                        className={isActive ? 'active' : ''}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 4,
                                            padding: 14,
                                            borderRadius: 14,
                                            border: isActive ? '2px solid var(--coral)' : '1px solid var(--line)',
                                            background: isActive ? '#fff7f2' : 'var(--paper-deep)',
                                            opacity: isActive ? 1 : 0.6,
                                            cursor: 'not-allowed',
                                        }}
                                    >
                                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: isActive ? 'var(--coral-dark)' : 'var(--ink)' }}>
                                            {info.label} {isActive && '✓ (المسار الحالي)'}
                                        </span>
                                        <small style={{ color: 'var(--muted)', fontSize: '0.68rem' }}>{info.description}</small>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="profile-grid">
                            <label>
                                الصف الدراسي
                                <div style={{ position: 'relative' }}>
                                    <input
                                        value={user?.grade || 'الصف الثاني بالبكالوريا'}
                                        readOnly
                                        disabled
                                        style={{ background: 'var(--paper-deep)', cursor: 'not-allowed', color: 'var(--ink)', fontWeight: 600, paddingLeft: 36 }}
                                    />
                                    <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                                </div>
                            </label>

                            <label>
                                الشعبة / المسار
                                <div style={{ position: 'relative' }}>
                                    <input
                                        value={user?.track || 'علمي علوم'}
                                        readOnly
                                        disabled
                                        style={{ background: 'var(--paper-deep)', cursor: 'not-allowed', color: 'var(--ink)', fontWeight: 600, paddingLeft: 36 }}
                                    />
                                    <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                                </div>
                            </label>
                        </div>

                        <div className="profile-grid">
                            <label>
                                رقم هاتف ولي الأمر
                                <div style={{ position: 'relative' }}>
                                    <input
                                        value={user?.guardian || '01090766432'}
                                        readOnly
                                        disabled
                                        style={{ background: 'var(--paper-deep)', cursor: 'not-allowed', color: 'var(--ink)', fontWeight: 600, paddingLeft: 36 }}
                                    />
                                    <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                                </div>
                            </label>

                            <label>
                                الرقم القومي (موثق)
                                <div style={{ position: 'relative' }}>
                                    <input
                                        value={user?.nationalId || '30401011234567'}
                                        readOnly
                                        disabled
                                        style={{ background: 'var(--paper-deep)', cursor: 'not-allowed', color: 'var(--ink)', fontWeight: 600, paddingLeft: 36 }}
                                    />
                                    <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                                </div>
                            </label>
                        </div>

                        <div className="profile-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
                            <a
                                href="https://wa.me/201028103634?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AA%D8%B9%D8%AF%D9%8A%D9%84%20%D8%A8%D9%8A%D8%A7%D9%86%D8%A7%D8%AA%D9%8A%20%D8%B9%D9%84%D9%89%20%D9%85%D9%86%D8%B5%D8%A9%20%D9%86%D9%8E%D9%88%D9%8E%D9%89"
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-outline"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.82rem' }}
                            >
                                <AlertCircle size={15} /> طلب تعديل البيانات عبر الدعم الفني
                            </a>

                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => handleTabChange('overview')}
                            >
                                العودة إلى نظرة عامة <ArrowLeft size={15} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </PortalLayout>
    );
};

export default StudentDashboardPage;
