import React, { useState, useEffect } from 'react';
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
import { courses, egyptEducationOptions } from '@/lib/data';
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
    const { modules, completedLessons, quizAnswers } = useLearning();

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

    // Enrolled courses
    const enrolled = [courses[0], courses[1], courses[2], courses[3]];
    const course = enrolled[0];
    const lastLesson = modules[0]?.lessons[1] ?? modules[0]?.lessons[0] ?? { title: 'الدعامة في النبات والتركيب الخلوي', duration: '20:00' };
    const totalCompleted = completedLessons.length || 6;
    const progressPercent = Math.min(100, Math.round((totalCompleted / (course.lessons || 36)) * 100) || 75);

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
        <PortalLayout activeTab={activeTab} role="student">
            {/* =========================================================
                TAB 1: نظرة عامة (OVERVIEW)
                ========================================================= */}
            {activeTab === 'overview' && (
                <div className="tab-content-fade">
                    <div className="portal-heading">
                        <div className="portal-heading-text">
                            <div className="eyebrow">مساحة الطالب التفاعلية</div>
                            <h1 className="display">أهلًا يا {user?.name || 'اسلام'}، نكمّل؟</h1>
                            <p className="muted">
                                مرحلتك: <strong>{user?.stage || 'البكالوريا المصرية'}</strong> · {user?.grade || 'الصف الثاني بالبكالوريا'}
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

                    {/* Quick Enrolled Courses Preview */}
                    <section className="portal-section" style={{ marginTop: 28 }}>
                        <div className="portal-section-head">
                            <div>
                                <div className="eyebrow">المسارات الدراسية النشطة</div>
                                <h2 className="section-title" style={{ fontSize: '1.4rem' }}>كورساتي الحالية</h2>
                            </div>
                            <button
                                type="button"
                                className="link-arrow"
                                onClick={() => handleTabChange('courses')}
                            >
                                عرض كل الكورسات ({enrolled.length.toLocaleString('ar-EG')}) <ArrowLeft size={14} />
                            </button>
                        </div>

                        <div className="student-course-grid">
                            {enrolled.slice(0, 2).map((item, index) => {
                                const currentProgress = index === 0 ? progressPercent : 45;
                                return (
                                    <article className="student-course-card" key={item.id}>
                                        <div className="student-course-image">
                                            <img src={item.image} alt={item.title} />
                                            <span>{index === 0 ? 'قيد التعلّم النشط' : 'مستمر'}</span>
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
                                                <Play size={14} /> {index === 0 ? lastLesson.title : 'قوانين كيرشوف واستراتيجيات الحل'}
                                            </p>
                                            <div className="course-progress">
                                                <span style={{ width: `${currentProgress}%` }} />
                                            </div>
                                            <div className="student-course-bottom">
                                                <small>{Math.round((item.lessons * currentProgress) / 100)} من {item.lessons} محاضرة</small>
                                                <Link href={`/learn/${item.id}`} className="btn btn-primary btn-small">
                                                    متابعة التعلّم <ArrowLeft size={13} />
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
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
                                <article className="student-course-card" key={item.id}>
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
                                            <Link href={`/learn/${item.id}`} className="btn btn-primary btn-small">
                                                متابعة المحاضرة <ArrowLeft size={13} />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
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
                                بنك الأسئلة والامتحانات التفاعلية بنمط ورقة امتحانات الثانوية العامة والإعدادية، مع إمكانية تحميل شيتات الواجب بصيغة PDF.
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
                TAB 4: بياناتي والمرحلة (PROFILE & STAGE)
                ========================================================= */}
            {activeTab === 'profile' && (
                <div className="tab-content-fade">
                    <div className="profile-heading">
                        <div>
                            <div className="eyebrow">مساحتك وملفك الشخصي</div>
                            <h1 className="display">بياناتي والمرحلة الدراسية</h1>
                            <p className="muted">
                                حدد مرحلتك الدراسية وصفك لضبط مقترحات الدروس والاختبارات على قياسك.
                            </p>
                        </div>
                        <div className="profile-avatar">{(profileData.name || 'س')[0]}</div>
                    </div>

                    <form className="profile-card" onSubmit={handleProfileSubmit}>
                        <div className="profile-card-head">
                            <div>
                                <h2>البيانات الشخصية</h2>
                                <p>الاسم والرقم القومي للتأمين ومنع تسريب المحاضرات.</p>
                            </div>
                        </div>

                        <div className="profile-grid">
                            <label>
                                الاسم بالكامل
                                <input
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    required
                                />
                            </label>

                            <label>
                                البريد الإلكتروني
                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    required
                                />
                            </label>

                            <label>
                                رقم الهاتف
                                <input
                                    value={profileData.phone}
                                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                    placeholder="01X XXX XXXX"
                                />
                            </label>

                            <label>
                                الرقم القومي
                                <input
                                    value={profileData.nationalId}
                                    onChange={(e) => setProfileData({ ...profileData, nationalId: e.target.value })}
                                    placeholder="١٤ رقمًا"
                                    required
                                />
                            </label>
                        </div>

                        <div className="profile-card-head profile-study-head">
                            <div>
                                <h2>النظام والمرحلة التعليمية في مصر</h2>
                                <p>اختر نظامك الدراسي، وستتحدّث المقترحات التلقائية.</p>
                            </div>
                        </div>

                        <div className="stage-choice profile-stage-choice">
                            {egyptEducationOptions.stages.map((stg) => {
                                const info = egyptEducationOptions.stageMap[stg];
                                const isActive = profileData.stage === stg;
                                return (
                                    <button
                                        key={stg}
                                        type="button"
                                        className={isActive ? 'active' : ''}
                                        onClick={() => {
                                            const stageInfo = egyptEducationOptions.stageMap[stg];
                                            setProfileData({
                                                ...profileData,
                                                stage: stg,
                                                grade: stageInfo.grades[0],
                                                track: stageInfo.tracks[0],
                                            });
                                        }}
                                    >
                                        <span>{info.label}</span>
                                        <small>{info.description}</small>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="profile-grid">
                            <label>
                                الصف الدراسي
                                <select
                                    value={profileData.grade}
                                    onChange={(e) => setProfileData({ ...profileData, grade: e.target.value })}
                                >
                                    {(egyptEducationOptions.stageMap[profileData.stage]?.grades || []).map((item) => (
                                        <option key={item}>{item}</option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                الشعبة / المسار
                                <select
                                    value={profileData.track}
                                    onChange={(e) => setProfileData({ ...profileData, track: e.target.value })}
                                >
                                    {(egyptEducationOptions.stageMap[profileData.stage]?.tracks || []).map((item) => (
                                        <option key={item}>{item}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className="profile-actions">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => handleTabChange('overview')}
                            >
                                إلغاء والعودة
                            </button>
                            <button className="btn btn-primary" type="submit">
                                حفظ التغييرات <Check size={15} />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </PortalLayout>
    );
};

export default StudentDashboardPage;
