import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { courses, formatPrice } from '@/lib/data';
export const SearchModal = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape')
                onClose();
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                // Toggle
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
    if (!isOpen)
        return null;
    const results = query.trim()
        ? courses.filter((c) => `${c.title} ${c.shortTitle} ${c.description} ${c.category} ${c.tags.join(' ')} ${c.instructor}`
            .toLowerCase()
            .includes(query.toLowerCase()))
        : courses.slice(0, 4);
    return (<div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-input-wrap">
          <Search size={20} className="search-modal-icon"/>
          <input type="text" className="search-modal-input" placeholder="ابحث عن مادة، مرحلة دراسية، أو مهارة..." value={query} onChange={(e) => setQuery(e.target.value)} autoFocus/>
          <button className="search-modal-close" onClick={onClose} aria-label="إغلاق البحث">
            <X size={18}/>
          </button>
        </div>

        <div className="search-modal-results">
          <div className="search-modal-header">
            <span>{query ? `النتائج (${results.length.toLocaleString('ar-EG')})` : 'المسارات المقترحة'}</span>
          </div>

          {results.length > 0 ? (<div className="search-modal-list">
              {results.map((course) => (<Link key={course.id} href={`/course/${course.id}`} className="search-modal-item" onClick={onClose}>
                  <img src={course.image} alt={course.title} className="search-modal-thumb"/>
                  <div className="search-modal-info">
                    <span className="search-modal-cat">{course.category}</span>
                    <strong className="search-modal-title">{course.title}</strong>
                    <small className="search-modal-meta">
                      {course.level} · {course.duration}
                    </small>
                  </div>
                  <div className="search-modal-price">
                    <span>{formatPrice(course.price)}</span>
                    <ArrowLeft size={16}/>
                  </div>
                </Link>))}
            </div>) : (<div className="search-modal-empty">
              <BookOpen size={28}/>
              <p>لم نجد نتائج مطابقة لـ "{query}"</p>
              <small>جرّب البحث باسم المادة (مثل: أحياء، عربي، رياضيات) أو المرحلة الدراسية</small>
            </div>)}
        </div>

        <div className="search-modal-footer">
          <div className="search-modal-shortcuts">
            <span><kbd>ESC</kbd> للإغلاق</span>
            <span><kbd>↵</kbd> للاختيار</span>
          </div>
          <Link href="/courses" onClick={onClose} className="search-modal-all-link">
            عرض كل المسارات <ArrowLeft size={13}/>
          </Link>
        </div>
      </div>
    </div>);
};
export default SearchModal;
