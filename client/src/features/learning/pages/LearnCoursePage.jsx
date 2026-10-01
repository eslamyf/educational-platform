import React, { useEffect, useRef, useState } from 'react';
import { useRoute, useLocation, Link } from 'wouter';
import {
    ChevronLeft,
    CheckCircle2,
    Check,
    Clock3,
    Video,
    Play,
    LockKeyhole,
    ArrowRight,
    ArrowLeft,
    FolderOpen,
    ChevronDown,
    Sparkles,
    ShieldCheck,
    X,
    Lock,
} from 'lucide-react';
import { PortalHeader } from '@/components/layout/PortalHeader';
import { Header } from '@/components/layout/Header';
import { VideoPlayer } from '@/features/learning/components/VideoPlayer';
import { LessonQuiz } from '@/features/learning/components/LessonQuiz';
import { LessonAttachments } from '@/features/learning/components/LessonAttachments';
import { useAuth } from '@/hooks/useAuth';
import { useLearning } from '@/hooks/useLearning';
import { courses, formatPrice } from '@/lib/data';
import { toast } from 'sonner';

export const LearnCoursePage = () => {
    const { isAuthenticated, user } = useAuth();
    const [, setLocation] = useLocation();
    const [, params] = useRoute('/learn/:id');
    const courseId = params?.id || 'secondary-biology';

    const {
        getCourseById,
        getCourseModules,
        modules: defaultModules,
        quizAnswers,
        markVideoWatched,
        completeLesson,
        isLessonCompleted,
        isVideoWatched,
        isCourseEnrolled,
        saveLessonNote,
        getLessonNote,
    } = useLearning();

    const course = getCourseById(courseId);
    const isEnrolled = isCourseEnrolled ? isCourseEnrolled(course.id) : false;
    const modules = getCourseModules ? getCourseModules(course.id) : defaultModules;

    const [moduleIndex, setModuleIndex] = useState(0);
    const [lessonIndex, setLessonIndex] = useState(0);
    const [expandedModuleIndex, setExpandedModuleIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');
    const [lockedModalLesson, setLockedModalLesson] = useState(null);
    const autoAdvanceForRef = useRef(null);

    const activeModule = modules[moduleIndex] ?? modules[0];
    const activeLesson = activeModule?.lessons[lessonIndex] ?? activeModule?.lessons[0];

    const allLessons = modules.flatMap((mod, modIdx) =>
        mod.lessons.map((les, lesIdx) => ({
            lesson: les,
            moduleIndex: modIdx,
            lessonIndex: lesIdx,
            moduleTitle: mod.title,
            id: `${user?.email?.toLowerCase() || 'guest'}:${course.id}:${modIdx}:${lesIdx}`,
        }))
    );

    const currentLessonPos = allLessons.findIndex(
        (item) => item.lesson.title === activeLesson?.title
    );
    const prevLessonItem = allLessons[currentLessonPos - 1];
    const nextLessonItem = allLessons[currentLessonPos + 1];

    const selectLesson = (targetModuleIdx, targetLessonIdx) => {
        const targetPos = allLessons.findIndex(
            (item) => item.moduleIndex === targetModuleIdx && item.lessonIndex === targetLessonIdx
        );

        // If not enrolled and not the free lecture 1
        if (!isEnrolled && targetPos > 0) {
            const targetLes = modules[targetModuleIdx]?.lessons[targetLessonIdx];
            setLockedModalLesson(targetLes || { title: 'محاضرة مقفلة' });
            return;
        }

        // If enrolled but previous not completed
        if (isEnrolled && targetPos > 0 && !isLessonCompleted(allLessons[targetPos - 1].id)) {
            toast.info('أكمل الفيديو ومهمة الدرس السابق أولًا لفتح هذه المحاضرة');
            return;
        }

        setModuleIndex(targetModuleIdx);
        setLessonIndex(targetLessonIdx);
        setExpandedModuleIndex(targetModuleIdx);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const activeLessonId = allLessons[currentLessonPos]?.id ?? '';
    const isCompleted = activeLesson && isEnrolled ? isLessonCompleted(activeLessonId) : false;
    const videoWatched = activeLesson ? isVideoWatched(activeLessonId) : false;
    const quizPassed = !activeLesson?.quiz || quizAnswers[activeLessonId] === activeLesson.quiz.correct;
    const canCompleteLesson = videoWatched && quizPassed;
    const completedCount = allLessons.filter((item) => isLessonCompleted(item.id)).length;
    const totalLessonsCount = allLessons.length || course.lessons;
    const progressPercent = isEnrolled
        ? Math.min(100, Math.round((completedCount / totalLessonsCount) * 100))
        : 5;

    useEffect(() => {
        if (!isAuthenticated || !isEnrolled || !activeLessonId || !canCompleteLesson || isCompleted)
            return;
        if (autoAdvanceForRef.current === activeLessonId) return;
        autoAdvanceForRef.current = activeLessonId;
        completeLesson(activeLessonId);
        if (nextLessonItem) {
            setModuleIndex(nextLessonItem.moduleIndex);
            setLessonIndex(nextLessonItem.lessonIndex);
            setExpandedModuleIndex(nextLessonItem.moduleIndex);
            setActiveTab('overview');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [
        isAuthenticated,
        isEnrolled,
        activeLessonId,
        canCompleteLesson,
        isCompleted,
        completeLesson,
        nextLessonItem,
    ]);

    return (
        <div className="learn-page">
            {isAuthenticated ? <PortalHeader role="student" /> : <Header />}

            {/* Preview Banner for Unenrolled Visitors */}
            {!isEnrolled && (
                <div className="learn-preview-banner">
                    <div className="container learn-preview-container">
                        <div className="learn-preview-info">
                            <span className="learn-preview-pill">
                                <Sparkles size={13} /> وضع المعاينة المجانية
                            </span>
                            <span className="learn-preview-text">
                                تشاهد الآن المحاضرة المجانية الأولى. اشترك لفتح كافة محاضرات المسار ({totalLessonsCount} محاضرة) وبنك الأسئلة والملفات.
                            </span>
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary learn-preview-cta"
                            onClick={() => setLocation(`/checkout?course=${course.id}`)}
                        >
                            اشترك في المسار الآن ({formatPrice(course.price)})
                            <ArrowLeft size={15} />
                        </button>
                    </div>
                </div>
            )}

            <div className="learn-layout container">
                {/* Main Content Area */}
                <main className="learn-main">
                    {/* Breadcrumb */}
                    <div className="learn-breadcrumb">
                        <Link href="/courses">الكورسات</Link>
                        <ChevronLeft size={13} />
                        <Link href={`/course/${course.id}`}>{course.shortTitle}</Link>
                        <ChevronLeft size={13} />
                        <span>{activeLesson?.title}</span>
                    </div>

                    {/* Video Player */}
                    {activeLesson && (
                        <VideoPlayer
                            lesson={activeLesson}
                            moduleTitle={activeModule.title}
                            posterImage={course.image}
                            lessonId={activeLessonId}
                            isWatched={videoWatched}
                            studentName={user?.name || 'زائر منصة نَوَى'}
                            studentNationalId={user?.nationalId || '30401011234567'}
                            onWatched={() => markVideoWatched(activeLessonId)}
                        />
                    )}

                    {/* Title & Complete Action Row */}
                    <div className="learn-title-row">
                        <div>
                            <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span>المحاضرة {String(currentLessonPos + 1).padStart(2, '0')} من {totalLessonsCount}</span>
                                {!isEnrolled && currentLessonPos === 0 && (
                                    <span
                                        style={{
                                            background: '#ecfdf5',
                                            color: '#059669',
                                            border: '1px solid #a7f3d0',
                                            padding: '2px 8px',
                                            borderRadius: '999px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                        }}
                                    >
                                        مجاني للجميع
                                    </span>
                                )}
                            </div>
                            <h1 className="display">{activeLesson?.title}</h1>
                            <p className="muted">
                                {course.title} · تقديم: {course.instructor}
                            </p>
                        </div>

                        {activeLesson && (
                            isEnrolled ? (
                                <button
                                    type="button"
                                    className={`complete-btn ${isCompleted ? 'done' : ''}`}
                                    disabled={isCompleted || !canCompleteLesson}
                                    onClick={() => completeLesson(activeLessonId)}
                                >
                                    {isCompleted ? <CheckCircle2 size={17} /> : <Check size={17} />}
                                    {isCompleted
                                        ? 'مكتملة ومحفوظة'
                                        : !videoWatched
                                        ? 'شاهد الفيديو بالكامل'
                                        : !quizPassed
                                        ? 'أجب عن المهمة لفتح التالي'
                                        : 'إكمال الدرس وفتح التالي'}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setLocation(`/checkout?course=${course.id}`)}
                                >
                                    اشترك لفتح كامل المسار <ArrowLeft size={16} />
                                </button>
                            )
                        )}
                    </div>

                    {/* Learn Tabs */}
                    <div className="learn-tabs">
                        <button
                            type="button"
                            className={activeTab === 'overview' ? 'active' : ''}
                            onClick={() => setActiveTab('overview')}
                        >
                            نظرة المحاضرة
                        </button>
                        <button
                            type="button"
                            className={activeTab === 'resources' ? 'active' : ''}
                            onClick={() => setActiveTab('resources')}
                        >
                            الملفات والاختبار {activeLesson?.quiz ? '· كويز متاح' : ''}
                        </button>
                        <button
                            type="button"
                            className={activeTab === 'notes' ? 'active' : ''}
                            onClick={() => setActiveTab('notes')}
                        >
                            ملاحظاتي الدراسية
                        </button>
                    </div>

                    {/* Tab 1: Lesson Overview */}
                    {activeTab === 'overview' && (
                        <section className="lesson-overview">
                            <h2>عن هذه المحاضرة</h2>
                            <p>
                                في هذه الجلسة نضع البوصلة التأسيسية: نفهم الإطار النظري، نحدد المشكلة بدقة، ونطبق على أمثلة عملية واضحة لتثبيت المعلومة وضمان التفوق في الامتحانات.
                            </p>
                            <div className="lesson-insights">
                                <span>
                                    <Clock3 size={15} /> المدة: {activeLesson?.duration}
                                </span>
                                <span>
                                    <Video size={15} /> جودة الفيديو: HD عالية الوضوح
                                </span>
                                <span>
                                    <CheckCircle2 size={15} /> الحالة: {!isEnrolled ? 'محاضرة مجانية' : isCompleted ? 'مكتملة' : videoWatched ? 'الفيديو مكتمل' : 'قيد التعلّم'}
                                </span>
                            </div>
                        </section>
                    )}

                    {/* Tab 2: Resources & Quiz */}
                    {activeTab === 'resources' && (
                        <section className="lesson-resources" id="learn-files">
                            <div className="portal-section-head">
                                <div>
                                    <div className="eyebrow">المواد التدريبية المرافقة</div>
                                    <h2 className="section-title">ملفات المحاضرة</h2>
                                </div>
                            </div>

                            <LessonAttachments files={activeLesson?.files} />

                            {activeLesson?.quiz && (
                                <div style={{ marginTop: 32 }}>
                                    <LessonQuiz
                                        key={activeLessonId}
                                        quiz={activeLesson.quiz}
                                        lessonId={activeLessonId}
                                        disabled={!videoWatched}
                                    />
                                </div>
                            )}
                        </section>
                    )}

                    {/* Tab 3: Student Study Notes */}
                    {activeTab === 'notes' && (
                        <section className="lesson-resources">
                            <div className="portal-section-head">
                                <div>
                                    <div className="eyebrow">دفتر الملاحظات الرقمي</div>
                                    <h2 className="section-title">ملاحظاتك الخاصة بهذه المحاضرة</h2>
                                </div>
                            </div>

                            <div className="lesson-notes-editor">
                                <p className="muted small">
                                    تُحفظ ملاحظاتك تلقائيًا على هذا الجهاز لترجع إليها وقت المراجعة النهائية.
                                </p>
                                <textarea
                                    rows={6}
                                    defaultValue={getLessonNote(activeLessonId)}
                                    key={activeLessonId}
                                    onBlur={(e) => saveLessonNote(activeLessonId, e.target.value)}
                                    placeholder="اكتب النقاط المهمة، القوانين، والملاحظات التي ركز عليها المعلم أثناء الشرح..."
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        borderRadius: '16px',
                                        border: '1px solid var(--line)',
                                        background: 'var(--white)',
                                        fontSize: '0.95rem',
                                        fontFamily: 'inherit',
                                        lineHeight: 1.7,
                                        resize: 'vertical',
                                    }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary btn-small"
                                    style={{ marginTop: 12 }}
                                    onClick={(e) => {
                                        const ta = e.currentTarget.previousElementSibling;
                                        if (ta) saveLessonNote(activeLessonId, ta.value);
                                    }}
                                >
                                    حفظ الملاحظة
                                </button>
                            </div>
                        </section>
                    )}

                    {/* Previous / Next Lesson Footer Nav */}
                    <div className="learn-next">
                        <button
                            type="button"
                            disabled={!prevLessonItem}
                            onClick={() => {
                                if (prevLessonItem) {
                                    selectLesson(prevLessonItem.moduleIndex, prevLessonItem.lessonIndex);
                                }
                            }}
                        >
                            <ArrowRight size={15} /> المحاضرة السابقة
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                if (!isEnrolled) {
                                    setLockedModalLesson(nextLessonItem?.lesson || { title: 'المحاضرة التالية' });
                                } else if (nextLessonItem && isCompleted) {
                                    selectLesson(nextLessonItem.moduleIndex, nextLessonItem.lessonIndex);
                                }
                            }}
                            disabled={isEnrolled && (!nextLessonItem || !isCompleted)}
                        >
                            {isEnrolled ? 'المحاضرة التالية' : 'المحاضرة التالية (مقفلة للمشتركين)'}
                            <ArrowLeft size={15} />
                        </button>
                    </div>
                </main>

                {/* Sidebar: Course Curriculum Navigation */}
                <aside className="learn-sidebar">
                    <div className="learn-sidebar-head">
                        <div>
                            <span className="eyebrow">{isEnrolled ? 'مسار التعلّم' : 'وضع المعاينة'}</span>
                            <h2>{course.shortTitle}</h2>
                        </div>
                        <span className="learn-progress-number">
                            {isEnrolled ? `${progressPercent}٪` : '١ مجاني'}
                        </span>
                    </div>

                    <div className="learn-progress">
                        <span style={{ width: `${progressPercent}%` }} />
                    </div>

                    <p className="learn-progress-copy">
                        {isEnrolled
                            ? `${completedCount} من ${totalLessonsCount} درسًا مكتملًا`
                            : `محاضرة 1 مفتوحة مجانًا · ${totalLessonsCount - 1} محاضرة مقفلة للمشتركين`}
                    </p>

                    <div className="learn-module-list">
                        {modules.map((mod, modIdx) => {
                            const isExpanded = expandedModuleIndex === modIdx;
                            return (
                                <div className={`learn-module ${isExpanded ? 'expanded' : ''}`} key={mod.title}>
                                    <button
                                        type="button"
                                        className="learn-module-title"
                                        aria-expanded={isExpanded}
                                        onClick={() =>
                                            setExpandedModuleIndex(isExpanded ? -1 : modIdx)
                                        }
                                    >
                                        <span className="learn-module-idx">{String(modIdx + 1).padStart(2, '0')}</span>
                                        <div className="learn-module-name-wrap">
                                            <strong>{mod.title}</strong>
                                            <small>{mod.lessons.length} دروس</small>
                                        </div>
                                        <ChevronDown size={15} className="learn-module-chevron" />
                                    </button>

                                    {isExpanded && (
                                        <div className="learn-module-lessons">
                                            {mod.lessons.map((les, lesIdx) => {
                                                const isCurrent =
                                                    moduleIndex === modIdx && lessonIndex === lesIdx;
                                                const lessonPosition = allLessons.findIndex(
                                                    (item) =>
                                                        item.moduleIndex === modIdx &&
                                                        item.lessonIndex === lesIdx
                                                );
                                                const lId = allLessons[lessonPosition]?.id ?? '';
                                                const isDone = isEnrolled && isLessonCompleted(lId);
                                                const isFreeLecture = lessonPosition === 0;
                                                const isUnlocked = isEnrolled
                                                    ? lessonPosition === 0 ||
                                                      isLessonCompleted(
                                                          allLessons[lessonPosition - 1]?.id ?? ''
                                                      )
                                                    : isFreeLecture;

                                                return (
                                                    <button
                                                        type="button"
                                                        className={`learn-lesson ${
                                                            isCurrent ? 'current' : ''
                                                        } ${isDone ? 'completed' : ''} ${
                                                            !isUnlocked ? 'locked' : ''
                                                        }`}
                                                        key={les.title}
                                                        onClick={() => selectLesson(modIdx, lesIdx)}
                                                        title={
                                                            !isUnlocked
                                                                ? !isEnrolled
                                                                    ? 'هذه المحاضرة مقفلة للمشتركين فقط'
                                                                    : 'أكمل الدرس السابق أولاً لفتح هذه المحاضرة'
                                                                : les.title
                                                        }
                                                    >
                                                        <span
                                                            className={`learn-lesson-badge ${
                                                                isDone
                                                                    ? 'status-done'
                                                                    : isCurrent
                                                                    ? 'status-playing'
                                                                    : isUnlocked
                                                                    ? 'status-unlocked'
                                                                    : 'status-locked'
                                                            }`}
                                                        >
                                                            {isDone ? (
                                                                <CheckCircle2 size={15} />
                                                            ) : isCurrent ? (
                                                                <Play size={12} fill="currentColor" />
                                                            ) : isUnlocked ? (
                                                                <Play size={12} fill="currentColor" />
                                                            ) : (
                                                                <LockKeyhole size={13} />
                                                            )}
                                                        </span>
                                                        <div className="learn-lesson-info">
                                                            <div className="learn-lesson-text">
                                                                <span className="learn-lesson-title">
                                                                    {les.title}
                                                                </span>
                                                                {isFreeLecture && !isEnrolled && (
                                                                    <span className="learn-free-badge">
                                                                        <Sparkles size={11} /> مجاني
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="learn-lesson-time">
                                                                {les.duration}
                                                            </span>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {!isEnrolled && (
                        <div style={{ padding: '16px', borderTop: '1px solid var(--line)', background: '#faf8f5' }}>
                            <button
                                type="button"
                                className="btn btn-primary btn-wide"
                                onClick={() => setLocation(`/checkout?course=${course.id}`)}
                            >
                                اشترك لفتح كل المحاضرات <ArrowLeft size={15} />
                            </button>
                        </div>
                    )}

                    <div className="learn-sidebar-footer">
                        <FolderOpen size={15} /> جميع الملفات والأنشطة متاحة داخل الدروس
                    </div>
                </aside>
            </div>

            {/* Locked Lesson Subscription Prompt Modal */}
            {lockedModalLesson && (
                <div
                    className="preview-modal-backdrop"
                    onClick={() => setLockedModalLesson(null)}
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className="preview-modal-box"
                        style={{ maxWidth: 520, padding: 32, textAlign: 'center' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            style={{
                                width: 56,
                                height: 56,
                                borderRadius: '50%',
                                background: '#fef2f2',
                                color: '#ef4444',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 16px',
                                border: '1px solid #fecaca',
                            }}
                        >
                            <Lock size={26} />
                        </div>

                        <h2 style={{ fontSize: '1.4rem', marginBottom: 8, color: 'var(--ink)' }}>
                            هذه المحاضرة مقفلة للمشتركين
                        </h2>
                        <strong style={{ display: 'block', fontSize: '1.05rem', color: '#b84c24', marginBottom: 12 }}>
                            «{lockedModalLesson.title}»
                        </strong>
                        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 24 }}>
                            أنت الآن في وضع المعاينة وتستمتع بالمحاضرة المجانية الأولى. للحصول على وصول كامل لجميع دروس المسار الـ ({totalLessonsCount} درس)، حل الاختبارات، وتحميل بنك الأسئلة والملفات، يرجى الاشتراك في المسار.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <button
                                type="button"
                                className="btn btn-primary btn-wide"
                                style={{ padding: '12px 20px', fontSize: '1rem' }}
                                onClick={() => {
                                    setLockedModalLesson(null);
                                    setLocation(`/checkout?course=${course.id}`);
                                }}
                            >
                                اشترك في المسار الآن ({formatPrice(course.price)}) <ArrowLeft size={16} />
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline btn-wide"
                                onClick={() => setLockedModalLesson(null)}
                            >
                                متابعة مشاهدة المحاضرة المجانية
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LearnCoursePage;
