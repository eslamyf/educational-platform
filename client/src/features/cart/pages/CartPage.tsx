import React, { useState } from 'react';
import { Link } from 'wouter';
import { Trash2, ShoppingBag, ArrowLeft, ShieldCheck, Tag, X } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { EmptyState } from '@/components/common/EmptyState';
import { useCart } from '@/hooks/useCart';
import { formatPrice, secureCheckout, checkoutNote } from '@/lib/data';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    subtotal,
    oldTotal,
    savings,
    couponCode,
    couponApplied,
    couponDiscountPercent,
    finalTotal,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    applyCoupon(inputCoupon);
    setInputCoupon('');
  };

  return (
    <div className="page-fade">
      <Header />

      <main className="cart-page">
        <div className="container">
          <div className="eyebrow">خطوة قبل البداية</div>
          <h1 className="display page-title">سلتك جاهزة.</h1>
          <p className="page-intro">
            راجع اختياراتك ومساراتك التعليمية، ثم اترك الباقي علينا.
          </p>

          {cart.length > 0 ? (
            <div className="cart-layout">
              {/* Cart Items List */}
              <div className="cart-items-wrapper">
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.title} />
                      <div className="cart-item-details">
                        <span className="cart-item-category">{item.category}</span>
                        <h3>{item.title}</h3>
                        <p>
                          {item.instructor} · {item.duration} · {item.lessons.toLocaleString('ar-EG')} درس
                        </p>
                        <button
                          type="button"
                          className="cart-remove"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={13} /> إزالة من السلة
                        </button>
                      </div>
                      <div className="cart-item-price">
                        <span>{formatPrice(item.price)}</span>
                        {item.oldPrice > item.price && (
                          <small className="cart-old-price">{formatPrice(item.oldPrice)}</small>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-actions-row">
                  <Link href="/courses" className="btn btn-outline btn-small">
                    + استكشاف مسارات أخرى
                  </Link>
                </div>
              </div>

              {/* Order Summary Card */}
              <aside>
                <div className="summary-card">
                  <h2>ملخص الطلب</h2>

                  <div className="summary-line">
                    <span>الإجمالي قبل الخصم</span>
                    <strong>{formatPrice(oldTotal)}</strong>
                  </div>

                  {savings > 0 && (
                    <div className="summary-line savings-line">
                      <span>وفّرت</span>
                      <strong style={{ color: 'var(--olive-dark, #576348)' }}>
                        - {formatPrice(savings)}
                      </strong>
                    </div>
                  )}

                  {/* Coupon Area */}
                  {couponApplied ? (
                    <div className="coupon-applied-badge">
                      <div className="coupon-applied-text">
                        <Tag size={14} />
                        <span>
                          كوبون <strong>{couponCode}</strong> ({couponDiscountPercent}٪ خصم)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="coupon-remove-btn"
                        aria-label="إزالة الكوبون"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="coupon">
                      <input
                        placeholder="لديك كود خصم؟ (مثل: NAWA10)"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                      />
                      <button type="submit">تطبيق</button>
                    </form>
                  )}

                  <hr className="summary-separator" />

                  <div className="summary-line total">
                    <span>المبلغ المستحق</span>
                    <strong>{formatPrice(finalTotal)}</strong>
                  </div>

                  <Link href="/checkout" className="btn btn-primary btn-wide">
                    متابعة الدفع <ArrowLeft size={16} />
                  </Link>

                  <div className="secure-line">
                    <ShieldCheck size={14} />
                    <span>
                      دفع {secureCheckout}. {checkoutNote}
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <EmptyState
              icon={ShoppingBag}
              title="سلتك خفيفة الآن"
              description="لم تضف أي مسار بعد. اختر من مسارات الإعدادي أو الثانوي أو المهارات العملية وابدأ الآن."
              actionText="تصفح الكورسات والمسارات"
              actionHref="/courses"
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
