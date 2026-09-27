import React from 'react';
import { Link } from 'wouter';
export const Logo = ({ className = '', size = 'md' }) => {
    const sizeClass = size === 'sm' ? 'brand-sm' : size === 'lg' ? 'brand-lg' : '';
    return (<Link href="/" className={`brand ${sizeClass} ${className}`} aria-label="نَوَى، الصفحة الرئيسية">
      <span className="brand-mark">ن</span>
      <span className="brand-copy">
        <span className="brand-name">نَوَى</span>
        <span className="brand-sub">تعلّمٌ يشبهك</span>
      </span>
    </Link>);
};
export default Logo;
