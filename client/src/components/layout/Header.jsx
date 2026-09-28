import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, ShoppingBag, UserRound, LogOut, Menu, X } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { SearchModal } from '@/components/common/SearchModal';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { navItems } from '@/lib/data';

export const Header = () => {
    const [path] = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { itemCount } = useCart();
    const { isAuthenticated, role, user, logout } = useAuth();

    return (
        <>
            <header className="pill-nav-shell" dir="rtl">
                <nav className="pill-navbar" aria-label="التنقل الرئيسي">
                    {/* Right Side: Logo + Theme Toggle + Search Pill */}
                    <div className="pill-nav-right">
                        <Logo className="pill-nav-logo" />

                        <div className="pill-nav-theme-toggle">
                            <ThemeToggle />
                        </div>

                        {/* Search Pill Input */}
                        <button
                            type="button"
                            className="pill-nav-search-btn"
                            onClick={() => setSearchOpen(true)}
                            aria-label="ابحث في الموقع"
                            title="ابحث في الموقع"
                        >
                            <Search size={15} />
                            <span className="pill-search-text">ابحث في الموقع</span>
                        </button>
                    </div>

                    {/* Center Navigation Links */}
                    <div className={`pill-nav-center ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                        {navItems.map((item) => {
                            const isHash = item.href.includes('#');
                            const hashTarget = isHash ? item.href.split('#')[1] : null;
                            const isItemActive = !isHash && path === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`pill-nav-link ${isItemActive ? 'active' : ''}`}
                                    onClick={(e) => {
                                        setMobileMenuOpen(false);
                                        if (isHash && (path === '/' || path === '')) {
                                            e.preventDefault();
                                            const el = document.getElementById(hashTarget);
                                            if (el) {
                                                el.scrollIntoView({ behavior: 'smooth' });
                                                window.history.pushState(null, '', `#${hashTarget}`);
                                            }
                                        }
                                    }}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}

                        {isAuthenticated && (
                            <Link
                                href={role === 'instructor' ? '/instructor' : '/dashboard'}
                                className={`pill-nav-link ${path.startsWith('/dashboard') || path.startsWith('/instructor') ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {role === 'instructor' ? 'لوحة المعلم' : 'مساحة الطالب'}
                            </Link>
                        )}
                    </div>

                    {/* Left Side: Dual Action Buttons / Logged in state + Cart + Mobile Toggle */}
                    <div className="pill-nav-left">
                        {/* Cart Icon Button */}
                        <Link href="/cart" className="pill-icon-btn cart-relative" aria-label="سلة الشراء" title="سلة الشراء">
                            <ShoppingBag size={18} />
                            {itemCount > 0 && <span className="pill-cart-count">{itemCount.toLocaleString('ar-EG')}</span>}
                        </Link>

                        {isAuthenticated ? (
                            <>
                                {/* Logged-in User Profile Link */}
                                <Link
                                    href={role === 'instructor' ? '/instructor' : '/dashboard'}
                                    className="btn-pill-dark"
                                    title={user?.name || 'حسابي'}
                                >
                                    <span className="user-logged-tag">
                                        <UserRound size={15} />
                                        <span>{user?.name?.split(' ')[0] || 'حسابي'}</span>
                                    </span>
                                </Link>

                                {/* Logout Button */}
                                <button
                                    type="button"
                                    className="btn-pill-logout"
                                    onClick={() => logout()}
                                    title="تسجيل الخروج"
                                >
                                    <LogOut size={14} />
                                    <span className="hide-mobile-sm">خروج</span>
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Login Button (Dark Pill) */}
                                <Link href="/login" className="btn-pill-dark">
                                    <span>تسجيل الدخول</span>
                                </Link>

                                {/* Sign Up Button (Bright Accent Pill) */}
                                <Link href="/login" className="btn-pill-accent hide-mobile-sm">
                                    <span>حساب جديد</span>
                                </Link>
                            </>
                        )}

                        {/* Mobile Hamburger Toggle */}
                        <button
                            type="button"
                            className="pill-icon-btn mobile-menu-toggle"
                            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </nav>
            </header>

            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
};

export default Header;

