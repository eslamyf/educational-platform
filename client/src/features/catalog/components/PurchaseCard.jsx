import React from 'react';
import { useLocation } from 'wouter';
import { Check, ShieldCheck, Zap, ArrowLeft, Play } from 'lucide-react';
import { StarRating } from '@/components/common/StarRating';
import { formatPrice, getDiscountLabel, purchaseIncludes, paidAccess, purchaseTip, purchaseGuarantee } from '@/lib/data';

export const PurchaseCard = ({ course, onOpenPreview }) => {
    const [, setLocation] = useLocation();

    const handleEnrollNow = () => {
        setLocation(`/checkout?course=${course.id}`);
    };

    return (<div className="purchase-card">
      <div className="purchase-card-top">
        <span className="discount-badge">{getDiscountLabel(course)}</span>
        <StarRating rating={course.rating}/>
      </div>

      <div className="purchase-price">{formatPrice(course.price)}</div>
      {course.oldPrice > course.price && (<div className="purchase-old">بدلاً من {formatPrice(course.oldPrice)}</div>)}

      <hr />

      <ul className="purchase-list">
        {purchaseIncludes.map((item) => (<li key={item}>
            <Check size={15}/> {item}
          </li>))}
        <li>
          <ShieldCheck size={15}/> {paidAccess}
        </li>
      </ul>

      <button type="button" className="btn btn-primary btn-wide" onClick={handleEnrollNow}>
        اشترك في المسار الآن <ArrowLeft size={16}/>
      </button>

      <button
        type="button"
        className="purchase-preview-trigger"
        onClick={() => setLocation(`/learn/${course.id}`)}
      >
        <Play size={14} fill="currentColor" />
        <span>شاهد المحاضرة المجانية في مساحة التعلّم</span>
      </button>

      <div className="purchase-note">
        <Zap size={14}/> {purchaseTip}
      </div>
      <div className="purchase-note">
        <ShieldCheck size={14}/> {purchaseGuarantee}
      </div>
    </div>);
};
export default PurchaseCard;
