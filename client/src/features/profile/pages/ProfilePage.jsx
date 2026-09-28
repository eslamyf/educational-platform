import React from 'react';
import { useLocation } from 'wouter';
import { Lock, ShieldCheck, ArrowLeft, MessageSquare, AlertCircle, UserCheck } from 'lucide-react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAuth } from '@/hooks/useAuth';
import { egyptEducationOptions } from '@/lib/data';

export const ProfilePage = () => {
    const [, navigate] = useLocation();
    const { user } = useAuth();

    const studentName = user?.name || 'اسلام ياسر';
    const studentEmail = user?.email || 'eslam@example.com';
    const studentPhone = user?.phone || '01028103634';
    const studentGov = user?.governorate || 'القاهرة';
    const studentStage = user?.stage || 'البكالوريا المصرية';
    const studentGrade = user?.grade || 'الصف الثاني بالبكالوريا';
    const studentTrack = user?.track || 'علمي علوم';
    const studentGuardian = user?.guardian || '01090766432';
    const studentNationalId = user?.nationalId || '30401011234567';

    return (
        <PortalLayout activeTab="profile" role="student">
            <div className="profile-heading">
                <div>
                    <div className="eyebrow">مساحتك وملفك الشخصي</div>
                    <h1 className="display">بيانات الطالب والمرحلة التعليمية</h1>
                    <p className="muted">
                        بطاقة بياناتك الرسمية المسجلة والمعتمدة في منصة نَوَى لتأمين المحاضرات وتوثيق الاختبارات.
                    </p>
                </div>
                <div className="profile-avatar">{studentName[0]}</div>
            </div>

            {/* Official Locked Verification Banner */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '16px 20px',
                    borderRadius: 16,
                    background: 'rgba(216, 110, 77, 0.08)',
                    border: '1px solid rgba(216, 110, 77, 0.25)',
                    marginBottom: 24,
                }}
            >
                <div
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: '#fae6dc',
                        color: 'var(--coral-dark)',
                        display: 'grid',
                        placeItems: 'center',
                        flex: 'none',
                    }}
                >
                    <Lock size={20} />
                </div>
                <div>
                    <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--ink)', marginBottom: 2 }}>
                        بيانات الحساب موثقة ومقفلة ضد التعديل المباشر
                    </strong>
                    <span style={{ fontSize: '0.74rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                        لحماية حسابك وتوثيق الشهادات ومنع مشاركة الحسابات، لا يمكن تعديل الاسم أو الرقم القومي أو المرحلة يدويًا. للتعديل، يرجى مراسلة الدعم الفني.
                    </span>
                </div>
            </div>

            <div className="profile-card">
                <div className="profile-card-head">
                    <div>
                        <h2>البيانات الأساسية</h2>
                        <p>معلومات التواصل والتسجيل الرسمي.</p>
                    </div>
                    <span className="profile-saved profile-saved-active" style={{ color: '#16a34a', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.76rem', fontWeight: 700 }}>
                        <ShieldCheck size={16} /> حساب موثق ومعتمد
                    </span>
                </div>

                <div className="profile-grid">
                    <label>
                        الاسم بالكامل
                        <div style={{ position: 'relative' }}>
                            <input
                                value={studentName}
                                readOnly
                                disabled
                                style={{ background: 'var(--paper-deep)', cursor: 'not-allowed', color: 'var(--ink)', fontWeight: 600, paddingLeft: 36 }}
                            />
                            <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                        </div>
                    </label>

                    <label>
                        البريد الإلكتروني
                        <div style={{ position: 'relative' }}>
                            <input
                                value={studentEmail}
                                readOnly
                                disabled
                                style={{ background: 'var(--paper-deep)', cursor: 'not-allowed', color: 'var(--ink)', fontWeight: 600, paddingLeft: 36 }}
                            />
                            <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                        </div>
                    </label>

                    <label>
                        رقم الهاتف المسجل
                        <div style={{ position: 'relative' }}>
                            <input
                                value={studentPhone}
                                readOnly
                                disabled
                                style={{ background: 'var(--paper-deep)', cursor: 'not-allowed', color: 'var(--ink)', fontWeight: 600, paddingLeft: 36 }}
                            />
                            <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                        </div>
                    </label>

                    <label>
                        المحافظة
                        <div style={{ position: 'relative' }}>
                            <input
                                value={studentGov}
                                readOnly
                                disabled
                                style={{ background: 'var(--paper-deep)', cursor: 'not-allowed', color: 'var(--ink)', fontWeight: 600, paddingLeft: 36 }}
                            />
                            <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                        </div>
                    </label>
                </div>

                <div className="profile-card-head profile-study-head">
                    <div>
                        <h2>النظام والمرحلة التعليمية المعتمدة</h2>
                        <p>النظام الدراسي والصف المخصص لحسابك.</p>
                    </div>
                </div>

                <div className="stage-choice profile-stage-choice">
                    {egyptEducationOptions.stages.map((stg) => {
                        const info = egyptEducationOptions.stageMap[stg];
                        const isActive = studentStage === stg;
                        return (
                            <div
                                key={stg}
                                className={isActive ? 'active' : ''}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 4,
                                    padding: 14,
                                    borderRadius: 14,
                                    border: isActive ? '2px solid var(--coral)' : '1px solid var(--line)',
                                    background: isActive ? '#fff7f2' : 'var(--paper-deep)',
                                    opacity: isActive ? 1 : 0.6,
                                    cursor: 'not-allowed',
                                }}
                            >
                                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: isActive ? 'var(--coral-dark)' : 'var(--ink)' }}>
                                    {info.label} {isActive && '✓ (المسار الحالي)'}
                                </span>
                                <small style={{ color: 'var(--muted)', fontSize: '0.68rem' }}>{info.description}</small>
                            </div>
                        );
                    })}
                </div>

                <div className="profile-grid">
                    <label>
                        الصف الدراسي
                        <div style={{ position: 'relative' }}>
                            <input
                                value={studentGrade}
                                readOnly
                                disabled
                                style={{ background: 'var(--paper-deep)', cursor: 'not-allowed', color: 'var(--ink)', fontWeight: 600, paddingLeft: 36 }}
                            />
                            <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                        </div>
                    </label>

                    <label>
                        الشعبة / المسار
                        <div style={{ position: 'relative' }}>
                            <input
                                value={studentTrack}
                                readOnly
                                disabled
                                style={{ background: 'var(--paper-deep)', cursor: 'not-allowed', color: 'var(--ink)', fontWeight: 600, paddingLeft: 36 }}
                            />
                            <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                        </div>
                    </label>
                </div>

                <div className="profile-grid">
                    <label>
                        رقم هاتف ولي الأمر
                        <div style={{ position: 'relative' }}>
                            <input
                                value={studentGuardian}
                                readOnly
                                disabled
                                style={{ background: 'var(--paper-deep)', cursor: 'not-allowed', color: 'var(--ink)', fontWeight: 600, paddingLeft: 36 }}
                            />
                            <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                        </div>
                    </label>

                    <label>
                        الرقم القومي (موثق)
                        <div style={{ position: 'relative' }}>
                            <input
                                value={studentNationalId}
                                readOnly
                                disabled
                                style={{ background: 'var(--paper-deep)', cursor: 'not-allowed', color: 'var(--ink)', fontWeight: 600, paddingLeft: 36 }}
                            />
                            <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                        </div>
                    </label>
                </div>

                <div className="profile-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
                    <a
                        href="https://wa.me/201028103634?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AA%D8%B9%D8%AF%D9%8A%D9%84%20%D8%A8%D9%8A%D8%A7%D9%86%D8%A7%D8%AA%D9%8A%20%D8%B9%D9%84%D9%89%20%D9%85%D9%86%D8%B5%D8%A9%20%D9%86%D9%8E%D9%88%D9%8E%D9%89"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.82rem' }}
                    >
                        <MessageSquare size={15} /> طلب تعديل البيانات عبر الدعم الفني
                    </a>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => navigate('/dashboard')}
                    >
                        العودة إلى لوحة الطالب <ArrowLeft size={15} />
                    </button>
                </div>
            </div>
        </PortalLayout>
    );
};

export default ProfilePage;

