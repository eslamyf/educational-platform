import React, { useEffect, useRef, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { ChevronLeft, CheckCircle2, Check, Clock3, Video, Play, LockKeyhole, ArrowRight, ArrowLeft, FolderOpen, ChevronDown, } from 'lucide-react';
import { PortalHeader } from '@/components/layout/PortalHeader';
import { PortalGate } from '@/components/layout/PortalLayout';
import { VideoPlayer } from '@/features/learning/components/VideoPlayer';
import { LessonQuiz } from '@/features/learning/components/LessonQuiz';
import { LessonAttachments } from '@/features/learning/components/LessonAttachments';
import { useAuth } from '@/hooks/useAuth';
import { useLearning } from '@/hooks/useLearning';
import { courses } from '@/lib/data';
import { toast } from 'sonner';
export const LearnCoursePage = () => {
    const { isAuthenticated, user } = useAuth();
    const [, params] = useRoute('/learn/:id');
    const courseId = params?.id || 'creative-strategy';
    const course = courses.find((item) => item.id === courseId) ?? courses[0];
    const { modules, quizAnswers, markVideoWatched, completeLesson, isLessonCompleted, isVideoWatched, } = useLearning();
    const [moduleIndex, setModuleIndex] = useState(0);
    const [lessonIndex, setLessonIndex] = useState(0);
    const [expandedModuleIndex, setExpandedModuleIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');
    const autoAdvanceForRef = useRef(null);
    const activeModule = modules[moduleIndex] ?? modules[0];
    const activeLesson = activeModule?.lessons[lessonIndex] ?? activeModule?.lessons[0];
    const allLessons = modules.flatMap((mod, modIdx) => mod.lessons.map((les, lesIdx) => ({
        lesson: les,
        moduleIndex: modIdx,
        lessonIndex: lesIdx,
        moduleTitle: mod.title,
        id: `${user?.email?.toLowerCase() || 'student'}:${course.id}:${modIdx}:${lesIdx}`,
    })));
    const currentLessonPos = allLessons.findIndex((item) => item.lesson.title === activeLesson?.title);
    const prevLessonItem = allLessons[currentLessonPos - 1];
    const nextLessonItem = allLessons[currentLessonPos + 1];
    const selectLesson = (targetModuleIdx, targetLessonIdx) => {
        const target = allLessons.findIndex((item) => item.moduleIndex === targetModuleIdx && item.lessonIndex === targetLessonIdx);
        if (target > 0 && !isLessonCompleted(allLessons[target - 1].id)) {
            toast.info('أكمل الفيديو ومهمة الدرس السابق أولًا لفتح هذه المحاضرة');
            return;
        }
        setModuleIndex(targetModuleIdx);
        setLessonIndex(targetLessonIdx);
        setExpandedModuleIndex(targetModuleIdx);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const activeLessonId = allLessons[currentLessonPos]?.id ?? '';
    const isCompleted = activeLesson ? isLessonCompleted(activeLessonId) : false;
    const videoWatched = activeLesson ? isVideoWatched(activeLessonId) : false;
    const quizPassed = !activeLesson?.quiz || quizAnswers[activeLessonId] === activeLesson.quiz.correct;
    const canCompleteLesson = videoWatched && quizPassed;
    const completedCount = allLessons.filter((item) => isLessonCompleted(item.id)).length;
    const totalLessonsCount = allLessons.length || course.lessons;
    const progressPercent = Math.min(100, Math.round((completedCount / totalLessonsCount) * 100));
    useEffect(() => {
        if (!isAuthenticated || !activeLessonId || !canCompleteLesson || isCompleted)
            return;
        if (autoAdvanceForRef.current === activeLessonId)
            return;
        autoAdvanceForRef.current = activeLessonId;
        completeLesson(activeLessonId);
        if (nextLessonItem) {
            setModuleIndex(nextLessonItem.moduleIndex);
            setLessonIndex(nextLessonItem.lessonIndex);
            setExpandedModuleIndex(nextLessonItem.moduleIndex);
            setActiveTab('overview');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [isAuthenticated, activeLessonId, canCompleteLesson, isCompleted, completeLesson, nextLessonItem]);
    if (!isAuthenticated) {
        return <PortalGate />;
    }
    return (<div className="learn-page">
      <PortalHeader role="student"/>

      <div className="learn-layout container">
        {/* Main Content Area */}
        <main className="learn-main">
          {/* Breadcrumb */}
          <div className="learn-breadcrumb">
            <Link href="/dashboard">لوحة الطالب</Link>
            <ChevronLeft size={13}/>
            <span>{course.shortTitle}</span>
          </div>

          {/* Video Player */}
          {activeLesson && (<VideoPlayer lesson={activeLesson} moduleTitle={activeModule.title} posterImage={course.image} lessonId={activeLessonId} isWatched={videoWatched} studentName={user?.name || 'طالب نَوَى'} studentNationalId={user?.nationalId || ''} onWatched={() => markVideoWatched(activeLessonId)}/>)}

          {/* Title & Complete Action Row */}
          <div className="learn-title-row">
            <div>
              <div className="eyebrow">
                المحاضرة {String(currentLessonPos + 1).padStart(2, '0')} من {totalLessonsCount}
              </div>
              <h1 className="display">{activeLesson?.title}</h1>
              <p className="muted">
                {course.title} · تقديم: {course.instructor}
              </p>
            </div>

            {activeLesson && (<button type="button" className={`complete-btn ${isCompleted ? 'done' : ''}`} disabled={isCompleted || !canCompleteLesson} onClick={() => completeLesson(activeLessonId)}>
                {isCompleted ? <CheckCircle2 size={17}/> : <Check size={17}/>}
                {isCompleted
                ? 'مكتملة ومحفوظة'
                : !videoWatched
                    ? 'شاهد الفيديو بالكامل'
                    : !quizPassed
                        ? 'أجب عن المهمة لفتح التالي'
                        : 'إكمال الدرس وفتح التالي'}
              </button>)}
          </div>

          {/* Learn Tabs */}
          <div className="learn-tabs">
            <button type="button" className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
              نظرة المحاضرة
            </button>
            <button type="button" className={activeTab === 'resources' ? 'active' : ''} onClick={() => setActiveTab('resources')}>
              الملفات والاختبار {activeLesson?.quiz ? '· كويز متاح' : ''}
            </button>
          </div>

          {/* Tab 1: Lesson Overview */}
          {activeTab === 'overview' && (<>
              <section className="lesson-overview">
                <h2>عن هذه المحاضرة</h2>
                <p>
                  في هذه الجلسة نضع البوصلة التأسيسية: نفهم الإطار النظري، نحدد المشكلة بدقة، ونطبق على أمثلة عملية واضحة لتثبيت المعلومة.
                </p>
                <div className="lesson-insights">
                  <span>
                    <Clock3 size={15}/> المدة: {activeLesson?.duration}
                  </span>
                  <span>
                    <Video size={15}/> جودة الفيديو: HD عالية الوضوح
                  </span>
                  <span>
                    <CheckCircle2 size={15}/> الحالة: {isCompleted ? 'مكتملة' : videoWatched ? 'الفيديو مكتمل' : 'قيد التعلّم'}
                  </span>
                </div>
              </section>

            </>)}

          {/* Tab 2: Resources & Quiz */}
          {activeTab === 'resources' && (<section className="lesson-resources" id="learn-files">
              <div className="portal-section-head">
                <div>
                  <div className="eyebrow">المواد التدريبية المرافقة</div>
                  <h2 className="section-title">ملفات المحاضرة</h2>
                </div>
              </div>

              <LessonAttachments files={activeLesson?.files}/>

              {activeLesson?.quiz && (<div style={{ marginTop: 32 }}>
                  <LessonQuiz key={activeLessonId} quiz={activeLesson.quiz} lessonId={activeLessonId} disabled={!videoWatched}/>
                </div>)}
            </section>)}

          {/* Previous / Next Lesson Footer Nav */}
          <div className="learn-next">
            <button type="button" disabled={!prevLessonItem} onClick={() => {
            if (prevLessonItem) {
                selectLesson(prevLessonItem.moduleIndex, prevLessonItem.lessonIndex);
            }
        }}>
              <ArrowRight size={15}/> المحاضرة السابقة
            </button>

            <button type="button" onClick={() => {
            if (nextLessonItem && isCompleted) {
                selectLesson(nextLessonItem.moduleIndex, nextLessonItem.lessonIndex);
            }
        }} disabled={!nextLessonItem || !isCompleted}>
              المحاضرة التالية <ArrowLeft size={15}/>
            </button>
          </div>
        </main>

        {/* Sidebar: Course Curriculum Navigation */}
        <aside className="learn-sidebar">
          <div className="learn-sidebar-head">
            <div>
              <span className="eyebrow">مسار التعلّم</span>
              <h2>{course.shortTitle}</h2>
            </div>
            <span className="learn-progress-number">{progressPercent}٪</span>
          </div>

          <div className="learn-progress">
            <span style={{ width: `${progressPercent}%` }}/>
          </div>

          <p className="learn-progress-copy">
            {completedCount} من {totalLessonsCount} درسًا مكتملًا
          </p>

          <div className="learn-module-list">
            {modules.map((mod, modIdx) => {
            const isExpanded = expandedModuleIndex === modIdx;
            return (<div className={`learn-module ${isExpanded ? 'expanded' : ''}`} key={mod.title}>
                <button type="button" className="learn-module-title" aria-expanded={isExpanded} onClick={() => setExpandedModuleIndex(isExpanded ? -1 : modIdx)}>
                  <span>{String(modIdx + 1).padStart(2, '0')}</span>
                  <strong>{mod.title}</strong>
                  <small>{mod.lessons.length} درس</small>
                  <ChevronDown size={15} className="learn-module-chevron"/>
                </button>

                {isExpanded && <div className="learn-module-lessons">{mod.lessons.map((les, lesIdx) => {
                        const isCurrent = moduleIndex === modIdx && lessonIndex === lesIdx;
                        const lessonPosition = allLessons.findIndex((item) => item.moduleIndex === modIdx && item.lessonIndex === lesIdx);
                        const lessonId = allLessons[lessonPosition]?.id ?? '';
                        const isDone = isLessonCompleted(lessonId);
                        const isUnlocked = lessonPosition === 0 || isLessonCompleted(allLessons[lessonPosition - 1]?.id ?? '');
                        return (<button type="button" className={`learn-lesson ${isCurrent ? 'current' : ''}`} key={les.title} disabled={!isUnlocked} aria-disabled={!isUnlocked} title={!isUnlocked ? 'أكمل الدرس السابق لفتح هذه المحاضرة' : les.title} onClick={() => selectLesson(modIdx, lesIdx)}>
                      <span className="learn-lesson-status">
                        {isDone ? (<CheckCircle2 size={14} className="text-success"/>) : isUnlocked ? (<Play size={12}/>) : (<LockKeyhole size={13}/>)}
                      </span>
                      <em>{les.title}</em>
                      <small>{les.duration}</small>
                    </button>);
                    })}</div>}
              </div>);
        })}
          </div>

          <div className="learn-sidebar-footer">
            <FolderOpen size={15}/> جميع الملفات والأنشطة متاحة داخل الدروس
          </div>
        </aside>
      </div>
    </div>);
};
export default LearnCoursePage;
