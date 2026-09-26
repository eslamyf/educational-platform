import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building2,
  Sparkles,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { EmptyState } from '@/components/common/EmptyState';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { formatPrice, secureCheckout, checkoutNote } from '@/lib/data';
import { toast } from 'sonner';
import { ShoppingBag } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const [, navigate] = useLocation();
  const { cart, clearCart, finalTotal, oldTotal, savings } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || 'سارة أحمد',
    email: user?.email || 'sara@example.com',
    phone: user?.phone || '01012345678',
    paymentMethod: 'card',
    note: '',
  });

  const [isCompleted, setIsCompleted] = useState(false);
  const [purchasedCourseId, setPurchasedCourseId] = useState<string>('creative-strategy');

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cart.length) {
      navigate('/cart');
      return;
    }
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error('يرجى ملء كافة البيانات الأساسية');
      return;
    }
    if (!/^01\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      toast.error('رقم الهاتف يجب أن يتكون من ١١ رقمًا ويبدأ بـ01');
      return;
    }

    const firstCourseId = cart[0]?.id || 'creative-strategy';
    setPurchasedCourseId(firstCourseId);
    clearCart();
    setIsCompleted(true);
    toast.success('تم تأكيد اشتراكك بنجاح!');
  };

  if (isCompleted) {
    return (
      <div className="page-fade">
        <Header />
        <main className="container" style={{ paddingTop: 60, paddingBottom: 80 }}>
          <div className="success-card success-card-animated">
            <div className="success-icon">
              <CheckCircle2 size={42} />
            </div>
            <div className="eyebrow">تم تأكيد الاشتراك بنجاح</div>
            <h1>أهلًا بك في رحلتك التعليمية داخل نَوَى</h1>
            <p>
              تم تفعيل مسارك بنجاح. يمكنك الآن الدخول فورًا لمشاهدة المحاضرات، حل الاختبارات، وتدوين ملاحظاتك.
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center', marginTop: 24 }}>
              <Link href={`/learn/${purchasedCourseId}`} className="btn btn-primary">
                ابدأ التعلّم الآن <ArrowLeft size={15} />
              </Link>
              <Link href="/dashboard" className="btn btn-secondary">
                الذهاب إلى لوحة الطالب
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="page-fade">
        <Header />
        <main className="container checkout-page">
          <EmptyState
            icon={ShoppingBag}
            title="سلتك فارغة"
            description="أضف مسارًا تعليميًا إلى سلتك قبل متابعة الدفع."
            actionText="العودة إلى السلة"
            actionHref="/cart"
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-fade">
      <Header />

      <main className="checkout-page">
        <div className="container">
          <div className="eyebrow">تجربة دفع واضحة وآمنة</div>
          <h1 className="display page-title">خطوة صغيرة نحو بداية جديدة.</h1>
          <p className="page-intro">
            بيانات بسيطة ومباشرة، لتنتقل بعدها فورًا إلى مساحتك التعليمية.
          </p>

          <div className="checkout-layout">
            {/* Form */}
            <form onSubmit={handleCompleteOrder} className="checkout-form">
              <div className="checkout-step">
                <span>١</span> بياناتك الأساسية
              </div>

              <div className="form-grid">
                <div className="field">
                  <label>الاسم بالكامل</label>
                  <input
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

                <div className="field">
                  <label>رقم الهاتف</label>
                  <input
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="01X XXX XXXX"
                    required
                  />
                </div>

                <div className="field full">
                  <label>طريقة الدفع المفضلة</label>
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
                        <small>فودافون كاش / أورنج / إتصالات</small>
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
                        <small>تحويل فوري فوري</small>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="field full">
                  <label>ملاحظة اختيارية للمعلم أو المنصة</label>
                  <input
                    value={formData.note}
                    onChange={(e) => handleInputChange('note', e.target.value)}
                    placeholder="ما الذي تأمل تحقيقه من هذا المسار؟"
                  />
                </div>
              </div>

              <div className="form-note">
                <ShieldCheck size={16} />
                <span>هذه تجربة تفاعلية آمنة — يتم تفعيل اشتراكك الفوري بمجرد التأكيد.</span>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-wide"
                style={{ marginTop: 22 }}
              >
                تأكيد الاشتراك وبدء التعلّم <ArrowLeft size={16} />
              </button>
            </form>

            {/* Summary Aside */}
            <aside>
              <div className="summary-card">
                <h2>ملخص الطلب</h2>

                <div className="summary-line">
                  <span>الإجمالي</span>
                  <strong>{formatPrice(oldTotal || 790)}</strong>
                </div>

                {savings > 0 && (
                  <div className="summary-line savings-line">
                    <span>وفّرت</span>
                    <strong style={{ color: 'var(--olive-dark, #576348)' }}>
                      - {formatPrice(savings)}
                    </strong>
                  </div>
                )}

                <div className="summary-line total">
                  <span>المبلغ للدفع</span>
                  <strong>{formatPrice(finalTotal || 790)}</strong>
                </div>

                <div className="secure-line">
                  <ShieldCheck size={14} />
                  <span>
                    دفع {secureCheckout}. {checkoutNote}
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
