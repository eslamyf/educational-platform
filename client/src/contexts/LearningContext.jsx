import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { courses as baseCourses } from '@/lib/data';
import { toast } from 'sonner';

const COURSES_STORAGE_KEY = 'nawa-all-courses';
const ENROLLED_COURSES_STORAGE_KEY = 'nawa-enrolled-courses';
const COMPLETED_STORAGE_KEY = 'nawa-completed-lessons';
const WATCHED_STORAGE_KEY = 'nawa-watched-lessons';
const QUIZ_ANSWERS_STORAGE_KEY = 'nawa-quiz-answers';
const LESSON_NOTES_STORAGE_KEY = 'nawa-lesson-notes';
const TRANSACTIONS_STORAGE_KEY = 'nawa-transactions';
const REVIEWS_STORAGE_KEY = 'nawa-course-reviews';

// Ensure all base courses have well-structured modules and default properties
const enrichBaseCourses = (list) => {
    return list.map((c) => ({
        ...c,
        id: c.id,
        title: c.title,
        shortTitle: c.shortTitle || c.title,
        description: c.description || '',
        category: c.category || 'الثانوية العامة (علمي علوم)',
        track: c.track || 'علمي علوم',
        level: c.level || 'الصف الثالث الثانوي',
        price: Number(c.price) || 450,
        oldPrice: Number(c.oldPrice) || (Number(c.price) ? Number(c.price) + 200 : 650),
        rating: c.rating || 4.9,
        students: c.students || 120,
        lessons: c.lessons || 24,
        duration: c.duration || '٦ ساعات',
        accent: c.accent || 'coral',
        image: c.image,
        instructor: c.instructor || 'أ. د. أحمد الجوهري',
        instructorRole: c.instructorRole || 'كبير معلّمي المنصة',
        instructorAvatar: c.instructorAvatar || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=85',
        tags: c.tags || ['ثانوية عامة'],
        outcomes: c.outcomes || [
            'استيعاب المفاهيم والمصطلحات الأساسية بدقة',
            'التدريب على حل أحدث نماذج الأسئلة والامتحانات',
            'إتقان المنهج واستراتيجيات الحل السريع',
        ],
        requirements: c.requirements || ['كتاب المنهج أو مجلد المفاهيم', 'دفتر لتسجيل الملاحظات والخرائط الذهنية'],
        audience: c.audience || ['طلاب المرحلة الثانوية والبكالوريا'],
        previewVideo: c.previewVideo || 'https://www.youtube.com/watch?v=_wmwmMeF3pE',
        modules: Array.isArray(c.modules) && c.modules.length > 0 ? c.modules.map((m, mIdx) => ({
            ...m,
            count: m.lessons?.length || 0,
            duration: m.duration || 'ساعتان',
            lessons: (m.lessons || []).map((l, lIdx) => ({
                ...l,
                duration: l.duration || '20:00',
                video: l.video || 'https://www.youtube.com/watch?v=_wmwmMeF3pE',
                free: Boolean(l.free || (mIdx === 0 && lIdx === 0)),
                files: l.files || (mIdx === 0 && lIdx === 0 ? [`ملخص ${c.shortTitle || c.title}.pdf`] : []),
                quiz: l.quiz || (lIdx === 1 ? {
                    question: `ما هو المفهوم الأساسي في درس "${l.title}"؟`,
                    options: [
                        'الفهم والتطبيق العملي المنظم',
                        'الحفظ السطحي دون استيعاب القوانين',
                        'تخطي المحاضرات التأسيسية الأولى',
                        'الاعتماد على التخمين العشوائي',
                    ],
                    correct: 0,
                    explanation: 'الفهم المنهجي والتطبيق المباشر يضمن تثبيت المعلومة والتفوق.',
                } : undefined),
            })),
        })) : [
            {
                title: 'الوحدة الأولى: التأسيس والمفاهيم الجوهرية',
                count: 3,
                duration: 'ساعتان',
                lessons: [
                    {
                        title: `المحاضرة الأولى: مدخل ومقدمة ${c.shortTitle || c.title}`,
                        duration: '20:00',
                        free: true,
                        video: c.previewVideo || 'https://www.youtube.com/watch?v=_wmwmMeF3pE',
                        files: [`ملخص المحاضرة التأسيسية.pdf`],
                    },
                    {
                        title: 'المحاضرة الثانية: القواعد والتطبيقات العملية',
                        duration: '25:00',
                        free: false,
                        video: 'https://www.youtube.com/watch?v=0pA7qydUFbc',
                        quiz: {
                            question: 'ما هي أهم ركيزة لتحقيق الدرجة النهائية في هذا القسم؟',
                            options: [
                                'الممارسة والحل المستمر لأفكار الامتحانات',
                                'الاكتفاء بقراءة العناوين فقط',
                                'تأجيل المذاكرة لليلة الامتحان',
                                'حفظ الإجابات دون فهم الخطوات',
                            ],
                            correct: 0,
                            explanation: 'التدريب المستمر على نماذج الأسئلة المتدرجة هو أساس الدرجة النهائية.',
                        },
                    },
                    {
                        title: 'المحاضرة الثالثة: ورشة حل بنك الأسئلة والتدريبات',
                        duration: '30:00',
                        free: false,
                        video: 'https://www.youtube.com/watch?v=2I-nwLZSwAY',
                        files: ['أوراق عمل وتدريبات بنك المعرفة.pdf'],
                    },
                ],
            },
        ],
    }));
};

const initialTransactions = [
    {
        id: 'TXN-9081',
        studentName: 'سارة أحمد',
        studentEmail: 'sara@example.com',
        courseId: 'secondary-biology',
        courseTitle: 'الأحياء والبيولوجيا الجزيئية — الصف الثالث الثانوي',
        amount: 490,
        paymentMethod: 'فودافون كاش',
        date: 'اليوم، ١٠:٣٠ ص',
        status: 'مكتمل',
    },
    {
        id: 'TXN-9082',
        studentName: 'محمد علي',
        studentEmail: 'mohamed@example.com',
        courseId: 'secondary-physics',
        courseTitle: 'الفيزياء والفيزياء الحديثة — الصف الثالث الثانوي',
        amount: 520,
        paymentMethod: 'إنستاباي InstaPay',
        date: 'أمس، ٠٤:١٥ م',
        status: 'مكتمل',
    },
    {
        id: 'TXN-9083',
        studentName: 'نورهان مصطفى',
        studentEmail: 'nourhan@example.com',
        courseId: 'secondary-math',
        courseTitle: 'الرياضيات البحتة والتفاضل — الصف الثاني الثانوي',
        amount: 420,
        paymentMethod: 'بطاقة بنكية (ميزة)',
        date: 'منذ يومين',
        status: 'مكتمل',
    },
];

const LearningContext = createContext(undefined);

export const LearningProvider = ({ children }) => {
    // 1. All Courses (Base + Custom additions / updates)
    const [coursesList, setCoursesList] = useState(() => {
        try {
            const saved = window.localStorage.getItem(COURSES_STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
            return enrichBaseCourses(baseCourses);
        } catch {
            return enrichBaseCourses(baseCourses);
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(coursesList));
        } catch {
            // ignore
        }
    }, [coursesList]);

    // 2. Enrolled Courses for student
    const [enrolledCourses, setEnrolledCourses] = useState(() => {
        try {
            const saved = window.localStorage.getItem(ENROLLED_COURSES_STORAGE_KEY);
            return saved ? JSON.parse(saved) : ['secondary-biology', 'secondary-physics'];
        } catch {
            return ['secondary-biology', 'secondary-physics'];
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(ENROLLED_COURSES_STORAGE_KEY, JSON.stringify(enrolledCourses));
        } catch {
            // ignore
        }
    }, [enrolledCourses]);

    // 3. Completed & Watched Lessons
    const [completedLessons, setCompletedLessons] = useState(() => {
        try {
            const saved = window.localStorage.getItem(COMPLETED_STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(completedLessons));
        } catch {
            // ignore
        }
    }, [completedLessons]);

    const [watchedLessons, setWatchedLessons] = useState(() => {
        try {
            const saved = window.localStorage.getItem(WATCHED_STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(WATCHED_STORAGE_KEY, JSON.stringify(watchedLessons));
        } catch {
            // ignore
        }
    }, [watchedLessons]);

    // 4. Quiz Answers
    const [quizAnswers, setQuizAnswers] = useState(() => {
        try {
            const saved = window.localStorage.getItem(QUIZ_ANSWERS_STORAGE_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(QUIZ_ANSWERS_STORAGE_KEY, JSON.stringify(quizAnswers));
        } catch {
            // ignore
        }
    }, [quizAnswers]);

    // 5. Personal Lesson Notes
    const [lessonNotes, setLessonNotes] = useState(() => {
        try {
            const saved = window.localStorage.getItem(LESSON_NOTES_STORAGE_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(LESSON_NOTES_STORAGE_KEY, JSON.stringify(lessonNotes));
        } catch {
            // ignore
        }
    }, [lessonNotes]);

    // 6. Transactions log for teacher earnings & checkout
    const [transactions, setTransactions] = useState(() => {
        try {
            const saved = window.localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
            return saved ? JSON.parse(saved) : initialTransactions;
        } catch {
            return initialTransactions;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions));
        } catch {
            // ignore
        }
    }, [transactions]);

    // 7. Course Reviews
    const [customReviews, setCustomReviews] = useState(() => {
        try {
            const saved = window.localStorage.getItem(REVIEWS_STORAGE_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(customReviews));
        } catch {
            // ignore
        }
    }, [customReviews]);

    // --- Helper Course Getters ---
    const allCourses = coursesList;

    const getCourseById = useCallback(
        (courseId) => {
            if (!courseId) return coursesList[0];
            return coursesList.find((c) => c.id === courseId) || coursesList[0];
        },
        [coursesList]
    );

    const getCourseModules = useCallback(
        (courseId) => {
            const c = getCourseById(courseId);
            return c?.modules || [];
        },
        [getCourseById]
    );

    // --- Course CRUD for Teacher ---
    const addCourse = (newCourseData) => {
        const id = newCourseData.id || `course-${Date.now()}`;
        const finalCourse = {
            id,
            title: newCourseData.title || 'كورس جديد بدون عنوان',
            shortTitle: newCourseData.shortTitle || newCourseData.title || 'كورس جديد',
            description: newCourseData.description || 'شرح تفصيلي للمنهج مع تدريبات واختبارات شاملة.',
            category: newCourseData.category || 'الثانوية العامة (علمي علوم)',
            track: newCourseData.track || 'علمي علوم',
            level: newCourseData.level || 'الصف الثالث الثانوي',
            price: Number(newCourseData.price) >= 0 ? Number(newCourseData.price) : 450,
            oldPrice: Number(newCourseData.oldPrice) || (Number(newCourseData.price) ? Number(newCourseData.price) + 200 : 650),
            rating: 5.0,
            students: 0,
            lessons: (newCourseData.modules || []).reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || 1,
            duration: newCourseData.duration || '٤ ساعات',
            accent: newCourseData.accent || 'coral',
            image: newCourseData.image || 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1200&q=85',
            instructor: newCourseData.instructor || 'أ. د. أحمد الجوهري',
            instructorRole: newCourseData.instructorRole || 'معلم ومعد مسارات نَوَى',
            instructorAvatar: newCourseData.instructorAvatar || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=85',
            tags: newCourseData.tags || [newCourseData.track || 'ثانوية عامة', 'نَوَى'],
            outcomes: newCourseData.outcomes?.length ? newCourseData.outcomes : [
                'استيعاب كامل لجميع موضوعات وقوانين المنهج',
                'التدريب على مهارات حل المسائل المركبة والأسئلة غير المباشرة',
                'الحصول على المذكرات وأوراق العمل التفاعلية',
            ],
            requirements: newCourseData.requirements?.length ? newCourseData.requirements : [
                'مجلد المفاهيم أو كتاب الوزارة',
                'دفتر للملاحظات وحل التدريبات',
            ],
            audience: newCourseData.audience?.length ? newCourseData.audience : [
                'طلاب الثانوية العامة والبكالوريا الراغبون في التفوق',
            ],
            previewVideo: newCourseData.previewVideo || 'https://www.youtube.com/watch?v=_wmwmMeF3pE',
            modules: newCourseData.modules && newCourseData.modules.length > 0 ? newCourseData.modules : [
                {
                    title: 'الوحدة الأولى: مدخل ومفاهيم أساسية',
                    count: 1,
                    duration: 'ساعة',
                    lessons: [
                        {
                            title: `المحاضرة التأسيسية الأولى: ${newCourseData.shortTitle || newCourseData.title}`,
                            duration: '20:00',
                            free: true,
                            video: newCourseData.previewVideo || 'https://www.youtube.com/watch?v=_wmwmMeF3pE',
                            files: [`ملخص المحاضرة الأولى.pdf`],
                            quiz: {
                                question: 'ما هو الهدف التعليمي الرئيسي من هذه الوحدة؟',
                                options: [
                                    'الفهم والتطبيق العملي المنظم',
                                    'الحفظ السطحي فقط',
                                    'تخطي المسائل المعقدة',
                                    'الاعتماد على التخمين',
                                ],
                                correct: 0,
                                explanation: 'الفهم المنهجي والتطبيق المستمر هو الضامن للتفوق.',
                            },
                        },
                    ],
                },
            ],
        };

        setCoursesList((prev) => [finalCourse, ...prev]);
        toast.success(`تم إنشاء ونشر كورس "${finalCourse.title}" بنجاح!`);
        return finalCourse;
    };

    const updateCourse = (courseId, partial) => {
        setCoursesList((prev) =>
            prev.map((c) => {
                if (c.id !== courseId) return c;
                const updated = { ...c, ...partial };
                // recalculate total lessons count
                if (updated.modules) {
                    updated.lessons = updated.modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);
                }
                return updated;
            })
        );
        toast.success('تم حفظ وتحديث بيانات الكورس بنجاح');
    };

    const deleteCourse = (courseId) => {
        setCoursesList((prev) => prev.filter((c) => c.id !== courseId));
        toast.success('تم حذف الكورس بنجاح');
    };

    // --- Curriculum Actions (Modules & Lessons) per Course ---
    const addCourseModule = (courseId, moduleTitle) => {
        if (!moduleTitle?.trim()) return;
        setCoursesList((prev) =>
            prev.map((c) => {
                if (c.id !== courseId) return c;
                const newMod = {
                    title: moduleTitle.trim(),
                    count: 0,
                    duration: 'جديد',
                    lessons: [],
                };
                return {
                    ...c,
                    modules: [...(c.modules || []), newMod],
                };
            })
        );
        toast.success('تمت إضافة الوحدة الدراسية للكورس بنجاح');
    };

    const deleteCourseModule = (courseId, moduleIndex) => {
        setCoursesList((prev) =>
            prev.map((c) => {
                if (c.id !== courseId) return c;
                const updatedModules = (c.modules || []).filter((_, idx) => idx !== moduleIndex);
                return {
                    ...c,
                    modules: updatedModules,
                    lessons: updatedModules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0),
                };
            })
        );
        toast.success('تم حذف الوحدة الدراسية');
    };

    const addCourseLesson = (courseId, moduleIndex, lessonData) => {
        if (!lessonData?.title?.trim()) {
            toast.error('يرجى كتابة عنوان المحاضرة');
            return;
        }
        setCoursesList((prev) =>
            prev.map((c) => {
                if (c.id !== courseId) return c;
                const modules = (c.modules || []).map((m, mIdx) => {
                    if (mIdx !== moduleIndex) return m;
                    const newLesson = {
                        title: lessonData.title.trim(),
                        duration: lessonData.duration || '20:00',
                        free: Boolean(lessonData.free),
                        video: lessonData.video || 'https://www.youtube.com/watch?v=_wmwmMeF3pE',
                        files: Array.isArray(lessonData.files) ? lessonData.files : (lessonData.files ? [lessonData.files] : []),
                        quiz: lessonData.quiz,
                    };
                    const nextLessons = [...(m.lessons || []), newLesson];
                    return {
                        ...m,
                        count: nextLessons.length,
                        lessons: nextLessons,
                    };
                });
                return {
                    ...c,
                    modules,
                    lessons: modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0),
                };
            })
        );
        toast.success('تمت إضافة ونشر المحاضرة بنجاح');
    };

    const deleteCourseLesson = (courseId, moduleIndex, lessonIndex) => {
        setCoursesList((prev) =>
            prev.map((c) => {
                if (c.id !== courseId) return c;
                const modules = (c.modules || []).map((m, mIdx) => {
                    if (mIdx !== moduleIndex) return m;
                    const nextLessons = (m.lessons || []).filter((_, lIdx) => lIdx !== lessonIndex);
                    return {
                        ...m,
                        count: nextLessons.length,
                        lessons: nextLessons,
                    };
                });
                return {
                    ...c,
                    modules,
                    lessons: modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0),
                };
            })
        );
        toast.success('تم حذف المحاضرة');
    };

    const updateCourseLesson = (courseId, moduleIndex, lessonIndex, updatedData) => {
        setCoursesList((prev) =>
            prev.map((c) => {
                if (c.id !== courseId) return c;
                const modules = (c.modules || []).map((m, mIdx) => {
                    if (mIdx !== moduleIndex) return m;
                    const nextLessons = (m.lessons || []).map((l, lIdx) => {
                        if (lIdx !== lessonIndex) return l;
                        return { ...l, ...updatedData };
                    });
                    return { ...m, lessons: nextLessons };
                });
                return { ...c, modules };
            })
        );
        toast.success('تم تحديث المحاضرة بنجاح');
    };

    // --- Student Enrollment & Progress Actions ---
    const isCourseEnrolled = useCallback(
        (courseId) => {
            if (!courseId) return false;
            return enrolledCourses.includes(courseId);
        },
        [enrolledCourses]
    );

    const enrollInCourse = useCallback((courseId, details = {}) => {
        if (!courseId) return;
        setEnrolledCourses((prev) => (prev.includes(courseId) ? prev : [...prev, courseId]));

        // Record transaction
        const targetCourse = coursesList.find((c) => c.id === courseId) || coursesList[0];
        const newTxn = {
            id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
            studentName: details.name || 'طالب مسجل',
            studentEmail: details.email || 'student@nawa.education',
            courseId,
            courseTitle: targetCourse.title,
            amount: details.amount !== undefined ? details.amount : targetCourse.price,
            paymentMethod: details.paymentMethod || 'فودافون كاش',
            date: 'الآن',
            status: 'مكتمل',
        };

        setTransactions((prev) => [newTxn, ...prev]);
    }, [coursesList]);

    const markVideoWatched = (lessonId) => {
        setWatchedLessons((prev) => (prev.includes(lessonId) ? prev : [...prev, lessonId]));
    };

    const isVideoWatched = (lessonId) => watchedLessons.includes(lessonId);

    const completeLesson = (lessonId) => {
        if (completedLessons.includes(lessonId)) return;
        setCompletedLessons((prev) => [...prev, lessonId]);
        toast.success('اكتمل الدرس، وتم فتح المحاضرة التالية بنجاح 🎉');
    };

    const isLessonCompleted = (lessonId) => completedLessons.includes(lessonId);

    const submitQuiz = (lessonId, answerIndex, isCorrect) => {
        if (isCorrect) {
            setQuizAnswers((prev) => ({ ...prev, [lessonId]: answerIndex }));
        }
        return isCorrect;
    };

    // Lesson study notes
    const saveLessonNote = (lessonId, text) => {
        setLessonNotes((prev) => ({ ...prev, [lessonId]: text }));
        toast.success('تم حفظ ملاحظاتك الدراسية لهذا الدرس');
    };

    const getLessonNote = (lessonId) => {
        return lessonNotes[lessonId] || '';
    };

    // Course reviews
    const addCourseReview = (courseId, review) => {
        setCustomReviews((prev) => {
            const list = prev[courseId] || [];
            return {
                ...prev,
                [courseId]: [review, ...list],
            };
        });
        toast.success('شكرًا لمشاركتك تقييمك ورأيك في الكورس!');
    };

    const getCourseReviews = useCallback((courseId) => {
        const c = getCourseById(courseId);
        const staticReviews = c?.reviews || [];
        const dynamicReviews = customReviews[courseId] || [];
        return [...dynamicReviews, ...staticReviews];
    }, [getCourseById, customReviews]);

    // Calculate Instructor Metrics
    const instructorStats = useMemo(() => {
        const totalEarnings = transactions.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
        const totalLessonsCount = coursesList.reduce((sum, c) => sum + (c.lessons || 0), 0);
        return {
            totalEarnings: totalEarnings + 14850,
            totalStudents: 5040 + transactions.length,
            totalCourses: coursesList.length,
            totalLessons: totalLessonsCount,
            avgRating: 4.95,
        };
    }, [transactions, coursesList]);

    // Backward-compatible single module shortcuts for course 0
    const modules = coursesList[0]?.modules || [];
    const addModule = (title) => addCourseModule(coursesList[0]?.id, title);
    const deleteModule = (modIdx) => deleteCourseModule(coursesList[0]?.id, modIdx);
    const addLesson = (modIdx, lessonData) => addCourseLesson(coursesList[0]?.id, modIdx, lessonData);
    const deleteLesson = (modIdx, lesIdx) => deleteCourseLesson(coursesList[0]?.id, modIdx, lesIdx);
    const resetModules = () => {
        setCoursesList(enrichBaseCourses(baseCourses));
        toast.info('تمت إعادة ضبط الكورسات والمناهج للوضع الافتراضي');
    };

    const value = useMemo(
        () => ({
            allCourses,
            coursesList,
            getCourseById,
            getCourseModules,
            addCourse,
            updateCourse,
            deleteCourse,
            addCourseModule,
            deleteCourseModule,
            addCourseLesson,
            deleteCourseLesson,
            updateCourseLesson,
            enrolledCourses,
            isCourseEnrolled,
            enrollInCourse,
            completedLessons,
            watchedLessons,
            quizAnswers,
            markVideoWatched,
            isVideoWatched,
            completeLesson,
            isLessonCompleted,
            submitQuiz,
            lessonNotes,
            saveLessonNote,
            getLessonNote,
            transactions,
            instructorStats,
            addCourseReview,
            getCourseReviews,
            // legacy helpers
            modules,
            addModule,
            deleteModule,
            addLesson,
            deleteLesson,
            resetModules,
        }),
        [
            allCourses,
            coursesList,
            getCourseById,
            getCourseModules,
            enrolledCourses,
            isCourseEnrolled,
            enrollInCourse,
            completedLessons,
            watchedLessons,
            quizAnswers,
            lessonNotes,
            transactions,
            instructorStats,
            getCourseReviews,
            modules,
        ]
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

export default LearningContext;
