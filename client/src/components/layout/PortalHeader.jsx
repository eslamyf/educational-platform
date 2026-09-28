import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Logo } from '@/components/common/Logo';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X, LogOut } from 'lucide-react';

export const PortalHeader = ({ role: propsRole }) => {
    const [location, navigate] = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const { role: authRole, logout } = useAuth();
    const currentRole = propsRole || authRole;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="portal-header">
            <div className="container portal-nav">
                <Logo />

                <div className={`portal-links ${menuOpen ? 'open' : ''}`}>
                    <Link
                        href="/"
                        onClick={() => setMenuOpen(false)}
                        className={location === '/' ? 'active' : ''}
                    >
                        الرئيسية
                    </Link>
                    <Link
                        href={currentRole === 'instructor' ? '/instructor' : '/dashboard'}
                        onClick={() => setMenuOpen(false)}
                        className={location.startsWith('/dashboard') || location.startsWith('/instructor') ? 'active' : ''}
                    >
                        {currentRole === 'instructor' ? 'لوحة المعلم' : 'لوحة الطالب'}
                    </Link>
                    <Link
                        href="/courses"
                        onClick={() => setMenuOpen(false)}
                        className={location === '/courses' ? 'active' : ''}
                    >
                        استكشف الكورسات
                    </Link>
                    {currentRole === 'student' && (
                        <Link
                            href="/profile"
                            onClick={() => setMenuOpen(false)}
                            className={location === '/profile' ? 'active' : ''}
                        >
                            ملفي التعليمي
                        </Link>
                    )}

                    <button type="button" className="portal-logout-btn" onClick={handleLogout}>
                        <LogOut size={14} /> تسجيل الخروج
                    </button>
                </div>

                <div className="portal-actions">
                    <ThemeToggle />

                    <button
                        type="button"
                        className="icon-btn portal-menu"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default PortalHeader;

