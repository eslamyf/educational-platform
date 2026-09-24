import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { Module, Lesson, LessonNote, Course } from '@/types';
import { courses } from '@/lib/data';
import { toast } from 'sonner';

const MODULES_STORAGE_KEY = 'nawa-course-content';
const NOTES_STORAGE_KEY = 'nawa-lesson-notes';
const COMPLETED_STORAGE_KEY = 'nawa-completed-lessons';
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
  notes: LessonNote[];
  quizAnswers: Record<string, number>;
  toggleLessonCompletion: (lessonTitle: string) => void;
  isLessonCompleted: (lessonTitle: string) => boolean;
  addNote: (lessonTitle: string, time: number, body: string, courseId?: string) => void;
  deleteNote: (id: string) => void;
  getNotesForLesson: (lessonTitle: string) => LessonNote[];
  submitQuiz: (lessonTitle: string, answerIndex: number) => boolean;
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
      return saved ? JSON.parse(saved) : ['كيف نرى المشكلة قبل أن نصنع المحتوى؟'];
    } catch {
      return ['كيف نرى المشكلة قبل أن نصنع المحتوى؟'];
    }
  });

  const [notes, setNotes] = useState<LessonNote[]>(() => {
    try {
      const saved = window.localStorage.getItem(NOTES_STORAGE_KEY);
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
      window.localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // ignore
    }
  }, [notes]);

  useEffect(() => {
    try {
      window.localStorage.setItem(QUIZ_ANSWERS_STORAGE_KEY, JSON.stringify(quizAnswers));
    } catch {
      // ignore
    }
  }, [quizAnswers]);

  const toggleLessonCompletion = (lessonTitle: string) => {
    setCompletedLessons((prev) => {
      const isDone = prev.includes(lessonTitle);
      const next = isDone ? prev.filter((t) => t !== lessonTitle) : [...prev, lessonTitle];
      if (!isDone) {
        toast.success('رائع! تم تسجيل إتمام الدرس');
      } else {
        toast.info('تم إلغاء علامة إتمام الدرس');
      }
      return next;
    });
  };

  const isLessonCompleted = (lessonTitle: string) => completedLessons.includes(lessonTitle);

  const addNote = (lessonTitle: string, time: number, body: string, courseId?: string) => {
    if (!body.trim()) {
      toast.error('يرجى كتابة نص الملاحظة');
      return;
    }
    const newNote: LessonNote = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      courseId,
      lesson: lessonTitle,
      time: Math.floor(time),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [...prev, newNote]);
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    toast.success(`تم حفظ الملاحظة عند ${minutes}:${seconds}`);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    toast.success('تم حذف الملاحظة');
  };

  const getNotesForLesson = (lessonTitle: string) => {
    return notes.filter((n) => n.lesson === lessonTitle);
  };

  const submitQuiz = (lessonTitle: string, answerIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [lessonTitle]: answerIndex }));
    return true;
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
          video: lessonData.video || 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
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
      notes,
      quizAnswers,
      toggleLessonCompletion,
      isLessonCompleted,
      addNote,
      deleteNote,
      getNotesForLesson,
      submitQuiz,
      addModule,
      deleteModule,
      addLesson,
      deleteLesson,
      resetModules,
    }),
    [modules, completedLessons, notes, quizAnswers]
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
