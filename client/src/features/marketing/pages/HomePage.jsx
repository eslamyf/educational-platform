import React, { useState, useEffect } from 'react';
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
    CheckCircle2,
    ShieldCheck,
    FileText,
    TrendingUp,
    Star,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CourseCard } from '@/features/catalog/components/CourseCard';
import { StarRating } from '@/components/common/StarRating';
import { HeroVisual } from '@/features/marketing/components/HeroVisual';
import { WhatsAppButton } from '@/features/marketing/components/WhatsAppButton';
import {
    courses,
    categories,
    sectionKicker,
    stats,
    testimonials,
} from '@/lib/data';

export const HomePage = () => {
    const [selectedCategory, setSelectedCategory] = useState('كل المناهج والمسارات');
    const [flowStep, setFlowStep] = useState(0);

    // Smooth scroll to section if hash is present in URL
    useEffect(() => {
        if (window.location.hash) {
            const hashId = window.location.hash.replace('#', '');
            const targetEl = document.getElementById(hashId);
            if (targetEl) {
                setTimeout(() => {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }, 150);
            }
        }
    }, []);

    const filteredCourses = selectedCategory === 'كل المناهج والمسارات'
        ? courses.slice(0, 3)
        : courses.filter((c) => c.category === selectedCategory).slice(0, 3);

    const displayCourses = filteredCourses.length > 0 ? filteredCourses : courses.slice(0, 3);

    const flowSteps = [
        {
            icon: UserRound,
            title: 'سجّل حسابك مجانًا',
            short: 'ابدأ هنا',
            desc: 'اكتب بياناتك الأساسية فقط. الحساب يحفظ مساراتك وملاحظاتك ونسبة تقدمك في المنهج.',
            actionText: 'ابدأ إنشاء الحساب',
            actionHref: '/login',
        },
        {
            icon: GraduationCap,
            title: 'حدد شعبتك ومادتك الدراسية',
            short: 'ثانوي عام، أو بكالوريا مصرية',
            desc: 'اختر مرحلتك ومادتك لتظهر لك أقوى المسارات والمراجعات المصممة لصفك بدقة.',
            actionText: 'اختر مرحلتك',
            actionHref: '/courses',
        },
        {
            icon: Search,
            title: 'اختر مسارك التعليمي',
            short: 'مناهج ومراجعات متكاملة',
            desc: 'استكشف المناهج والمراجعات الشاملة المصممة خصيصًا لتغطية كافة أفكار الامتحانات الحديثة.',
            actionText: 'تصفح الكورسات والمناهج',
            actionHref: '/courses',
        },
        {
            icon: BookOpen,
            title: 'عاين المحتوى مجانًا',
            short: 'شاهد قبل الاشتراك',
            desc: 'راجع المنهج ونواتج التعلّم وشاهد أول محاضرة مجانًا للتأكد من ملاءمة أسلوب الشرح لك.',
            actionText: 'استكشف تفاصيل المسار',
            actionHref: '/courses',
        },
        {
            icon: CreditCard,
            title: 'اشتراك فوري وميسّر',
            short: 'طرق دفع متنوعة',
            desc: 'ادفع بأمان عبر بطاقات بنكية، فودافون كاش، محفظة إلكترونية، أو فوري بكل سهولة وبلا تعقيد.',
            actionText: 'ابدأ الاشتراك الآن',
            actionHref: '/courses',
        },
        {
            icon: PlayCircle,
            title: 'ابدأ التعلّم وحقق أعلى الدرجات',
            short: 'تابع مستواك',
            desc: 'شاهد المحاضرات بجودة فائقة، حل بنوك الأسئلة التفاعلية، واحصل على شهادة إتمام.',
            actionText: 'افتح مساحة التعلّم',
            actionHref: '/dashboard',
        },
    ];

    const currentFlow = flowSteps[flowStep];
    const FlowIcon = currentFlow.icon;

    const featureHighlights = [
        {
            icon: ShieldCheck,
            title: 'نخبة من كبار المعلمين',
            desc: 'اختيار دقيق لأفضل معلّمي ومؤلفي مذكرات الثانوية العامة والبكالوريا المصرية في مصر.',
            colorClass: 'feature-coral',
        },
        {
            icon: Target,
            title: 'بنك أسئلة وتدريب امتحانات',
            desc: 'آلاف الأسئلة التفاعلية بنظام الاختيار من متعدد والتحليل المنطقي لنواتج التعلم.',
            colorClass: 'feature-olive',
        },
        {
            icon: FileText,
            title: 'مذكرات وتلخيصات PDF شاملة',
            desc: 'تحميل مباشر للملخصات والخرائط الذهنية وأوراق المراجعة بجودة طباعة فائقة.',
            colorClass: 'feature-yellow',
        },
        {
            icon: TrendingUp,
            title: 'متابعة دورية وشهادات إتمام',
            desc: 'لوحة تحكم ذكية تتبع نسبة إنجازك ودرجات اختباراتك خطوة بخطوة حتى يوم الامتحان.',
            colorClass: 'feature-sand',
        },
    ];

    return (
        <div className="page-fade">
            <Header />

            <main>
                {/* Modern Hero Section Matching Reference Layout */}
                <section className="hero-center-section">
                    <div className="container hero-center-container">
                        {/* Top Centered Copy & CTAs */}
                        <div className="hero-center-content reveal">
                            <div className="hero-pill-badge">
                                <Sparkles size={14} className="text-yellow" />
                                <span>منصة نَوَى التعليمية التفاعلية</span>
                            </div>

                            <h1 className="hero-center-title">
                                منصة متكاملة بها كل ما <br />
                                <span className="hero-highlight-word">يحتاجه الطالب ليتفوق</span>
                            </h1>

                            <p className="hero-center-subtitle">
                                منصة متكاملة بتساعدك تذاكر صح، تختار مدرسينك، وتوصل لأعلى درجاتك في الثانوية العامة بكل سهولة وراحة.
                            </p>

                            <div className="hero-center-actions">
                                <Link href="/courses" className="btn btn-hero-cta">
                                    <span>ابدأ رحلتك</span>
                                    <ArrowLeft size={18} />
                                </Link>
                                <a
                                    href="#how"
                                    className="btn btn-hero-secondary"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const el = document.getElementById('how');
                                        if (el) {
                                            el.scrollIntoView({ behavior: 'smooth' });
                                            window.history.pushState(null, '', '#how');
                                        }
                                    }}
                                >
                                    <span>كيفية الاشتراك في الكورس</span>
                                </a>
                            </div>
                        </div>

                        {/* Interactive Visual Composition Canvas */}
                        <div className="hero-visual-wrapper reveal reveal-2">
                            <HeroVisual />
                        </div>
                    </div>
                </section>

                {/* Trust & Stats Band */}
                <section className="trust-band">
                    <div className="container trust-grid">
                        <div className="trust-intro">
                            <Target size={24} />
                            <span>مسارات تعليمية مصممة لمن يريد الفهم الحقيقي، التفوق، وضمان أعلى الدرجات.</span>
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

                {/* Why Nawa Feature Highlights */}
                <section className="section section-features">
                    <div className="container">
                        <div className="section-head">
                            <div className="section-head-left">
                                <div className="eyebrow">لماذا نَوَى؟</div>
                                <h2 className="section-title">بيئة تعليمية صُممت لتضمن تفوقك</h2>
                                <p className="section-subtitle">
                                    نجمع لك أفضل المعلمين، أحدث أساليب الشرح، والتدريب المستمر على أسئلة الامتحانات في مكان واحد.
                                </p>
                            </div>
                        </div>

                        <div className="features-grid">
                            {featureHighlights.map((f) => {
                                const IconComponent = f.icon;
                                return (
                                    <div className={`feature-card ${f.colorClass}`} key={f.title}>
                                        <div className="feature-icon-box">
                                            <IconComponent size={24} />
                                        </div>
                                        <h3>{f.title}</h3>
                                        <p>{f.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Featured Courses Showcase with Category Filter Pills */}
                <section className="section courses-showcase-section" id="courses">
                    <div className="container">
                        <div className="section-head">
                            <div className="section-head-left">
                                <div className="eyebrow">{sectionKicker}</div>
                                <h2 className="section-title">أقوى الكورسات والمراجعات الشاملة</h2>
                                <p className="section-subtitle">
                                    اختر مسارك التعليمي المناسب لصفك وابدأ المذاكرة مع أفضل المعلّمين المعتمدين.
                                </p>
                            </div>
                            <Link href="/courses" className="link-arrow">
                                تصفح كل الكورسات ({courses.length.toLocaleString('ar-EG')}) <ArrowLeft size={15} />
                            </Link>
                        </div>

                        {/* Category Filter Chips */}
                        <div className="category-pills-bar">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Showing Top Featured Courses */}
                        <div className="course-grid">
                            {displayCourses.map((course, index) => (
                                <div className={`reveal reveal-${Math.min(index + 1, 3)}`} key={course.id}>
                                    <CourseCard course={course} />
                                </div>
                            ))}
                        </div>

                        {/* Navigation button to all courses */}
                        <div style={{ textAlign: 'center', marginTop: 42 }}>
                            <Link
                                href="/courses"
                                className="btn btn-primary btn-courses-more"
                            >
                                استكشف كل الكورسات والمناهج ({courses.length.toLocaleString('ar-EG')}) <ArrowLeft size={16} />
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
                                <h2 className="section-title">ماذا يقول طلاب نَوَى؟</h2>
                            </div>
                            <span className="muted small">تجارب حقيقية من الطلاب الذين حققوا أهدافهم ودرجاتهم العالية.</span>
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

                {/* Final Call To Action Banner */}
                <section className="section cta-banner-section">
                    <div className="container">
                        <div className="cta-banner-box">
                            <div className="cta-banner-content">
                                <span className="cta-banner-eyebrow">
                                    <Sparkles size={15} /> ابدأ اليوم
                                </span>
                                <h2>جاهز لتجربة تعليمية تصنع فارقًا حقيقيًا في درجاتك؟</h2>
                                <p>انضم لآلاف الطلاب وابدأ بمشاهدة أول محاضرة مجانًا في مسارك الدراسي المفضل.</p>
                                <div className="cta-banner-actions">
                                    <Link href="/courses" className="btn btn-primary btn-large">
                                        استكشف كل المسارات <ArrowLeft size={16} />
                                    </Link>
                                    <Link href="/login" className="btn btn-outline-white">
                                        إنشاء حساب مجاني
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            {/* Floating WhatsApp Support Widget */}
            <WhatsAppButton phoneNumber="201028103634" />
        </div>
    );
};

export default HomePage;
