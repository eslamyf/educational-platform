import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import {
    LayoutDashboard,
    BookOpen,
    Plus,
    Video,
    Pencil,
    Trash2,
    Upload,
    ChevronLeft,
    ChevronDown,
    ArrowLeft,
    Eye,
    Save,
    Sparkles,
    CheckCircle2,
    Users,
    DollarSign,
    Wallet,
    TrendingUp,
    Star,
    Search,
    Filter,
    X,
    Play,
    Check,
    AlertCircle,
    Copy,
    Settings,
    FileText,
    HelpCircle,
    CreditCard,
    ArrowUpRight,
    ExternalLink,
    GraduationCap,
    Clock,
    Briefcase,
    Shield,
    UserPlus,
} from 'lucide-react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAuth } from '@/hooks/useAuth';
import { useLearning } from '@/hooks/useLearning';
import { getYouTubeVideoId, getYouTubeEmbedUrl } from '@/lib/youtube';
import { egyptEducationOptions, formatPrice } from '@/lib/data';
import { toast } from 'sonner';

// Sample cover image presets for easy picking
const COVER_PRESETS = [
    { label: 'أحياء وبيولوجيا', url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1200&q=85' },
    { label: 'فيزياء وكهربية', url: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1200&q=85' },
    { label: 'كيمياء وعناصر', url: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=1200&q=85' },
    { label: 'رياضيات وتفاضل', url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=85' },
    { label: 'لغة عربية وبلاغة', url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=85' },
    { label: 'لغة إنجليزية', url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=85' },
    { label: 'طب وصيدلة (بكالوريا)', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85' },
    { label: 'هندسة وحاسبات (بكالوريا)', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85' },
];

export const InstructorDashboardPage = () => {
    const [location] = useLocation();
    const { user, updateProfile, createInstructorAccount, getInstructorsList, deleteInstructorAccount } = useAuth();
    const {
        allCourses,
        getCourseById,
        addCourse,
        updateCourse,
        deleteCourse,
        addCourseModule,
        deleteCourseModule,
        addCourseLesson,
        deleteCourseLesson,
        updateCourseLesson,
        transactions,
        instructorStats,
    } = useLearning();

    // Tab state from URL query param
    const getTabFromUrl = () => {
        if (typeof window === 'undefined') return 'overview';
        const params = new URLSearchParams(window.location.search);
        return params.get('tab') || 'overview';
    };

    const [activeTab, setActiveTab] = useState(getTabFromUrl);

    useEffect(() => {
        setActiveTab(getTabFromUrl());
        const handlePopState = () => setActiveTab(getTabFromUrl());
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [location]);

    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
        const newUrl = tabKey === 'overview' ? '/instructor' : `/instructor?tab=${tabKey}`;
        window.history.pushState({}, '', newUrl);
    };

    // Active selected course for curriculum editor
    const [selectedCourseId, setSelectedCourseId] = useState(() => allCourses[0]?.id || 'secondary-biology');
    const selectedCourse = useMemo(() => {
        return allCourses.find((c) => c.id === selectedCourseId) || allCourses[0];
    }, [allCourses, selectedCourseId]);

    const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
    const currentModule = selectedCourse?.modules?.[selectedModuleIndex] || selectedCourse?.modules?.[0];

    // Modals state
    const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
    const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);
    const [isPayoutOpen, setIsPayoutOpen] = useState(false);
    const [isCreateTeacherOpen, setIsCreateTeacherOpen] = useState(false);
    const [courseToEdit, setCourseToEdit] = useState(null);

    // Curriculum & Lesson Modal States
    const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
    const [addLessonTab, setAddLessonTab] = useState('details'); // 'details' | 'files' | 'quiz'
    const [editingLessonTab, setEditingLessonTab] = useState('details');
    const [lessonAttachedFiles, setLessonAttachedFiles] = useState([]);
    const [previewVideoModalUrl, setPreviewVideoModalUrl] = useState(null);
    const [isRenameModuleOpen, setIsRenameModuleOpen] = useState(false);
    const [moduleRenameTitle, setModuleRenameTitle] = useState('');
    const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);

    // Curriculum form state
    const [newModuleTitle, setNewModuleTitle] = useState('');
    const [newLessonTitle, setNewLessonTitle] = useState('');
    const [lessonVideoUrl, setLessonVideoUrl] = useState('');
    const [lessonDuration, setLessonDuration] = useState('25:00');
    const [isFreePreview, setIsFreePreview] = useState(false);
    const [hasQuiz, setHasQuiz] = useState(true);
    const [quizQuestion, setQuizQuestion] = useState('');
    const [quizOptions, setQuizOptions] = useState([
        'الفهم والتدريب العملي المنظم',
        'الحفظ العشوائي دون استيعاب القوانين',
        'تخطي المسائل التأسيسية',
        'الاعتماد على التخمين',
    ]);
    const [quizCorrectIndex, setQuizCorrectIndex] = useState(0);
    const [quizExplanation, setQuizExplanation] = useState('التطبيق العملي المنهجي هو مفتاح الإتقان والتفوق.');

    // Edit Lesson Modal state
    const [editingLessonInfo, setEditingLessonInfo] = useState(null);

    // PDF Upload Handler from PC/Device (reads files and creates dataUrl/blob preview)
    const handleFileUpload = (e, mode = 'new') => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        files.forEach((file) => {
            const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
            if (!isPdf) {
                toast.error(`الملف "${file.name}" ليس بصيغة PDF. يرجى اختيار ملفات PDF فقط.`);
                return;
            }

            const sizeKb = (file.size / 1024).toFixed(0);
            const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
            const sizeFormatted = file.size > 1024 * 1024 ? `${sizeMb} ميجابايت` : `${sizeKb} ك.ب`;

            const reader = new FileReader();
            reader.onload = (event) => {
                const fileItem = {
                    name: file.name,
                    size: sizeFormatted,
                    dataUrl: event.target.result,
                    uploadedAt: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
                };

                if (mode === 'new') {
                    setLessonAttachedFiles((prev) => [...prev, fileItem]);
                } else if (mode === 'edit') {
                    setEditingLessonInfo((prev) => {
                        if (!prev) return prev;
                        const existingFiles = prev.lesson.files || [];
                        return {
                            ...prev,
                            lesson: {
                                ...prev.lesson,
                                files: [...existingFiles, fileItem],
                            },
                        };
                    });
                }
                toast.success(`تم رفع ملف "${file.name}" (${sizeFormatted}) بنجاح!`);
            };
            reader.readAsDataURL(file);
        });
        e.target.value = '';
    };

    const handleRemoveFile = (indexToRemove, mode = 'new') => {
        if (mode === 'new') {
            setLessonAttachedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
        } else if (mode === 'edit') {
            setEditingLessonInfo((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    lesson: {
                        ...prev.lesson,
                        files: (prev.lesson.files || []).filter((_, idx) => idx !== indexToRemove),
                    },
                };
            });
        }
        toast.info('تمت إزالة الملف المرفق');
    };

    const handleAddPresetPdf = (mode = 'new') => {
        const presetItem = {
            name: `مذكرة_${selectedCourse.shortTitle || 'المنهج'}_الوحدة_${selectedModuleIndex + 1}.pdf`,
            size: '2.1 ميجابايت',
            uploadedAt: 'نموذج وزاري جاهز',
        };
        if (mode === 'new') {
            setLessonAttachedFiles((prev) => [...prev, presetItem]);
        } else if (mode === 'edit') {
            setEditingLessonInfo((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    lesson: {
                        ...prev.lesson,
                        files: [...(prev.lesson.files || []), presetItem],
                    },
                };
            });
        }
        toast.success('تم إرفاق مذكرة المنهج الجاهزة بنجاح');
    };

    // Create New Course Form State
    const [newCourseForm, setNewCourseForm] = useState({
        title: '',
        shortTitle: '',
        description: '',
        category: 'الثانوية العامة (علمي علوم)',
        track: 'علمي علوم',
        level: 'الصف الثالث الثانوي',
        price: 490,
        oldPrice: 690,
        accent: 'coral',
        image: COVER_PRESETS[0].url,
        previewVideo: 'https://www.youtube.com/watch?v=_wmwmMeF3pE',
        firstModuleTitle: 'الوحدة الأولى: التأسيس والمفاهيم الجوهرية',
        firstLessonTitle: 'المحاضرة التأسيسية الأولى',
        firstLessonVideo: 'https://www.youtube.com/watch?v=_wmwmMeF3pE',
    });

    // Create New Teacher (Admin Action) Form State
    const [newTeacherForm, setNewTeacherForm] = useState({
        name: '',
        title: 'معلم ومعد مسارات',
        track: 'أحياء وبيولوجيا جزيئية',
        phone: '',
        email: '',
        password: 'password',
        governorate: 'القاهرة',
        bio: '',
    });

    // Profile & Settings form state
    const [settingsForm, setSettingsForm] = useState({
        name: user?.name || 'إدارة المنصة والمعلم',
        title: user?.grade || 'كبير معلّمي المنصة',
        track: user?.track || 'أحياء وبيولوجيا جزيئية',
        bio: user?.bio || 'خبير تدريس مناهج الثانوية العامة وبنك المعرفة بخبرة أكثر من ١٥ عامًا.',
        phone: user?.phone || '01000000000',
        governorate: user?.governorate || 'القاهرة',
        walletType: 'vodafone',
        walletNumber: user?.phone || '01012345678',
    });

    // Search and filters
    const [studentSearch, setStudentSearch] = useState('');
    const [studentCourseFilter, setStudentCourseFilter] = useState('all');
    const [teacherSearch, setTeacherSearch] = useState('');

    // Active teachers list from AuthContext
    const teachersList = getInstructorsList ? getInstructorsList() : [];
    const filteredTeachers = teachersList.filter((t) => {
        return (
            (t.name || '').toLowerCase().includes(teacherSearch.toLowerCase()) ||
            (t.email || '').toLowerCase().includes(teacherSearch.toLowerCase()) ||
            (t.track || '').toLowerCase().includes(teacherSearch.toLowerCase())
        );
    });

    // Sample active students for monitoring
    const allStudentsList = [
        { id: 1, name: 'سارة أحمد', email: 'sara@example.com', courseId: 'secondary-biology', courseTitle: 'الأحياء — تالتة ثانوي', track: 'علمي علوم', progress: 78, lastActive: 'منذ ١٥ دقيقة', status: 'نشط الآن' },
        { id: 2, name: 'محمد علي', email: 'mohamed@example.com', courseId: 'secondary-physics', courseTitle: 'الفيزياء والفيزياء الحديثة', track: 'علمي رياضة', progress: 62, lastActive: 'منذ ساعتين', status: 'متابع' },
        { id: 3, name: 'نورهان مصطفى', email: 'nourhan@example.com', courseId: 'secondary-math', courseTitle: 'الرياضيات والتفاضل', track: 'علمي رياضة', progress: 91, lastActive: 'أمس', status: 'متميز' },
        { id: 4, name: 'كريم محمود', email: 'karim@example.com', courseId: 'bac-medicine', courseTitle: 'مسار الطب وعلوم الحياة', track: 'البكالوريا المصرية', progress: 45, lastActive: 'منذ يومين', status: 'قيد التقدم' },
        { id: 5, name: 'مريم عادل', email: 'mariam@example.com', courseId: 'secondary-biology', courseTitle: 'الأحياء — تالتة ثانوي', track: 'علمي علوم', progress: 84, lastActive: 'اليوم، ٠٩:١٥ ص', status: 'متابع' },
        { id: 6, name: 'أحمد طارق', email: 'ahmed@example.com', courseId: 'secondary-chemistry', courseTitle: 'الكيمياء العامة والعضوية', track: 'علمي علوم', progress: 30, lastActive: 'منذ ٤ أيام', status: 'قيد التقدم' },
    ];

    const filteredStudents = allStudentsList.filter((st) => {
        const matchesSearch = st.name.toLowerCase().includes(studentSearch.toLowerCase()) || st.email.toLowerCase().includes(studentSearch.toLowerCase());
        const matchesCourse = studentCourseFilter === 'all' || st.courseId === studentCourseFilter;
        return matchesSearch && matchesCourse;
    });

    // Handle Adding New Course Module
    const handleAddModule = (customTitle) => {
        const titleToUse = (customTitle || newModuleTitle || '').trim();
        if (!titleToUse) {
            toast.error('يرجى كتابة عنوان الوحدة');
            return;
        }
        addCourseModule(selectedCourse.id, titleToUse);
        setNewModuleTitle('');
        setIsAddModuleOpen(false);
        setSelectedModuleIndex(selectedCourse.modules?.length || 0);
    };

    // Handle Rename Current Module
    const handleRenameModule = () => {
        if (!moduleRenameTitle.trim()) {
            toast.error('يرجى كتابة عنوان الوحدة الجديد');
            return;
        }
        updateCourse(selectedCourse.id, {
            modules: (selectedCourse.modules || []).map((m, idx) =>
                idx === selectedModuleIndex ? { ...m, title: moduleRenameTitle.trim() } : m
            ),
        });
        setIsRenameModuleOpen(false);
        toast.success('تم تعديل اسم الوحدة بنجاح');
    };

    // Handle Adding New Lesson to Current Module
    const handleAddLesson = (e) => {
        e?.preventDefault?.();
        if (!newLessonTitle.trim()) {
            toast.error('يرجى كتابة عنوان المحاضرة');
            return;
        }

        if (lessonVideoUrl && !getYouTubeVideoId(lessonVideoUrl)) {
            toast.error('أدخل رابط YouTube صالحًا بصيغة watch أو youtu.be أو Shorts');
            return;
        }

        const lessonPayload = {
            title: newLessonTitle.trim(),
            duration: lessonDuration.trim() || '25:00',
            free: isFreePreview,
            video: lessonVideoUrl.trim() || 'https://www.youtube.com/watch?v=_wmwmMeF3pE',
            files: lessonAttachedFiles.length > 0 ? lessonAttachedFiles : [`ملخص_${newLessonTitle.trim()}.pdf`],
            quiz: hasQuiz
                ? {
                    question: quizQuestion.trim() || `ما هي الفكرة الأساسية في محاضرة: ${newLessonTitle.trim()}؟`,
                    options: quizOptions.filter((o) => o.trim().length > 0),
                    correct: quizCorrectIndex,
                    explanation: quizExplanation.trim() || 'التطبيق والحل المستمر هو مفتاح الإتقان.',
                }
                : undefined,
        };

        addCourseLesson(selectedCourse.id, selectedModuleIndex, lessonPayload);
        setNewLessonTitle('');
        setLessonVideoUrl('');
        setLessonAttachedFiles([]);
        setQuizQuestion('');
        setIsAddLessonOpen(false);
        setAddLessonTab('details');
    };

    // Handle Create Course Submit
    const handleCreateCourseSubmit = (e) => {
        e.preventDefault();
        if (!newCourseForm.title.trim()) {
            toast.error('يرجى إدخال اسم الكورس');
            return;
        }

        const createdCourse = addCourse({
            title: newCourseForm.title.trim(),
            shortTitle: newCourseForm.shortTitle.trim() || newCourseForm.title.trim(),
            description: newCourseForm.description.trim() || 'شرح شامل للمنهج مع بنك أسئلة وتدريبات تفاعلية.',
            category: newCourseForm.category,
            track: newCourseForm.track,
            level: newCourseForm.level,
            price: Number(newCourseForm.price) || 0,
            oldPrice: Number(newCourseForm.oldPrice) || (Number(newCourseForm.price) + 200),
            accent: newCourseForm.accent,
            image: newCourseForm.image,
            instructor: user?.name || 'أ. د. أحمد الجوهري',
            instructorRole: user?.grade || 'كبير معلّمي المنصة',
            previewVideo: newCourseForm.previewVideo || 'https://www.youtube.com/watch?v=_wmwmMeF3pE',
            modules: [
                {
                    title: newCourseForm.firstModuleTitle.trim() || 'الوحدة الأولى: مدخل ومفاهيم أساسية',
                    count: 1,
                    duration: 'ساعة',
                    lessons: [
                        {
                            title: newCourseForm.firstLessonTitle.trim() || 'المحاضرة التأسيسية الأولى',
                            duration: '20:00',
                            free: true,
                            video: newCourseForm.firstLessonVideo.trim() || 'https://www.youtube.com/watch?v=_wmwmMeF3pE',
                            files: ['ملخص المحاضرة الأولى.pdf'],
                            quiz: {
                                question: 'ما هو الهدف الأساسي من هذه المحاضرة؟',
                                options: [
                                    'الفهم والتطبيق العملي المنظم',
                                    'الحفظ السطحي فقط',
                                    'تخطي التمارين الأولى',
                                    'الاعتماد على التخمين',
                                ],
                                correct: 0,
                                explanation: 'الفهم المنهجي والتطبيق خطوة بخطوة يضمن استيعاب الدرس.',
                            },
                        },
                    ],
                },
            ],
        });

        setIsCreateCourseOpen(false);
        setSelectedCourseId(createdCourse.id);
        setSelectedModuleIndex(0);
        handleTabChange('courses');
    };

    // Handle Admin Creating New Teacher Account
    const handleCreateTeacherSubmit = (e) => {
        e.preventDefault();
        if (!newTeacherForm.name.trim() || !newTeacherForm.email.trim()) {
            toast.error('يرجى كتابة اسم المعلم وبريده الإلكتروني');
            return;
        }

        createInstructorAccount({
            name: newTeacherForm.name.trim(),
            title: newTeacherForm.title.trim() || 'معلم ومعد مسارات',
            track: newTeacherForm.track.trim() || 'أحياء وكيمياء',
            phone: newTeacherForm.phone.trim() || '01000000000',
            email: newTeacherForm.email.trim(),
            password: newTeacherForm.password || '123456',
            governorate: newTeacherForm.governorate,
            bio: newTeacherForm.bio.trim() || 'معلم معتمد في منصة نَوَى التعليمية.',
        });

        setIsCreateTeacherOpen(false);
        setNewTeacherForm({
            name: '',
            title: 'معلم ومعد مسارات',
            track: 'أحياء وبيولوجيا جزيئية',
            phone: '',
            email: '',
            password: 'password',
            governorate: 'القاهرة',
            bio: '',
        });
    };

    // Handle Edit Course Details Submit
    const handleEditCourseSubmit = (e) => {
        e.preventDefault();
        if (!courseToEdit) return;
        updateCourse(courseToEdit.id, {
            title: courseToEdit.title,
            shortTitle: courseToEdit.shortTitle,
            description: courseToEdit.description,
            price: Number(courseToEdit.price),
            oldPrice: Number(courseToEdit.oldPrice),
            category: courseToEdit.category,
            level: courseToEdit.level,
            image: courseToEdit.image,
            previewVideo: courseToEdit.previewVideo,
        });
        setIsEditCourseOpen(false);
        setCourseToEdit(null);
    };

    // Handle Profile / Settings Save
    const handleSaveSettings = (e) => {
        e.preventDefault();
        updateProfile({
            name: settingsForm.name,
            grade: settingsForm.title,
            track: settingsForm.track,
            bio: settingsForm.bio,
            phone: settingsForm.phone,
            governorate: settingsForm.governorate,
        });
        toast.success('تم حفظ إعدادات المعلم والمنصة بنجاح');
    };

    // Handle Payout Request Submit
    const handlePayoutSubmit = (e) => {
        e.preventDefault();
        toast.success('تم إرسال طلب سحب الأرباح بنجاح! سيتم التحويل خلال ٢٤ ساعة عمل عبر المحفظة المختارة.');
        setIsPayoutOpen(false);
    };

    return (
        <PortalLayout activeTab={activeTab} role="instructor" onTabChange={handleTabChange}>
            {/* Top Heading Banner */}
            <div className="portal-heading">
                <div>
                    <div className="eyebrow">مساحة إدارة المنصة والمعلمين (Admin & Instructor Portal)</div>
                    <h1 className="display">مرحبًا بك يا {user?.name ? user.name.split(' ')[0] : 'أستاذنا'}.</h1>
                    <p className="muted">
                        أضف كورسات جديدة، ارفع المحاضرات والفيديوهات، أنشئ حسابات المعلمين الجدد، وتابع أرباحك وتفاعل طلابك لحظة بلحظة.
                    </p>
                </div>
                <div className="portal-heading-actions">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setIsCreateCourseOpen(true)}
                    >
                        <Plus size={16} /> إضافة كورس جديد
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => {
                            toast.info('جاري فتح معاينة تجربة الطالب للكورس الحالي');
                            window.location.href = `/learn/${selectedCourse.id}`;
                        }}
                    >
                        <Eye size={16} /> معاينة كطالب
                    </button>
                </div>
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
                <div className="instructor-tab-content">
                    {/* Key Metrics Stats Grid */}
                    <div className="instructor-stats-modern">
                        <div className="stat-card">
                            <div className="stat-card-icon stat-icon-earnings">
                                <Wallet size={24} />
                            </div>
                            <div className="stat-card-body">
                                <span>إجمالي الأرباح المكتسبة</span>
                                <strong>{formatPrice(instructorStats.totalEarnings)}</strong>
                                <small className="stat-growth-tag">
                                    <TrendingUp size={13} /> +١٨٪ هذا الشهر
                                </small>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card-icon stat-icon-students">
                                <Users size={24} />
                            </div>
                            <div className="stat-card-body">
                                <span>إجمالي الطلاب المشتركين</span>
                                <strong>{instructorStats.totalStudents.toLocaleString('ar-EG')}</strong>
                                <small>طالب يدرسون بكورساتك</small>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card-icon stat-icon-courses">
                                <BookOpen size={24} />
                            </div>
                            <div className="stat-card-body">
                                <span>الكورسات المنشورة</span>
                                <strong>{instructorStats.totalCourses.toLocaleString('ar-EG')}</strong>
                                <small>كورسات تستقبل اشتراكات</small>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card-icon stat-icon-lessons">
                                <Video size={24} />
                            </div>
                            <div className="stat-card-body">
                                <span>المحاضرات والفيديوهات</span>
                                <strong>{instructorStats.totalLessons.toLocaleString('ar-EG')}</strong>
                                <small>محاضرة وكويز تفاعلي</small>
                            </div>
                        </div>
                    </div>

                    {/* Quick Management Shortcuts */}
                    <div className="instructor-quick-actions">
                        <button
                            type="button"
                            className="quick-action-btn"
                            onClick={() => setIsCreateCourseOpen(true)}
                        >
                            <div className="action-circle action-circle-create">
                                <Plus size={20} />
                            </div>
                            <strong>إنشاء كورس جديد</strong>
                            <small>حدد الاسم والسعر والغلاف والمنهج</small>
                        </button>

                        <button
                            type="button"
                            className="quick-action-btn"
                            onClick={() => handleTabChange('courses')}
                        >
                            <div className="action-circle action-circle-edit">
                                <Pencil size={20} />
                            </div>
                            <strong>إدارة الفيديوهات والمحتوى</strong>
                            <small>أضف وحدات ودروس وروابط يوتيوب</small>
                        </button>

                        <button
                            type="button"
                            className="quick-action-btn"
                            onClick={() => setIsCreateTeacherOpen(true)}
                        >
                            <div className="action-circle action-circle-students">
                                <UserPlus size={20} />
                            </div>
                            <strong>إنشاء حساب معلم جديد</strong>
                            <small>إضافة وتفعيل مدرس جديد بالمنصة</small>
                        </button>

                        <button
                            type="button"
                            className="quick-action-btn"
                            onClick={() => setIsPayoutOpen(true)}
                        >
                            <div className="action-circle action-circle-payout">
                                <DollarSign size={20} />
                            </div>
                            <strong>طلب سحب الأرباح</strong>
                            <small>تحويل عبر فودافون كاش أو إنستاباي</small>
                        </button>
                    </div>

                    {/* Published Courses Overview Section */}
                    <section className="content-manager">
                        <div className="manager-head">
                            <div>
                                <div className="eyebrow">كورساتك الحالية</div>
                                <h2 className="section-title">الكورسات المتاحة للطلاب</h2>
                            </div>
                            <button
                                type="button"
                                className="btn btn-outline btn-small"
                                onClick={() => handleTabChange('courses')}
                            >
                                إدارة جميع الكورسات <ArrowLeft size={14} />
                            </button>
                        </div>

                        <div className="instructor-courses-grid">
                            {allCourses.slice(0, 4).map((c) => (
                                <div className="instructor-course-mini-card" key={c.id}>
                                    <div className="course-mini-thumb">
                                        <img src={c.image} alt={c.title} />
                                        <span className="course-price-badge">{formatPrice(c.price)}</span>
                                    </div>
                                    <div className="course-mini-body">
                                        <div className="course-mini-track">{c.track}</div>
                                        <h4>{c.title}</h4>
                                        <div className="course-mini-meta">
                                            <span><Video size={13} /> {c.lessons || 12} محاضرة</span>
                                            <span><Users size={13} /> {c.students || 0} طالب</span>
                                            <span><Star size={13} color="#eab308" fill="#eab308" /> {c.rating || 5.0}</span>
                                        </div>
                                        <div className="course-mini-actions">
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-small"
                                                onClick={() => {
                                                    setSelectedCourseId(c.id);
                                                    handleTabChange('courses');
                                                }}
                                            >
                                                <Pencil size={13} /> إدارة الدروس
                                            </button>
                                            <Link href={`/course/${c.id}`} className="btn btn-outline btn-small">
                                                معاينة <ExternalLink size={12} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            )}

            {/* TAB 2: COURSES & CURRICULUM MANAGEMENT */}
            {activeTab === 'courses' && (
                <div className="instructor-tab-content">
                    {/* Top Course Selector Bar */}
                    <div className="course-selector-bar">
                        <div className="selector-title">
                            <BookOpen size={20} />
                            <span>اختر الكورس لإدارته:</span>
                        </div>
                        <select
                            className="course-dropdown-select"
                            value={selectedCourse.id}
                            onChange={(e) => {
                                setSelectedCourseId(e.target.value);
                                setSelectedModuleIndex(0);
                            }}
                        >
                            {allCourses.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.title} — ({formatPrice(c.price)})
                                </option>
                            ))}
                        </select>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                                setCourseToEdit(selectedCourse);
                                setIsEditCourseOpen(true);
                            }}
                        >
                            <Pencil size={15} /> تعديل بيانات وسعر الكورس
                        </button>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setIsCreateCourseOpen(true)}
                        >
                            <Plus size={15} /> إضافة كورس جديد
                        </button>
                    </div>

                    {/* Course Header Overview Card */}
                    <div className="course-manager-banner">
                        <div className="banner-cover">
                            <img src={selectedCourse.image} alt={selectedCourse.title} />
                        </div>
                        <div className="banner-details">
                            <div className="banner-track-pill">{selectedCourse.track}</div>
                            <h3>{selectedCourse.title}</h3>
                            <p>{selectedCourse.description}</p>
                            <div className="banner-meta-row" style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: '0.85rem', color: 'var(--muted)', flexWrap: 'wrap' }}>
                                <span><b>السعر الحالي:</b> <strong style={{ color: 'var(--coral)' }}>{formatPrice(selectedCourse.price)}</strong></span>
                                <span><b>إجمالي المحاضرات:</b> {selectedCourse.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0} محاضرة</span>
                                <span><b>الوحدات الدراسية:</b> {selectedCourse.modules?.length || 0} وحدة</span>
                            </div>
                        </div>
                    </div>

                    {/* Modern & Intuitive Curriculum & Video Manager */}
                    <section className="content-manager curriculum-manager-section">
                        <div className="manager-head">
                            <div>
                                <div className="eyebrow">مُنشئ المنهج والمحاضرات التفاعلي</div>
                                <h2 className="section-title">الوحدات والدروس والمذكرات (PDF)</h2>
                            </div>
                            <div className="curriculum-head-actions">
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={() => toast.success('تمت مزامنة جميع تغييرات الكورس والمحاضرات بنجاح')}
                                >
                                    <Save size={15} /> حفظ ومزامنة التغييرات
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setIsAddLessonOpen(true);
                                        setAddLessonTab('details');
                                    }}
                                >
                                    <Plus size={15} /> إضافة محاضرة جديدة
                                </button>
                            </div>
                        </div>

                        {/* Horizontal Module Navigation Bar */}
                        <div className="curriculum-modules-nav">
                            <div className="modules-nav-list">
                                {(selectedCourse.modules || []).map((mod, index) => (
                                    <button
                                        type="button"
                                        className={`module-pill-btn ${selectedModuleIndex === index ? 'active' : ''}`}
                                        key={`${mod.title}-${index}`}
                                        onClick={() => setSelectedModuleIndex(index)}
                                    >
                                        <span className="module-pill-num">{String(index + 1).padStart(2, '0')}</span>
                                        <span className="module-pill-title">{mod.title}</span>
                                        <span className="module-pill-badge">{mod.lessons?.length || 0} محاضرات</span>
                                    </button>
                                ))}
                            </div>
                            <button
                                type="button"
                                className="btn btn-secondary btn-small add-module-btn"
                                onClick={() => setIsAddModuleOpen(true)}
                            >
                                <Plus size={14} /> إضافة وحدة جديدة
                            </button>
                        </div>

                        {/* Active Module Management Card */}
                        <div className="module-active-card">
                            <div className="module-card-header">
                                <div className="module-header-title-box">
                                    <div className="module-header-pill">الوحدة {selectedModuleIndex + 1}</div>
                                    <h3>{currentModule?.title || 'الوحدة الدراسية'}</h3>
                                    <span className="module-stats-tag">
                                        <Video size={13} /> {currentModule?.lessons?.length || 0} محاضرات ومذكرات
                                    </span>
                                </div>
                                <div className="module-header-actions">
                                    <button
                                        type="button"
                                        className="btn btn-outline btn-small"
                                        onClick={() => {
                                            setModuleRenameTitle(currentModule?.title || '');
                                            setIsRenameModuleOpen(true);
                                        }}
                                        title="تعديل اسم هذه الوحدة"
                                    >
                                        <Pencil size={13} /> تعديل اسم الوحدة
                                    </button>
                                    {(selectedCourse.modules || []).length > 1 && (
                                        <button
                                            type="button"
                                            className="btn btn-danger-outline btn-small"
                                            onClick={() => {
                                                if (window.confirm(`هل أنت متأكد من حذف وحدة "${currentModule?.title}" وجميع محاضراتها؟`)) {
                                                    deleteCourseModule(selectedCourse.id, selectedModuleIndex);
                                                    setSelectedModuleIndex(0);
                                                }
                                            }}
                                            title="حذف هذه الوحدة"
                                        >
                                            <Trash2 size={13} /> حذف الوحدة
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-small"
                                        onClick={() => {
                                            setIsAddLessonOpen(true);
                                            setAddLessonTab('details');
                                        }}
                                    >
                                        <Plus size={14} /> إضافة محاضرة لهذه الوحدة
                                    </button>
                                </div>
                            </div>

                            {/* Lessons List in Active Module */}
                            <div className="module-lessons-container">
                                {currentModule?.lessons && currentModule.lessons.length > 0 ? (
                                    <div className="module-lessons-grid">
                                        {currentModule.lessons.map((lesson, idx) => {
                                            const hasVideo = Boolean(lesson.video);
                                            const pdfCount = lesson.files?.length || 0;
                                            const hasQuizOption = Boolean(lesson.quiz);

                                            return (
                                                <div className="lesson-modern-card" key={`${lesson.title}-${idx}`}>
                                                    <div className="lesson-card-right-side">
                                                        <div className="lesson-num-badge">
                                                            {String(idx + 1).padStart(2, '0')}
                                                        </div>
                                                        <div className="lesson-info-content">
                                                            <div className="lesson-title-row">
                                                                <h4>{lesson.title}</h4>
                                                                {lesson.free && <span className="free-tag">معاينة مجانية</span>}
                                                            </div>
                                                            <div className="lesson-badges-row">
                                                                <span className="lesson-badge-item badge-duration">
                                                                    <Clock size={12} /> {lesson.duration || '25:00'}
                                                                </span>
                                                                {hasVideo && (
                                                                    <span className="lesson-badge-item badge-video">
                                                                        <Video size={12} /> YouTube
                                                                    </span>
                                                                )}
                                                                {pdfCount > 0 ? (
                                                                    <span className="lesson-badge-item badge-pdf">
                                                                        <FileText size={12} /> {pdfCount} مذكرة PDF مرفقة
                                                                    </span>
                                                                ) : (
                                                                    <span className="lesson-badge-item badge-pdf-empty">
                                                                        <FileText size={12} /> بدون مذكرات
                                                                    </span>
                                                                )}
                                                                {hasQuizOption && (
                                                                    <span className="lesson-badge-item badge-quiz">
                                                                        <HelpCircle size={12} /> كويز تفاعلي
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="lesson-card-actions">
                                                        {hasVideo && (
                                                            <button
                                                                type="button"
                                                                className="btn btn-secondary btn-small"
                                                                onClick={() => setPreviewVideoModalUrl(lesson.video)}
                                                                title="معاينة تشغيل الفيديو"
                                                            >
                                                                <Play size={13} /> تشغيل الفيديو
                                                            </button>
                                                        )}
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline btn-small"
                                                            onClick={() => {
                                                                setEditingLessonInfo({
                                                                    modIdx: selectedModuleIndex,
                                                                    lesIdx: idx,
                                                                    lesson: {
                                                                        ...lesson,
                                                                        files: Array.isArray(lesson.files) ? [...lesson.files] : (lesson.files ? [lesson.files] : []),
                                                                    },
                                                                });
                                                                setEditingLessonTab('details');
                                                            }}
                                                            title="تعديل المحاضرة والمذكرات"
                                                        >
                                                            <Pencil size={13} /> تعديل ورفع PDF
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger-outline btn-small icon-only-btn"
                                                            onClick={() => {
                                                                if (window.confirm(`هل أنت متأكد من حذف محاضرة "${lesson.title}"؟`)) {
                                                                    deleteCourseLesson(selectedCourse.id, selectedModuleIndex, idx);
                                                                }
                                                            }}
                                                            title="حذف المحاضرة"
                                                        >
                                                            <Trash2 size={13} />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="module-empty-state">
                                        <div className="empty-state-icon">
                                            <Video size={32} />
                                        </div>
                                        <h4>لا توجد محاضرات في هذه الوحدة بعد</h4>
                                        <p>أضف محاضرات وفيديوهات YouTube ومذكرات PDF لطلابك بسهولة وسرعة.</p>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => {
                                                setIsAddLessonOpen(true);
                                                setAddLessonTab('details');
                                            }}
                                        >
                                            <Plus size={16} /> إضافة أول محاضرة الآن
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {/* TAB 3: STUDENTS & ENROLLMENTS */}
            {activeTab === 'students' && (
                <div className="instructor-tab-content">
                    <section className="content-manager">
                        <div className="manager-head">
                            <div>
                                <div className="eyebrow">متابعة الطلاب والاشتراكات</div>
                                <h2 className="section-title">سجل الطلاب المسجلين بكورساتك</h2>
                            </div>
                            <div className="student-filter-actions">
                                <div className="search-input-wrap">
                                    <Search size={15} />
                                    <input
                                        type="text"
                                        value={studentSearch}
                                        onChange={(e) => setStudentSearch(e.target.value)}
                                        placeholder="ابحث بالاسم أو البريد..."
                                    />
                                </div>
                                <select
                                    value={studentCourseFilter}
                                    onChange={(e) => setStudentCourseFilter(e.target.value)}
                                >
                                    <option value="all">كل الكورسات</option>
                                    {allCourses.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="student-table">
                            <div className="table-row table-head">
                                <span>الطالب</span>
                                <span>المرحلة / المسار</span>
                                <span>الكورس المسجل به</span>
                                <span>نسبة الإنجاز</span>
                                <span>الحالة</span>
                                <span>آخر تفاعل</span>
                            </div>

                            {filteredStudents.map((st) => (
                                <div className="table-row" key={st.id}>
                                    <span className="table-student">
                                        <span>{st.name[0]}</span>
                                        <div>
                                            <strong>{st.name}</strong>
                                            <small className="muted">{st.email}</small>
                                        </div>
                                    </span>
                                    <span>{st.track}</span>
                                    <span>{st.courseTitle}</span>
                                    <span className="table-progress">
                                        <b>
                                            <i style={{ width: `${st.progress}%` }} />
                                        </b>
                                        {st.progress.toLocaleString('ar-EG')}٪
                                    </span>
                                    <span>
                                        <span className="student-status-badge">{st.status}</span>
                                    </span>
                                    <span className="muted">{st.lastActive}</span>
                                </div>
                            ))}

                            {filteredStudents.length === 0 && (
                                <div className="empty-resource">لا توجد نتائج مطابقة لبحثك.</div>
                            )}
                        </div>
                    </section>
                </div>
            )}

            {/* TAB 4: TEACHERS MANAGEMENT (ADMIN ONLY FEATURE) */}
            {activeTab === 'teachers' && (
                <div className="instructor-tab-content">
                    <section className="content-manager">
                        <div className="manager-head">
                            <div>
                                <div className="eyebrow">إدارة الكادر التدريسي</div>
                                <h2 className="section-title">المعلمون والمحاضرون المعتمدون بالمنصة</h2>
                            </div>
                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                <div className="search-input-wrap">
                                    <Search size={15} />
                                    <input
                                        type="text"
                                        value={teacherSearch}
                                        onChange={(e) => setTeacherSearch(e.target.value)}
                                        placeholder="ابحث باسم المدرس أو المادة..."
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-small"
                                    onClick={() => setIsCreateTeacherOpen(true)}
                                >
                                    <UserPlus size={15} /> إضافة حساب معلم جديد
                                </button>
                            </div>
                        </div>

                        <div className="instructor-courses-grid">
                            {filteredTeachers.map((tch) => (
                                <div className="instructor-course-mini-card" key={tch.email} style={{ padding: 18 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                                        <img
                                            src={tch.avatar || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=150&q=85'}
                                            alt={tch.name}
                                            style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }}
                                        />
                                        <div>
                                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>{tch.name}</h4>
                                            <span style={{ fontSize: '0.78rem', color: 'var(--coral-dark)', fontWeight: 600 }}>{tch.track || tch.grade}</span>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: '0 0 12px 0', lineHeight: 1.4 }}>
                                        {tch.bio || 'معلم خبير في منصة نَوَى التعليمية.'}
                                    </p>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--ink)', display: 'flex', flexDirection: 'column', gap: 4, background: 'var(--paper)', padding: 10, borderRadius: 10, marginBottom: 12 }}>
                                        <span><b>البريد:</b> {tch.email}</span>
                                        <span><b>الهاتف:</b> {tch.phone}</span>
                                        <span><b>المحافظة:</b> {tch.governorate}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-small"
                                            onClick={() => {
                                                setNewCourseForm((p) => ({ ...p, track: tch.track }));
                                                setIsCreateCourseOpen(true);
                                            }}
                                        >
                                            <Plus size={13} /> إسناد كورس جديد
                                        </button>
                                        {tch.email !== 'admin@nawa.education' && tch.email !== 'instructor@nawa.education' && (
                                            <button
                                                type="button"
                                                className="btn btn-danger-outline btn-small"
                                                onClick={() => deleteInstructorAccount(tch.email)}
                                                title="حذف حساب المعلم"
                                            >
                                                <Trash2 size={13} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            )}

            {/* TAB 5: EARNINGS & FINANCIALS */}
            {activeTab === 'earnings' && (
                <div className="instructor-tab-content">
                    {/* Financial Summary Cards */}
                    <div className="instructor-stats-modern">
                        <div className="stat-card">
                            <div className="stat-card-icon stat-icon-earnings">
                                <Wallet size={24} />
                            </div>
                            <div className="stat-card-body">
                                <span>الرصيد المتاح للسحب</span>
                                <strong>{formatPrice(instructorStats.totalEarnings)}</strong>
                                <small>جاهز للتحويل الفوري</small>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card-icon stat-icon-students">
                                <CreditCard size={24} />
                            </div>
                            <div className="stat-card-body">
                                <span>إجمالي عمليات الشراء</span>
                                <strong>{transactions.length.toLocaleString('ar-EG')} مبيعة</strong>
                                <small>عبر فودافون كاش وإنستاباي</small>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card-icon stat-icon-courses">
                                <Sparkles size={24} />
                            </div>
                            <div className="stat-card-body">
                                <span>نسبة عمولة المنصة</span>
                                <strong>٠٪ (عرض الإطلاق)</strong>
                                <small>١٠٠٪ من الأرباح لك كاملة</small>
                            </div>
                        </div>
                    </div>

                    {/* Payout Action Card */}
                    <div className="payout-cta-card">
                        <div>
                            <div className="eyebrow">التحويلات والأرباح</div>
                            <h3>هل تريد سحب أرباحك الآن؟</h3>
                            <p>
                                يمكنك سحب أي مبلغ إلى محفظتك الإلكترونية (فودافون كاش، أورنج، اتصالات، وي) أو عبر حسابك في إنستاباي InstaPay في دقائق.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary btn-large"
                            onClick={() => setIsPayoutOpen(true)}
                        >
                            <DollarSign size={18} /> طلب سحب الأرباح الآن
                        </button>
                    </div>

                    {/* Sales Transactions Log Table */}
                    <section className="content-manager">
                        <div className="manager-head">
                            <div>
                                <div className="eyebrow">سجل المعاملات المباشرة</div>
                                <h2 className="section-title">تفاصيل الاشتراكات والمبيعات</h2>
                            </div>
                            <button
                                type="button"
                                className="btn btn-outline btn-small"
                                onClick={() => toast.info('جاري تصدير تقرير المبيعات بصيغة Excel/PDF')}
                            >
                                <Upload size={14} /> تصدير التقرير المالي
                            </button>
                        </div>

                        <div className="student-table">
                            <div className="table-row table-head">
                                <span>رقم المعاملة</span>
                                <span>الطالب</span>
                                <span>الكورس</span>
                                <span>المبلغ المدفوع</span>
                                <span>وسيلة الدفع</span>
                                <span>التاريخ والحالة</span>
                            </div>

                            {transactions.map((tx) => (
                                <div className="table-row" key={tx.id}>
                                    <span className="font-mono text-muted">{tx.id}</span>
                                    <span className="table-student">
                                        <span>{tx.studentName[0]}</span>
                                        <strong>{tx.studentName}</strong>
                                    </span>
                                    <span>{tx.courseTitle}</span>
                                    <span className="font-bold text-coral">{formatPrice(tx.amount)}</span>
                                    <span>
                                        <span className="badge-pill">{tx.paymentMethod}</span>
                                    </span>
                                    <div>
                                        <small className="muted block">{tx.date}</small>
                                        <span className="success-tag">{tx.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            )}

            {/* TAB 6: PROFILE & SETTINGS */}
            {activeTab === 'settings' && (
                <div className="instructor-tab-content">
                    <section className="content-manager">
                        <div className="manager-head">
                            <div>
                                <div className="eyebrow">الملف الشخصي وإعدادات الحساب</div>
                                <h2 className="section-title">بيانات الإدارة والمعلم ومحفظة استلام الأرباح</h2>
                            </div>
                        </div>

                        <form onSubmit={handleSaveSettings} className="instructor-settings-form">
                            <div className="form-grid">
                                <label>
                                    الاسم بالكامل واللقب
                                    <input
                                        value={settingsForm.name}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                                        placeholder="أ. د. أحمد الجوهري"
                                    />
                                </label>

                                <label>
                                    المسمى الأكاديمي والتدريسي
                                    <input
                                        value={settingsForm.title}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, title: e.target.value })}
                                        placeholder="كبير معلّمي الأحياء والبيولوجيا الجزيئية"
                                    />
                                </label>

                                <label>
                                    المادة / التخصص
                                    <input
                                        value={settingsForm.track}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, track: e.target.value })}
                                        placeholder="أحياء وبيولوجيا جزيئية"
                                    />
                                </label>

                                <label>
                                    المحافظة
                                    <select
                                        value={settingsForm.governorate}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, governorate: e.target.value })}
                                    >
                                        {egyptEducationOptions.governorates.map((g) => (
                                            <option key={g} value={g}>
                                                {g}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="full-width-label">
                                    نبذة تعريفية عن خبرتك ومسيرتك التدريسية (تظهر للطلاب في صفحات الكورسات)
                                    <textarea
                                        rows={3}
                                        value={settingsForm.bio}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, bio: e.target.value })}
                                        placeholder="اكتب نبذة عن مؤهلاتك وخبرتك..."
                                    />
                                </label>
                            </div>

                            <div className="settings-section-divider">
                                <h3>
                                    <Wallet size={18} /> إعدادات استلام الأرباح والتحويلات
                                </h3>
                                <p className="muted">البيانات التي سيتم تحويل أرباح مبيعات كورساتك إليها</p>
                            </div>

                            <div className="form-grid">
                                <label>
                                    وسيلة السحب المفضلة
                                    <select
                                        value={settingsForm.walletType}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, walletType: e.target.value })}
                                    >
                                        <option value="vodafone">فودافون كاش / محافظ إلكترونية</option>
                                        <option value="instapay">إنستاباي InstaPay</option>
                                        <option value="bank">حساب بنكي مصري (IBAN)</option>
                                    </select>
                                </label>

                                <label>
                                    رقم المحفظة / عنوان إنستاباي (IPA)
                                    <input
                                        value={settingsForm.walletNumber}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, walletNumber: e.target.value })}
                                        placeholder="010XXXXXXXX أو yourname@instapay"
                                    />
                                </label>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                <Save size={16} /> حفظ وتحديث البيانات
                            </button>
                        </form>
                    </section>
                </div>
            )}

            {/* MODAL: ADMIN CREATING NEW INSTRUCTOR ACCOUNT */}
            {isCreateTeacherOpen && (
                <div className="nawa-modal-overlay" onClick={() => setIsCreateTeacherOpen(false)}>
                    <div className="nawa-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="nawa-modal-header">
                            <div>
                                <div className="eyebrow">إدارة المعلمين</div>
                                <h2>إنشاء وتفعيل حساب معلّم جديد</h2>
                            </div>
                            <button type="button" className="close-btn" onClick={() => setIsCreateTeacherOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateTeacherSubmit} className="nawa-modal-body">
                            <div className="form-grid">
                                <label className="full-width-label">
                                    اسم المعلم بالكامل واللقب الأكاديمي
                                    <input
                                        required
                                        value={newTeacherForm.name}
                                        onChange={(e) => setNewTeacherForm({ ...newTeacherForm, name: e.target.value })}
                                        placeholder="مثال: أ. د. محمد عبد المعبود"
                                    />
                                </label>

                                <label>
                                    المادة / التخصص
                                    <input
                                        required
                                        value={newTeacherForm.track}
                                        onChange={(e) => setNewTeacherForm({ ...newTeacherForm, track: e.target.value })}
                                        placeholder="مثال: فيزياء وفيزياء حديثة"
                                    />
                                </label>

                                <label>
                                    المسمى الوظيفي
                                    <input
                                        value={newTeacherForm.title}
                                        onChange={(e) => setNewTeacherForm({ ...newTeacherForm, title: e.target.value })}
                                        placeholder="كبير معلّمي الفيزياء"
                                    />
                                </label>

                                <label>
                                    رقم الهاتف
                                    <input
                                        type="tel"
                                        required
                                        value={newTeacherForm.phone}
                                        onChange={(e) => setNewTeacherForm({ ...newTeacherForm, phone: e.target.value })}
                                        placeholder="010XXXXXXXX"
                                    />
                                </label>

                                <label>
                                    المحافظة
                                    <select
                                        value={newTeacherForm.governorate}
                                        onChange={(e) => setNewTeacherForm({ ...newTeacherForm, governorate: e.target.value })}
                                    >
                                        {egyptEducationOptions.governorates.map((g) => (
                                            <option key={g} value={g}>{g}</option>
                                        ))}
                                    </select>
                                </label>

                                <label>
                                    البريد الإلكتروني المهني للمعلم
                                    <input
                                        type="email"
                                        required
                                        value={newTeacherForm.email}
                                        onChange={(e) => setNewTeacherForm({ ...newTeacherForm, email: e.target.value })}
                                        placeholder="teacher@nawa.education"
                                    />
                                </label>

                                <label>
                                    كلمة المرور المؤقتة للحساب
                                    <input
                                        type="password"
                                        required
                                        value={newTeacherForm.password}
                                        onChange={(e) => setNewTeacherForm({ ...newTeacherForm, password: e.target.value })}
                                        placeholder="123456"
                                    />
                                </label>

                                <label className="full-width-label">
                                    نبذة تعريفية عن خبرة المعلم
                                    <textarea
                                        rows={2}
                                        value={newTeacherForm.bio}
                                        onChange={(e) => setNewTeacherForm({ ...newTeacherForm, bio: e.target.value })}
                                        placeholder="خبرة أكثر من ١٥ عامًا في تدريس مناهج الثانوية العامة..."
                                    />
                                </label>
                            </div>

                            <div className="nawa-modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setIsCreateTeacherOpen(false)}>
                                    إلغاء
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    <UserPlus size={16} /> تفعيل وإنشاء حساب المعلم
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL: CREATE NEW COURSE */}
            {isCreateCourseOpen && (
                <div className="nawa-modal-overlay" onClick={() => setIsCreateCourseOpen(false)}>
                    <div className="nawa-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="nawa-modal-header">
                            <div>
                                <div className="eyebrow">إضافة محتوى جديد</div>
                                <h2>إنشاء ونشر كورس جديد</h2>
                            </div>
                            <button type="button" className="close-btn" onClick={() => setIsCreateCourseOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateCourseSubmit} className="nawa-modal-body">
                            <div className="form-grid">
                                <label className="full-width-label">
                                    عنوان الكورس الكامل
                                    <input
                                        required
                                        value={newCourseForm.title}
                                        onChange={(e) => setNewCourseForm({ ...newCourseForm, title: e.target.value })}
                                        placeholder="مثال: الأحياء والبيولوجيا الجزيئية — الصف الثالث الثانوي"
                                    />
                                </label>

                                <label>
                                    العنوان المختصر (يظهر في البطاقات والقوائم)
                                    <input
                                        value={newCourseForm.shortTitle}
                                        onChange={(e) => setNewCourseForm({ ...newCourseForm, shortTitle: e.target.value })}
                                        placeholder="مثال: أحياء تالتة ثانوي"
                                    />
                                </label>

                                <label>
                                    المرحلة والنظام التعليمي
                                    <select
                                        value={newCourseForm.category}
                                        onChange={(e) => setNewCourseForm({ ...newCourseForm, category: e.target.value })}
                                    >
                                        <option value="الثانوية العامة (علمي علوم)">الثانوية العامة (علمي علوم)</option>
                                        <option value="الثانوية العامة (علمي رياضة)">الثانوية العامة (علمي رياضة)</option>
                                        <option value="الثانوية العامة (أدبي)">الثانوية العامة (أدبي)</option>
                                        <option value="البكالوريا المصرية">البكالوريا المصرية</option>
                                    </select>
                                </label>

                                <label>
                                    الصف الدراسي
                                    <select
                                        value={newCourseForm.level}
                                        onChange={(e) => setNewCourseForm({ ...newCourseForm, level: e.target.value })}
                                    >
                                        <option value="الصف الثالث الثانوي">الصف الثالث الثانوي</option>
                                        <option value="الصف الثاني الثانوي">الصف الثاني الثانوي</option>
                                        <option value="الصف الأول الثانوي">الصف الأول الثانوي</option>
                                        <option value="الصف الأول بالبكالوريا (تمهيدي)">الصف الأول بالبكالوريا (تمهيدي)</option>
                                        <option value="الصف الثاني بالبكالوريا">الصف الثاني بالبكالوريا</option>
                                        <option value="الصف الثالث بالبكالوريا (تخرج)">الصف الثالث بالبكالوريا (تخرج)</option>
                                    </select>
                                </label>

                                <label>
                                    الشعبة / المسار
                                    <input
                                        value={newCourseForm.track}
                                        onChange={(e) => setNewCourseForm({ ...newCourseForm, track: e.target.value })}
                                        placeholder="مثال: علمي علوم / مسار الطب وعلوم الحياة"
                                    />
                                </label>

                                <label>
                                    السعر بعد الخصم (بالجنيه المصري EGP)
                                    <input
                                        type="number"
                                        required
                                        min={0}
                                        value={newCourseForm.price}
                                        onChange={(e) => setNewCourseForm({ ...newCourseForm, price: e.target.value })}
                                        placeholder="490"
                                    />
                                </label>

                                <label>
                                    السعر الأصلي قبل الخصم (EGP)
                                    <input
                                        type="number"
                                        min={0}
                                        value={newCourseForm.oldPrice}
                                        onChange={(e) => setNewCourseForm({ ...newCourseForm, oldPrice: e.target.value })}
                                        placeholder="690"
                                    />
                                </label>

                                <label className="full-width-label">
                                    وصف الكورس ومحتواه
                                    <textarea
                                        rows={2}
                                        value={newCourseForm.description}
                                        onChange={(e) => setNewCourseForm({ ...newCourseForm, description: e.target.value })}
                                        placeholder="اكتب نبذة عن ما سيحصل عليه الطالب عند الاشتراك..."
                                    />
                                </label>

                                <label className="full-width-label">
                                    رابط فيديو مقدمة الكورس / الإعلان الترويجي (YouTube)
                                    <input
                                        type="url"
                                        value={newCourseForm.previewVideo}
                                        onChange={(e) => setNewCourseForm({ ...newCourseForm, previewVideo: e.target.value })}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                    />
                                </label>

                                {/* Cover image preset selector */}
                                <div className="full-width-label">
                                    <label>صورة غلاف الكورس</label>
                                    <div className="preset-cover-grid">
                                        {COVER_PRESETS.map((p) => (
                                            <button
                                                type="button"
                                                key={p.label}
                                                className={`cover-preset-btn ${newCourseForm.image === p.url ? 'active' : ''}`}
                                                onClick={() => setNewCourseForm({ ...newCourseForm, image: p.url })}
                                            >
                                                <img src={p.url} alt={p.label} />
                                                <span>{p.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="full-width-label modal-sub-section">
                                    <h4>الوحدة التأسيسية الأولى (يتم إنشاؤها تلقائيًا مع الكورس)</h4>
                                    <div className="form-grid">
                                        <label>
                                            اسم الوحدة الأولى
                                            <input
                                                value={newCourseForm.firstModuleTitle}
                                                onChange={(e) => setNewCourseForm({ ...newCourseForm, firstModuleTitle: e.target.value })}
                                            />
                                        </label>
                                        <label>
                                            اسم أول محاضرة
                                            <input
                                                value={newCourseForm.firstLessonTitle}
                                                onChange={(e) => setNewCourseForm({ ...newCourseForm, firstLessonTitle: e.target.value })}
                                            />
                                        </label>
                                        <label className="full-width-label">
                                            رابط فيديو أول محاضرة (YouTube)
                                            <input
                                                type="url"
                                                value={newCourseForm.firstLessonVideo}
                                                onChange={(e) => setNewCourseForm({ ...newCourseForm, firstLessonVideo: e.target.value })}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="nawa-modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setIsCreateCourseOpen(false)}>
                                    إلغاء
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    <Plus size={16} /> إنشاء ونشر الكورس فورًا
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL: EDIT COURSE DETAILS & PRICE */}
            {isEditCourseOpen && courseToEdit && (
                <div className="nawa-modal-overlay" onClick={() => setIsEditCourseOpen(false)}>
                    <div className="nawa-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="nawa-modal-header">
                            <div>
                                <div className="eyebrow">تعديل بيانات الكورس</div>
                                <h2>{courseToEdit.title}</h2>
                            </div>
                            <button type="button" className="close-btn" onClick={() => setIsEditCourseOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleEditCourseSubmit} className="nawa-modal-body">
                            <div className="form-grid">
                                <label className="full-width-label">
                                    عنوان الكورس
                                    <input
                                        required
                                        value={courseToEdit.title}
                                        onChange={(e) => setCourseToEdit({ ...courseToEdit, title: e.target.value })}
                                    />
                                </label>

                                <label>
                                    العنوان المختصر
                                    <input
                                        value={courseToEdit.shortTitle}
                                        onChange={(e) => setCourseToEdit({ ...courseToEdit, shortTitle: e.target.value })}
                                    />
                                </label>

                                <label>
                                    المسار / الشعبة
                                    <input
                                        value={courseToEdit.track}
                                        onChange={(e) => setCourseToEdit({ ...courseToEdit, track: e.target.value })}
                                    />
                                </label>

                                <label>
                                    السعر بعد الخصم (EGP)
                                    <input
                                        type="number"
                                        required
                                        min={0}
                                        value={courseToEdit.price}
                                        onChange={(e) => setCourseToEdit({ ...courseToEdit, price: e.target.value })}
                                    />
                                </label>

                                <label>
                                    السعر الأصلي قبل الخصم (EGP)
                                    <input
                                        type="number"
                                        min={0}
                                        value={courseToEdit.oldPrice}
                                        onChange={(e) => setCourseToEdit({ ...courseToEdit, oldPrice: e.target.value })}
                                    />
                                </label>

                                <label className="full-width-label">
                                    الوصف
                                    <textarea
                                        rows={2}
                                        value={courseToEdit.description}
                                        onChange={(e) => setCourseToEdit({ ...courseToEdit, description: e.target.value })}
                                    />
                                </label>

                                <label className="full-width-label">
                                    رابط فيديو المعاينة (YouTube)
                                    <input
                                        type="url"
                                        value={courseToEdit.previewVideo}
                                        onChange={(e) => setCourseToEdit({ ...courseToEdit, previewVideo: e.target.value })}
                                    />
                                </label>
                            </div>

                            <div className="nawa-modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setIsEditCourseOpen(false)}>
                                    إلغاء
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    <Save size={16} /> حفظ التعديلات
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL: ADD NEW LESSON TO CURRENT MODULE */}
            {isAddLessonOpen && (
                <div className="nawa-modal-overlay" onClick={() => setIsAddLessonOpen(false)}>
                    <div className="nawa-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="nawa-modal-header">
                            <div>
                                <div className="eyebrow">{currentModule?.title || 'الوحدة الدراسية'}</div>
                                <h2>إضافة محاضرة ومذكرات جديدة</h2>
                            </div>
                            <button type="button" className="close-btn" onClick={() => setIsAddLessonOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Navigation Tabs */}
                        <div className="modal-nav-tabs">
                            <button
                                type="button"
                                className={`modal-nav-tab ${addLessonTab === 'details' ? 'active' : ''}`}
                                onClick={() => setAddLessonTab('details')}
                            >
                                <Video size={14} /> بيانات المحاضرة والفيديو
                            </button>
                            <button
                                type="button"
                                className={`modal-nav-tab ${addLessonTab === 'files' ? 'active' : ''}`}
                                onClick={() => setAddLessonTab('files')}
                            >
                                <FileText size={14} /> رفع مذكرات الـ PDF ({lessonAttachedFiles.length})
                            </button>
                            <button
                                type="button"
                                className={`modal-nav-tab ${addLessonTab === 'quiz' ? 'active' : ''}`}
                                onClick={() => setAddLessonTab('quiz')}
                            >
                                <HelpCircle size={14} /> كويز تفاعلي {hasQuiz ? '✓' : ''}
                            </button>
                        </div>

                        <form onSubmit={handleAddLesson} className="nawa-modal-body">
                            {/* TAB 1: DETAILS & VIDEO */}
                            {addLessonTab === 'details' && (
                                <div className="form-grid">
                                    <label className="full-width-label">
                                        عنوان المحاضرة
                                        <input
                                            required
                                            value={newLessonTitle}
                                            onChange={(e) => setNewLessonTitle(e.target.value)}
                                            placeholder="مثال: مقدمة في بنية الخلية وأجهزتها الحيوية"
                                            autoFocus
                                        />
                                    </label>

                                    <label>
                                        مدة المحاضرة التقديرية
                                        <input
                                            value={lessonDuration}
                                            onChange={(e) => setLessonDuration(e.target.value)}
                                            placeholder="مثال: 25:00"
                                        />
                                    </label>

                                    <label className="editor-check" style={{ marginTop: 28 }}>
                                        <input
                                            type="checkbox"
                                            checked={isFreePreview}
                                            onChange={(e) => setIsFreePreview(e.target.checked)}
                                        />{' '}
                                        إتاحة هذه المحاضرة مجانًا للمعاينة بدون اشتراك
                                    </label>

                                    <label className="full-width-label">
                                        رابط فيديو المحاضرة (YouTube)
                                        <input
                                            type="url"
                                            value={lessonVideoUrl}
                                            onChange={(e) => setLessonVideoUrl(e.target.value)}
                                            placeholder="https://www.youtube.com/watch?v=... أو youtu.be/..."
                                        />
                                    </label>

                                    {/* Video Preview Tester */}
                                    {lessonVideoUrl && getYouTubeVideoId(lessonVideoUrl) && (
                                        <div className="video-live-preview">
                                            <div className="preview-indicator">
                                                <CheckCircle2 size={14} color="#16a34a" /> رابط فيديو صالح وجاهز للعرض:
                                            </div>
                                            <div className="preview-frame-wrap">
                                                <iframe
                                                    src={getYouTubeEmbedUrl(lessonVideoUrl)}
                                                    title="معاينة الفيديو"
                                                    allowFullScreen
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* TAB 2: PDF UPLOAD FROM DEVICE */}
                            {addLessonTab === 'files' && (
                                <div className="pdf-upload-panel">
                                    <div className="pdf-dropzone">
                                        <Upload size={32} className="dropzone-icon" />
                                        <h4>اختر أو اسحب ملفات الـ PDF من جهازك</h4>
                                        <p>يمكنك رفع مذكرات الشرح، أوراق العمل، وبنوك الأسئلة بصيغة PDF ليتمكن الطلاب من تحميلها.</p>
                                        <label className="btn btn-primary btn-small file-browse-btn">
                                            <Upload size={14} /> تصفح واختيار ملفات PDF من جهازك
                                            <input
                                                type="file"
                                                accept=".pdf,application/pdf"
                                                multiple
                                                onChange={(e) => handleFileUpload(e, 'new')}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    </div>

                                    <div className="pdf-preset-actions">
                                        <span>أو استخدم نموذجاً جاهزاً:</span>
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-small"
                                            onClick={() => handleAddPresetPdf('new')}
                                        >
                                            <FileText size={13} /> إرفاق مذكرة المنهج النموذجية
                                        </button>
                                    </div>

                                    {/* List of Attached PDF Files */}
                                    <div className="attached-files-list">
                                        <div className="attached-files-head">
                                            <strong>الملفات المرفقة بالمحاضرة ({lessonAttachedFiles.length}):</strong>
                                        </div>

                                        {lessonAttachedFiles.length > 0 ? (
                                            lessonAttachedFiles.map((file, fIdx) => (
                                                <div className="pdf-file-card" key={`${file.name}-${fIdx}`}>
                                                    <div className="pdf-file-meta">
                                                        <span className="pdf-icon-wrap">
                                                            <FileText size={18} />
                                                        </span>
                                                        <div>
                                                            <strong>{file.name}</strong>
                                                            <small>{file.size || 'مستند PDF'} · {file.uploadedAt || 'مرفوع الآن'}</small>
                                                        </div>
                                                    </div>
                                                    <div className="pdf-file-actions">
                                                        {file.dataUrl && (
                                                            <a
                                                                href={file.dataUrl}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="btn btn-outline btn-small"
                                                                title="معاينة الملف"
                                                            >
                                                                <Eye size={12} /> معاينة
                                                            </a>
                                                        )}
                                                        <button
                                                            type="button"
                                                            className="danger-icon"
                                                            onClick={() => handleRemoveFile(fIdx, 'new')}
                                                            title="حذف هذا الملف"
                                                        >
                                                            <Trash2 size={15} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="no-files-hint">لم تقم برفع أي ملفات PDF لهذه المحاضرة بعد.</div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* TAB 3: QUIZ BUILDER */}
                            {addLessonTab === 'quiz' && (
                                <div className="quiz-builder-panel">
                                    <label className="editor-check" style={{ marginBottom: 16 }}>
                                        <input
                                            type="checkbox"
                                            checked={hasQuiz}
                                            onChange={(e) => setHasQuiz(e.target.checked)}
                                        />{' '}
                                        إرفاق كويز استيعاب تفاعلي يظهر للطالب بعد مشاهدة الدرس
                                    </label>

                                    {hasQuiz && (
                                        <div className="inline-quiz-builder">
                                            <label>
                                                نص السؤال التفاعلي
                                                <input
                                                    value={quizQuestion}
                                                    onChange={(e) => setQuizQuestion(e.target.value)}
                                                    placeholder={`ما هي الفكرة الأساسية في محاضرة "${newLessonTitle || 'الدرس'}"؟`}
                                                />
                                            </label>

                                            <div className="quiz-options-group">
                                                <div style={{ fontSize: '0.84rem', fontWeight: 700, marginBottom: 6 }}>
                                                    خيارات الإجابة (حدد الدائرة بجانب الإجابة الصحيحة):
                                                </div>
                                                <div className="quiz-options-grid">
                                                    {quizOptions.map((opt, optIdx) => (
                                                        <div className="quiz-opt-item" key={optIdx}>
                                                            <input
                                                                type="radio"
                                                                name="addQuizCorrectOpt"
                                                                checked={quizCorrectIndex === optIdx}
                                                                onChange={() => setQuizCorrectIndex(optIdx)}
                                                                title="حدد هذه الإجابة كإجابة صحيحة"
                                                            />
                                                            <input
                                                                value={opt}
                                                                onChange={(e) => {
                                                                    const next = [...quizOptions];
                                                                    next[optIdx] = e.target.value;
                                                                    setQuizOptions(next);
                                                                }}
                                                                placeholder={`الخيار ${optIdx + 1}`}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <label>
                                                تفسير وشرح الإجابة النموذجية (يظهر للطالب عند الحل)
                                                <input
                                                    value={quizExplanation}
                                                    onChange={(e) => setQuizExplanation(e.target.value)}
                                                    placeholder="التطبيق العملي المنهجي هو مفتاح الإتقان والتفوق."
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="nawa-modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setIsAddLessonOpen(false)}>
                                    إلغاء
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    <Upload size={16} /> نشر المحاضرة للطلاب فورًا
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL: EDIT SPECIFIC LESSON & PDF ATTACHMENTS */}
            {editingLessonInfo && (
                <div className="nawa-modal-overlay" onClick={() => setEditingLessonInfo(null)}>
                    <div className="nawa-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="nawa-modal-header">
                            <div>
                                <div className="eyebrow">تعديل المحاضرة والمذكرات</div>
                                <h2>{editingLessonInfo.lesson.title}</h2>
                            </div>
                            <button type="button" className="close-btn" onClick={() => setEditingLessonInfo(null)}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Navigation Tabs */}
                        <div className="modal-nav-tabs">
                            <button
                                type="button"
                                className={`modal-nav-tab ${editingLessonTab === 'details' ? 'active' : ''}`}
                                onClick={() => setEditingLessonTab('details')}
                            >
                                <Video size={14} /> بيانات وفيديو المحاضرة
                            </button>
                            <button
                                type="button"
                                className={`modal-nav-tab ${editingLessonTab === 'files' ? 'active' : ''}`}
                                onClick={() => setEditingLessonTab('files')}
                            >
                                <FileText size={14} /> ملفات الـ PDF ({editingLessonInfo.lesson.files?.length || 0})
                            </button>
                            <button
                                type="button"
                                className={`modal-nav-tab ${editingLessonTab === 'quiz' ? 'active' : ''}`}
                                onClick={() => setEditingLessonTab('quiz')}
                            >
                                <HelpCircle size={14} /> الكويز التفاعلي
                            </button>
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                updateCourseLesson(
                                    selectedCourse.id,
                                    editingLessonInfo.modIdx,
                                    editingLessonInfo.lesIdx,
                                    editingLessonInfo.lesson
                                );
                                setEditingLessonInfo(null);
                            }}
                            className="nawa-modal-body"
                        >
                            {/* TAB 1: DETAILS */}
                            {editingLessonTab === 'details' && (
                                <div className="form-grid">
                                    <label className="full-width-label">
                                        عنوان المحاضرة
                                        <input
                                            required
                                            value={editingLessonInfo.lesson.title}
                                            onChange={(e) =>
                                                setEditingLessonInfo({
                                                    ...editingLessonInfo,
                                                    lesson: { ...editingLessonInfo.lesson, title: e.target.value },
                                                })
                                            }
                                        />
                                    </label>

                                    <label>
                                        المدة
                                        <input
                                            value={editingLessonInfo.lesson.duration}
                                            onChange={(e) =>
                                                setEditingLessonInfo({
                                                    ...editingLessonInfo,
                                                    lesson: { ...editingLessonInfo.lesson, duration: e.target.value },
                                                })
                                            }
                                        />
                                    </label>

                                    <label className="editor-check" style={{ marginTop: 28 }}>
                                        <input
                                            type="checkbox"
                                            checked={Boolean(editingLessonInfo.lesson.free)}
                                            onChange={(e) =>
                                                setEditingLessonInfo({
                                                    ...editingLessonInfo,
                                                    lesson: { ...editingLessonInfo.lesson, free: e.target.checked },
                                                })
                                            }
                                        />{' '}
                                        محاضرة مجانية للمعاينة
                                    </label>

                                    <label className="full-width-label">
                                        رابط فيديو YouTube
                                        <input
                                            type="url"
                                            value={editingLessonInfo.lesson.video}
                                            onChange={(e) =>
                                                setEditingLessonInfo({
                                                    ...editingLessonInfo,
                                                    lesson: { ...editingLessonInfo.lesson, video: e.target.value },
                                                })
                                            }
                                        />
                                    </label>
                                </div>
                            )}

                            {/* TAB 2: PDF UPLOAD FOR EDIT */}
                            {editingLessonTab === 'files' && (
                                <div className="pdf-upload-panel">
                                    <div className="pdf-dropzone">
                                        <Upload size={32} className="dropzone-icon" />
                                        <h4>رفع مذكرات PDF إضافية من جهازك</h4>
                                        <p>اختر ملفات جديدة من جهازك لإضافتها لهذه المحاضرة.</p>
                                        <label className="btn btn-primary btn-small file-browse-btn">
                                            <Upload size={14} /> اختيار ملفات PDF من جهازك
                                            <input
                                                type="file"
                                                accept=".pdf,application/pdf"
                                                multiple
                                                onChange={(e) => handleFileUpload(e, 'edit')}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    </div>

                                    <div className="pdf-preset-actions">
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-small"
                                            onClick={() => handleAddPresetPdf('edit')}
                                        >
                                            <FileText size={13} /> إرفاق مذكرة المنهج الجاهزة
                                        </button>
                                    </div>

                                    {/* Attached Files list */}
                                    <div className="attached-files-list">
                                        <div className="attached-files-head">
                                            <strong>الملفات المرفقة حالياً ({editingLessonInfo.lesson.files?.length || 0}):</strong>
                                        </div>

                                        {editingLessonInfo.lesson.files && editingLessonInfo.lesson.files.length > 0 ? (
                                            editingLessonInfo.lesson.files.map((file, fIdx) => {
                                                const fileName = typeof file === 'string' ? file : (file.name || 'مذكرة.pdf');
                                                const fileSize = typeof file === 'object' && file.size ? file.size : 'ملف PDF';
                                                const dataUrl = typeof file === 'object' && file.dataUrl ? file.dataUrl : null;

                                                return (
                                                    <div className="pdf-file-card" key={`${fileName}-${fIdx}`}>
                                                        <div className="pdf-file-meta">
                                                            <span className="pdf-icon-wrap">
                                                                <FileText size={18} />
                                                            </span>
                                                            <div>
                                                                <strong>{fileName}</strong>
                                                                <small>{fileSize}</small>
                                                            </div>
                                                        </div>
                                                        <div className="pdf-file-actions">
                                                            {dataUrl && (
                                                                <a
                                                                    href={dataUrl}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="btn btn-outline btn-small"
                                                                >
                                                                    <Eye size={12} /> معاينة
                                                                </a>
                                                            )}
                                                            <button
                                                                type="button"
                                                                className="danger-icon"
                                                                onClick={() => handleRemoveFile(fIdx, 'edit')}
                                                                title="حذف هذا الملف"
                                                            >
                                                                <Trash2 size={15} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="no-files-hint">لا توجد ملفات مرفقة بهذه المحاضرة.</div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* TAB 3: QUIZ EDIT */}
                            {editingLessonTab === 'quiz' && (
                                <div className="quiz-builder-panel">
                                    <label className="editor-check" style={{ marginBottom: 16 }}>
                                        <input
                                            type="checkbox"
                                            checked={Boolean(editingLessonInfo.lesson.quiz)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setEditingLessonInfo({
                                                        ...editingLessonInfo,
                                                        lesson: {
                                                            ...editingLessonInfo.lesson,
                                                            quiz: {
                                                                question: `ما هي الفكرة الأساسية في محاضرة "${editingLessonInfo.lesson.title}"؟`,
                                                                options: ['الفهم والتطبيق المنظم', 'الحفظ فقط', 'تخطي التمارين', 'التخمين'],
                                                                correct: 0,
                                                                explanation: 'التطبيق العملي المنهجي هو مفتاح الإتقان.',
                                                            },
                                                        },
                                                    });
                                                } else {
                                                    const copy = { ...editingLessonInfo.lesson };
                                                    delete copy.quiz;
                                                    setEditingLessonInfo({ ...editingLessonInfo, lesson: copy });
                                                }
                                            }}
                                        />{' '}
                                        تفعيل كويز تفاعلي لهذه المحاضرة
                                    </label>

                                    {editingLessonInfo.lesson.quiz && (
                                        <div className="inline-quiz-builder">
                                            <label>
                                                نص السؤال
                                                <input
                                                    value={editingLessonInfo.lesson.quiz.question || ''}
                                                    onChange={(e) =>
                                                        setEditingLessonInfo({
                                                            ...editingLessonInfo,
                                                            lesson: {
                                                                ...editingLessonInfo.lesson,
                                                                quiz: {
                                                                    ...editingLessonInfo.lesson.quiz,
                                                                    question: e.target.value,
                                                                },
                                                            },
                                                        })
                                                    }
                                                />
                                            </label>

                                            <div className="quiz-options-group">
                                                <div style={{ fontSize: '0.84rem', fontWeight: 700, marginBottom: 6 }}>
                                                    خيارات الإجابة:
                                                </div>
                                                <div className="quiz-options-grid">
                                                    {(editingLessonInfo.lesson.quiz.options || []).map((opt, optIdx) => (
                                                        <div className="quiz-opt-item" key={optIdx}>
                                                            <input
                                                                type="radio"
                                                                name="editQuizCorrectOpt"
                                                                checked={editingLessonInfo.lesson.quiz.correct === optIdx}
                                                                onChange={() =>
                                                                    setEditingLessonInfo({
                                                                        ...editingLessonInfo,
                                                                        lesson: {
                                                                            ...editingLessonInfo.lesson,
                                                                            quiz: {
                                                                                ...editingLessonInfo.lesson.quiz,
                                                                                correct: optIdx,
                                                                            },
                                                                        },
                                                                    })
                                                                }
                                                            />
                                                            <input
                                                                value={opt}
                                                                onChange={(e) => {
                                                                    const nextOpts = [...editingLessonInfo.lesson.quiz.options];
                                                                    nextOpts[optIdx] = e.target.value;
                                                                    setEditingLessonInfo({
                                                                        ...editingLessonInfo,
                                                                        lesson: {
                                                                            ...editingLessonInfo.lesson,
                                                                            quiz: {
                                                                                ...editingLessonInfo.lesson.quiz,
                                                                                options: nextOpts,
                                                                            },
                                                                        },
                                                                    });
                                                                }}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <label>
                                                تفسير وشرح الإجابة
                                                <input
                                                    value={editingLessonInfo.lesson.quiz.explanation || ''}
                                                    onChange={(e) =>
                                                        setEditingLessonInfo({
                                                            ...editingLessonInfo,
                                                            lesson: {
                                                                ...editingLessonInfo.lesson,
                                                                quiz: {
                                                                    ...editingLessonInfo.lesson.quiz,
                                                                    explanation: e.target.value,
                                                                },
                                                            },
                                                        })
                                                    }
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="nawa-modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setEditingLessonInfo(null)}>
                                    إلغاء
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    <Save size={16} /> حفظ التعديلات
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL: VIDEO PLAYER QUICK PREVIEW */}
            {previewVideoModalUrl && (
                <div className="nawa-modal-overlay" onClick={() => setPreviewVideoModalUrl(null)}>
                    <div className="nawa-modal-card video-preview-popup" onClick={(e) => e.stopPropagation()}>
                        <div className="nawa-modal-header">
                            <div>
                                <div className="eyebrow">مشغل المعاينة السريعة</div>
                                <h2>معاينة تشغيل فيديو المحاضرة</h2>
                            </div>
                            <button type="button" className="close-btn" onClick={() => setPreviewVideoModalUrl(null)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="nawa-modal-body">
                            <div className="popup-video-frame">
                                <iframe
                                    src={getYouTubeEmbedUrl(previewVideoModalUrl)}
                                    title="تشغيل الفيديو"
                                    allowFullScreen
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: RENAME MODULE */}
            {isRenameModuleOpen && (
                <div className="nawa-modal-overlay" onClick={() => setIsRenameModuleOpen(false)}>
                    <div className="nawa-modal-card" style={{ maxWidth: 480 }} onClick={(e) => e.stopPropagation()}>
                        <div className="nawa-modal-header">
                            <div>
                                <div className="eyebrow">تعديل الوحدة</div>
                                <h2>تغيير اسم الوحدة الدراسية</h2>
                            </div>
                            <button type="button" className="close-btn" onClick={() => setIsRenameModuleOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="nawa-modal-body">
                            <label>
                                عنوان الوحدة الجديد
                                <input
                                    value={moduleRenameTitle}
                                    onChange={(e) => setModuleRenameTitle(e.target.value)}
                                    placeholder="مثال: الوحدة الأولى: التأسيس والمفاهيم"
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleRenameModule();
                                        }
                                    }}
                                />
                            </label>
                            <div className="nawa-modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setIsRenameModuleOpen(false)}>
                                    إلغاء
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleRenameModule}>
                                    <Save size={15} /> حفظ اسم الوحدة
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: ADD NEW MODULE */}
            {isAddModuleOpen && (
                <div className="nawa-modal-overlay" onClick={() => setIsAddModuleOpen(false)}>
                    <div className="nawa-modal-card" style={{ maxWidth: 480 }} onClick={(e) => e.stopPropagation()}>
                        <div className="nawa-modal-header">
                            <div>
                                <div className="eyebrow">إضافة وحدة</div>
                                <h2>إنشاء وحدة دراسية جديدة</h2>
                            </div>
                            <button type="button" className="close-btn" onClick={() => setIsAddModuleOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="nawa-modal-body">
                            <label>
                                اسم الوحدة الدراسية الجديدة
                                <input
                                    value={newModuleTitle}
                                    onChange={(e) => setNewModuleTitle(e.target.value)}
                                    placeholder="مثال: الوحدة الثالثة: الكيمياء العضوية وتطبيقاتها"
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddModule();
                                        }
                                    }}
                                />
                            </label>
                            <div className="nawa-modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModuleOpen(false)}>
                                    إلغاء
                                </button>
                                <button type="button" className="btn btn-primary" onClick={() => handleAddModule()}>
                                    <Plus size={15} /> إنشاء الوحدة
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: PAYOUT REQUEST */}
            {isPayoutOpen && (
                <div className="nawa-modal-overlay" onClick={() => setIsPayoutOpen(false)}>
                    <div className="nawa-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="nawa-modal-header">
                            <div>
                                <div className="eyebrow">سحب الأرباح والمستحقات</div>
                                <h2>طلب تحويل فوري</h2>
                            </div>
                            <button type="button" className="close-btn" onClick={() => setIsPayoutOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handlePayoutSubmit} className="nawa-modal-body">
                            <div className="payout-balance-box">
                                <span>الرصيد المتاح للسحب:</span>
                                <strong>{formatPrice(instructorStats.totalEarnings)}</strong>
                            </div>

                            <div className="form-grid">
                                <label>
                                    المبلغ المطلوب سحبه (EGP)
                                    <input
                                        type="number"
                                        required
                                        min={100}
                                        max={instructorStats.totalEarnings}
                                        defaultValue={instructorStats.totalEarnings}
                                    />
                                </label>

                                <label>
                                    طريقة التحويل
                                    <select defaultValue="vodafone">
                                        <option value="vodafone">فودافون كاش / محفظة هاتف</option>
                                        <option value="instapay">إنستاباي InstaPay</option>
                                        <option value="bank">تحويل بنكي مصري</option>
                                    </select>
                                </label>

                                <label className="full-width-label">
                                    رقم الهاتف / عنوان إنستاباي
                                    <input
                                        required
                                        defaultValue={user?.phone || '01012345678'}
                                        placeholder="010XXXXXXXX أو username@instapay"
                                    />
                                </label>
                            </div>

                            <div className="nawa-modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setIsPayoutOpen(false)}>
                                    إلغاء
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    <DollarSign size={16} /> تأكيد طلب السحب
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </PortalLayout>
    );
};

export default InstructorDashboardPage;
