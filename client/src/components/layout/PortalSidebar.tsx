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
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface PortalSidebarProps {
  active: string;
  role?: 'student' | 'instructor';
}

export const PortalSidebar: React.FC<PortalSidebarProps> = ({ active, role: propsRole }) => {
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
    { icon: BookOpen, label: 'إدارة الكورسات والمحتوى', href: '/instructor?tab=courses', key: 'courses' },
    { icon: Users, label: 'الطلاب والتقدم', href: '/instructor?tab=students', key: 'students' },
    { icon: Settings2, label: 'إعدادات المنصة', href: '/instructor?tab=settings', key: 'settings' },
  ];

  const items = role === 'instructor' ? instructorItems : studentItems;
  const avatarLetter = (user?.name || (role === 'instructor' ? 'م' : 'س'))[0];

  return (
    <aside className="portal-sidebar">
      <div className="sidebar-profile">
        <div className="sidebar-avatar">{avatarLetter}</div>
        <div>
          <strong>{user?.name || (role === 'instructor' ? 'صاحب المنصة' : 'سارة أحمد')}</strong>
          <span>
            {role === 'instructor'
              ? 'إدارة المنصة'
              : `${user?.stage || 'المرحلة الثانوية'} · ${user?.grade || 'تالتة ثانوي'}`}
          </span>
        </div>
      </div>

      <nav aria-label="تنقل البوابة">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              className={active === item.key ? 'active' : ''}
              href={item.href}
              key={item.key}
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
            ? 'أي تعديل أو إضافة درس يظهر مباشرة لجميع طلاب المنصة.'
            : 'استمر في درس واحد يوميًا للحفاظ على وتيرة التعلّم.'}
        </p>
      </div>
    </aside>
  );
};

export default PortalSidebar;
