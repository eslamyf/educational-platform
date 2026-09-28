import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
    BookOpen,
    LogIn,
    ShieldCheck,
    Sparkles,
    ArrowLeft,
    ArrowRight,
    Check,
    CheckCircle2,
    Home,
    GraduationCap,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { egyptEducationOptions } from '@/lib/data';
import { toast } from 'sonner';

export const LoginPage = () => {
    const [, navigate] = useLocation();
    const { login, register } = useAuth();
    const [mode, setMode] = useState('login'); // 'login' | 'register'
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState('next');
    const [errors, setErrors] = useState({});

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        governorate: 'القاهرة',
        stage: 'الثانوية العامة',
        grade: 'الصف الثالث الثانوي',
        track: 'علمي علوم',
        guardian: '',
        nationalId: '',
    });

    const [password, setPassword] = useState('');
    const totalSteps = 3;

    const currentStageKey = egyptEducationOptions.stages.includes(profile.stage)
        ? profile.stage
        : 'الثانوية العامة';
    const currentStageInfo = egyptEducationOptions.stageMap[currentStageKey];
    const gradeOptions = currentStageInfo.grades;
    const trackOptions = currentStageInfo.tracks;

    const validateField = (key, value) => {
        if (key === 'name' && value.trim().length < 3) {
            return 'اكتب الاسم بالكامل (٣ أحرف على الأقل).';
        }
        if (key === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
            return 'اكتب بريدًا إلكترونيًا صحيحًا.';
        }
        if (key === 'password' && value.length < 6) {
            return 'كلمة المرور يجب أن تكون ٦ أحرف على الأقل.';
        }
        if (key === 'phone' && !/^01\d{9}$/.test(value.replace(/\s/g, ''))) {
            return 'رقم الهاتف يجب أن يتكون من ١١ رقمًا ويبدأ بـ01.';
        }
        if (key === 'nationalId' && value && !/^\d{14}$/.test(value.replace(/\s/g, ''))) {
            return 'الرقم القومي يجب أن يتكون من ١٤ رقمًا.';
        }
        return '';
    };

    const updateProfileField = (key, value) => {
        setProfile((prev) => ({ ...prev, [key]: value }));
        const errorMsg = validateField(key, value);
        setErrors((prev) => ({ ...prev, [key]: errorMsg }));
    };

    const validateCurrentStep = () => {
        const nextErrors = { ...errors };
        if (mode === 'login') {
            const emailErr = validateField('email', profile.email);
            const passErr = validateField('password', password);
            if (emailErr) nextErrors.email = emailErr;
            if (passErr) nextErrors.password = passErr;
            setErrors(nextErrors);
            return !emailErr && !passErr;
        }

        if (step === 1) {
            const nameErr = validateField('name', profile.name);
            const emailErr = validateField('email', profile.email);
            const passErr = validateField('password', password);
            const phoneErr = validateField('phone', profile.phone || '');
            if (nameErr) nextErrors.name = nameErr;
            if (emailErr) nextErrors.email = emailErr;
            if (passErr) nextErrors.password = passErr;
            if (phoneErr) nextErrors.phone = phoneErr;
            setErrors(nextErrors);
            return !nameErr && !emailErr && !passErr && !phoneErr;
        }

        return true;
    };

    const nextStep = () => {
        if (!validateCurrentStep()) return;
        setDirection('next');
        setStep((curr) => Math.min(totalSteps, curr + 1));
    };

    const prevStep = () => {
        setDirection('back');
        setStep((curr) => Math.max(1, curr - 1));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateCurrentStep()) return;

        if (mode === 'register') {
            if (step < totalSteps) {
                nextStep();
                return;
            }
            register(profile, 'student');
            navigate('/welcome');
        } else {
            login(profile.email || 'student@nawa.education', 'student', profile.name);
            navigate('/dashboard');
        }
    };

    return (
        <div className="login-page">
            {/* Decorative Visual Art Side */}
            <div className="login-art">
                <div className="login-art-copy">
                    <div className="eyebrow">مساحة تعلّم مصرية متكاملة</div>
                    <h1 className="display">
                        مستقبلك
                        <br />
                        <em>يبدأ بخطوة.</em>
                    </h1>
                    <p>
                        من مناهج الثانوية العامة إلى مسارات البكالوريا المصرية — شروحات تفصيلية، حل بنوك الأسئلة، ومتابعة دقيقة لكل خطوة في رحلتك.
                    </p>
                    <div className="login-art-mark">
                        <BookOpen size={18} /> تعليم مصري راقٍ بطابع نَوَى
                    </div>
                </div>
                <div className="login-art-orbit orbit-one" />
                <div className="login-art-orbit orbit-two" />
                <div className="login-art-note">
                    <Sparkles size={16} />
                    <span>
                        سجّل خطوتك الأولى
                        <br />
                        وخلّي التفوق علينا.
                    </span>
                </div>
            </div>

            {/* Login & Registration Form Panel */}
            <main className="login-panel">
                {/* Top Navigation Bar with Back to Homepage Button */}
                <div className="login-panel-top">
                    <Link href="/" className="login-back-home-btn" title="العودة للصفحة الرئيسية">
                        <ArrowRight size={17} />
                        <span>العودة للصفحة الرئيسية</span>
                    </Link>

                    <Link href="/" className="login-brand" title="نَوَى">
                        <span className="brand-mark">ن</span>
                        <span>
                            <strong>نَوَى</strong>
                            <small>تعلّمٌ يشبهك</small>
                        </span>
                    </Link>
                </div>

                <div className={`login-form-wrap ${mode === 'register' ? 'register-form-wrap' : ''}`}>
                    <div className="eyebrow">{mode === 'login' ? 'مرحبًا بك من جديد' : 'حساب طالب جديد'}</div>
                    <h2 className="display">{mode === 'login' ? 'خلّينا نكمّل.' : 'اعمل حسابك.'}</h2>
                    <p className="muted">
                        {mode === 'login'
                            ? 'سجّل دخولك لمتابعة كورساتك ومحاضراتك ومستواك الدراسي.'
                            : '٣ خطوات سريعة لنجهز لك تجربة مخصصة على مقاس مرحلتك وتخصصك.'}
                    </p>

                    {/* Mode Switch (Login / Register) */}
                    <div className="mode-switch">
                        <button
                            type="button"
                            className={mode === 'login' ? 'active' : ''}
                            onClick={() => {
                                setMode('login');
                                setStep(1);
                                setErrors({});
                            }}
                        >
                            <LogIn size={15} /> تسجيل الدخول
                        </button>
                        <button
                            type="button"
                            className={mode === 'register' ? 'active' : ''}
                            onClick={() => {
                                setMode('register');
                                setStep(1);
                                setErrors({});
                            }}
                        >
                            <GraduationCap size={15} /> حساب جديد
                        </button>
                    </div>

                    {/* Wizard Progress bar (Register mode) */}
                    {mode === 'register' && (
                        <div className="wizard-progress">
                            <div className="wizard-progress-top">
                                <span>
                                    الخطوة {step} من {totalSteps}
                                </span>
                                <strong>
                                    {step === 1
                                        ? 'البيانات الأساسية'
                                        : step === 2
                                            ? 'المرحلة والمسار الدراسي'
                                            : 'مراجعة وتأكيد البيانات'}
                                </strong>
                            </div>
                            <div className="wizard-progress-bar">
                                <span style={{ width: `${(step / totalSteps) * 100}%` }} />
                            </div>
                            <div className="wizard-steps">
                                {Array.from({ length: totalSteps }).map((_, idx) => (
                                    <span className={step >= idx + 1 ? 'active' : ''} key={idx}>
                                        {idx + 1}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className={`wizard-stage wizard-${direction}`} key={`${mode}-${step}`}>
                            {mode === 'login' ? (
                                /* Login View */
                                <div className="wizard-fields">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="login-email">البريد الإلكتروني</label>
                                        <input
                                            id="login-email"
                                            type="email"
                                            className="form-input"
                                            value={profile.email}
                                            onChange={(e) => updateProfileField('email', e.target.value)}
                                            placeholder="you@example.com"
                                            aria-invalid={Boolean(errors.email)}
                                        />
                                        {errors.email && <small className="field-error">{errors.email}</small>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="login-password">كلمة المرور</label>
                                        <div className="password-field">
                                            <input
                                                id="login-password"
                                                type="password"
                                                className="form-input"
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                    setErrors((prev) => ({
                                                        ...prev,
                                                        password: validateField('password', e.target.value),
                                                    }));
                                                }}
                                                placeholder="••••••••"
                                                aria-invalid={Boolean(errors.password)}
                                            />
                                            <ShieldCheck size={18} />
                                        </div>
                                        {errors.password && <small className="field-error">{errors.password}</small>}
                                    </div>

                                    <div className="form-row">
                                        <label className="check-row">
                                            <input type="checkbox" defaultChecked /> تذكّرني على هذا الجهاز
                                        </label>
                                        <button
                                            type="button"
                                            className="text-button"
                                            onClick={() => toast.info('سنرسل لك رابط استعادة كلمة المرور عبر بريدك الإلكتروني')}
                                        >
                                            نسيت كلمة المرور؟
                                        </button>
                                    </div>

                                    <button className="btn btn-primary btn-wide login-submit" type="submit">
                                        <LogIn size={17} /> دخول مساحة الطالب
                                    </button>
                                </div>
                            ) : (
                                /* Register Multi-step Wizard */
                                <>
                                    {step === 1 && (
                                        <div className="wizard-fields">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="reg-name">الاسم بالكامل</label>
                                                <input
                                                    id="reg-name"
                                                    type="text"
                                                    className="form-input"
                                                    value={profile.name}
                                                    onChange={(e) => updateProfileField('name', e.target.value)}
                                                    placeholder="مثال: سارة أحمد محمد"
                                                    aria-invalid={Boolean(errors.name)}
                                                />
                                                {errors.name && <small className="field-error">{errors.name}</small>}
                                            </div>

                                            <div className="form-grid compact-grid">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="reg-phone">رقم الهاتف</label>
                                                    <input
                                                        id="reg-phone"
                                                        type="tel"
                                                        inputMode="numeric"
                                                        autoComplete="tel"
                                                        className="form-input"
                                                        value={profile.phone || ''}
                                                        onChange={(e) => updateProfileField('phone', e.target.value)}
                                                        placeholder="01X XXX XXXX"
                                                        aria-invalid={Boolean(errors.phone)}
                                                    />
                                                    {errors.phone && <small className="field-error">{errors.phone}</small>}
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="reg-gov">المحافظة</label>
                                                    <select
                                                        id="reg-gov"
                                                        className="form-select"
                                                        value={profile.governorate}
                                                        onChange={(e) => updateProfileField('governorate', e.target.value)}
                                                    >
                                                        {egyptEducationOptions.governorates.map((gov) => (
                                                            <option key={gov} value={gov}>{gov}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label" htmlFor="reg-email">البريد الإلكتروني</label>
                                                <input
                                                    id="reg-email"
                                                    type="email"
                                                    className="form-input"
                                                    value={profile.email}
                                                    onChange={(e) => updateProfileField('email', e.target.value)}
                                                    placeholder="you@example.com"
                                                    aria-invalid={Boolean(errors.email)}
                                                />
                                                {errors.email && <small className="field-error">{errors.email}</small>}
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label" htmlFor="reg-pass">كلمة المرور</label>
                                                <div className="password-field">
                                                    <input
                                                        id="reg-pass"
                                                        type="password"
                                                        className="form-input"
                                                        value={password}
                                                        onChange={(e) => {
                                                            setPassword(e.target.value);
                                                            setErrors((prev) => ({
                                                                ...prev,
                                                                password: validateField('password', e.target.value),
                                                            }));
                                                        }}
                                                        placeholder="٦ أحرف على الأقل"
                                                        aria-invalid={Boolean(errors.password)}
                                                    />
                                                    <ShieldCheck size={18} />
                                                </div>
                                                {errors.password && <small className="field-error">{errors.password}</small>}
                                            </div>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="wizard-fields">
                                            {/* Stage Choice Pills */}
                                            <div className="form-group">
                                                <label className="form-label">النظام التعليمي</label>
                                                <div className="stage-choice">
                                                    {egyptEducationOptions.stages.map((stg) => {
                                                        const info = egyptEducationOptions.stageMap[stg];
                                                        const isActive = profile.stage === stg;
                                                        return (
                                                            <button
                                                                key={stg}
                                                                type="button"
                                                                className={isActive ? 'active' : ''}
                                                                onClick={() => {
                                                                    setProfile((prev) => ({
                                                                        ...prev,
                                                                        stage: stg,
                                                                        grade: info.grades[0],
                                                                        track: info.tracks[0],
                                                                    }));
                                                                }}
                                                            >
                                                                <span className="stage-title">{info.label}</span>
                                                                <small className="stage-desc">{info.description}</small>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            <div className="form-grid compact-grid">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="reg-grade">الصف الدراسي</label>
                                                    <select
                                                        id="reg-grade"
                                                        className="form-select"
                                                        value={profile.grade}
                                                        onChange={(e) => updateProfileField('grade', e.target.value)}
                                                    >
                                                        {gradeOptions.map((g) => (
                                                            <option key={g} value={g}>{g}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="reg-track">المسار / الشعبة</label>
                                                    <select
                                                        id="reg-track"
                                                        className="form-select"
                                                        value={profile.track}
                                                        onChange={(e) => updateProfileField('track', e.target.value)}
                                                    >
                                                        {trackOptions.map((t) => (
                                                            <option key={t} value={t}>{t}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-grid compact-grid">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="reg-guardian">رقم ولي الأمر (اختياري)</label>
                                                    <input
                                                        id="reg-guardian"
                                                        type="tel"
                                                        className="form-input"
                                                        value={profile.guardian || ''}
                                                        onChange={(e) => updateProfileField('guardian', e.target.value)}
                                                        placeholder="01X XXX XXXX"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="reg-nid">الرقم القومي (اختياري)</label>
                                                    <input
                                                        id="reg-nid"
                                                        type="text"
                                                        maxLength={14}
                                                        className="form-input"
                                                        value={profile.nationalId || ''}
                                                        onChange={(e) => updateProfileField('nationalId', e.target.value)}
                                                        placeholder="١٤ رقمًا"
                                                    />
                                                </div>
                                            </div>

                                            <div className="wizard-hint">
                                                <Sparkles size={16} />
                                                <span>
                                                    {profile.stage === 'البكالوريا المصرية'
                                                        ? 'ستظهر لك مسارات ومواد نظام البكالوريا المصرية وفق التخصص المختار.'
                                                        : 'ستظهر لك مواد الثانوية العامة والمسار العلمي أو الأدبي الذي اخترته.'}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <div className="review-card">
                                            <div className="review-card-head">
                                                <div>
                                                    <div className="eyebrow">الخطوة الأخيرة</div>
                                                    <h3>راجع بياناتك المسجلة</h3>
                                                </div>
                                                <CheckCircle2 size={24} color="var(--coral)" />
                                            </div>

                                            <div className="review-list">
                                                <div>
                                                    <span>الاسم</span>
                                                    <strong>{profile.name || '—'}</strong>
                                                </div>
                                                <div>
                                                    <span>البريد الإلكتروني</span>
                                                    <strong>{profile.email || '—'}</strong>
                                                </div>
                                                <div>
                                                    <span>المحافظة</span>
                                                    <strong>{profile.governorate}</strong>
                                                </div>
                                                <div>
                                                    <span>المرحلة والصف</span>
                                                    <strong>{profile.stage} · {profile.grade}</strong>
                                                </div>
                                                <div>
                                                    <span>المسار التخصصي</span>
                                                    <strong>{profile.track}</strong>
                                                </div>
                                            </div>

                                            <p className="review-note">كل شيء جاهز. اضغط إنشاء الحساب للدخول فورًا إلى مساحتك التعليمية.</p>
                                        </div>
                                    )}

                                    <div className="wizard-actions">
                                        {step > 1 && (
                                            <button type="button" className="btn btn-secondary" onClick={prevStep}>
                                                <ArrowRight size={15} /> رجوع
                                            </button>
                                        )}

                                        {step < totalSteps ? (
                                            <button type="button" className="btn btn-primary" onClick={nextStep}>
                                                التالي <ArrowLeft size={15} />
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary" type="submit">
                                                <Check size={16} /> إنشاء الحساب والبدء
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </form>
                </div>

                <div className="login-footer">
                    <span>© ٢٠٢٦ نَوَى للتعليم الإلكتروني</span>
                    <Link href="/" style={{ color: 'var(--coral-dark)', fontWeight: 600 }}>الرئيسية</Link>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
