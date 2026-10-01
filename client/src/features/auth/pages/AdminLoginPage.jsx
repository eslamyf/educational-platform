import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
    Shield,
    Lock,
    Mail,
    ArrowRight,
    LogIn,
    KeyRound,
    Briefcase,
    CheckCircle2,
    Sparkles,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const AdminLoginPage = () => {
    const [, navigate] = useLocation();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            toast.error('يرجى كتابة البريد الإلكتروني وكلمة المرور.');
            return;
        }
        setIsLoading(true);
        const result = login(email.trim(), password.trim(), 'instructor');
        setIsLoading(false);
        if (result && result.success) {
            navigate('/instructor');
        }
    };

    return (
        <div className="login-page">
            <div className="login-art" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
                <div className="login-art-copy">
                    <div className="eyebrow" style={{ color: '#efc75e' }}>بوابة إدارة النظام والمسارات</div>
                    <h1 className="display" style={{ color: '#fff' }}>
                        لوحة تحكم
                        <br />
                        <em>الإدارة والمعلمين.</em>
                    </h1>
                    <p style={{ color: '#94a3b8' }}>
                        مساحة سرية ومحمية مخصصة لمدير المنصة والمعلمين لإدارة المحتوى والمحاضرات، تفعيل حسابات المعلمين، ومتابعة الأرباح والاشتراكات.
                    </p>
                    <div className="login-art-mark" style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}>
                        <Shield size={18} /> وصول محمي للمصرح لهم فقط
                    </div>
                </div>
                <div className="login-art-orbit orbit-one" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />
                <div className="login-art-orbit orbit-two" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />
            </div>

            <main className="login-panel">
                <div className="login-panel-top">
                    <Link href="/" className="login-back-home-btn" title="العودة للصفحة الرئيسية">
                        <ArrowRight size={17} />
                        <span>العودة للمنصة</span>
                    </Link>

                    <Link href="/" className="login-brand" title="نَوَى">
                        <span className="brand-mark">ن</span>
                        <span>
                            <strong>نَوَى</strong>
                            <small>بوابة الإدارة</small>
                        </span>
                    </Link>
                </div>

                <div className="login-form-wrap" style={{ maxWidth: 460 }}>
                    <div className="eyebrow" style={{ color: 'var(--coral)' }}>تسجيل دخول المسؤولين</div>
                    <h2 className="display" style={{ fontSize: '1.8rem' }}>مرحبًا يا قائد المنصة.</h2>
                    <p className="muted">
                        هذه البوابة مخصصة لمدير المنصة والمعلمين المصرح لهم فقط.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="wizard-fields">
                            <label className="form-group" style={{ gap: 6 }}>
                                <span className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600 }}>البريد الإلكتروني للإدارة / المعلم</span>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@nawa.education أو بريد المعلم"
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: 14,
                                        border: '1px solid var(--line)',
                                        background: 'var(--white)',
                                        fontSize: '0.9rem',
                                    }}
                                />
                            </label>

                            <label className="form-group" style={{ gap: 6 }}>
                                <span className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600 }}>كلمة المرور</span>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••"
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: 14,
                                        border: '1px solid var(--line)',
                                        background: 'var(--white)',
                                        fontSize: '0.9rem',
                                    }}
                                />
                            </label>

                            <button
                                type="submit"
                                className="btn btn-primary btn-wide"
                                style={{ marginTop: 8 }}
                                disabled={isLoading}
                            >
                                <LogIn size={17} />
                                <span>دخول لوحة تحكم الإدارة والمعلم</span>
                            </button>

                            <div style={{
                                marginTop: 16,
                                padding: 12,
                                background: 'rgba(0,0,0,0.03)',
                                borderRadius: 12,
                                border: '1px dashed var(--line)',
                                fontSize: '0.78rem',
                                color: 'var(--muted)',
                                lineHeight: 1.6
                            }}>
                                💡 <strong>بيانات الدخول الافتراضية:</strong><br />
                                • الأدمن: <code style={{ color: 'var(--coral-dark)' }}>admin@nawa.education</code> (كلمة المرور: <code>123456</code>)<br />
                                • المعلم: <code style={{ color: 'var(--coral-dark)' }}>instructor@nawa.education</code> (كلمة المرور: <code>123456</code>)<br />
                                • أو بريد المعلم الذي تم إنشاؤه وتفعيله من لوحة الأدمن.
                            </div>
                        </div>
                    </form>
                </div>

                <div className="login-footer">
                    <span>© ٢٠٢٦ نَوَى للتعليم الإلكتروني — نظام الإدارة المحمي</span>
                </div>
            </main>
        </div>
    );
};

export default AdminLoginPage;
