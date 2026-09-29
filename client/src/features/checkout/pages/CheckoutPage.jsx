import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import {
    CheckCircle2,
    ShieldCheck,
    ArrowLeft,
    CreditCard,
    Smartphone,
    Building2,
    BookOpen,
    Clock3,
    Sparkles,
    User,
    Lock,
    Gift,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { useLearning } from '@/hooks/useLearning';
import { courses, formatPrice, getDiscountLabel, secureCheckout, checkoutNote } from '@/lib/data';
import { toast } from 'sonner';

export const CheckoutPage = () => {
    const [, setLocation] = useLocation();
    const { user } = useAuth();
    const { enrollInCourse } = useLearning();

    // Get course from URL search params or fallback
    const courseIdFromUrl = useMemo(() => {
        if (typeof window === 'undefined') return 'secondary-biology';
        const params = new URLSearchParams(window.location.search);
        return params.get('course') || 'secondary-biology';
    }, []);

    const course = useMemo(() => {
        return courses.find((c) => c.id === courseIdFromUrl) || courses[0];
    }, [courseIdFromUrl]);

    const [formData, setFormData] = useState({
        name: user?.name || 'سارة أحمد',
        email: user?.email || 'sara@example.com',
        phone: user?.phone || '01012345678',
        paymentMethod: 'card',
        note: '',
    });

    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        const clean = couponCode.trim().toUpperCase();
        if (clean === 'NAWA20' || clean === 'EGYPT2026' || clean === 'SPRING25') {
            const discountPct = clean === 'SPRING25' ? 25 : 20;
            setCouponApplied(true);
            setCouponDiscount(discountPct);
            toast.success(`تم تفعيل كوبون الخصم ${clean} بنسبة ${discountPct}٪`);
        } else {
            toast.error('كود الخصم غير صالح أو منتهي الصلاحية');
        }
    };

    const finalPrice = useMemo(() => {
        if (!couponApplied) return course.price;
        const discountAmt = Math.round((course.price * couponDiscount) / 100);
        return Math.max(0, course.price - discountAmt);
    }, [course.price, couponApplied, couponDiscount]);

    const totalSavings = useMemo(() => {
        return (course.oldPrice - finalPrice);
    }, [course.oldPrice, finalPrice]);

    const handleCompleteOrder = (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
            toast.error('يرجى كتابة كافة البيانات الأساسية');
            return;
        }
        if (!/^01\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
            toast.error('رقم الهاتف يجب أن يتكون من ١١ رقمًا ويبدأ بـ01');
            return;
        }

        enrollInCourse(course.id);
        setIsCompleted(true);
        toast.success(`تم تأكيد اشتراكك في مسار ${course.shortTitle} بنجاح!`);
    };

    if (isCompleted) {
        return (
            <div className="page-fade">
                <Header />
                <main className="container" style={{ paddingTop: 60, paddingBottom: 90 }}>
                    <div className="success-card success-card-animated">
                        <div className="success-icon">
                            <CheckCircle2 size={46} />
                        </div>
                        <div className="eyebrow">تم تأكيد الاشتراك بنجاح 🎉</div>
                        <h1 style={{ marginBottom: 12 }}>
                            أهلًا بك في مسار {course.shortTitle}
                        </h1>
                        <p style={{ maxWidth: 640, margin: '0 auto 24px' }}>
                            تم تفعيل اشتراكك وحجز مقعدك بالكامل. يمكنك الآن الانتقال مباشرة لمشاهدة المحاضرات، حل التدريبات، والتفاعل مع المدرس.
                        </p>

                        <div className="success-course-pill" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '12px 20px',
                            background: '#fdfbf7',
                            border: '1px solid #ded7cc',
                            borderRadius: '16px',
                            marginBottom: 28,
                        }}>
                            <img
                                src={course.image}
                                alt={course.title}
                                style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover' }}
                            />
                            <div style={{ textAlign: 'right' }}>
                                <strong style={{ display: 'block', fontSize: '0.95rem' }}>{course.title}</strong>
                                <small style={{ color: 'var(--muted)' }}>المحاضر: {course.instructor} · {course.duration}</small>
                            </div>
                        </div>

                        <div className="hero-actions" style={{ justifyContent: 'center', gap: 14 }}>
                            <Link href={`/learn/${course.id}`} className="btn btn-primary">
                                ابدأ التعلّم والمشاهدة الآن <ArrowLeft size={16} />
                            </Link>
                            <Link href="/dashboard" className="btn btn-secondary">
                                الذهاب إلى مساحة الطالب
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="page-fade">
            <Header />

            <main className="checkout-page" style={{ paddingTop: 40, paddingBottom: 90 }}>
                <div className="container">
                    <div className="breadcrumbs" style={{ marginBottom: 20 }}>
                        <Link href="/">الرئيسية</Link>
                        <span>/</span>
                        <Link href="/courses">الكورسات</Link>
                        <span>/</span>
                        <Link href={`/course/${course.id}`}>{course.shortTitle}</Link>
                        <span>/</span>
                        <span>حجز الاشتراك</span>
                    </div>

                    <div className="eyebrow">
                        <Sparkles size={14} style={{ display: 'inline', marginLeft: 4 }} />
                        حجز فوري ومباشر
                    </div>
                    <h1 className="display page-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)' }}>
                        تأكيد الاشتراك في {course.shortTitle}
                    </h1>
                    <p className="page-intro" style={{ marginBottom: 36 }}>
                        اكتب بياناتك البسيطة لتنتقل بعدها فورًا لمشاهدة جميع المحاضرات والملفات بدون أي خطوات وسيطة.
                    </p>

                    <div className="checkout-layout">
                        {/* Booking Form */}
                        <form onSubmit={handleCompleteOrder} className="checkout-form">
                            <div className="checkout-step">
                                <span>١</span> بيانات الطالب / المشترك
                            </div>

                            <div className="form-grid">
                                <div className="field">
                                    <label>الاسم بالكامل</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        placeholder="مثال: سارة أحمد"
                                        required
                                    />
                                </div>

                                <div className="field">
                                    <label>البريد الإلكتروني</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>

                                <div className="field full">
                                    <label>رقم الهاتف / الواتساب (للتفعيل والمتابعة)</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        placeholder="01012345678"
                                        required
                                    />
                                </div>

                                <div className="field full">
                                    <label>طريقة الدفع وتأكيد الحجز</label>
                                    <div className="payment-methods-grid">
                                        <label
                                            className={`payment-method-card ${
                                                formData.paymentMethod === 'card' ? 'selected' : ''
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="card"
                                                checked={formData.paymentMethod === 'card'}
                                                onChange={() => handleInputChange('paymentMethod', 'card')}
                                            />
                                            <CreditCard size={20} />
                                            <div>
                                                <strong>بطاقة بنكية</strong>
                                                <small>Visa / MasterCard / ميزة</small>
                                            </div>
                                        </label>

                                        <label
                                            className={`payment-method-card ${
                                                formData.paymentMethod === 'wallet' ? 'selected' : ''
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="wallet"
                                                checked={formData.paymentMethod === 'wallet'}
                                                onChange={() => handleInputChange('paymentMethod', 'wallet')}
                                            />
                                            <Smartphone size={20} />
                                            <div>
                                                <strong>محفظة إلكترونية</strong>
                                                <small>فودافون كاش / أورنج / اتصالات / وي</small>
                                            </div>
                                        </label>

                                        <label
                                            className={`payment-method-card ${
                                                formData.paymentMethod === 'instapay' ? 'selected' : ''
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="instapay"
                                                checked={formData.paymentMethod === 'instapay'}
                                                onChange={() => handleInputChange('paymentMethod', 'instapay')}
                                            />
                                            <Building2 size={20} />
                                            <div>
                                                <strong>InstaPay / فوري</strong>
                                                <small>تحويل بنكي لحظي أو كود فوري</small>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="field full">
                                    <label>ملاحظة اختيارية للمعلم</label>
                                    <input
                                        type="text"
                                        value={formData.note}
                                        onChange={(e) => handleInputChange('note', e.target.value)}
                                        placeholder="أي استفسار أو هدف تريد تحقيقه من هذا المسار..."
                                    />
                                </div>
                            </div>

                            {/* Coupon Code Section */}
                            <div className="checkout-coupon-wrap" style={{ marginTop: 20 }}>
                                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="كود الخصم (مثال: NAWA20)"
                                        style={{
                                            padding: '10px 14px',
                                            borderRadius: '12px',
                                            border: '1px solid #ded7cc',
                                            flex: 1,
                                            fontSize: '0.88rem',
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline"
                                        onClick={handleApplyCoupon}
                                        style={{ padding: '10px 18px', fontSize: '0.88rem' }}
                                    >
                                        تطبيق الكود
                                    </button>
                                </div>
                                {couponApplied && (
                                    <div style={{ marginTop: 8, color: '#16a34a', fontSize: '0.82rem', fontWeight: 700 }}>
                                        ✓ تم تفعيل كود الخصم بنجاح ({couponDiscount}٪ خصم إضافي)
                                    </div>
                                )}
                            </div>

                            <div className="form-note" style={{ marginTop: 20 }}>
                                <ShieldCheck size={18} />
                                <span>
                                    دفع آمن ومضمون بنسبة ١٠٠٪ — يتم تفعيل وصولك للمسار مباشرة وبلا تأخير.
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-wide"
                                style={{
                                    marginTop: 24,
                                    padding: '16px 28px',
                                    fontSize: '1.05rem',
                                    fontWeight: 800,
                                }}
                            >
                                تأكيد الاشتراك وحجز الكورس الآن ({formatPrice(finalPrice)})
                                <ArrowLeft size={18} />
                            </button>
                        </form>

                        {/* Selected Course Summary Aside */}
                        <aside>
                            <div className="summary-card" style={{ position: 'sticky', top: 100 }}>
                                <div style={{ display: 'flex', gap: 14, marginBottom: 18, alignItems: 'center' }}>
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        style={{
                                            width: 72,
                                            height: 72,
                                            borderRadius: 14,
                                            objectFit: 'cover',
                                            flexShrink: 0,
                                        }}
                                    />
                                    <div>
                                        <span className="pill-small" style={{
                                            fontSize: '0.72rem',
                                            padding: '2px 8px',
                                            background: 'rgba(216, 110, 77, 0.12)',
                                            color: 'var(--coral)',
                                            borderRadius: 999,
                                            fontWeight: 700,
                                        }}>
                                            {course.category}
                                        </span>
                                        <h3 style={{ margin: '4px 0 2px', fontSize: '0.98rem', fontWeight: 800 }}>
                                            {course.title}
                                        </h3>
                                        <small style={{ color: 'var(--muted)' }}>المعلم: {course.instructor}</small>
                                    </div>
                                </div>

                                <div className="summary-details-list" style={{
                                    fontSize: '0.82rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 8,
                                    paddingBottom: 16,
                                    borderBottom: '1px solid #ebe5db',
                                    marginBottom: 16,
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--muted)' }}>عدد الدروس:</span>
                                        <strong>{course.lessons} محاضرة مرتبة</strong>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--muted)' }}>إجمالي الوقت:</span>
                                        <strong>{course.duration}</strong>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--muted)' }}>المستوى:</span>
                                        <strong>{course.level}</strong>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--muted)' }}>الشهادة:</span>
                                        <strong style={{ color: '#16a34a' }}>شهادة إتمام معتمدة</strong>
                                    </div>
                                </div>

                                <h2>ملخص الحساب</h2>

                                <div className="summary-line">
                                    <span>سعر المسار الأصلي</span>
                                    <strong>{formatPrice(course.oldPrice)}</strong>
                                </div>

                                <div className="summary-line savings-line">
                                    <span>وفرت بالاشتراك اليوم ({getDiscountLabel(course)})</span>
                                    <strong style={{ color: '#16a34a' }}>
                                        - {formatPrice(totalSavings)}
                                    </strong>
                                </div>

                                {couponApplied && (
                                    <div className="summary-line" style={{ color: 'var(--coral)' }}>
                                        <span>خصم الكوبون ({couponDiscount}٪)</span>
                                        <strong>- {formatPrice(Math.round((course.price * couponDiscount) / 100))}</strong>
                                    </div>
                                )}

                                <div className="summary-line total">
                                    <span>المبلغ النهائي للدفع</span>
                                    <strong>{formatPrice(finalPrice)}</strong>
                                </div>

                                <div className="secure-line" style={{ marginTop: 16 }}>
                                    <ShieldCheck size={16} />
                                    <span>
                                        وصول كامل مدى الحياة لجميع المحاضرات والتحديثات.
                                    </span>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CheckoutPage;
