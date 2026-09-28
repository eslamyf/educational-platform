import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { courses } from '@/lib/data';
import { toast } from 'sonner';
const MODULES_STORAGE_KEY = 'nawa-course-content';
const COMPLETED_STORAGE_KEY = 'nawa-completed-lessons';
const WATCHED_STORAGE_KEY = 'nawa-watched-lessons';
const QUIZ_ANSWERS_STORAGE_KEY = 'nawa-quiz-answers';
export const defaultLearningModules = courses[0].modules.map((module, moduleIndex) => ({
    ...module,
    lessons: module.lessons.map((lesson, lessonIndex) => ({
        ...lesson,
        files: moduleIndex === 0 && lessonIndex === 0 ? ['ملخص الدعامة في النبات والتنسيق الهرموني.pdf', 'خرائط ذهنية للمناعة والـ DNA.pdf'] : [],
        video: lesson.video || 'https://www.youtube.com/watch?v=_wmwmMeF3pE',
        quiz: moduleIndex === 0 && lessonIndex === 1
            ? {
                question: 'ما هو التركيب الأساسي المسؤول عن الدعامة التركيبية في جدار الخلية النباتية؟',
                options: ['الفجوة العصارية وتغير الضغط الأسموزي', 'ترسيب السيليلوز واللجنين والكيوتين والسيوبيرين', 'البلاستيدات الخضراء وإنتاج الغذاء', 'السيتوبلازم وتدفق الأملاح الذائبة'],
                correct: 1,
                explanation: 'تعتمد الدعامة التركيبية على ترسب مواد صلبة قوية مثل السيليلوز واللجنين على جدر الخلايا لإكسابها الصلابة والقوة ومنع فقد الماء.',
            }
            : undefined,
    })),
}));

const sanitizeStoredModules = (mods) => {
    if (!Array.isArray(mods)) return defaultLearningModules;
    return mods.map((mod, modIdx) => ({
        ...mod,
        lessons: (mod.lessons || []).map((les, lesIdx) => {
            let vid = les.video || '';
            if (!vid || vid.includes('2a_eG8wP51A') || vid.includes('bAysXmB7d_Q') || vid.includes('8VwQ9fT2f7Q') || vid.includes('w7ejDZ8SWv8') || vid.includes('kGgA4j6v9hU')) {
                vid = courses[0]?.modules[modIdx]?.lessons[lesIdx]?.video || 'https://www.youtube.com/watch?v=_wmwmMeF3pE';
            }
            return {
                ...les,
                video: vid,
            };
        }),
    }));
};

const LearningContext = createContext(undefined);
export const LearningProvider = ({ children }) => {
    const [modules, setModules] = useState(() => {
        try {
            const saved = window.localStorage.getItem(MODULES_STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (
                    Array.isArray(parsed) &&
                    parsed.length > 0 &&
                    parsed[0]?.title &&
                    !parsed[0]?.title?.includes('استراتيجية') &&
                    !JSON.stringify(parsed).includes('خريطة استراتيجية')
                ) {
                    return sanitizeStoredModules(parsed);
                }
            }
            return defaultLearningModules;
        }
        catch {
            return defaultLearningModules;
        }
    });
    const [completedLessons, setCompletedLessons] = useState(() => {
        try {
            const saved = window.localStorage.getItem(COMPLETED_STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        }
        catch {
            return [];
        }
    });
    const [watchedLessons, setWatchedLessons] = useState(() => {
        try {
            const saved = window.localStorage.getItem(WATCHED_STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        }
        catch {
            return [];
        }
    });
    const [quizAnswers, setQuizAnswers] = useState(() => {
        try {
            const saved = window.localStorage.getItem(QUIZ_ANSWERS_STORAGE_KEY);
            return saved ? JSON.parse(saved) : {};
        }
        catch {
            return {};
        }
    });
    useEffect(() => {
        try {
            window.localStorage.setItem(MODULES_STORAGE_KEY, JSON.stringify(modules));
        }
        catch {
            // ignore
        }
    }, [modules]);
    useEffect(() => {
        try {
            window.localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(completedLessons));
        }
        catch {
            // ignore
        }
    }, [completedLessons]);
    useEffect(() => {
        try {
            window.localStorage.setItem(WATCHED_STORAGE_KEY, JSON.stringify(watchedLessons));
        }
        catch {
            // ignore
        }
    }, [watchedLessons]);
    useEffect(() => {
        try {
            window.localStorage.setItem(QUIZ_ANSWERS_STORAGE_KEY, JSON.stringify(quizAnswers));
        }
        catch {
            // ignore
        }
    }, [quizAnswers]);
    const markVideoWatched = (lessonId) => {
        setWatchedLessons((prev) => prev.includes(lessonId) ? prev : [...prev, lessonId]);
    };
    const isVideoWatched = (lessonId) => watchedLessons.includes(lessonId);
    const completeLesson = (lessonId) => {
        if (!watchedLessons.includes(lessonId) || completedLessons.includes(lessonId))
            return;
        const [moduleIndex, lessonIndex] = lessonId.split(':').slice(-2).map(Number);
        const quiz = modules[moduleIndex]?.lessons[lessonIndex]?.quiz;
        if (quiz && quizAnswers[lessonId] !== quiz.correct) {
            toast.error('أجب عن مهمة الدرس إجابة صحيحة قبل إكماله');
            return;
        }
        setCompletedLessons((prev) => [...prev, lessonId]);
        toast.success('اكتمل الدرس، وتم فتح الدرس التالي');
    };
    const isLessonCompleted = (lessonId) => completedLessons.includes(lessonId);
    const submitQuiz = (lessonId, answerIndex, isCorrect) => {
        if (isCorrect)
            setQuizAnswers((prev) => ({ ...prev, [lessonId]: answerIndex }));
        return isCorrect;
    };
    // Instructor Actions
    const addModule = (title) => {
        if (!title.trim())
            return;
        const newMod = {
            title: title.trim(),
            count: 0,
            duration: 'جديد',
            lessons: [],
        };
        setModules((prev) => [...prev, newMod]);
        toast.success('تمت إضافة الوحدة بنجاح');
    };
    const deleteModule = (moduleIndex) => {
        setModules((prev) => {
            const next = prev.filter((_, idx) => idx !== moduleIndex);
            return next.length > 0 ? next : defaultLearningModules;
        });
        toast.success('تم حذف الوحدة');
    };
    const addLesson = (moduleIndex, lessonData) => {
        if (!lessonData.title?.trim())
            return;
        setModules((prev) => prev.map((mod, idx) => {
            if (idx !== moduleIndex)
                return mod;
            const newLesson = {
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
        }));
        toast.success('تم نشر المحاضرة للطلاب فورًا');
    };
    const deleteLesson = (moduleIndex, lessonIndex) => {
        setModules((prev) => prev.map((mod, idx) => {
            if (idx !== moduleIndex)
                return mod;
            const updated = mod.lessons.filter((_, lIdx) => lIdx !== lessonIndex);
            return {
                ...mod,
                count: updated.length,
                lessons: updated,
            };
        }));
        toast.success('تم حذف المحاضرة');
    };
    const resetModules = () => {
        setModules(defaultLearningModules);
        toast.info('تمت إعادة ضبط المنهج للوضع الافتراضي');
    };
    const value = useMemo(() => ({
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
    }), [modules, completedLessons, watchedLessons, quizAnswers]);
    return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
};
export const useLearning = () => {
    const context = useContext(LearningContext);
    if (!context) {
        throw new Error('useLearning must be used within a LearningProvider');
    }
    return context;
};
