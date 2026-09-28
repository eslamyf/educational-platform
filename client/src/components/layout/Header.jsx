import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, UserRound, LogOut, Menu, X, Moon, Sun } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { SearchModal } from '@/components/common/SearchModal';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { navItems } from '@/lib/data';

export const Header = () => {
    const [path] = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const { isAuthenticated, role, user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (totalScroll > 0) {
                const currentProgress = (window.scrollY / totalScroll) * 100;
                setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className="pill-nav-shell" dir="rtl">
                <nav className="pill-navbar" aria-label="التنقل الرئيسي">
                    {/* Right Side: Logo + Theme Toggle + Search Pill */}
                    <div className="pill-nav-right">
                        <Logo className="pill-nav-logo" />

                        <div className="pill-nav-theme-toggle hide-mobile-md">
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

                    {/* Center Navigation Links & Mobile Menu Drawer */}
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

                        {/* Mobile Menu Actions & Theme Toggle */}
                        <div className="mobile-drawer-actions">
                            <button
                                type="button"
                                className="mobile-drawer-search-btn"
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    setSearchOpen(true);
                                }}
                            >
                                <Search size={16} />
                                <span>ابحث في المنصة والمناهج...</span>
                            </button>

                            <button
                                type="button"
                                className="mobile-drawer-theme-btn"
                                onClick={() => toggleTheme?.()}
                                title={theme === 'dark' ? 'التحويل إلى الوضع النهاري' : 'التحويل إلى الوضع الليلي'}
                            >
                                <div className="mobile-drawer-theme-info">
                                    <span className="mobile-drawer-theme-icon">
                                        {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                                    </span>
                                    <span className="mobile-drawer-theme-text">
                                        {theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}
                                    </span>
                                </div>
                                <span className="mobile-drawer-theme-badge">
                                    {theme === 'dark' ? 'تفعيل النهاري ☀️' : 'تفعيل الليلي 🌙'}
                                </span>
                            </button>

                            {isAuthenticated ? (
                                <button
                                    type="button"
                                    className="mobile-drawer-logout-btn"
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        logout();
                                    }}
                                >
                                    <LogOut size={16} />
                                    <span>تسجيل الخروج</span>
                                </button>
                            ) : (
                                <div className="mobile-drawer-auth-btns">
                                    <Link
                                        href="/login"
                                        className="btn-pill-dark"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        تسجيل الدخول
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="btn-pill-accent"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        حساب جديد
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Left Side: Dual Action Buttons / Logged in state + Mobile Toggle */}
                    <div className="pill-nav-left">
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
                                        <span className="hide-mobile-xs">{user?.name?.split(' ')[0] || 'حسابي'}</span>
                                    </span>
                                </Link>

                                {/* Logout Button */}
                                <button
                                    type="button"
                                    className="btn-pill-logout hide-mobile-sm"
                                    onClick={() => logout()}
                                    title="تسجيل الخروج"
                                >
                                    <LogOut size={14} />
                                    <span>خروج</span>
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Login Button (Dark Pill) */}
                                <Link href="/login" className="btn-pill-dark">
                                    <span className="hide-mobile-xs">تسجيل الدخول</span>
                                    <span className="show-mobile-xs">دخول</span>
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

                {/* Progress bar directly underneath the pill navbar */}
                <div className="pill-scroll-track" aria-hidden="true">
                    <div
                        className="pill-scroll-bar"
                        style={{ width: `${scrollProgress}%` }}
                    />
                </div>
            </header>
            <div className="pill-nav-spacer" aria-hidden="true" />

            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
};

export default Header;

