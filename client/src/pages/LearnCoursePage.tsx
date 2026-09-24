import React, { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
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
} from 'lucide-react';
import { PortalHeader } from '@/components/layout/PortalHeader';
import { PortalGate } from '@/components/layout/PortalLayout';
import { VideoPlayer } from '@/components/learning/VideoPlayer';
import { LessonNotes } from '@/components/learning/LessonNotes';
import { LessonQuiz } from '@/components/learning/LessonQuiz';
import { LessonAttachments } from '@/components/learning/LessonAttachments';
import { useAuth } from '@/hooks/useAuth';
import { useLearning } from '@/hooks/useLearning';
import { courses } from '@/lib/data';

export const LearnCoursePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [, params] = useRoute('/learn/:id');
  const courseId = params?.id || 'creative-strategy';
  const course = courses.find((item) => item.id === courseId) ?? courses[0];

  const {
    modules,
    completedLessons,
    toggleLessonCompletion,
    isLessonCompleted,
  } = useLearning();

  const [moduleIndex, setModuleIndex] = useState(0);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [jumpTime, setJumpTime] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'resources'>('overview');

  if (!isAuthenticated) {
    return <PortalGate />;
  }

  const activeModule = modules[moduleIndex] ?? modules[0];
  const activeLesson = activeModule?.lessons[lessonIndex] ?? activeModule?.lessons[0];

  const allLessons = modules.flatMap((mod, modIdx) =>
    mod.lessons.map((les, lesIdx) => ({
      lesson: les,
      moduleIndex: modIdx,
      lessonIndex: lesIdx,
      moduleTitle: mod.title,
    }))
  );

  const currentLessonPos = allLessons.findIndex(
    (item) => item.lesson.title === activeLesson?.title
  );

  const prevLessonItem = allLessons[currentLessonPos - 1];
  const nextLessonItem = allLessons[currentLessonPos + 1];

  const selectLesson = (targetModuleIdx: number, targetLessonIdx: number) => {
    setModuleIndex(targetModuleIdx);
    setLessonIndex(targetLessonIdx);
    setJumpTime(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToTime = (time: number) => {
    setJumpTime(time);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCompleted = activeLesson ? isLessonCompleted(activeLesson.title) : false;
  const completedCount = completedLessons.length;
  const totalLessonsCount = allLessons.length || course.lessons;
  const progressPercent = Math.min(100, Math.round((completedCount / totalLessonsCount) * 100));

  return (
    <div className="learn-page">
      <PortalHeader role="student" />

      <div className="learn-layout container">
        {/* Main Content Area */}
        <main className="learn-main">
          {/* Breadcrumb */}
          <div className="learn-breadcrumb">
            <Link href="/dashboard">لوحة الطالب</Link>
            <ChevronLeft size={13} />
            <span>{course.shortTitle}</span>
          </div>

          {/* Video Player */}
          {activeLesson && (
            <VideoPlayer
              lesson={activeLesson}
              moduleTitle={activeModule.title}
              posterImage={course.image}
              currentTime={videoTime}
              onTimeUpdate={(t) => setVideoTime(t)}
              jumpTime={jumpTime}
            />
          )}

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

            {activeLesson && (
              <button
                type="button"
                className={`complete-btn ${isCompleted ? 'done' : ''}`}
                onClick={() => toggleLessonCompletion(activeLesson.title)}
              >
                {isCompleted ? <CheckCircle2 size={17} /> : <Check size={17} />}
                {isCompleted ? 'مكتملة ومحفوظة' : 'تسجيل إتمام الدرس'}
              </button>
            )}
          </div>

          {/* Learn Tabs */}
          <div className="learn-tabs">
            <button
              type="button"
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => setActiveTab('overview')}
            >
              نظرة المحاضرة والملاحظات
            </button>
            <button
              type="button"
              className={activeTab === 'resources' ? 'active' : ''}
              onClick={() => setActiveTab('resources')}
            >
              الملفات والاختبار {activeLesson?.quiz ? '· كويز متاح' : ''}
            </button>
          </div>

          {/* Tab 1: Overview & Notes */}
          {activeTab === 'overview' && (
            <>
              <section className="lesson-overview">
                <h2>عن هذه المحاضرة</h2>
                <p>
                  في هذه الجلسة نضع البوصلة التأسيسية: نفهم الإطار النظري، نحدد المشكلة بدقة، ونطبق على أمثلة عملية واضحة لتثبيت المعلومة.
                </p>
                <div className="lesson-insights">
                  <span>
                    <Clock3 size={15} /> المدة: {activeLesson?.duration}
                  </span>
                  <span>
                    <Video size={15} /> جودة الفيديو: HD عالية الوضوح
                  </span>
                  <span>
                    <CheckCircle2 size={15} /> الحالة: {isCompleted ? 'مكتملة' : 'قيد التعلّم'}
                  </span>
                </div>
              </section>

              {activeLesson && (
                <LessonNotes
                  lessonTitle={activeLesson.title}
                  currentTime={videoTime}
                  courseId={course.id}
                  onJumpToTime={handleJumpToTime}
                />
              )}
            </>
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
                  <LessonQuiz quiz={activeLesson.quiz} lessonTitle={activeLesson.title} />
                </div>
              )}
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
              disabled={!nextLessonItem}
              onClick={() => {
                if (nextLessonItem) {
                  selectLesson(nextLessonItem.moduleIndex, nextLessonItem.lessonIndex);
                }
              }}
            >
              المحاضرة التالية <ArrowLeft size={15} />
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
            <span style={{ width: `${progressPercent}%` }} />
          </div>

          <p className="learn-progress-copy">
            {completedCount} من {totalLessonsCount} درسًا مكتملًا
          </p>

          <div className="learn-module-list">
            {modules.map((mod, modIdx) => (
              <div className="learn-module" key={mod.title}>
                <div className="learn-module-title">
                  <span>{String(modIdx + 1).padStart(2, '0')}</span>
                  <strong>{mod.title}</strong>
                </div>

                {mod.lessons.map((les, lesIdx) => {
                  const isCurrent = moduleIndex === modIdx && lessonIndex === lesIdx;
                  const isDone = isLessonCompleted(les.title);

                  return (
                    <button
                      type="button"
                      className={`learn-lesson ${isCurrent ? 'current' : ''}`}
                      key={les.title}
                      onClick={() => selectLesson(modIdx, lesIdx)}
                    >
                      <span className="learn-lesson-status">
                        {isDone ? (
                          <CheckCircle2 size={14} className="text-success" />
                        ) : les.free ? (
                          <Play size={12} />
                        ) : (
                          <LockKeyhole size={13} />
                        )}
                      </span>
                      <em>{les.title}</em>
                      <small>{les.duration}</small>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="learn-sidebar-footer">
            <FolderOpen size={15} /> جميع الملفات والأنشطة متاحة داخل الدروس
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LearnCoursePage;
