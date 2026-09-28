import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
    BookOpen,
    LogIn,
    Sparkles,
    ArrowLeft,
    ArrowRight,
    Check,
    CheckCircle2,
    GraduationCap,
    UserRound,
    Phone,
    Mail,
    Lock,
    MapPin,
    CreditCard,
    Eye,
    EyeOff,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { egyptEducationOptions } from '@/lib/data';
import { toast } from 'sonner';

// Reusable Universal Floating Label Field Component with Nawa Brand Identity
export const FloatingField = ({
    id,
    label,
    icon: Icon,
    type = 'text',
    value,
    onChange,
    onBlur,
    placeholderHelper,
    error,
    options = [],
    autoFocus = false,
    maxLength,
    required = false,
    className = '',
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const hasValue = value !== undefined && value !== null && String(value).trim().length > 0;
    const isFloated = isFocused || hasValue;

    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className={`floating-field-wrapper ${className}`}>
            <div
                className={`floating-field-box ${isFocused ? 'focused' : ''} ${hasValue ? 'has-value' : ''} ${error ? 'has-error' : ''}`}
                onClick={() => {
                    const el = document.getElementById(id);
                    if (el) el.focus();
                }}
            >
                {/* Floating pill badge / inside label */}
                <div className={`floating-field-label ${isFloated ? 'floated' : 'inside'}`}>
                    {Icon && <Icon size={15} className="floating-field-icon" />}
                    <span>{label}</span>
                </div>

                {type === 'select' ? (
                    <select
                        id={id}
                        className="floating-field-select"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={(e) => {
                            setIsFocused(false);
                            onBlur?.(e);
                        }}
                        autoFocus={autoFocus}
                    >
                        {options.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        id={id}
                        type={inputType}
                        className="floating-field-input"
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={(e) => {
                            setIsFocused(false);
                            onBlur?.(e);
                        }}
                        autoFocus={autoFocus}
                        maxLength={maxLength}
                        required={required}
                        autoComplete="off"
                    />
                )}

                {/* Password visibility toggle button */}
                {type === 'password' && (
                    <button
                        type="button"
                        className="floating-password-toggle"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowPassword(!showPassword);
                        }}
                        title={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                )}
            </div>

            {placeholderHelper && <span className="floating-field-helper">{placeholderHelper}</span>}
            {error && <small className="field-error">{error}</small>}
        </div>
    );
};

export const LoginPage = () => {
    const [, navigate] = useLocation();
    const { login, register } = useAuth();
    const [mode, setMode] = useState('login'); // 'login' | 'register'
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState('next');
    const [errors, setErrors] = useState({});

    // 4-part name state
    const [nameParts, setNameParts] = useState({
        first: '',
        second: '',
        third: '',
        last: '',
    });

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

    const handleNamePartChange = (partKey, val) => {
        const nextParts = { ...nameParts, [partKey]: val };
        setNameParts(nextParts);
        const combined = [nextParts.first, nextParts.second, nextParts.third, nextParts.last]
            .map((s) => s.trim())
            .filter(Boolean)
            .join(' ');
        setProfile((prev) => ({ ...prev, name: combined }));

        if (errors[partKey] || errors.name) {
            setErrors((prev) => ({ ...prev, [partKey]: '', name: '' }));
        }
    };

    const validateField = (key, value) => {
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
            let hasNameErr = false;
            if (!nameParts.first.trim()) {
                nextErrors.firstName = 'اكتب الاسم الأول.';
                hasNameErr = true;
            }
            if (!nameParts.second.trim()) {
                nextErrors.secondName = 'اكتب الاسم الثاني.';
                hasNameErr = true;
            }
            if (!nameParts.third.trim()) {
                nextErrors.thirdName = 'اكتب الاسم الثالث.';
                hasNameErr = true;
            }
            if (!nameParts.last.trim()) {
                nextErrors.lastName = 'اكتب الاسم الأخير.';
                hasNameErr = true;
            }

            const emailErr = validateField('email', profile.email);
            const passErr = validateField('password', password);
            const phoneErr = validateField('phone', profile.phone || '');
            if (emailErr) nextErrors.email = emailErr;
            if (passErr) nextErrors.password = passErr;
            if (phoneErr) nextErrors.phone = phoneErr;
            setErrors(nextErrors);
            return !hasNameErr && !emailErr && !passErr && !phoneErr;
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

                    {/* Mode Switch Tabs */}
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
                                /* Login View with Floating Inputs */
                                <div className="wizard-fields">
                                    <FloatingField
                                        id="login-email"
                                        label="البريد الإلكتروني"
                                        icon={Mail}
                                        type="email"
                                        value={profile.email}
                                        onChange={(val) => updateProfileField('email', val)}
                                        placeholderHelper="اكتب البريد المسجل به في المنصة"
                                        error={errors.email}
                                    />

                                    <FloatingField
                                        id="login-password"
                                        label="كلمة المرور"
                                        icon={Lock}
                                        type="password"
                                        value={password}
                                        onChange={(val) => {
                                            setPassword(val);
                                            setErrors((prev) => ({
                                                ...prev,
                                                password: validateField('password', val),
                                            }));
                                        }}
                                        placeholderHelper="كلمة المرور الخاصة بحسابك"
                                        error={errors.password}
                                    />

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

                                    {/* Prominent High-Contrast Solid Action Button */}
                                    <button className="btn btn-primary btn-wide login-submit-btn" type="submit">
                                        <LogIn size={18} />
                                        <span>تسجيل الدخول</span>
                                    </button>
                                </div>
                            ) : (
                                /* Register Multi-step Wizard with Floating Inputs */
                                <>
                                    {step === 1 && (
                                        <div className="wizard-fields">
                                            {/* 4-Part Floating Label Name Grid in Nawa Brand Identity */}
                                            <div className="form-group" style={{ gap: 8 }}>
                                                <label className="form-label">الاسم رباعي (كما في البطاقة الرسمية)</label>
                                                <div className="name-quad-grid">
                                                    <FloatingField
                                                        id="reg-first-name"
                                                        label="الاسم الأول"
                                                        icon={UserRound}
                                                        value={nameParts.first}
                                                        onChange={(val) => handleNamePartChange('first', val)}
                                                        placeholderHelper="اكتب اسمك بالعربي زي اللي موجود في البطاقة"
                                                        error={errors.firstName}
                                                    />

                                                    <FloatingField
                                                        id="reg-second-name"
                                                        label="الاسم الثاني"
                                                        icon={UserRound}
                                                        value={nameParts.second}
                                                        onChange={(val) => handleNamePartChange('second', val)}
                                                        placeholderHelper="اكتب اسمك بالعربي زي اللي موجود في البطاقة"
                                                        error={errors.secondName}
                                                    />

                                                    <FloatingField
                                                        id="reg-third-name"
                                                        label="الاسم الثالث"
                                                        icon={UserRound}
                                                        value={nameParts.third}
                                                        onChange={(val) => handleNamePartChange('third', val)}
                                                        placeholderHelper="اكتب اسمك بالعربي زي اللي موجود في البطاقة"
                                                        error={errors.thirdName}
                                                    />

                                                    <FloatingField
                                                        id="reg-last-name"
                                                        label="الاسم الأخير"
                                                        icon={UserRound}
                                                        value={nameParts.last}
                                                        onChange={(val) => handleNamePartChange('last', val)}
                                                        placeholderHelper="اكتب اسمك بالعربي زي اللي موجود في البطاقة"
                                                        error={errors.lastName}
                                                    />
                                                </div>
                                            </div>

                                            {/* Phone & Governorate Grid with Floating Labels */}
                                            <div className="form-grid compact-grid">
                                                <FloatingField
                                                    id="reg-phone"
                                                    label="رقم الهاتف"
                                                    icon={Phone}
                                                    type="tel"
                                                    value={profile.phone || ''}
                                                    onChange={(val) => updateProfileField('phone', val)}
                                                    placeholderHelper="01X XXX XXXX"
                                                    error={errors.phone}
                                                />

                                                <FloatingField
                                                    id="reg-gov"
                                                    label="المحافظة"
                                                    icon={MapPin}
                                                    type="select"
                                                    value={profile.governorate}
                                                    onChange={(val) => updateProfileField('governorate', val)}
                                                    options={egyptEducationOptions.governorates}
                                                    placeholderHelper="اختر محافظتك من القائمة"
                                                />
                                            </div>

                                            {/* Email with Floating Label */}
                                            <FloatingField
                                                id="reg-email"
                                                label="البريد الإلكتروني"
                                                icon={Mail}
                                                type="email"
                                                value={profile.email}
                                                onChange={(val) => updateProfileField('email', val)}
                                                placeholderHelper="you@example.com"
                                                error={errors.email}
                                            />

                                            {/* Password with Floating Label */}
                                            <FloatingField
                                                id="reg-pass"
                                                label="كلمة المرور"
                                                icon={Lock}
                                                type="password"
                                                value={password}
                                                onChange={(val) => {
                                                    setPassword(val);
                                                    setErrors((prev) => ({
                                                        ...prev,
                                                        password: validateField('password', val),
                                                    }));
                                                }}
                                                placeholderHelper="٦ أحرف أو أكثر لتأمين حسابك"
                                                error={errors.password}
                                            />
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
                                                <FloatingField
                                                    id="reg-grade"
                                                    label="الصف الدراسي"
                                                    icon={GraduationCap}
                                                    type="select"
                                                    value={profile.grade}
                                                    onChange={(val) => updateProfileField('grade', val)}
                                                    options={gradeOptions}
                                                />

                                                <FloatingField
                                                    id="reg-track"
                                                    label="المسار / الشعبة"
                                                    icon={BookOpen}
                                                    type="select"
                                                    value={profile.track}
                                                    onChange={(val) => updateProfileField('track', val)}
                                                    options={trackOptions}
                                                />
                                            </div>

                                            <div className="form-grid compact-grid">
                                                <FloatingField
                                                    id="reg-guardian"
                                                    label="رقم ولي الأمر (اختياري)"
                                                    icon={Phone}
                                                    type="tel"
                                                    value={profile.guardian || ''}
                                                    onChange={(val) => updateProfileField('guardian', val)}
                                                    placeholderHelper="01X XXX XXXX"
                                                />

                                                <FloatingField
                                                    id="reg-nid"
                                                    label="الرقم القومي (اختياري)"
                                                    icon={CreditCard}
                                                    type="text"
                                                    maxLength={14}
                                                    value={profile.nationalId || ''}
                                                    onChange={(val) => updateProfileField('nationalId', val)}
                                                    placeholderHelper="١٤ رقمًا بالبطاقة"
                                                />
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
                                                    <span>الاسم رباعي</span>
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
                                                <span>التالي</span>
                                                <ArrowLeft size={16} />
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary" type="submit">
                                                <Check size={17} />
                                                <span>إنشاء الحساب والبدء</span>
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
