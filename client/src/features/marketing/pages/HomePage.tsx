import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  PlayCircle,
  Plus,
  Search,
  Sparkles,
  Target,
  UserRound,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CourseCard } from '@/features/catalog/components/CourseCard';
import { StarRating } from '@/components/common/StarRating';
import {
  courses,
  copy,
  heroEyebrow,
  badges,
  founderHeroImage,
  sectionKicker,
  sectionTitle,
  sectionSubtitle,
  stats,
  homePromise,
  testimonials,
  homeSecondaryCta,
} from '@/lib/data';

export const HomePage: React.FC = () => {
  const [visibleCourses, setVisibleCourses] = useState(4);
  const [flowStep, setFlowStep] = useState(0);
  const featured = courses[0];

  const flowSteps = [
    { icon: UserRound, title: 'اعمل حساب', short: 'ابدأ هنا', desc: 'اكتب بياناتك الأساسية فقط. الحساب يحفظ مساراتك وملاحظاتك وتقدمك.', actionText: 'ابدأ إنشاء الحساب', actionHref: '/login' },
    { icon: GraduationCap, title: 'حدد مرحلتك', short: 'إعدادي أو ثانوي', desc: 'اختار إعدادي أو ثانوي، ثم الصف والمسار. هنعرض لك مواد مناسبة بدل التشتت.', actionText: 'اختار مرحلتك', actionHref: '/login' },
    { icon: Search, title: 'اختار كورس', short: 'حسب هدفك', desc: 'استكشف المواد والمسارات، واستخدم شرائح الصفوف للوصول لما تبحث عنه بسرعة.', actionText: 'تصفح الكورسات', actionHref: '/courses' },
    { icon: BookOpen, title: 'شوف التفاصيل', short: 'قبل القرار', desc: 'راجع نواتج التعلّم، المنهج، المدة، التقييمات، والمحاضرات المجانية قبل أي قرار.', actionText: 'افتح تفاصيل الكورس', actionHref: '/courses' },
    { icon: CreditCard, title: 'اشترك ببساطة', short: 'خطوة آمنة', desc: 'أضف المسار للسلة وأكمل الدفع التجريبي من شاشة واضحة ومختصرة.', actionText: 'اذهب إلى الدفع', actionHref: '/cart' },
    { icon: PlayCircle, title: 'ابدأ التعلّم', short: 'وتابع تقدمك', desc: 'ادخل على المشغل التفاعلي، شاهد المحاضرات، سجّل ملاحظاتك الزمنية، وحل الكويزات.', actionText: 'افتح مساحة التعلّم', actionHref: '/dashboard' },
  ];

  const currentFlow = flowSteps[flowStep];
  const FlowIcon = currentFlow.icon;

  return (
    <div className="page-fade">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <div className="eyebrow">{heroEyebrow}</div>
              <h1 className="display">
                التعلّم الذي <em>ينمو</em> معك.
              </h1>
              <p className="hero-description">{copy.description}</p>
              <div className="hero-actions">
                <Link href="/courses" className="btn btn-primary">
                  استكشف المسارات <ArrowLeft size={16} />
                </Link>
                <Link href="/how-it-works" className="btn btn-secondary">
                  {homeSecondaryCta} <ArrowLeft size={15} />
                </Link>
              </div>
              <div className="hero-note">
                <Sparkles size={15} /> {badges.join(' · ')}
              </div>
            </div>

            <div className="hero-visual reveal reveal-2">
              <img
                className="hero-photo"
                src={founderHeroImage}
                alt="مساحة عمل دافئة للتعلم وصناعة الأفكار"
              />
              <div className="photo-wash" />
              <div className="hero-sticker">
                مسار واضح.
                <br />
                خطوة كل يوم.
              </div>

              <div className="hero-card">
                <div className="hero-card-label">{sectionKicker}</div>
                <h3>{featured.shortTitle}: من الفكرة إلى أثر</h3>
                <div className="hero-card-row">
                  <span className="hero-card-avatar">
                    <img className="avatar" src={featured.instructorAvatar} alt="" />
                    {featured.instructor}
                  </span>
                  <StarRating rating={featured.rating} />
                </div>
              </div>

              <div className="decor-dots" />
            </div>
          </div>
        </section>

        {/* Trust Band */}
        <section className="trust-band">
          <div className="container trust-grid">
            <div className="trust-intro">
              <Target size={22} />
              <span>مسارات مصممة لمن يريد أن يتقدم ويفهم، لا أن يستهلك محتوى أكثر.</span>
            </div>
            {stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Courses Grid */}
        <section className="section" id="courses">
          <div className="container">
            <div className="section-head">
              <div className="section-head-left">
                <div className="eyebrow">{sectionKicker}</div>
                <h2 className="section-title">{sectionTitle}</h2>
                <p className="section-subtitle">{sectionSubtitle}</p>
              </div>
              <Link href="/courses" className="link-arrow">
                شوف كل المسارات <ArrowLeft size={15} />
              </Link>
            </div>

            <div className="course-grid">
              {courses.slice(0, visibleCourses).map((course, index) => (
                <div className={`reveal reveal-${Math.min(index + 1, 3)}`} key={course.id}>
                  <CourseCard course={course} />
                </div>
              ))}
            </div>

            {visibleCourses < courses.length && (
              <div style={{ textAlign: 'center', marginTop: 32 }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setVisibleCourses(courses.length)}
                >
                  عرض كل المسارات ({courses.length.toLocaleString('ar-EG')}) <Plus size={15} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Interactive Student Journey Flow */}
        <section className="section home-how" id="how">
          <div className="container">
            <div className="flow-intro">
              <div>
                <div className="eyebrow">رحلتك داخل نَوَى</div>
                <h2 className="section-title">من أول خطوة لحد أول درس.</h2>
                <p className="section-subtitle">
                  مش محتاج تحفظ الطريق. اختار مرحلتك، ونَوَى يوصّلك للمحتوى المناسب ببساطة وهدوء.
                </p>
              </div>
              <span className="flow-total">
                <Sparkles size={15} /> ٦ خطوات واضحة
              </span>
            </div>

            <div className="user-flow">
              <div className="flow-rail">
                {flowSteps.map((item, index) => {
                  const NodeIcon = item.icon;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      className={`flow-node ${flowStep === index ? 'active' : ''} ${
                        flowStep > index ? 'passed' : ''
                      }`}
                      onClick={() => setFlowStep(index)}
                    >
                      <span className="flow-node-number">{String(index + 1).padStart(2, '0')}</span>
                      <span className="flow-node-icon">
                        <NodeIcon size={16} />
                      </span>
                      <span className="flow-node-copy">
                        <strong>{item.title}</strong>
                        <small>{item.short}</small>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flow-detail">
                <div className="flow-detail-top">
                  <span className="flow-kicker">
                    الخطوة {String(flowStep + 1).padStart(2, '0')} من ٠٦
                  </span>
                  <span className="flow-progress-label">
                    {Math.round(((flowStep + 1) / 6) * 100).toLocaleString('ar-EG')}٪ من الرحلة
                  </span>
                </div>

                <div className="flow-progress">
                  <span style={{ width: `${((flowStep + 1) / 6) * 100}%` }} />
                </div>

                <div className="flow-detail-content">
                  <div className="flow-detail-icon">
                    <span>
                      <FlowIcon size={24} />
                    </span>
                  </div>
                  <div>
                    <h3>{currentFlow.title}</h3>
                    <p>{currentFlow.desc}</p>
                    <Link href={currentFlow.actionHref} className="link-arrow">
                      {currentFlow.actionText} <ArrowLeft size={14} />
                    </Link>
                  </div>
                </div>

                <div className="flow-controls">
                  <button
                    type="button"
                    className="btn btn-secondary btn-small"
                    disabled={flowStep === 0}
                    onClick={() => setFlowStep((curr) => Math.max(0, curr - 1))}
                  >
                    <ArrowRight size={14} /> السابق
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-small"
                    disabled={flowStep === flowSteps.length - 1}
                    onClick={() => setFlowStep((curr) => Math.min(flowSteps.length - 1, curr + 1))}
                  >
                    التالي <ArrowLeft size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">صوت المتعلّمين</div>
                <h2 className="section-title">{homePromise}</h2>
              </div>
              <span className="muted small">ليس المطلوب أن تسبق الجميع، المهم أن تفهم وتستمر.</span>
            </div>

            <div className="reviews-grid">
              {testimonials.map((item) => (
                <div className="review" key={item.name}>
                  <div className="review-head">
                    <div className="reviewer">
                      <div className="avatar-initial">{item.name[0]}</div>
                      <div>
                        <div className="reviewer-name">{item.name}</div>
                        <div className="reviewer-role">{item.detail}</div>
                      </div>
                    </div>
                    <StarRating />
                  </div>
                  <p>{item.quote}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
