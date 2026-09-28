import React from 'react';
import { Link } from 'wouter';
import {
    Sparkles,
    ShieldCheck,
    Target,
    Users,
    GraduationCap,
    BookOpen,
    ArrowLeft,
    CheckCircle2,
    HeartHandshake,
    Lightbulb,
    Award,
    TrendingUp,
    MessageCircle,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/features/marketing/components/WhatsAppButton';
import { stats } from '@/lib/data';

export const AboutPage = () => {
    const pillars = [
        {
            icon: ShieldCheck,
            title: 'نخبة من كبار المعلمين',
            desc: 'نختار بعناية فائقة أفضل الأساتذة ومؤلفي المذكرات الأكثر تأثيراً وشهرة في مصر لضمان أعلى جودة في الشرح والتطبيق.',
            colorClass: 'pillar-coral',
        },
        {
            icon: Target,
            title: 'التركيز على نواتج التعلم الحقيقية',
            desc: 'نبتعد عن الحشو والتلقين التقليدي، ونركز على مهارات التفكير العليا وحل الأسئلة المعقدة بنظام التقييم الحديث.',
            colorClass: 'pillar-olive',
        },
        {
            icon: Lightbulb,
            title: 'تقنيات تفاعلية ذكية',
            desc: 'مشغل فيديو سلس، بنوك أسئلة ذكية، وتتبع دقيق لنسبة تقدمك في كل درس ووحدة حتى تصل للامتحان بأعلى جاهزية.',
            colorClass: 'pillar-gold',
        },
        {
            icon: HeartHandshake,
            title: 'مرافقة ودعم مستمر',
            desc: 'فريق متكامل من المستشارين والدعم الفني والمعلمين معك خطوة بخطوة للإجابة على كل أسئلتك على مدار الساعة.',
            colorClass: 'pillar-sand',
        },
    ];

    const tracksCovered = [
        {
            title: 'الثانوية العامة المصرية',
            subtitle: 'الصف الأول، الثاني، والثالث الثانوي',
            badge: 'شامل المنهج الوزاري الجديد',
            items: [
                'شعبة علمي علوم (أحياء، جيولوجيا، كيمياء، فيزياء)',
                'شعبة علمي رياضة (تفاضل، تكامل، جبر، ديناميكا، استاتيكا)',
                'الشعبة الأدبية (لغة عربية، تاريخ، جغرافيا، فلسفة، علم نفس)',
                'مراجعات ليلة الامتحان وبنوك الأسئلة الشاملة',
            ],
        },
        {
            title: 'البكالوريا المصرية الحديثة',
            subtitle: 'المسار التخصصي والدولي المعتمد',
            badge: 'مسارات تخصصية متطورة',
            items: [
                'مسار الطب والعلوم الحيوية (Medicine & Life Sciences)',
                'مسار الهندسة وتكنولوجيا المعلومات (Engineering & Tech)',
                'مسار إدارة الأعمال والاقتصاد وريادة الأعمال (Business & Economics)',
                'مسار الآداب والعلوم الإنسانية والفنون (Humanities & Arts)',
            ],
        },
    ];

    const whyNawaValues = [
        {
            num: '٠١',
            title: 'لماذا اسم «نَوَى»؟',
            text: 'نَوَى هي النواة والبذرة الحية التي تنطلق منها شجرة المعرفة والتفوق. نؤمن بأن كل طالب يمتلك نواة الإبداع والقدرة على تحقيق المركز الأول إذا توفرت له البيئة التعليمية الملهمة والمناسبة.',
        },
        {
            num: '٠٢',
            title: 'رؤيتنا التعليمية',
            text: 'أن نكون المنصة العربية الأكثر موثوقية وجودة في تأهيل وإعداد طلاب المرحلة الثانوية والبكالوريا، بأسلوب عصري يجمع بين عمق الفهم ومتعة المشاهدة وسهولة الاستخدام.',
        },
        {
            num: '٠٣',
            title: 'رسالتنا للطلاب وأولياء الأمور',
            text: 'توفير تعليم رفيع المستوى بأسعار عادلة ومتاحة للجميع، يغني الطالب عن الدروس العشوائية، ويوفر وقته ومجهوده ليركز فقط على الفهم والتطبيق وضمان أعلى الدرجات.',
        },
    ];

    return (
        <div className="page-fade" dir="rtl">
            <Header />

            <main className="about-page-main">
                {/* Hero Banner Section */}
                <section className="about-hero-section">
                    <div className="container">
                        <div className="about-hero-card">
                            <div className="about-hero-badge">
                                <Sparkles size={15} />
                                <span>عن منصة نَوَى التعليمية</span>
                            </div>

                            <h1 className="about-hero-title">
                                نصنع تجربة تعليمية تفاعلية <br />
                                <span className="highlight-word">تلهم الطالب وتضمن تفوقه الحقيقي</span>
                            </h1>

                            <p className="about-hero-subtitle">
                                نَوَى هي المنصة التعليمية الرائدة في مصر المتخصصة في مناهج الثانوية العامة والبكالوريا المصرية الحديثة. نجمع لك نخبة من كبار المعلمين والخبراء في بيئة تعليمية ذكية، ممتعة، وخالية من أي تعقيد.
                            </p>

                            <div className="about-hero-actions">
                                <Link href="/courses" className="btn btn-primary btn-large">
                                    <span>استكشف كل الكورسات والمناهج</span>
                                    <ArrowLeft size={17} />
                                </Link>
                                <a
                                    href="#pillars"
                                    className="btn btn-secondary btn-large"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    <span>ركائز تميزنا</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="about-stats-band">
                    <div className="container">
                        <div className="about-stats-grid">
                            {stats.map((s) => (
                                <div className="about-stat-item" key={s.label}>
                                    <div className="about-stat-val">{s.value}</div>
                                    <div className="about-stat-lbl">{s.label}</div>
                                </div>
                            ))}
                            <div className="about-stat-item">
                                <div className="about-stat-val">+١٢٠</div>
                                <div className="about-stat-lbl">محاضرة ومسار تفاعلي معتمد</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Pillars */}
                <section className="section about-pillars-section" id="pillars">
                    <div className="container">
                        <div className="section-head text-center">
                            <div className="eyebrow">ركائز نَوَى</div>
                            <h2 className="section-title">لماذا يختار آلاف الطلاب منصة نَوَى؟</h2>
                            <p className="section-subtitle">
                                بنينا منصة نَوَى لتلبي كافة تطلعات الطالب الطموح الذي يسعى للفهم العميق والدرجات النهائية.
                            </p>
                        </div>

                        <div className="about-pillars-grid">
                            {pillars.map((pillar) => {
                                const Icon = pillar.icon;
                                return (
                                    <div className={`about-pillar-card ${pillar.colorClass}`} key={pillar.title}>
                                        <div className="about-pillar-icon">
                                            <Icon size={26} />
                                        </div>
                                        <h3>{pillar.title}</h3>
                                        <p>{pillar.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Story & Values */}
                <section className="section about-values-section">
                    <div className="container">
                        <div className="about-values-box">
                            <div className="section-head">
                                <div className="eyebrow">حكايتنا ورؤيتنا</div>
                                <h2 className="section-title">تعلّمٌ يشبه طموحك.. ومستقبل تفخر به</h2>
                            </div>

                            <div className="about-values-grid">
                                {whyNawaValues.map((val) => (
                                    <div className="about-value-item" key={val.num}>
                                        <span className="about-value-num">{val.num}</span>
                                        <h3>{val.title}</h3>
                                        <p>{val.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tracks Covered */}
                <section className="section about-tracks-section">
                    <div className="container">
                        <div className="section-head text-center">
                            <div className="eyebrow">التخصصات والمراحل</div>
                            <h2 className="section-title">المناهج والمسارات المعتمدة على نَوَى</h2>
                            <p className="section-subtitle">
                                تغطية شاملة لجميع مواد وشعب الثانوية العامة ومسارات البكالوريا المصرية الحديثة.
                            </p>
                        </div>

                        <div className="about-tracks-grid">
                            {tracksCovered.map((track) => (
                                <div className="about-track-card" key={track.title}>
                                    <div className="about-track-header">
                                        <span className="about-track-badge">{track.badge}</span>
                                        <h3>{track.title}</h3>
                                        <p className="about-track-sub">{track.subtitle}</p>
                                    </div>

                                    <ul className="about-track-list">
                                        {track.items.map((item) => (
                                            <li key={item}>
                                                <CheckCircle2 size={16} className="text-coral" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="about-track-footer">
                                        <Link href="/courses" className="link-arrow">
                                            تصفح كورسات هذا المسار <ArrowLeft size={14} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Direct Support & Mentorship CTA */}
                <section className="section about-cta-section">
                    <div className="container">
                        <div className="about-cta-card">
                            <div className="about-cta-content">
                                <span className="about-cta-pill">
                                    <MessageCircle size={15} /> استشارة تعليمية مجانية
                                </span>
                                <h2>محتاج مساعدة في تحديد مسارك أو اختيار مادتك؟</h2>
                                <p>فريق مستشاري نَوَى متواجد معك على الواتساب للرد على كافة أسئلتك واختيار المسار الأنسب لطموحك الدراسي.</p>
                                <div className="about-cta-buttons">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-large"
                                        onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp'))}
                                    >
                                        <span>تواصل معنا عبر واتساب</span>
                                        <MessageCircle size={18} />
                                    </button>
                                    <Link href="/courses" className="btn btn-outline-white btn-large">
                                        <span>تصفح كل المسارات</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <WhatsAppButton phoneNumber="201028103634" />
        </div>
    );
};

export default AboutPage;
