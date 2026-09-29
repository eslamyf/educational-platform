import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import {
    X,
    Play,
    Pause,
    RotateCcw,
    RotateCw,
    Volume2,
    VolumeX,
    Maximize2,
    CheckCircle2,
    ArrowLeft,
    Sparkles,
    Lock,
    Bookmark,
    Layers,
    ShieldCheck,
    Clock3,
    GraduationCap,
} from 'lucide-react';
import { getYouTubeVideoId, getYouTubeEmbedUrl } from '@/lib/youtube';
import { formatPrice, getDiscountLabel } from '@/lib/data';
import { toast } from 'sonner';

export const CoursePreviewModal = ({
    isOpen,
    onClose,
    course,
    initialLesson = null,
}) => {
    const [, setLocation] = useLocation();

    // Collect all free lessons from course modules
    const allLessons = (course?.modules || []).flatMap((mod, modIdx) =>
        mod.lessons.map((les, lesIdx) => ({
            ...les,
            moduleTitle: mod.title,
            moduleIndex: modIdx,
            lessonIndex: lesIdx,
            id: `${course.id}-${modIdx}-${lesIdx}`,
        }))
    );

    const freeLessons = allLessons.filter((l) => l.free);
    const defaultLesson =
        initialLesson ||
        freeLessons[0] ||
        allLessons[0] || {
            title: course?.title || 'مقدمة المسار التوضيحية',
            duration: '03:30',
            video: course?.previewVideo || 'https://www.youtube.com/watch?v=_wmwmMeF3pE',
            moduleTitle: 'المقدمة والمعاينة',
        };

    const [selectedLesson, setSelectedLesson] = useState(defaultLesson);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // Sync selected lesson when initialLesson changes or modal opens
    useEffect(() => {
        if (isOpen) {
            if (initialLesson) {
                const matched = allLessons.find(
                    (l) =>
                        l.title === initialLesson.title ||
                        l.title === initialLesson ||
                        l.id === initialLesson.id
                );
                setSelectedLesson(matched || initialLesson);
            } else if (freeLessons.length > 0) {
                setSelectedLesson(freeLessons[0]);
            } else if (allLessons.length > 0) {
                setSelectedLesson(allLessons[0]);
            }
            setIsPlaying(true);
        }
    }, [isOpen, initialLesson, course?.id]);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !course) return null;

    const currentVideoUrl =
        selectedLesson?.video ||
        course.previewVideo ||
        'https://www.youtube.com/watch?v=_wmwmMeF3pE';
    const videoId = getYouTubeVideoId(currentVideoUrl) || '_wmwmMeF3pE';

    const handleSelectLesson = (lesson) => {
        if (!lesson.free) {
            toast.info('هذه المحاضرة متاحة بعد الاشتراك في المسار');
            return;
        }
        setSelectedLesson(lesson);
        setIsPlaying(true);
    };

    const handleSaveCourse = () => {
        setIsSaved(!isSaved);
        toast.success(
            !isSaved
                ? 'تم حفظ المسار في قائمتك المفضلة'
                : 'تمت إزالة المسار من المفضلة'
        );
    };

    const handleEnrollNow = () => {
        if (onClose) onClose();
        setLocation(`/checkout?course=${course.id}`);
    };

    return (
        <div className="preview-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
            <div
                className="preview-modal-box"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="preview-modal-header">
                    <div className="preview-modal-title-group">
                        <span className="preview-modal-pill">
                            <Sparkles size={13} />
                            معاينة مجانية للمسار
                        </span>
                        <div className="preview-modal-course-title">
                            <h3>{course.title}</h3>
                            <span className="preview-modal-instructor-text">
                                تقديم: <strong>{course.instructor}</strong> · {course.category}
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="preview-modal-close-btn"
                        onClick={onClose}
                        aria-label="إغلاق نافذة المعاينة"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body: Grid with Video on Right (Main) & Playlist/Details on Left */}
                <div className="preview-modal-body">
                    {/* Main Video Section */}
                    <div className="preview-modal-video-col">
                        <div className="preview-modal-player-container">
                            <iframe
                                key={videoId}
                                className="preview-modal-iframe"
                                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1&playsinline=1`}
                                title={selectedLesson?.title || course.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                allowFullScreen
                            />

                            {/* Watermark badge overlay */}
                            <div className="preview-modal-watermark" aria-hidden="true">
                                <span className="preview-watermark-dot" />
                                <span>معاينة حية مجانية · منصة نَوَى</span>
                            </div>
                        </div>

                        {/* Active Lesson Meta Banner */}
                        <div className="preview-active-lesson-info">
                            <div className="preview-lesson-text">
                                <div className="preview-lesson-meta-chips">
                                    <span className="preview-chip free">
                                        <CheckCircle2 size={13} /> محاضرة مجانية مفتوحة
                                    </span>
                                    <span className="preview-chip time">
                                        <Clock3 size={13} /> {selectedLesson?.duration || '20:00'}
                                    </span>
                                    <span className="preview-chip quality">
                                        دقة عالية HD
                                    </span>
                                </div>
                                <h4 className="preview-lesson-current-title">
                                    {selectedLesson?.title}
                                </h4>
                                <p className="preview-lesson-module-name">
                                    الوحدة: {selectedLesson?.moduleTitle || course.modules?.[0]?.title}
                                </p>
                            </div>

                            <div className="preview-instructor-badge">
                                <img
                                    src={course.instructorAvatar}
                                    alt={course.instructor}
                                    className="preview-inst-avatar"
                                />
                                <div>
                                    <strong>{course.instructor}</strong>
                                    <span>{course.instructorRole}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Playlist Section */}
                    <aside className="preview-modal-sidebar">
                        <div className="preview-sidebar-section">
                            <div className="preview-sidebar-heading">
                                <h5>
                                    <Layers size={16} />
                                    المحاضرات التجريبية المتاحة
                                </h5>
                                <span className="preview-count-badge">
                                    {freeLessons.length} محاضرات مفتوحة
                                </span>
                            </div>

                            <div className="preview-lessons-scroll">
                                {allLessons.map((les, index) => {
                                    const isSelected = selectedLesson?.title === les.title;
                                    const isFree = Boolean(les.free);

                                    return (
                                        <button
                                            key={les.id || index}
                                            type="button"
                                            className={`preview-lesson-item ${
                                                isSelected ? 'active' : ''
                                            } ${isFree ? 'is-free' : 'is-locked'}`}
                                            onClick={() => handleSelectLesson(les)}
                                        >
                                            <div className="preview-item-icon">
                                                {isSelected ? (
                                                    <span className="preview-playing-indicator">
                                                        <span className="bar b1" />
                                                        <span className="bar b2" />
                                                        <span className="bar b3" />
                                                    </span>
                                                ) : isFree ? (
                                                    <Play size={14} fill="currentColor" />
                                                ) : (
                                                    <Lock size={13} />
                                                )}
                                            </div>

                                            <div className="preview-item-content">
                                                <span className="preview-item-title">
                                                    {les.title}
                                                </span>
                                                <span className="preview-item-sub">
                                                    {les.moduleTitle} · {les.duration}
                                                </span>
                                            </div>

                                            <div className="preview-item-status">
                                                {isFree ? (
                                                    <span className="preview-free-pill">
                                                        {isSelected ? 'قيد التشغيل' : 'معاينة'}
                                                    </span>
                                                ) : (
                                                    <span className="preview-locked-pill">
                                                        مشترك
                                                    </span>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Outcomes & Features Box */}
                        <div className="preview-outcomes-box">
                            <h6>
                                <ShieldCheck size={15} />
                                يشمل هذا المسار بالكامل:
                            </h6>
                            <ul>
                                {course.outcomes?.slice(0, 3).map((item) => (
                                    <li key={item}>
                                        <CheckCircle2 size={14} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>

                {/* Modal Footer / Subscription CTA Bar */}
                <div className="preview-modal-footer">
                    <div className="preview-footer-price-block">
                        <div className="preview-price-values">
                            <span className="preview-current-price">
                                {formatPrice(course.price)}
                            </span>
                            {course.oldPrice > course.price && (
                                <span className="preview-old-price">
                                    {formatPrice(course.oldPrice)}
                                </span>
                            )}
                            <span className="preview-discount-tag">
                                {getDiscountLabel(course)}
                            </span>
                        </div>
                        <span className="preview-guarantee-note">
                            وصول كامل مدى الحياة + شهادة إتمام معتمدة
                        </span>
                    </div>

                    <div className="preview-footer-actions">
                        <button
                            type="button"
                            className={`btn ${isSaved ? 'btn-saved' : 'btn-outline'}`}
                            onClick={handleSaveCourse}
                        >
                            <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
                            {isSaved ? 'تم الحفظ' : 'حفظ المسار'}
                        </button>

                        <button
                            type="button"
                            className="btn btn-primary preview-cta-btn"
                            onClick={handleEnrollNow}
                        >
                            <GraduationCap size={18} />
                            <span>اشترك في المسار الآن</span>
                            <ArrowLeft size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePreviewModal;
