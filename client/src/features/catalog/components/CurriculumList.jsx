import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { ChevronDown, Play, LockKeyhole, Clock3, Sparkles } from 'lucide-react';
import { curriculumLabel, curriculumDescription, curriculumTotal, getModuleLabel } from '@/lib/data';
import { toast } from 'sonner';

export const CurriculumList = ({ course }) => {
    const [, setLocation] = useLocation();
    const [openIndex, setOpenIndex] = useState(0);

    const toggleModule = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const handleLessonClick = (moduleIndex, lessonIndex) => {
        const isFree = moduleIndex === 0 && lessonIndex === 0;
        if (isFree) {
            setLocation(`/learn/${course.id}`);
        } else {
            toast.info('هذه المحاضرة مقفلة للمشتركين · اشترك في المسار لفتح كافة الدروس', {
                action: {
                    label: 'اشترك الآن',
                    onClick: () => setLocation(`/checkout?course=${course.id}`),
                },
            });
        }
    };

    return (
        <section className="detail-section" id="curriculum">
            <div className="curriculum-header">
                <div>
                    <h2 style={{ marginBottom: 6 }}>{curriculumLabel}</h2>
                    <p>{curriculumDescription}</p>
                </div>
                <span className="curriculum-summary">
                    {course.modules.length.toLocaleString('ar-EG')} وحدات · {curriculumTotal(course).toLocaleString('ar-EG')} درس
                </span>
            </div>

            <div className="module-list">
                {course.modules.map((module, mIdx) => {
                    const isOpen = openIndex === mIdx;
                    return (
                        <div className={`module ${isOpen ? 'open' : ''}`} key={module.title}>
                            <button
                                type="button"
                                className="module-button"
                                onClick={() => toggleModule(mIdx)}
                                aria-expanded={isOpen}
                            >
                                <div className="module-header-start">
                                    <span className="module-number">{String(mIdx + 1).padStart(2, '0')}</span>
                                    <div className="module-text-wrap">
                                        <span className="module-title">{module.title}</span>
                                        <span className="module-meta">
                                            {getModuleLabel(module)} · {module.duration}
                                        </span>
                                    </div>
                                </div>
                                <ChevronDown className="module-icon" size={18} />
                            </button>

                            {isOpen && (
                                <div className="lesson-list">
                                    {module.lessons.map((lesson, lIdx) => {
                                        const isFree = mIdx === 0 && lIdx === 0;
                                        return (
                                            <div
                                                className={`lesson ${isFree ? 'free-lesson-interactive' : 'locked'}`}
                                                key={lesson.title}
                                                onClick={() => handleLessonClick(mIdx, lIdx)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <span className="lesson-name">
                                                    {isFree ? (
                                                        <Play size={16} fill="currentColor" className="text-emerald" />
                                                    ) : (
                                                        <LockKeyhole size={15} className="text-muted" />
                                                    )}
                                                    <span>{lesson.title}</span>
                                                </span>
                                                <span className="lesson-duration">
                                                    {isFree && (
                                                        <span className="free-pill">
                                                            <Sparkles size={11} /> مجاني
                                                        </span>
                                                    )}
                                                    <Clock3 size={13} />
                                                    <span>{lesson.duration}</span>
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default CurriculumList;
