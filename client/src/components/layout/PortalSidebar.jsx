import React from 'react';
import { Link } from 'wouter';
import {
    LayoutDashboard,
    BookOpen,
    ListChecks,
    Users,
    Settings2,
    Sparkles,
    UserRound,
    DollarSign,
    Wallet,
    GraduationCap,
    Briefcase,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const PortalSidebar = ({ active, role: propsRole, onTabChange }) => {
    const { user, role: authRole } = useAuth();
    const role = propsRole || authRole;

    const studentItems = [
        { icon: LayoutDashboard, label: 'نظرة عامة', href: '/dashboard', key: 'overview' },
        { icon: BookOpen, label: 'كورساتي', href: '/dashboard?tab=courses', key: 'courses' },
        { icon: ListChecks, label: 'الاختبارات والواجبات', href: '/dashboard?tab=quizzes', key: 'quizzes' },
        { icon: UserRound, label: 'بياناتي والمرحلة', href: '/profile', key: 'profile' },
    ];

    const instructorItems = [
        { icon: LayoutDashboard, label: 'نظرة عامة', href: '/instructor', key: 'overview' },
        { icon: BookOpen, label: 'إدارة الكورسات والدروس', href: '/instructor?tab=courses', key: 'courses' },
        { icon: Users, label: 'الطلاب والاشتراكات', href: '/instructor?tab=students', key: 'students' },
        { icon: Briefcase, label: 'المعلمون والمحاضرون', href: '/instructor?tab=teachers', key: 'teachers' },
        { icon: Wallet, label: 'المبيعات والأرباح', href: '/instructor?tab=earnings', key: 'earnings' },
        { icon: Settings2, label: 'الملف الشخصي والإعدادات', href: '/instructor?tab=settings', key: 'settings' },
    ];

    const items = role === 'instructor' ? instructorItems : studentItems;
    const avatarLetter = (user?.name || (role === 'instructor' ? 'أ' : 'س'))[0];

    const handleItemClick = (e, item) => {
        if (onTabChange && item.key !== 'profile') {
            e.preventDefault();
            onTabChange(item.key);
        }
    };

    return (
        <aside className="portal-sidebar">
            <div className="sidebar-profile">
                <div className="sidebar-avatar">{avatarLetter}</div>
                <div className="sidebar-profile-info">
                    <strong>{user?.name || (role === 'instructor' ? 'إدارة المنصة والمعلم' : 'سارة أحمد')}</strong>
                    <span>
                        {role === 'instructor'
                            ? (user?.track ? `معلّم ${user.track}` : 'إدارة المنصة والمعلم')
                            : `${user?.stage || 'المرحلة الثانوية'} · ${user?.grade || 'الصف الثالث الثانوي'}`}
                    </span>
                </div>
            </div>

            <nav aria-label="تنقل البوابة">
                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.key;
                    return (
                        <Link
                            className={isActive ? 'active' : ''}
                            href={item.href}
                            key={item.key}
                            onClick={(e) => handleItemClick(e, item)}
                        >
                            <Icon size={17} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="sidebar-help">
                <Sparkles size={17} />
                <strong>{role === 'instructor' ? 'أنت تصنع تجربة تعليمية متكاملة' : 'خطوة صغيرة اليوم، أثر كبير'}</strong>
                <p>
                    {role === 'instructor'
                        ? 'أي تعديل أو إضافة كورس أو فيديو يظهر فورًا لجميع طلاب المنصة.'
                        : 'استمر في درس واحد يوميًا للحفاظ على وتيرة التعلّم.'}
                </p>
            </div>
        </aside>
    );
};

export default PortalSidebar;
