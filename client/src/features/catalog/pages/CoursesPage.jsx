import React, { useState, useMemo } from 'react';
import { Search, GraduationCap, Sparkles, ArrowUpDown, RotateCcw, X, BookOpen, Layers } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CourseCard } from '@/features/catalog/components/CourseCard';
import { EmptyState } from '@/components/common/EmptyState';
import { courses, categories } from '@/lib/data';

const TRACK_FILTER_MAP = {
    'كل المناهج والمسارات': {
        grades: [
            'كل الصفوف',
            'الصف الثالث الثانوي',
            'الصف الثاني الثانوي',
            'الصف الأول الثانوي',
            'الصف الأول بالبكالوريا (تمهيدي)',
            'الصف الثاني بالبكالوريا',
            'الصف الثالث بالبكالوريا (تخرج)',
        ],
        subjects: [
            'كل المواد والمسارات',
            'أحياء وجيولوجيا',
            'فيزياء',
            'كيمياء',
            'رياضيات وتفاضل',
            'لغة عربية وبلاغة',
            'لغة إنجليزية',
            'مسار الطب وعلوم الحياة (بكالوريا)',
            'مسار الهندسة وتكنولوجيا المعلومات (بكالوريا)',
            'مسار إدارة الأعمال والاقتصاد (بكالوريا)',
            'مسار الآداب والعلوم الإنسانية (بكالوريا)',
        ],
    },
    'الثانوية العامة (علمي علوم)': {
        grades: [
            'كل صفوف علمي علوم',
            'الصف الثالث الثانوي',
            'الصف الثاني الثانوي',
        ],
        subjects: [
            'كل مواد علمي علوم',
            'أحياء وبيولوجيا',
            'جيولوجيا وعلوم البيئة',
            'كيمياء',
            'فيزياء',
            'لغة عربية وبلاغة',
            'لغة إنجليزية',
        ],
    },
    'الثانوية العامة (علمي رياضة)': {
        grades: [
            'كل صفوف علمي رياضة',
            'الصف الثالث الثانوي',
            'الصف الثاني الثانوي',
        ],
        subjects: [
            'كل مواد علمي رياضة',
            'رياضيات وتفاضل وتكامل',
            'فيزياء وفيزياء حديثة',
            'كيمياء',
            'لغة عربية',
            'لغة إنجليزية',
        ],
    },
    'الثانوية العامة (أدبي)': {
        grades: [
            'كل صفوف الأدبي والعام',
            'الصف الثالث الثانوي',
            'الصف الثاني الثانوي',
            'الصف الأول الثانوي',
        ],
        subjects: [
            'كل مواد أدبي',
            'لغة عربية وبلاغة',
            'لغة إنجليزية',
        ],
    },
    'البكالوريا المصرية': {
        grades: [
            'كل صفوف البكالوريا',
            'الصف الأول بالبكالوريا (تمهيدي)',
            'الصف الثاني بالبكالوريا',
            'الصف الثالث بالبكالوريا (تخرج)',
        ],
        subjects: [
            'كل مسارات البكالوريا',
            'مسار الطب وعلوم الحياة',
            'مسار الهندسة وتكنولوجيا المعلومات',
            'مسار إدارة الأعمال والاقتصاد',
            'مسار الآداب والعلوم الإنسانية والفنون',
        ],
    },
};

export const CoursesPage = () => {
    const [category, setCategory] = useState(categories[0]);

    // Derived available grades & subjects for current track
    const currentTrackConfig = TRACK_FILTER_MAP[category] || TRACK_FILTER_MAP['كل المناهج والمسارات'];
    const availableGrades = currentTrackConfig.grades;
    const availableSubjects = currentTrackConfig.subjects;

    const [grade, setGrade] = useState(availableGrades[0]);
    const [subject, setSubject] = useState(availableSubjects[0]);
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('الأكثر صلة');

    // Handle track switch with automatic cascading reset of grade & subject
    const handleTrackChange = (newTrack) => {
        setCategory(newTrack);
        const config = TRACK_FILTER_MAP[newTrack] || TRACK_FILTER_MAP['كل المناهج والمسارات'];
        setGrade(config.grades[0]);
        setSubject(config.subjects[0]);
    };

    const filteredCourses = useMemo(() => {
        const result = courses.filter((course) => {
            // Track match
            let matchCategory = true;
            if (category === 'الثانوية العامة (علمي علوم)') {
                matchCategory = course.tags.includes('علمي علوم') || course.track?.includes('علمي علوم') || course.category.includes('علمي علوم');
            } else if (category === 'الثانوية العامة (علمي رياضة)') {
                matchCategory = course.tags.includes('علمي رياضة') || course.track?.includes('علمي رياضة') || course.category.includes('علمي رياضة');
            } else if (category === 'الثانوية العامة (أدبي)') {
                matchCategory = course.tags.includes('أدبي') || course.tags.includes('ثانوي عام') || course.category.includes('أدبي');
            } else if (category === 'البكالوريا المصرية') {
                matchCategory = course.category.includes('البكالوريا') || course.tags.includes('البكالوريا المصرية');
            }

            // Grade match
            const isAllGrades = grade.startsWith('كل');
            let matchGrade = isAllGrades;
            if (!isAllGrades) {
                matchGrade = course.tags.includes(grade) || course.level === grade || course.level?.includes(grade) || grade.includes(course.level);
            }

            // Subject match
            const isAllSubjects = subject.startsWith('كل');
            let matchSubject = isAllSubjects;
            if (!isAllSubjects) {
                if (subject.includes('أحياء')) {
                    matchSubject = (course.tags.includes('أحياء') || course.title.includes('أحياء')) && !course.tags.includes('علمي رياضة');
                } else if (subject.includes('جيولوجيا')) {
                    matchSubject = course.tags.includes('جيولوجيا') || course.title.includes('جيولوجيا');
                } else if (subject.includes('فيزياء')) {
                    matchSubject = course.tags.includes('فيزياء') || course.title.includes('فيزياء');
                } else if (subject.includes('كيمياء')) {
                    matchSubject = course.tags.includes('كيمياء') || course.title.includes('كيمياء');
                } else if (subject.includes('رياضيات') || subject.includes('تفاضل')) {
                    matchSubject = course.tags.includes('رياضيات') || course.title.includes('رياضيات') || course.tags.includes('تفاضل');
                } else if (subject.includes('عربية')) {
                    matchSubject = course.tags.includes('عربية') || course.tags.includes('لغة عربية') || course.title.includes('العربية');
                } else if (subject.includes('إنجليزية')) {
                    matchSubject = course.tags.includes('إنجليزية') || course.tags.includes('لغة إنجليزية') || course.title.includes('الإنجليزية');
                } else if (subject.includes('الطب')) {
                    matchSubject = course.tags.includes('مسار الطب وعلوم الحياة') || course.id === 'baccalaureate-medical';
                } else if (subject.includes('الهندسة')) {
                    matchSubject = course.tags.includes('مسار الهندسة وتكنولوجيا المعلومات') || course.id === 'baccalaureate-engineering';
                } else if (subject.includes('الأعمال') || subject.includes('اقتصاد')) {
                    matchSubject = course.tags.includes('مسار إدارة الأعمال والاقتصاد') || course.id === 'baccalaureate-business';
                } else if (subject.includes('الآداب') || subject.includes('الإنسانية') || subject.includes('فنون')) {
                    matchSubject = course.tags.includes('مسار الآداب والعلوم الإنسانية والفنون') || course.id === 'baccalaureate-arts';
                }
            }

            // Search query match
            const matchQuery = !query ||
                `${course.title} ${course.shortTitle} ${course.description} ${course.category} ${course.tags.join(' ')} ${course.instructor}`
                    .toLowerCase()
                    .includes(query.toLowerCase());

            return (
                matchCategory &&
                matchGrade &&
                matchSubject &&
                matchQuery
            );
        });

        return [...result].sort((a, b) => {
            if (sort === 'الأقل سعرًا') return a.price - b.price;
            if (sort === 'الأعلى تقييمًا') return b.rating - a.rating;
            if (sort === 'الأكثر طلابًا') return b.students - a.students;
            return b.students - a.students;
        });
    }, [category, grade, subject, query, sort]);

    const isFiltered = category !== categories[0] || !grade.startsWith('كل') || !subject.startsWith('كل') || query !== '' || sort !== 'الأكثر صلة';

    const resetFilters = () => {
        setCategory(categories[0]);
        setGrade(TRACK_FILTER_MAP['كل المناهج والمسارات'].grades[0]);
        setSubject(TRACK_FILTER_MAP['كل المناهج والمسارات'].subjects[0]);
        setQuery('');
        setSort('الأكثر صلة');
    };

    return (
        <div className="page-fade">
            <Header />

            <main className="section" style={{ paddingTop: 40 }}>
                <div className="container">
                    <div className="section-head" style={{ marginBottom: 28 }}>
                        <div className="section-head-left">
                            <div className="eyebrow">مناهج الثانوية العامة والبكالوريا المصرية</div>
                            <h1 className="section-title page-title">تعلّم بوضوح، مع نخبة من كبار المعلمين.</h1>
                            <p className="section-subtitle">
                                شروحات تفصيلية، حل بنوك الأسئلة والامتحانات السابقة لمراحل الثانوية العامة والبكالوريا المصرية.
                            </p>
                        </div>
                        <div className="small muted" style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--paper-deep)', padding: '6px 14px', borderRadius: 999 }}>
                            <BookOpen size={14} color="var(--coral-dark)" />
                            <strong>{filteredCourses.length.toLocaleString('ar-EG')}</strong> مسار متاح
                        </div>
                    </div>

                    {/* Smart Cascading Unified Filter Card */}
                    <div className="unified-filter-card">
                        {/* Step 1: Track / Stage Selection */}
                        <div className="unified-filter-top">
                            <div className="unified-track-chips">
                                {categories.map((item) => (
                                    <button
                                        type="button"
                                        className={`track-chip-btn ${category === item ? 'active' : ''}`}
                                        key={item}
                                        onClick={() => handleTrackChange(item)}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            <label className="unified-search-input">
                                <Search size={16} />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="ابحث عن مادة، صف، أو معلّم..."
                                />
                                {query && (
                                    <button
                                        type="button"
                                        onClick={() => setQuery('')}
                                        style={{ background: 'transparent', cursor: 'pointer', display: 'grid', placeItems: 'center', color: 'var(--muted)', padding: 0 }}
                                        title="مسح البحث"
                                    >
                                        <X size={15} />
                                    </button>
                                )}
                            </label>
                        </div>

                        {/* Step 2 & 3: Cascading Grade & Subject Dropdowns */}
                        <div className="unified-filter-bottom">
                            <div className="unified-selects-group">
                                <div className="unified-filter-select">
                                    <GraduationCap size={15} color="var(--olive-dark)" />
                                    <label>الصف الدراسي:</label>
                                    <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                                        {availableGrades.map((item) => (
                                            <option key={item} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="unified-filter-select">
                                    <Sparkles size={14} color="var(--coral-dark)" />
                                    <label>المادة المقررة:</label>
                                    <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                                        {availableSubjects.map((item) => (
                                            <option key={item} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="unified-filter-select">
                                    <ArrowUpDown size={14} color="var(--muted)" />
                                    <label>الترتيب:</label>
                                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                                        <option value="الأكثر صلة">الأكثر صلة</option>
                                        <option value="الأعلى تقييمًا">الأعلى تقييمًا</option>
                                        <option value="الأقل سعرًا">الأقل سعرًا</option>
                                        <option value="الأكثر طلابًا">الأكثر طلابًا</option>
                                    </select>
                                </div>
                            </div>

                            {isFiltered && (
                                <button type="button" className="unified-reset-btn" onClick={resetFilters}>
                                    <RotateCcw size={13} /> إعادة ضبط الفلاتر
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Course Grid */}
                    {filteredCourses.length > 0 ? (
                        <div className="course-grid">
                            {filteredCourses.map((course, index) => (
                                <div className={`reveal reveal-${Math.min(index + 1, 3)}`} key={course.id}>
                                    <CourseCard course={course} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon={Search}
                            title="لا توجد مسارات مطابقة لهذه المعايير"
                            description="جرّب تغيير التخصص أو الصف الدراسي، أو مسح الفلاتر المحددة."
                            actionText="إعادة ضبط الفلاتر"
                            onAction={resetFilters}
                        />
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CoursesPage;
