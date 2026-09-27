import React from 'react';
import { Link } from 'wouter';
import { PortalHeader } from './PortalHeader';
import { PortalSidebar } from './PortalSidebar';
import { useAuth } from '@/hooks/useAuth';
import { LogIn, ArrowLeft } from 'lucide-react';
export const PortalGate = () => {
    return (<div className="portal-page access-gate-page">
      <div className="access-gate">
        <div className="access-gate-icon">
          <LogIn size={26}/>
        </div>
        <div className="eyebrow">الدخول مطلوب</div>
        <h1 className="display">سجّل حسابك عشان تكمّل.</h1>
        <p>هذه المساحة خاصة بالطلاب المسجلين. سجّل الدخول أو أنشئ حسابًا مجانيًا للمتابعة.</p>
        <Link href="/login" className="btn btn-primary">
          تسجيل الدخول <ArrowLeft size={15}/>
        </Link>
      </div>
    </div>);
};
export const PortalLayout = ({ children, activeTab = 'overview', role: propsRole, fullWidth = false, }) => {
    const { isAuthenticated, role: authRole } = useAuth();
    const currentRole = propsRole || authRole;
    if (!isAuthenticated) {
        return <PortalGate />;
    }
    return (<div className={`portal-page ${currentRole === 'instructor' ? 'instructor-page' : ''}`}>
      <PortalHeader role={currentRole}/>
      <div className={`portal-layout ${fullWidth ? 'portal-layout-full' : 'container'}`}>
        {!fullWidth && <PortalSidebar active={activeTab} role={currentRole}/>}
        <main className="portal-main">{children}</main>
      </div>
    </div>);
};
export default PortalLayout;
