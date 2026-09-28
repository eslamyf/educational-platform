import React, { useState, useMemo } from 'react';
import { Search, GraduationCap, Sparkles, ArrowUpDown, RotateCcw, X, BookOpen } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CourseCard } from '@/features/catalog/components/CourseCard';
import { EmptyState } from '@/components/common/EmptyState';
import { courses, categories, gradeChips, subjectChips } from '@/lib/data';

export const CoursesPage = () => {
    const [category, setCategory] = useState(categories[0]);
    const [grade, setGrade] = useState(gradeChips[0]);
    const [subject, setSubject] = useState(subjectChips[0]);
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('الأكثر صلة');

    const filteredCourses = useMemo(() => {
        const result = courses.filter((course) => {
            const matchCategory = category === categories[0] || course.category === category;
            const matchGrade = grade === gradeChips[0] || course.tags.includes(grade) || course.level === grade;
            const matchSubject = subject === subjectChips[0] ||
                course.tags.some((tag) => tag.includes(subject) || subject.includes(tag)) ||
                course.title.includes(subject) ||
                (subject.includes('أحياء') && (course.title.includes('أحياء') || course.tags.includes('أحياء') || course.tags.includes('جيولوجيا'))) ||
                (subject.includes('جيولوجيا') && (course.title.includes('جيولوجيا') || course.tags.includes('جيولوجيا'))) ||
                (subject.includes('فيزياء') && (course.title.includes('فيزياء') || course.tags.includes('فيزياء'))) ||
                (subject.includes('كيمياء') && (course.title.includes('كيمياء') || course.tags.includes('كيمياء'))) ||
                (subject.includes('رياضيات') && (course.title.includes('رياضيات') || course.tags.includes('رياضيات'))) ||
                (subject.includes('عربية') && (course.title.includes('العربية') || course.tags.includes('لغة عربية'))) ||
                (subject.includes('إنجليزية') && (course.title.includes('الإنجليزية') || course.tags.includes('لغة إنجليزية'))) ||
                (subject.includes('الطب') && (course.title.includes('الطب') || course.tags.includes('علوم الحياة') || course.category.includes('البكالوريا')));

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

    const isFiltered = category !== categories[0] || grade !== gradeChips[0] || subject !== subjectChips[0] || query !== '' || sort !== 'الأكثر صلة';

    const resetFilters = () => {
        setCategory(categories[0]);
        setGrade(gradeChips[0]);
        setSubject(subjectChips[0]);
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

                    {/* Unified Single Filter Card */}
                    <div className="unified-filter-card">
                        {/* Top: Track Pills + Integrated Search */}
                        <div className="unified-filter-top">
                            <div className="unified-track-chips">
                                {categories.map((item) => (
                                    <button
                                        type="button"
                                        className={`track-chip-btn ${category === item ? 'active' : ''}`}
                                        key={item}
                                        onClick={() => setCategory(item)}
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

                        {/* Bottom: Inline Dropdowns + Reset */}
                        <div className="unified-filter-bottom">
                            <div className="unified-selects-group">
                                <div className="unified-filter-select">
                                    <GraduationCap size={15} color="var(--olive-dark)" />
                                    <label>الصف:</label>
                                    <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                                        {gradeChips.map((item) => (
                                            <option key={item} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="unified-filter-select">
                                    <Sparkles size={14} color="var(--coral-dark)" />
                                    <label>المادة:</label>
                                    <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                                        {subjectChips.map((item) => (
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
