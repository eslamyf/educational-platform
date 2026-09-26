import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  UserRound,
  GraduationCap,
  Search,
  BookOpen,
  CreditCard,
  PlayCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const HowItWorksPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'اعمل حسابك',
      short: 'ابدأ هنا',
      body: 'بيانات أساسية في دقائق معدودة، بدون تعقيد أو نماذج طويلة تشتتك عن هدفك.',
      action: 'أنشئ حسابك الآن',
      href: '/login',
      icon: UserRound,
    },
    {
      title: 'حدد مرحلتك الدراسية',
      short: 'إعدادي أو ثانوي',
      body: 'اختار المرحلة والصف والمسار التخصصي (علمي/أدبي) لتظهر لك المواد والدروس المناسبة مباشرة.',
      action: 'اختار مرحلتك',
      href: '/login',
      icon: GraduationCap,
    },
    {
      title: 'اختار الكورس أو المادة',
      short: 'حسب هدفك',
      body: 'استخدم فلاتر الصف والمادة والمستوى لتصل إلى ما تحتاجه تحديدًا بدون تشتت.',
      action: 'استكشف الكورسات',
      href: '/courses',
      icon: Search,
    },
    {
      title: 'شوف التفاصيل والمنهج',
      short: 'قبل القرار',
      body: 'راجع نواتج التعلّم، خطة المحاضرات، التقييمات، والدروس التجريبية المجانية قبل الاشتراك.',
      action: 'تصفح الكورسات',
      href: '/courses',
      icon: BookOpen,
    },
    {
      title: 'اشترك بخطوة سهلة',
      short: 'خطوة آمنة',
      body: 'أضف المسار للسلة وأكمل الدفع السريع والآمن من شاشة واحدة واضحة.',
      action: 'افتح السلة',
      href: '/cart',
      icon: CreditCard,
    },
    {
      title: 'ابدأ التعلّم وتابع تقدمك',
      short: 'وتابع إنجازك',
      body: 'شاهد الدروس، سجّل ملاحظاتك الزمنية، حل الكويزات التفاعلية، واعرف دائمًا خطوتك القادمة.',
      action: 'اذهب لمساحة الطالب',
      href: '/dashboard',
      icon: PlayCircle,
    },
  ];

  const current = steps[activeStep];
  const StepIcon = current.icon;

  return (
    <div className="page-fade">
      <Header />

      <main className="how-page">
        <section className="how-hero">
          <div className="container">
            <div className="eyebrow">دليل نَوَى البسيط</div>
            <h1 className="display">
              من أول خطوة
              <br />
              <em>لحد أول درس.</em>
            </h1>
            <p>
              مش محتاج تحفظ الطريق أو تحتار. اتبع ٦ خطوات واضحة، وكل خطوة هتقولك تعمل إيه بعدها بكل هدوء.
            </p>
            <div className="how-hero-actions">
              <Link href="/login" className="btn btn-primary">
                ابدأ إنشاء الحساب <ArrowLeft size={15} />
              </Link>
              <a href="#how-steps" className="btn btn-secondary">
                استعرض الخطوات <ArrowLeft size={14} />
              </a>
            </div>
          </div>
        </section>

        <section className="how-page-section" id="how-steps">
          <div className="container">
            <div className="how-page-layout">
              {/* Steps Rail */}
              <aside className="how-page-rail">
                {steps.map((step, index) => {
                  const IconComp = step.icon;
                  return (
                    <button
                      key={step.title}
                      type="button"
                      className={activeStep === index ? 'active' : ''}
                      onClick={() => setActiveStep(index)}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <IconComp size={16} />
                      <strong>{step.title}</strong>
                      <small>{step.short}</small>
                    </button>
                  );
                })}
              </aside>

              {/* Main Step Detail & Interactive Mockup */}
              <div className="how-page-main">
                <div className="how-screen-mock">
                  <div className="mock-window-bar">
                    <span />
                    <span />
                    <span />
                    <small>نَوَى / الخطوة {String(activeStep + 1).padStart(2, '0')}</small>
                  </div>

                  <div className="mock-window-body">
                    <div className="mock-sidebar">
                      <b>ن</b>
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="mock-content">
                      <div className="mock-content-kicker">
                        الخطوة {String(activeStep + 1).padStart(2, '0')} من ٠٦
                      </div>
                      <div className="mock-progress">
                        <span style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }} />
                      </div>
                      <StepIcon size={28} className="mock-icon" />
                      <h2>{current.title}</h2>
                      <p>{current.body}</p>
                      <div className="mock-lines">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="how-copy">
                  <div className="eyebrow">الخطوة {String(activeStep + 1).padStart(2, '0')}</div>
                  <h2>{current.title}</h2>
                  <p>{current.body}</p>
                  <Link href={current.href} className="link-arrow">
                    {current.action} <ArrowLeft size={14} />
                  </Link>
                </div>
              </div>

              {/* Footer navigation between steps */}
              <div className="how-page-footer">
                <div>
                  <strong>كل خطوة لها هدف واضح ومحدد</strong>
                  <span>عشان الطالب يركز في التعلّم والمذاكرة فقط.</span>
                </div>
                <div className="how-page-controls">
                  <button
                    type="button"
                    className="btn btn-secondary btn-small"
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((v) => Math.max(0, v - 1))}
                  >
                    <ArrowRight size={14} /> السابق
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-small"
                    disabled={activeStep === steps.length - 1}
                    onClick={() => setActiveStep((v) => Math.min(steps.length - 1, v + 1))}
                  >
                    التالي <ArrowLeft size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;
