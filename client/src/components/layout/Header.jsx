import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, ShoppingBag, UserRound, ArrowLeft, Menu, X } from 'lucide-react';
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
    const { isAuthenticated, role, user } = useAuth();

    return (
        <>
            <header className="nav-shell">
                <nav className="container nav" aria-label="التنقل الرئيسي">
                    <Logo />

                    <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={path === item.href ? 'active' : ''}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        {isAuthenticated && (
                            <Link
                                href={role === 'instructor' ? '/instructor' : '/dashboard'}
                                className="mobile-only-link"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {role === 'instructor' ? 'لوحة المعلم' : 'مساحة الطالب'}
                            </Link>
                        )}
                    </div>

                    <div className="nav-actions">
                        <ThemeToggle />

                        <button
                            type="button"
                            className="icon-btn"
                            aria-label="بحث سريع"
                            title="بحث سريع"
                            onClick={() => setSearchOpen(true)}
                        >
                            <Search size={18} />
                        </button>

                        <Link
                            href={isAuthenticated ? (role === 'instructor' ? '/instructor' : '/dashboard') : '/login'}
                            className="icon-btn signup-icon"
                            aria-label={isAuthenticated ? `حساب ${user?.name}` : 'تسجيل الدخول'}
                            title={isAuthenticated ? user?.name : 'تسجيل الدخول'}
                        >
                            <UserRound size={18} />
                            {isAuthenticated && <span className="online-badge" />}
                        </Link>

                        <Link href="/cart" className="icon-btn cart-btn-relative" aria-label="سلة الشراء">
                            <ShoppingBag size={18} />
                            {itemCount > 0 && <span className="cart-badge">{itemCount.toLocaleString('ar-EG')}</span>}
                        </Link>

                        <Link href="/courses" className="btn btn-primary btn-small hide-mobile-sm">
                            ابدأ التعلّم <ArrowLeft size={14} />
                        </Link>

                        <button
                            type="button"
                            className="icon-btn menu-btn"
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
