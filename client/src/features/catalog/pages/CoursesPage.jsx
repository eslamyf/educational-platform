import React, { useState, useMemo } from 'react';
import { Search, GraduationCap, BarChart3, ChevronDown, RotateCcw, Sparkles } from 'lucide-react';
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
    const [level, setLevel] = useState('كل المستويات');
    const [maxPrice, setMaxPrice] = useState(1500);
    const [minRating, setMinRating] = useState(0);
    const [sort, setSort] = useState('الأكثر صلة');
    const [filtersOpen, setFiltersOpen] = useState(false);

    const levels = ['كل المستويات', 'مبتدئ', 'متوسط', 'متقدم'];

    const filteredCourses = useMemo(() => {
        const result = courses.filter((course) => {
            const matchCategory = category === categories[0] || course.category === category;
            const matchGrade = grade === gradeChips[0] || course.tags.includes(grade) || course.level === grade;
            const matchSubject = subject === subjectChips[0] ||
                course.tags.some((tag) => tag.includes(subject) || subject.includes(tag)) ||
                course.title.includes(subject) ||
                (subject.includes('أحياء') && (course.title.includes('أحياء') || course.tags.includes('أحياء'))) ||
                (subject.includes('فيزياء') && (course.title.includes('فيزياء') || course.tags.includes('فيزياء'))) ||
                (subject.includes('كيمياء') && (course.title.includes('كيمياء') || course.tags.includes('كيمياء'))) ||
                (subject.includes('رياضيات') && (course.title.includes('رياضيات') || course.tags.includes('رياضيات'))) ||
                (subject.includes('عربية') && (course.title.includes('العربية') || course.tags.includes('لغة عربية'))) ||
                (subject.includes('إنجليزية') && (course.title.includes('الإنجليزية') || course.tags.includes('لغة إنجليزية')));
            const matchLevel = level === 'كل المستويات' || course.level === level;
            const matchPrice = course.price <= maxPrice;
            const matchRating = course.rating >= minRating;
            const matchQuery = !query ||
                `${course.title} ${course.shortTitle} ${course.description} ${course.category} ${course.tags.join(' ')} ${course.instructor}`
                    .toLowerCase()
                    .includes(query.toLowerCase());
            return (
                matchCategory &&
                matchGrade &&
                matchSubject &&
                matchLevel &&
                matchPrice &&
                matchRating &&
                matchQuery
            );
        });

        return [...result].sort((a, b) => {
            if (sort === 'الأقل سعرًا')
                return a.price - b.price;
            if (sort === 'الأعلى تقييمًا')
                return b.rating - a.rating;
            if (sort === 'الأكثر طلابًا')
                return b.students - a.students;
            return b.students - a.students;
        });
    }, [category, grade, subject, level, maxPrice, minRating, query, sort]);

    const resetFilters = () => {
        setCategory(categories[0]);
        setGrade(gradeChips[0]);
        setSubject(subjectChips[0]);
        setQuery('');
        setLevel('كل المستويات');
        setMaxPrice(1500);
        setMinRating(0);
        setSort('الأكثر صلة');
    };

    const handleCategoryChange = (cat) => {
        setCategory(cat);
    };

    return (
        <div className="page-fade">
            <Header />

            <main className="section">
                <div className="container">
                    <div className="section-head">
                        <div className="section-head-left">
                            <div className="eyebrow">مناهج ومسارات الثانوية والإعدادية المعتمدة</div>
                            <h1 className="section-title page-title">تعلّم بوضوح، مع نخبة من كبار المعلمين.</h1>
                            <p className="section-subtitle">
                                شروحات تفصيلية، حل بنوك الأسئلة والامتحانات السابقة لمراحل الثانوية والإعدادية والبكالوريا المصرية.
                            </p>
                        </div>
                        <div className="small muted">
                            {filteredCourses.length.toLocaleString('ar-EG')} مسار متاح
                        </div>
                    </div>

                    {/* Primary Category Tabs */}
                    <div className="filter-row course-filters" style={{ marginBottom: 16 }}>
                        <div className="filter-scroll">
                            {categories.map((item) => (
                                <button
                                    type="button"
                                    className={`filter-chip ${category === item ? 'active' : ''}`}
                                    key={item}
                                    onClick={() => handleCategoryChange(item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        <label className="search-box">
                            <Search size={16} />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="ابحث عن مادة، صف دراسي، أو معلّم..."
                            />
                        </label>

                        <button
                            type="button"
                            className={`btn btn-outline filter-toggle ${filtersOpen ? 'active' : ''}`}
                            onClick={() => setFiltersOpen(!filtersOpen)}
                        >
                            <BarChart3 size={15} /> فلاتر متقدمة <ChevronDown size={14} />
                        </button>
                    </div>

                    {/* Grade Chips Filter */}
                    <div className="grade-chips" style={{ marginTop: 0, marginBottom: 12 }}>
                        <span>
                            <GraduationCap size={15} /> الصف الدراسي:
                        </span>
                        {gradeChips.map((item) => (
                            <button
                                type="button"
                                className={grade === item ? 'active' : ''}
                                key={item}
                                onClick={() => setGrade(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Subject Chips Filter */}
                    <div className="subject-chips" style={{ marginTop: 0, marginBottom: 28 }}>
                        <span>
                            <Sparkles size={14} /> المادة الدراسية:
                        </span>
                        {subjectChips.map((item) => (
                            <button
                                type="button"
                                className={subject === item ? 'active' : ''}
                                key={item}
                                onClick={() => setSubject(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Advanced Filters Panel */}
                    {filtersOpen && (
                        <div className="advanced-filters">
                            <div className="advanced-filter">
                                <label>المستوى</label>
                                <select value={level} onChange={(e) => setLevel(e.target.value)}>
                                    {levels.map((item) => (
                                        <option key={item}>{item}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="advanced-filter price-filter">
                                <label>
                                    الحد الأقصى للسعر: <strong>{maxPrice.toLocaleString('ar-EG')} ج.م</strong>
                                </label>
                                <input
                                    type="range"
                                    min="200"
                                    max="1500"
                                    step="50"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                />
                            </div>

                            <div className="advanced-filter">
                                <label>التقييم الأدنى</label>
                                <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
                                    <option value={0}>كل التقييمات</option>
                                    <option value={4.5}>٤.٥ نجوم فأعلى</option>
                                    <option value={4.8}>٤.٨ نجوم فأعلى</option>
                                </select>
                            </div>

                            <div className="advanced-filter">
                                <label>ترتيب النتائج</label>
                                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                                    <option>الأكثر صلة</option>
                                    <option>الأعلى تقييمًا</option>
                                    <option>الأقل سعرًا</option>
                                    <option>الأكثر طلابًا</option>
                                </select>
                            </div>

                            <button type="button" className="reset-filters" onClick={resetFilters}>
                                <RotateCcw size={14} /> إعادة ضبط
                            </button>
                        </div>
                    )}

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
