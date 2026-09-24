import React from 'react';
import { Check, ShieldCheck, Zap, ArrowLeft, ShoppingBag } from 'lucide-react';
import { StarRating } from '@/components/common/StarRating';
import { formatPrice, getDiscountLabel, purchaseIncludes, paidAccess, purchaseTip, purchaseGuarantee } from '@/lib/data';
import type { Course } from '@/types';
import { useCart } from '@/hooks/useCart';

interface PurchaseCardProps {
  course: Course;
}

export const PurchaseCard: React.FC<PurchaseCardProps> = ({ course }) => {
  const { addToCart, isCourseInCart } = useCart();
  const alreadyInCart = isCourseInCart(course.id);

  return (
    <div className="purchase-card">
      <div className="purchase-card-top">
        <span className="discount-badge">{getDiscountLabel(course)}</span>
        <StarRating rating={course.rating} />
      </div>

      <div className="purchase-price">{formatPrice(course.price)}</div>
      {course.oldPrice > course.price && (
        <div className="purchase-old">بدلاً من {formatPrice(course.oldPrice)}</div>
      )}

      <hr />

      <ul className="purchase-list">
        {purchaseIncludes.map((item) => (
          <li key={item}>
            <Check size={15} /> {item}
          </li>
        ))}
        <li>
          <ShieldCheck size={15} /> {paidAccess}
        </li>
      </ul>

      <button
        type="button"
        className={`btn btn-primary btn-wide ${alreadyInCart ? 'btn-in-cart' : ''}`}
        onClick={() => addToCart(course)}
      >
        {alreadyInCart ? (
          <>
            موجود في السلة <ShoppingBag size={16} />
          </>
        ) : (
          <>
            اشترك في المسار الآن <ArrowLeft size={16} />
          </>
        )}
      </button>

      <div className="purchase-note">
        <Zap size={14} /> {purchaseTip}
      </div>
      <div className="purchase-note">
        <ShieldCheck size={14} /> {purchaseGuarantee}
      </div>
    </div>
  );
};

export default PurchaseCard;
