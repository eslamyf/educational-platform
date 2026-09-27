import React, { useState } from 'react';
import { Link } from 'wouter';
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    CreditCard,
    GraduationCap,
    PlayCircle,
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

export const HomePage = () => {
    const [flowStep, setFlowStep] = useState(0);
    const featured = courses[0];

    const flowSteps = [
        {
            icon: UserRound,
            title: 'سجّل حسابك',
            short: 'ابدأ هنا',
            desc: 'اكتب بياناتك الأساسية فقط. الحساب يحفظ مساراتك وملاحظاتك وتقدمك الدراسي.',
            actionText: 'ابدأ إنشاء الحساب',
            actionHref: '/login',
        },
        {
            icon: GraduationCap,
            title: 'حدد هدفك أو صفك',
            short: 'إعدادي، ثانوي، أو مهارات',
            desc: 'اختر مرحلتك الدراسية أو المجال العملي الذي ترغب في تعلمه بكل وضوح.',
            actionText: 'اختر مجالك',
            actionHref: '/courses',
        },
        {
            icon: Search,
            title: 'اختر المسار',
            short: 'مع أفضل المعلمين',
            desc: 'استكشف المناهج والمهارات مع نخبة من كبار المعلمين والخبراء المتخصصين.',
            actionText: 'تصفح الكورسات',
            actionHref: '/courses',
        },
        {
            icon: BookOpen,
            title: 'عاين المحتوى مجاناً',
            short: 'قبل القرار',
            desc: 'راجع المنهج ونواتج التعلّم وشاهد أول محاضرة مجاناً للتأكد من ملاءمة المسار.',
            actionText: 'استكشف التفاصيل',
            actionHref: '/courses',
        },
        {
            icon: CreditCard,
            title: 'اشتراك فوري وآمن',
            short: 'خطوة واحدة',
            desc: 'أضف المسار للسلة وأكد اشتراكك بوسائل دفع مصرية مريحة وآمنة.',
            actionText: 'اذهب للسلة',
            actionHref: '/cart',
        },
        {
            icon: PlayCircle,
            title: 'ابدأ التعلّم والتفوق',
            short: 'تابع تقدمك',
            desc: 'شاهد المحاضرات بجودة عالية، حل الاختبارات التفاعلية، واحصل على شهادة إتمام.',
            actionText: 'افتح مساحة التعلّم',
            actionHref: '/dashboard',
        },
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
                                التعلّم الذي <em>يصنع</em> مستقبلك.
                            </h1>
                            <p className="hero-description">{copy.description}</p>
                            <div className="hero-actions">
                                <Link href="/courses" className="btn btn-primary">
                                    استكشف المسارات <ArrowLeft size={16} />
                                </Link>
                                <Link href="/#how" className="btn btn-secondary">
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
                                alt="منصة نَوَى التعليمية التفاعلية الحديثة"
                            />
                            <div className="photo-wash" />
                            <div className="hero-sticker">
                                شروحات ذكية.
                                <br />
                                تفوّق حقيقي.
                            </div>

                            <div className="hero-card">
                                <div className="hero-card-label">{sectionKicker}</div>
                                <h3>{featured.title}</h3>
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
                            <span>مسارات مصممة لمن يريد أن يفهم ويتفوق ويصنع مهارات حقيقية.</span>
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

                {/* Featured Courses Grid - Exactly 3 Featured Courses on Home */}
                <section className="section" id="courses">
                    <div className="container">
                        <div className="section-head">
                            <div className="section-head-left">
                                <div className="eyebrow">{sectionKicker}</div>
                                <h2 className="section-title">{sectionTitle}</h2>
                                <p className="section-subtitle">{sectionSubtitle}</p>
                            </div>
                            <Link href="/courses" className="link-arrow">
                                تصفح كل الكورسات ({courses.length.toLocaleString('ar-EG')}) <ArrowLeft size={15} />
                            </Link>
                        </div>

                        {/* Showing 3 Top Courses */}
                        <div className="course-grid">
                            {courses.slice(0, 3).map((course, index) => (
                                <div className={`reveal reveal-${Math.min(index + 1, 3)}`} key={course.id}>
                                    <CourseCard course={course} />
                                </div>
                            ))}
                        </div>

                        {/* Navigation button to all courses */}
                        <div style={{ textAlign: 'center', marginTop: 42 }}>
                            <Link
                                href="/courses"
                                className="btn btn-primary"
                                style={{ padding: '14px 34px', fontSize: '0.95rem' }}
                            >
                                استكشف باقي الكورسات والمناهج ({courses.length.toLocaleString('ar-EG')}) <ArrowLeft size={16} />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Interactive Student Journey Flow */}
                <section className="section home-how" id="how">
                    <div className="container">
                        <div className="flow-intro">
                            <div>
                                <div className="eyebrow">رحلتك داخل نَوَى</div>
                                <h2 className="section-title">من أول خطوة حتى إتقان المنهج.</h2>
                                <p className="section-subtitle">
                                    اختر مجالك أو صفك الدراسي، ونَوَى يرشدك لأفضل المحاضرات والاختبارات التطبيقية.
                                </p>
                            </div>
                            <span className="flow-total">
                                <Sparkles size={15} /> ٦ خطوات للنجاح
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
                                            className={`flow-node ${flowStep === index ? 'active' : ''} ${flowStep > index ? 'passed' : ''}`}
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
                                <div className="eyebrow">قصص نجاح وتفوق</div>
                                <h2 className="section-title">{homePromise}</h2>
                            </div>
                            <span className="muted small">تجارب حقيقية من الطلاب الذين حققوا أهدافهم مع نَوَى.</span>
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
