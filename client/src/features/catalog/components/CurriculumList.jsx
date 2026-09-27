import React, { useState } from 'react';
import { ChevronDown, CirclePlay, LockKeyhole, Clock3, ListChecks, CheckCircle2, ArrowLeft } from 'lucide-react';
import { curriculumLabel, curriculumDescription, curriculumTotal, getModuleLabel } from '@/lib/data';
import { toast } from 'sonner';
export const CurriculumList = ({ course, onPreviewLesson }) => {
    const [openIndex, setOpenIndex] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const toggleModule = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };
    const sampleQuestion = {
        title: 'أي خطوة تعبّر أفضل عن البداية السليمة في مذاكرة أو بناء استراتيجية هذا المسار؟',
        options: [
            'البدء بالحل السريع أو النشر دون فهم المشكلة',
            'فهم الأهداف والأساسيات قبل الانتقال للتطبيق والتمارين',
            'حفظ القوانين والمعلومات دون ربطها بالسياق',
            'تخطي المحاضرات الأولى مباشرة',
        ],
        correct: 1,
    };
    const handleQuizSubmit = () => {
        if (quizSelected === null) {
            toast.error('يرجى اختيار إجابة أولاً');
            return;
        }
        setQuizSubmitted(true);
    };
    return (<section className="detail-section" id="curriculum">
      <div className="curriculum-header">
        <div>
          <h2 style={{ marginBottom: 5 }}>{curriculumLabel}</h2>
          <p>{curriculumDescription}</p>
        </div>
        <span className="curriculum-summary">
          {course.modules.length.toLocaleString('ar-EG')} وحدات · {curriculumTotal(course).toLocaleString('ar-EG')} درس
        </span>
      </div>

      <div className="module-list">
        {course.modules.map((module, index) => {
            const isOpen = openIndex === index;
            return (<div className={`module ${isOpen ? 'open' : ''}`} key={module.title}>
              <button type="button" className="module-button" onClick={() => toggleModule(index)} aria-expanded={isOpen}>
                <span className="module-number">{String(index + 1).padStart(2, '0')}</span>
                <span>
                  <span className="module-title">{module.title}</span>
                  <span className="module-meta">
                    {getModuleLabel(module)} · {module.duration}
                  </span>
                </span>
                <ChevronDown className="module-icon" size={18}/>
              </button>

              {isOpen && (<div className="lesson-list">
                  {module.lessons.map((lesson) => (<div className={`lesson ${lesson.free ? 'free-lesson-interactive' : 'locked'}`} key={lesson.title} onClick={() => {
                            if (lesson.free) {
                                onPreviewLesson?.(lesson.title);
                                toast.info(`معاينة مجانية: ${lesson.title}`);
                            }
                            else {
                                toast('هذا الدرس متاح للمشتركين فقط');
                            }
                        }}>
                      <span className="lesson-name">
                        {lesson.free ? <CirclePlay size={15}/> : <LockKeyhole size={14}/>}
                        {lesson.title}
                      </span>
                      <span className="lesson-duration">
                        {lesson.free && <span className="free-pill">مجاني</span>}
                        <Clock3 size={13}/>
                        {lesson.duration}
                      </span>
                    </div>))}
                </div>)}
            </div>);
        })}
      </div>

      {/* Interactive Quiz Sample */}
      <div className="quiz-panel">
        <div className="quiz-kicker">
          <ListChecks size={16}/> اختبار تفاعلي تجريبي للوحدة الأولى
        </div>
        <div className="quiz-head">
          <div>
            <h3>{sampleQuestion.title}</h3>
            <p>سؤال سريع لاختبار استيعابك قبل الانتقال للوحدة التالية.</p>
          </div>
          <span className="quiz-score">
            {quizSubmitted ? (quizSelected === 1 ? '١/١' : '٠/١') : '١ سؤال'}
          </span>
        </div>

        <div className="quiz-options">
          {sampleQuestion.options.map((option, idx) => (<button key={option} type="button" className={`quiz-option ${quizSelected === idx ? 'selected' : ''} ${quizSubmitted && idx === sampleQuestion.correct ? 'correct' : ''} ${quizSubmitted && quizSelected === idx && idx !== sampleQuestion.correct ? 'wrong' : ''}`} onClick={() => !quizSubmitted && setQuizSelected(idx)}>
              <span>{String.fromCharCode(1575 + idx)}</span>
              {option}
              {quizSubmitted && idx === sampleQuestion.correct && <CheckCircle2 size={16}/>}
            </button>))}
        </div>

        {quizSubmitted ? (<div className={`quiz-feedback ${quizSelected === sampleQuestion.correct ? 'success' : 'retry'}`}>
            {quizSelected === sampleQuestion.correct
                ? 'إجابة ممتازة وصحيحة! الفهم المنظم يسبق دائمًا التطبيق.'
                : 'محاولة جيدة! فكّر في الخطوة التأسيسية التي تجعل باقي الخطوات واضحة.'}
            <button type="button" onClick={() => {
                setQuizSubmitted(false);
                setQuizSelected(null);
            }}>
              إعادة المحاولة
            </button>
          </div>) : (<button type="button" className="btn btn-primary quiz-submit" onClick={handleQuizSubmit}>
            تحقق من الإجابة <ArrowLeft size={15}/>
          </button>)}
      </div>
    </section>);
};
export default CurriculumList;
