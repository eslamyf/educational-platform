import React from 'react';
import { Link } from 'wouter';
import { PortalHeader } from './PortalHeader';
import { PortalSidebar } from './PortalSidebar';
import { useAuth } from '@/hooks/useAuth';
import { LogIn, ArrowLeft, Shield } from 'lucide-react';

export const PortalGate = ({ role = 'student' }) => {
    const isInstructor = role === 'instructor';
    return (
        <div className="portal-page access-gate-page">
            <div className="access-gate">
                <div className="access-gate-icon" style={{ background: isInstructor ? 'rgba(30, 41, 59, 0.08)' : undefined }}>
                    {isInstructor ? <Shield size={26} color="#1e293b" /> : <LogIn size={26} />}
                </div>
                <div className="eyebrow">{isInstructor ? 'بوابة إدارة المنصة والمعلمين' : 'الدخول مطلوب'}</div>
                <h1 className="display">{isInstructor ? 'وصول محمي للمسؤولين.' : 'سجّل حسابك عشان تكمّل.'}</h1>
                <p>
                    {isInstructor
                        ? 'هذه المساحة مخصصة للإدارة والمعلمين فقط. يرجى تسجيل الدخول بحسابك المصرح له عبر بوابة الإدارة.'
                        : 'هذه المساحة خاصة بالطلاب المسجلين. سجّل الدخول أو أنشئ حسابًا مجانيًا للمتابعة.'}
                </p>
                <Link href={isInstructor ? '/admin' : '/login'} className="btn btn-primary">
                    {isInstructor ? 'تسجيل دخول الإدارة والمعلم' : 'تسجيل الدخول'} <ArrowLeft size={15} />
                </Link>
            </div>
        </div>
    );
};

export const PortalLayout = ({
    children,
    activeTab = 'overview',
    onTabChange,
    role: propsRole,
    fullWidth = false,
}) => {
    const { isAuthenticated, role: authRole } = useAuth();
    const currentRole = propsRole || authRole;

    if (!isAuthenticated) {
        return <PortalGate role={currentRole} />;
    }

    return (
        <div className={`portal-page ${currentRole === 'instructor' ? 'instructor-page' : ''}`}>
            <PortalHeader role={currentRole} />
            <div className={`portal-layout ${fullWidth ? 'portal-layout-full' : 'container'}`}>
                {!fullWidth && (
                    <PortalSidebar
                        active={activeTab}
                        onTabChange={onTabChange}
                        role={currentRole}
                    />
                )}
                <main className="portal-main">{children}</main>
            </div>
        </div>
    );
};

export default PortalLayout;
