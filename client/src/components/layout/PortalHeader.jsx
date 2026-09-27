import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Logo } from '@/components/common/Logo';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X, LogOut, GraduationCap, Settings2 } from 'lucide-react';
export const PortalHeader = ({ role: propsRole }) => {
    const [, navigate] = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const { role: authRole, logout, setRole, user } = useAuth();
    const currentRole = propsRole || authRole;
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    const handleRoleToggle = () => {
        const nextRole = currentRole === 'student' ? 'instructor' : 'student';
        setRole(nextRole);
        navigate(nextRole === 'instructor' ? '/instructor' : '/dashboard');
    };
    return (<header className="portal-header">
      <div className="container portal-nav">
        <Logo />

        <div className={`portal-links ${menuOpen ? 'open' : ''}`}>
          <Link href={currentRole === 'instructor' ? '/instructor' : '/dashboard'} onClick={() => setMenuOpen(false)}>
            {currentRole === 'instructor' ? 'لوحة المعلم' : 'لوحة الطالب'}
          </Link>
          <Link href="/courses" onClick={() => setMenuOpen(false)}>
            استكشف الكورسات
          </Link>
          {currentRole === 'student' && (<Link href="/profile" onClick={() => setMenuOpen(false)}>
              ملفي التعليمي
            </Link>)}

          <button type="button" className="role-pill-btn" onClick={handleRoleToggle} title="تبديل العرض بين الطالب والمعلم">
            {currentRole === 'instructor' ? (<>
                <GraduationCap size={14}/> عرض كطالب
              </>) : (<>
                <Settings2 size={14}/> لوحة الإدارة
              </>)}
          </button>

          <button type="button" className="portal-logout-btn" onClick={handleLogout}>
            <LogOut size={14}/> تسجيل الخروج
          </button>
        </div>

        <div className="portal-actions">
          <ThemeToggle />

          <button type="button" className="icon-btn portal-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}>
            {menuOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </div>
    </header>);
};
export default PortalHeader;
