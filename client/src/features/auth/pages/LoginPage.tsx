import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  BookOpen,
  GraduationCap,
  Settings2,
  LogIn,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { egyptEducationOptions } from '@/lib/data';
import type { UserProfile, UserRole } from '@/types';
import { toast } from 'sonner';

export const LoginPage: React.FC = () => {
  const [, navigate] = useLocation();
  const { login, register } = useAuth();

  const [role, setRole] = useState<UserRole>('student');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<'next' | 'back'>('next');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    governorate: 'القاهرة',
    stage: 'إعدادي',
    grade: 'تالتة إعدادي',
    year: '2026 / 2027',
    track: 'إعدادي عام',
    guardian: '',
    nationalId: '',
  });

  const [password, setPassword] = useState('');

  const isStudent = role === 'student';
  const totalSteps = isStudent ? 3 : 2;

  const gradeOptions =
    profile.stage === 'إعدادي'
      ? ['أولى إعدادي', 'تانية إعدادي', 'تالتة إعدادي']
      : ['أولى ثانوي', 'تانية ثانوي', 'تالتة ثانوي'];

  const trackOptions =
    profile.stage === 'إعدادي'
      ? ['إعدادي عام']
      : [
          'علمي علوم',
          'علمي رياضة',
          'أدبي',
          'بكالوريا مصرية — الطب وعلوم الحياة',
          'بكالوريا مصرية — الهندسة وعلوم الحاسب',
        ];

  const validateField = (key: string, value: string): string => {
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

  const updateProfileField = (key: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
    const errorMsg = validateField(key, value);
    setErrors((prev) => ({ ...prev, [key]: errorMsg }));
  };

  const validateCurrentStep = (): boolean => {
    const nextErrors: Record<string, string> = { ...errors };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCurrentStep()) return;

    if (mode === 'register') {
      if (step < totalSteps) {
        nextStep();
        return;
      }
      register(profile, role);
      navigate(isStudent ? '/welcome' : '/instructor');
    } else {
      login(profile.email || (role === 'instructor' ? 'instructor@nawa.education' : 'student@nawa.education'), role, profile.name);
      navigate(role === 'instructor' ? '/instructor' : '/dashboard');
    }
  };

  const changeRole = (newRole: UserRole) => {
    setRole(newRole);
    setStep(1);
    setErrors({});
  };

  return (
    <div className="login-page">
      {/* Decorative Visual Art Side */}
      <div className="login-art">
        <div className="login-art-copy">
          <div className="eyebrow">مساحة تعلّم مصرية حديثة</div>
          <h1 className="display">
            مستقبلك
            <br />
            <em>يبدأ بخطوة.</em>
          </h1>
          <p>
            من الإعدادي إلى الثانوية والمسارات العملية — مسارات واضحة، شرح قريب، وتقدم تلمسه بنفسك.
          </p>
          <div className="login-art-mark">
            <BookOpen size={18} /> تعليم مصري بطابع نَوَى
          </div>
        </div>
        <div className="login-art-orbit orbit-one" />
        <div className="login-art-orbit orbit-two" />
        <div className="login-art-note">
          <Sparkles size={16} />
          <span>
            سجّل خطوتك الأولى
            <br />
            وخلّي الباقي علينا.
          </span>
        </div>
      </div>

      {/* Login & Registration Form Panel */}
      <main className="login-panel">
        <Link href="/" className="login-brand">
          <span className="brand-mark">ن</span>
          <span>
            <strong>نَوَى</strong>
            <small>تعلّمٌ يشبهك</small>
          </span>
        </Link>

        <div className={`login-form-wrap ${mode === 'register' ? 'register-form-wrap' : ''}`}>
          <div className="eyebrow">{mode === 'login' ? 'مرحبًا من جديد' : 'بداية جديدة'}</div>
          <h2 className="display">{mode === 'login' ? 'خلّينا نكمّل.' : 'اعمل حسابك.'}</h2>
          <p className="muted">
            {mode === 'login'
              ? 'سجّل دخولك لمتابعة مساراتك ومحاضراتك.'
              : '٣ خطوات قصيرة لنجهز لك تجربة مخصصة على مقاس مرحلتك.'}
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
              تسجيل الدخول
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
              إنشاء حساب جديد
            </button>
          </div>

          {/* Role Switch (Student / Instructor) */}
          <div className="role-switch" role="tablist">
            <button
              type="button"
              className={role === 'student' ? 'active' : ''}
              onClick={() => changeRole('student')}
            >
              <GraduationCap size={15} /> طالب
            </button>
            <button
              type="button"
              className={role === 'instructor' ? 'active' : ''}
              onClick={() => changeRole('instructor')}
            >
              <Settings2 size={15} /> معلم / إدارة
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
                    ? 'بيانات الحساب الأساسية'
                    : isStudent && step === 2
                    ? 'مرحلتك الدراسية'
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

          <form onSubmit={handleSubmit}>
            <div className={`wizard-stage wizard-${direction}`} key={`${mode}-${step}`}>
              {mode === 'login' ? (
                /* Login View */
                <div className="wizard-fields">
                  <label>
                    البريد الإلكتروني
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => updateProfileField('email', e.target.value)}
                      placeholder={
                        role === 'instructor' ? 'instructor@nawa.education' : 'you@example.com'
                      }
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && <small className="field-error">{errors.email}</small>}
                  </label>

                  <label>
                    كلمة المرور
                    <div className="password-field">
                      <input
                        type="password"
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
                      <ShieldCheck size={16} />
                    </div>
                    {errors.password && <small className="field-error">{errors.password}</small>}
                  </label>

                  <div className="form-row">
                    <label className="check-row">
                      <input type="checkbox" defaultChecked /> تذكّرني
                    </label>
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => toast.info('سنرسل لك رابط استعادة كلمة المرور عبر البريد')}
                    >
                      نسيت كلمة المرور؟
                    </button>
                  </div>

                  <button className="btn btn-primary btn-wide login-submit" type="submit">
                    <LogIn size={16} /> دخول {role === 'instructor' ? 'لوحة المعلم' : 'مساحة الطالب'}
                  </button>
                </div>
              ) : (
                /* Register Multi-step Wizard */
                <>
                  {step === 1 && (
                    <div className="wizard-fields">
                      <label>
                        الاسم بالكامل
                        <input
                          value={profile.name}
                          onChange={(e) => updateProfileField('name', e.target.value)}
                          placeholder="مثال: سارة أحمد"
                          aria-invalid={Boolean(errors.name)}
                        />
                        {errors.name && <small className="field-error">{errors.name}</small>}
                      </label>

                      <div className="form-grid compact-grid">
                        <label>
                          رقم الهاتف
                          <input
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel"
                            required
                            value={profile.phone || ''}
                            onChange={(e) => updateProfileField('phone', e.target.value)}
                            placeholder="01X XXX XXXX"
                            aria-invalid={Boolean(errors.phone)}
                          />
                          {errors.phone && <small className="field-error">{errors.phone}</small>}
                        </label>

                        <label>
                          المحافظة
                          <select
                            value={profile.governorate}
                            onChange={(e) => updateProfileField('governorate', e.target.value)}
                          >
                            {egyptEducationOptions.governorates.map((gov) => (
                              <option key={gov}>{gov}</option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <label>
                        البريد الإلكتروني
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => updateProfileField('email', e.target.value)}
                          placeholder="you@example.com"
                          aria-invalid={Boolean(errors.email)}
                        />
                        {errors.email && <small className="field-error">{errors.email}</small>}
                      </label>

                      <label>
                        كلمة المرور
                        <div className="password-field">
                          <input
                            type="password"
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
                          <ShieldCheck size={16} />
                        </div>
                        {errors.password && (
                          <small className="field-error">{errors.password}</small>
                        )}
                      </label>
                    </div>
                  )}

                  {isStudent && step === 2 && (
                    <div className="wizard-fields">
                      <div className="stage-choice">
                        <button
                          type="button"
                          className={profile.stage === 'إعدادي' ? 'active' : ''}
                          onClick={() => {
                            setProfile((prev) => ({
                              ...prev,
                              stage: 'إعدادي',
                              grade: 'تالتة إعدادي',
                              track: 'إعدادي عام',
                            }));
                          }}
                        >
                          <span>المرحلة الإعدادية</span>
                          <small>أولى · تانية · تالتة إعدادي</small>
                        </button>
                        <button
                          type="button"
                          className={profile.stage === 'ثانوي' ? 'active' : ''}
                          onClick={() => {
                            setProfile((prev) => ({
                              ...prev,
                              stage: 'ثانوي',
                              grade: 'أولى ثانوي',
                              track: 'علمي علوم',
                            }));
                          }}
                        >
                          <span>الثانوية العامة</span>
                          <small>صف دراسي ومسار تخصصي</small>
                        </button>
                      </div>

                      <div className="form-grid compact-grid">
                        <label>
                          الصف الدراسي
                          <select
                            value={profile.grade}
                            onChange={(e) => updateProfileField('grade', e.target.value)}
                          >
                            {gradeOptions.map((g) => (
                              <option key={g}>{g}</option>
                            ))}
                          </select>
                        </label>

                        <label>
                          السنة الدراسية
                          <select
                            value={profile.year}
                            onChange={(e) => updateProfileField('year', e.target.value)}
                          >
                            {egyptEducationOptions.years.map((y) => (
                              <option key={y}>{y}</option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <label>
                        المسار التخصصي
                        <select
                          value={profile.track}
                          onChange={(e) => updateProfileField('track', e.target.value)}
                        >
                          {trackOptions.map((t) => (
                            <option key={t}>{t}</option>
                          ))}
                        </select>
                      </label>

                      <div className="form-grid compact-grid">
                        <label>
                          رقم ولي الأمر (اختياري)
                          <input
                            value={profile.guardian || ''}
                            onChange={(e) => updateProfileField('guardian', e.target.value)}
                            placeholder="01X XXX XXXX"
                          />
                        </label>

                        <label>
                          الرقم القومي (اختياري)
                          <input
                            value={profile.nationalId || ''}
                            onChange={(e) => updateProfileField('nationalId', e.target.value)}
                            placeholder="١٤ رقم"
                          />
                        </label>
                      </div>

                      <div className="wizard-hint">
                        <Sparkles size={15} />
                        <span>
                          {profile.stage === 'إعدادي'
                            ? 'ستظهر لك فورًا مواد وتدريبات الإعدادي المقررة.'
                            : 'ستظهر لك مواد الثانوية والمسار العلمي أو الأدبي الذي اخترته.'}
                        </span>
                      </div>
                    </div>
                  )}

                  {(!isStudent || step === 3) && (
                    <div className="review-card">
                      <div className="review-card-head">
                        <div>
                          <div className="eyebrow">قبل ما نبدأ</div>
                          <h3>راجع بياناتك المسجلة</h3>
                        </div>
                        <CheckCircle2 size={24} />
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
                          <strong>
                            {isStudent ? `${profile.stage} · ${profile.grade}` : 'معلم ومعد مسارات'}
                          </strong>
                        </div>
                        {isStudent && (
                          <div>
                            <span>المسار</span>
                            <strong>{profile.track}</strong>
                          </div>
                        )}
                      </div>

                      <p>كل شيء جاهز. اضغط إنشاء الحساب للدخول فورًا إلى مساحتك التعليمية.</p>
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
          <span>© ٢٠٢٦ نَوَى</span>
          <span>تجربة تعليمية مصرية تفاعلية</span>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
