import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { Module, Lesson } from '@/types';
import { courses } from '@/lib/data';
import { toast } from 'sonner';

const MODULES_STORAGE_KEY = 'nawa-course-content';
const COMPLETED_STORAGE_KEY = 'nawa-completed-lessons';
const WATCHED_STORAGE_KEY = 'nawa-watched-lessons';
const QUIZ_ANSWERS_STORAGE_KEY = 'nawa-quiz-answers';

export const defaultLearningModules: Module[] = courses[0].modules.map((module, moduleIndex) => ({
  ...module,
  lessons: module.lessons.map((lesson, lessonIndex) => ({
    ...lesson,
    files: moduleIndex === 0 && lessonIndex === 0 ? ['خريطة استراتيجية المحتوى.pdf', 'قالب تخطيط أسبوعي.fig'] : [],
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    quiz:
      moduleIndex === 0 && lessonIndex === 1
        ? {
            question: 'ما الخطوة الأساسية التي تسبق صناعة المحتوى؟',
            options: ['النشر الفوري على كل المنصات', 'فهم الجمهور والمشكلة وتحديد الوعد التحريري', 'اختيار المؤثرات البصرية والألوان', 'نسخ المحتوى الأكثر رواجًا عند المنافسين'],
            correct: 1,
            explanation: 'فهم الجمهور وتحديد الاحتياج الحقيقي هو الأساس الذي تُبنى عليه أي استراتيجية محتوى ناجحة.',
          }
        : undefined,
  })),
}));

interface LearningContextType {
  modules: Module[];
  completedLessons: string[];
  watchedLessons: string[];
  quizAnswers: Record<string, number>;
  markVideoWatched: (lessonId: string) => void;
  isVideoWatched: (lessonId: string) => boolean;
  completeLesson: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  submitQuiz: (lessonId: string, answerIndex: number, isCorrect: boolean) => boolean;
  // Instructor actions
  addModule: (title: string) => void;
  deleteModule: (moduleIndex: number) => void;
  addLesson: (moduleIndex: number, lesson: Partial<Lesson>) => void;
  deleteLesson: (moduleIndex: number, lessonIndex: number) => void;
  resetModules: () => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modules, setModules] = useState<Module[]>(() => {
    try {
      const saved = window.localStorage.getItem(MODULES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultLearningModules;
    } catch {
      return defaultLearningModules;
    }
  });

  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = window.localStorage.getItem(COMPLETED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [watchedLessons, setWatchedLessons] = useState<string[]>(() => {
    try {
      const saved = window.localStorage.getItem(WATCHED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>(() => {
    try {
      const saved = window.localStorage.getItem(QUIZ_ANSWERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(MODULES_STORAGE_KEY, JSON.stringify(modules));
    } catch {
      // ignore
    }
  }, [modules]);

  useEffect(() => {
    try {
      window.localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(completedLessons));
    } catch {
      // ignore
    }
  }, [completedLessons]);

  useEffect(() => {
    try {
      window.localStorage.setItem(WATCHED_STORAGE_KEY, JSON.stringify(watchedLessons));
    } catch {
      // ignore
    }
  }, [watchedLessons]);

  useEffect(() => {
    try {
      window.localStorage.setItem(QUIZ_ANSWERS_STORAGE_KEY, JSON.stringify(quizAnswers));
    } catch {
      // ignore
    }
  }, [quizAnswers]);

  const markVideoWatched = (lessonId: string) => {
    setWatchedLessons((prev) => prev.includes(lessonId) ? prev : [...prev, lessonId]);
  };

  const isVideoWatched = (lessonId: string) => watchedLessons.includes(lessonId);

  const completeLesson = (lessonId: string) => {
    if (!watchedLessons.includes(lessonId) || completedLessons.includes(lessonId)) return;
    const [moduleIndex, lessonIndex] = lessonId.split(':').slice(-2).map(Number);
    const quiz = modules[moduleIndex]?.lessons[lessonIndex]?.quiz;
    if (quiz && quizAnswers[lessonId] !== quiz.correct) {
      toast.error('أجب عن مهمة الدرس إجابة صحيحة قبل إكماله');
      return;
    }
    setCompletedLessons((prev) => [...prev, lessonId]);
    toast.success('اكتمل الدرس، وتم فتح الدرس التالي');
  };

  const isLessonCompleted = (lessonId: string) => completedLessons.includes(lessonId);

  const submitQuiz = (lessonId: string, answerIndex: number, isCorrect: boolean) => {
    if (isCorrect) setQuizAnswers((prev) => ({ ...prev, [lessonId]: answerIndex }));
    return isCorrect;
  };

  // Instructor Actions
  const addModule = (title: string) => {
    if (!title.trim()) return;
    const newMod: Module = {
      title: title.trim(),
      count: 0,
      duration: 'جديد',
      lessons: [],
    };
    setModules((prev) => [...prev, newMod]);
    toast.success('تمت إضافة الوحدة بنجاح');
  };

  const deleteModule = (moduleIndex: number) => {
    setModules((prev) => {
      const next = prev.filter((_, idx) => idx !== moduleIndex);
      return next.length > 0 ? next : defaultLearningModules;
    });
    toast.success('تم حذف الوحدة');
  };

  const addLesson = (moduleIndex: number, lessonData: Partial<Lesson>) => {
    if (!lessonData.title?.trim()) return;
    setModules((prev) =>
      prev.map((mod, idx) => {
        if (idx !== moduleIndex) return mod;
        const newLesson: Lesson = {
          title: lessonData.title || 'محاضرة جديدة',
          duration: lessonData.duration || '15:00',
          free: lessonData.free || false,
          video: lessonData.video || '',
          files: lessonData.files || [],
          quiz: lessonData.quiz,
        };
        const updatedLessons = [...mod.lessons, newLesson];
        return {
          ...mod,
          count: updatedLessons.length,
          lessons: updatedLessons,
        };
      })
    );
    toast.success('تم نشر المحاضرة للطلاب فورًا');
  };

  const deleteLesson = (moduleIndex: number, lessonIndex: number) => {
    setModules((prev) =>
      prev.map((mod, idx) => {
        if (idx !== moduleIndex) return mod;
        const updated = mod.lessons.filter((_, lIdx) => lIdx !== lessonIndex);
        return {
          ...mod,
          count: updated.length,
          lessons: updated,
        };
      })
    );
    toast.success('تم حذف المحاضرة');
  };

  const resetModules = () => {
    setModules(defaultLearningModules);
    toast.info('تمت إعادة ضبط المنهج للوضع الافتراضي');
  };

  const value = useMemo(
    () => ({
      modules,
      completedLessons,
      watchedLessons,
      quizAnswers,
      markVideoWatched,
      isVideoWatched,
      completeLesson,
      isLessonCompleted,
      submitQuiz,
      addModule,
      deleteModule,
      addLesson,
      deleteLesson,
      resetModules,
    }),
    [modules, completedLessons, watchedLessons, quizAnswers]
  );

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
