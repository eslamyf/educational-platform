import React from 'react';
import { Link } from 'wouter';
import { Compass, ArrowLeft, Home } from 'lucide-react';
export const NotFound = () => {
    return (<div className="page-fade access-gate-page min-h-screen flex items-center justify-center p-4">
      <div className="access-gate text-center max-w-md w-full">
        <div className="access-gate-icon mx-auto mb-4">
          <Compass size={36}/>
        </div>
        <div className="eyebrow">خطأ ٤٠٤</div>
        <h1 className="display mb-3">الصفحة غير موجودة.</h1>
        <p className="mb-6 text-muted">
          يبدو أن الرابط الذي طلبته غير موجود أو تم نقله إلى مكان آخر.
        </p>

        <div className="hero-actions justify-center">
          <Link href="/" className="btn btn-primary">
            <Home size={16}/> العودة للرئيسية
          </Link>
          <Link href="/courses" className="btn btn-secondary">
            استكشف المسارات <ArrowLeft size={14}/>
          </Link>
        </div>
      </div>
    </div>);
};
export default NotFound;
