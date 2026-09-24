import React, { useState } from 'react';
import {
  Eye,
  Save,
  Plus,
  Video,
  Pencil,
  Trash2,
  Upload,
  ChevronLeft,
  ArrowLeft,
  BookOpen,
  Users,
  BarChart3,
} from 'lucide-react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useLearning } from '@/hooks/useLearning';
import { courses } from '@/lib/data';
import { toast } from 'sonner';

export const InstructorDashboardPage: React.FC = () => {
  const {
    modules,
    addModule,
    deleteModule,
    addLesson,
    deleteLesson,
    resetModules,
  } = useLearning();

  const [selectedModule, setSelectedModule] = useState<number>(0);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4');
  const [fileName, setFileName] = useState('');
  const [quizEnabled, setQuizEnabled] = useState(true);

  const currentModule = modules[selectedModule] ?? modules[0];
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);

  const handleAddModule = () => {
    if (!newModuleTitle.trim()) return;
    addModule(newModuleTitle);
    setSelectedModule(modules.length);
    setNewModuleTitle('');
  };

  const handleAddLesson = () => {
    if (!newLessonTitle.trim()) {
      toast.error('يرجى كتابة عنوان المحاضرة');
      return;
    }
    addLesson(selectedModule, {
      title: newLessonTitle.trim(),
      duration: '15:00',
      video: videoUrl,
      files: fileName.trim() ? [fileName.trim()] : [],
      quiz: quizEnabled
        ? {
            question: `ما الفكرة الأساسية في محاضرة: ${newLessonTitle.trim()}؟`,
            options: [
              'الفهم والتطبيق العملي المنظم',
              'التخطي السريع للمعلومات',
              'حفظ المحتوى دون استيعاب',
              'نسخ نماذج جاهزة فقط',
            ],
            correct: 0,
            explanation: 'التطبيق العملي المنهجي هو مفتاح الإتقان.',
          }
        : undefined,
    });
    setNewLessonTitle('');
    setFileName('');
  };

  const studentsList = [
    { name: 'سارة أحمد', course: 'استراتيجية المحتوى', progress: 72, time: 'منذ ساعتين' },
    { name: 'محمد علي', course: 'الأحياء — الصف الثالث الثانوي', progress: 58, time: 'منذ ٤ ساعات' },
    { name: 'نورهان مصطفى', course: 'الرياضيات — الصف الثاني الثانوي', progress: 84, time: 'أمس' },
    { name: 'كريم محمود', course: 'اللغة العربية — الصف الثالث الإعدادي', progress: 45, time: 'منذ يومين' },
  ];

  return (
    <PortalLayout activeTab="overview" role="instructor">
      {/* Top Heading */}
      <div className="portal-heading">
        <div>
          <div className="eyebrow">مساحة إدارة المنصة والمعلم</div>
          <h1 className="display">كل شيء في يدك.</h1>
          <p className="muted">
            أضف، عدّل، وانشر المحتوى والدروس للطلاب من مكان واحد بكل سهولة.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            toast.info('جاري فتح معاينة تجربة الطالب');
            window.location.href = '/learn/creative-strategy';
          }}
        >
          <Eye size={16} /> معاينة تجربة الطالب
        </button>
      </div>

      {/* Stats Cards */}
      <div className="instructor-stats">
        <div>
          <span>الكورسات المنشورة</span>
          <strong>{courses.length.toLocaleString('ar-EG')}</strong>
          <small>تعمل وتستقبل طلابًا</small>
        </div>
        <div>
          <span>إجمالي الطلاب المسجلين</span>
          <strong>٥,٠٤٠</strong>
          <small>+١٢٪ نمو هذا الشهر</small>
        </div>
        <div>
          <span>متوسط الإنجاز</span>
          <strong>٦٤٪</strong>
          <small>معدل إكمال الوحدات</small>
        </div>
        <div>
          <span>المحتوى والمحاضرات</span>
          <strong>{totalLessons.toLocaleString('ar-EG')}</strong>
          <small>محاضرة منشورة</small>
        </div>
      </div>

      {/* Course Content Manager */}
      <section className="content-manager">
        <div className="manager-head">
          <div>
            <div className="eyebrow">إدارة محتوى الكورس</div>
            <h2 className="section-title">{courses[0].title}</h2>
          </div>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => toast.success('تم حفظ ومزامنة جميع التغييرات بنجاح')}
          >
            <Save size={15} /> حفظ ومزامنة الكل
          </button>
        </div>

        <div className="manager-layout">
          {/* Modules Column */}
          <div className="manager-modules">
            <div className="manager-label">
              الوحدات الدراسية <span>({modules.length.toLocaleString('ar-EG')})</span>
            </div>

            {modules.map((mod, index) => (
              <button
                type="button"
                className={`manager-module ${selectedModule === index ? 'active' : ''}`}
                key={mod.title}
                onClick={() => setSelectedModule(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{mod.title}</strong>
                  <small>
                    {mod.lessons.length} محاضرات · {mod.duration}
                  </small>
                </div>
                <ChevronLeft size={16} />
              </button>
            ))}

            <div className="add-inline">
              <input
                value={newModuleTitle}
                onChange={(e) => setNewModuleTitle(e.target.value)}
                placeholder="اسم وحدة دراسية جديدة..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddModule();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddModule}
                aria-label="إضافة وحدة"
                title="إضافة وحدة"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Lessons Column */}
          <div className="manager-lessons">
            <div className="manager-label">
              <span>{currentModule?.title ?? 'اختر وحدة'}</span>
              <span>{currentModule?.lessons.length ?? 0} محاضرات</span>
            </div>

            {currentModule?.lessons.map((lesson, idx) => (
              <div className="manager-lesson" key={`${lesson.title}-${idx}`}>
                <span className="manager-lesson-icon">
                  <Video size={16} />
                </span>
                <div>
                  <strong>{lesson.title}</strong>
                  <small>
                    {lesson.duration} · {lesson.files?.length ? 'ملف مرفق' : 'بدون ملفات'} ·{' '}
                    {lesson.quiz ? 'كويز تفاعلي' : 'بدون اختبار'}
                  </small>
                </div>
                <button
                  type="button"
                  onClick={() => toast.info(`تعديل تفاصيل المحاضرة: ${lesson.title}`)}
                  title="تعديل"
                >
                  <Pencil size={15} />
                </button>
                <button
                  type="button"
                  className="danger-icon"
                  onClick={() => deleteLesson(selectedModule, idx)}
                  title="حذف"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}

            {(!currentModule?.lessons || currentModule.lessons.length === 0) && (
              <div className="empty-resource">لم تضف محاضرات لهذه الوحدة بعد.</div>
            )}

            {/* Lesson Editor Form */}
            <div className="lesson-editor">
              <div className="editor-title">
                <Plus size={16} /> إضافة محاضرة جديدة للوحدة الحالية
              </div>
              <div className="editor-grid">
                <label>
                  عنوان المحاضرة
                  <input
                    value={newLessonTitle}
                    onChange={(e) => setNewLessonTitle(e.target.value)}
                    placeholder="مثال: مقدمة في بنية الخلية وأجهزتها"
                  />
                </label>
                <label>
                  رابط الفيديو (MP4 أو Embed)
                  <input
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://..."
                  />
                </label>
                <label>
                  ملف تدريبي مرفق (اختياري)
                  <input
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="worksheet.pdf"
                  />
                </label>
                <label className="editor-check">
                  <input
                    type="checkbox"
                    checked={quizEnabled}
                    onChange={(e) => setQuizEnabled(e.target.checked)}
                  />{' '}
                  إضافة كويز استيعاب تلقائي للمحاضرة
                </label>
              </div>

              <button type="button" className="btn btn-primary" onClick={handleAddLesson}>
                <Upload size={15} /> نشر المحاضرة للطلاب فورًا
              </button>
            </div>

            {modules.length > 1 && (
              <button
                type="button"
                className="delete-module"
                onClick={() => deleteModule(selectedModule)}
              >
                <Trash2 size={14} /> حذف هذه الوحدة بالكامل
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Student Activity Monitoring Table */}
      <section className="content-manager student-monitor">
        <div className="manager-head">
          <div>
            <div className="eyebrow">متابعة الطلاب الفورية</div>
            <h2 className="section-title">من يدرس ويتفاعل الآن؟</h2>
          </div>
          <button
            type="button"
            className="btn btn-outline btn-small"
            onClick={() => toast.info('جاري تصدير تقرير نشاط الطلاب')}
          >
            تقرير الطلاب <ArrowLeft size={13} />
          </button>
        </div>

        <div className="student-table">
          <div className="table-row table-head">
            <span>الطالب</span>
            <span>الكورس</span>
            <span>نسبة الإنجاز</span>
            <span>آخر نشاط</span>
          </div>

          {studentsList.map((st, idx) => (
            <div className="table-row" key={st.name}>
              <span className="table-student">
                <span>{st.name[0]}</span>
                <strong>{st.name}</strong>
              </span>
              <span>{st.course}</span>
              <span className="table-progress">
                <b>
                  <i style={{ width: `${st.progress}%` }} />
                </b>
                {st.progress.toLocaleString('ar-EG')}٪
              </span>
              <span className="muted">{st.time}</span>
            </div>
          ))}
        </div>
      </section>
    </PortalLayout>
  );
};

export default InstructorDashboardPage;
