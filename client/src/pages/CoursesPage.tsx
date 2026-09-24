import React, { useState, useMemo } from 'react';
import { Search, GraduationCap, BarChart3, ChevronDown, RotateCcw } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CourseCard } from '@/components/course/CourseCard';
import { EmptyState } from '@/components/common/EmptyState';
import { courses, categories, gradeChips, subjectChips } from '@/lib/data';
import type { Course } from '@/types';

export const CoursesPage: React.FC = () => {
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
      const matchGrade = grade === gradeChips[0] || course.tags.includes(grade);
      const matchSubject =
        subject === subjectChips[0] ||
        course.tags.some((tag) => tag.includes(subject)) ||
        course.title.includes(subject);
      const matchLevel = level === 'كل المستويات' || course.level === level;
      const matchPrice = course.price <= maxPrice;
      const matchRating = course.rating >= minRating;
      const matchQuery =
        !query ||
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
      if (sort === 'الأقل سعرًا') return a.price - b.price;
      if (sort === 'الأعلى تقييمًا') return b.rating - a.rating;
      if (sort === 'الأكثر طلابًا') return b.students - a.students;
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

  return (
    <div className="page-fade">
      <Header />

      <main className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-left">
              <div className="eyebrow">مسارات على مقاس سنتك الدراسية وهدفك</div>
              <h1 className="section-title page-title">ذاكر بوضوح، مش أكتر.</h1>
              <p className="section-subtitle">
                مواد إعدادي وثانوي ومسارات عملية، في تجربة واحدة هادئة ومنظمة.
              </p>
            </div>
            <div className="small muted">
              {filteredCourses.length.toLocaleString('ar-EG')} نتيجة متاحة
            </div>
          </div>

          {/* Grade Chips */}
          <div className="grade-chips">
            <span>
              <GraduationCap size={15} /> تصفح حسب الصف
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

          {/* Subject Chips */}
          <div className="subject-chips">
            <span>المادة</span>
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

          {/* Categories & Search Filter Row */}
          <div className="filter-row course-filters">
            <div className="filter-scroll">
              {categories.map((item) => (
                <button
                  type="button"
                  className={`filter-chip ${category === item ? 'active' : ''}`}
                  key={item}
                  onClick={() => setCategory(item)}
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
                placeholder="ابحث عن مادة أو درس أو مهارة..."
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

          {/* Advanced Filters Panel */}
          {filtersOpen && (
            <div className="advanced-filters">
              <div className="advanced-filter">
                <label>المستوى الدراسي</label>
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
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                >
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
              description="جرّب تغيير الصف الدراسي أو المادة، أو مسح الفلاتر المحددة."
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
