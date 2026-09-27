import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Check, CheckCircle2 } from 'lucide-react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAuth } from '@/hooks/useAuth';
import { egyptEducationOptions } from '@/lib/data';
export const ProfilePage = () => {
    const [, navigate] = useLocation();
    const { user, updateProfile } = useAuth();
    const [profile, setProfile] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        governorate: user?.governorate || 'القاهرة',
        stage: user?.stage || 'إعدادي',
        grade: user?.grade || 'تالتة إعدادي',
        year: user?.year || '2026 / 2027',
        track: user?.track || 'إعدادي عام',
        guardian: user?.guardian || '',
        nationalId: user?.nationalId || '',
    });
    const grades = profile.stage === 'إعدادي'
        ? ['أولى إعدادي', 'تانية إعدادي', 'تالتة إعدادي']
        : ['أولى ثانوي', 'تانية ثانوي', 'تالتة ثانوي'];
    const tracks = profile.stage === 'إعدادي'
        ? ['إعدادي عام']
        : [
            'علمي علوم',
            'علمي رياضة',
            'أدبي',
            'بكالوريا مصرية — الطب وعلوم الحياة',
            'بكالوريا مصرية — الهندسة وعلوم الحاسب',
        ];
    const handleFieldChange = (key, value) => {
        setProfile((prev) => ({ ...prev, [key]: value }));
    };
    const handleSave = (e) => {
        e.preventDefault();
        updateProfile(profile);
        navigate('/dashboard');
    };
    return (<PortalLayout activeTab="profile" role="student">
      <div className="profile-heading">
        <div>
          <div className="eyebrow">مساحتك وملفك الشخصي</div>
          <h1 className="display">بياناتك التعليمية، على مقاسك.</h1>
          <p className="muted">
            عدّل معلوماتك والمرحلة الدراسية لتظل الاقتراحات والمحتوى متطابقة مع احتياجاتك.
          </p>
        </div>
        <div className="profile-avatar">{(profile.name || 'س')[0]}</div>
      </div>

      <form className="profile-card" onSubmit={handleSave}>
        <div className="profile-card-head">
          <div>
            <h2>البيانات الأساسية</h2>
            <p>معلومات التواصل والمحافظة.</p>
          </div>
          <span className="profile-saved">
            <CheckCircle2 size={15}/> محفوظ ومحدّث
          </span>
        </div>

        <div className="profile-grid">
          <label>
            الاسم بالكامل
            <input value={profile.name} onChange={(e) => handleFieldChange('name', e.target.value)} required/>
          </label>

          <label>
            البريد الإلكتروني
            <input type="email" value={profile.email} onChange={(e) => handleFieldChange('email', e.target.value)} required/>
          </label>

          <label>
            رقم الهاتف
            <input value={profile.phone || ''} onChange={(e) => handleFieldChange('phone', e.target.value)} placeholder="01X XXX XXXX"/>
          </label>

          <label>
            المحافظة
            <select value={profile.governorate} onChange={(e) => handleFieldChange('governorate', e.target.value)}>
              {egyptEducationOptions.governorates.map((item) => (<option key={item}>{item}</option>))}
            </select>
          </label>
        </div>

        <div className="profile-card-head profile-study-head">
          <div>
            <h2>بياناتك الدراسية</h2>
            <p>غيّر المرحلة، وستتحدّث الصفوف والمسارات المتاحة تلقائيًا.</p>
          </div>
        </div>

        <div className="stage-choice profile-stage-choice">
          <button type="button" className={profile.stage === 'إعدادي' ? 'active' : ''} onClick={() => {
            setProfile((prev) => ({
                ...prev,
                stage: 'إعدادي',
                grade: 'تالتة إعدادي',
                track: 'إعدادي عام',
            }));
        }}>
            <span>المرحلة الإعدادية</span>
            <small>أولى · تانية · تالتة إعدادي</small>
          </button>
          <button type="button" className={profile.stage === 'ثانوي' ? 'active' : ''} onClick={() => {
            setProfile((prev) => ({
                ...prev,
                stage: 'ثانوي',
                grade: 'أولى ثانوي',
                track: 'علمي علوم',
            }));
        }}>
            <span>الثانوية العامة</span>
            <small>صف دراسي ومسار تخصصي</small>
          </button>
        </div>

        <div className="profile-grid">
          <label>
            الصف الدراسي
            <select value={profile.grade} onChange={(e) => handleFieldChange('grade', e.target.value)}>
              {grades.map((item) => (<option key={item}>{item}</option>))}
            </select>
          </label>

          <label>
            المسار
            <select value={profile.track} onChange={(e) => handleFieldChange('track', e.target.value)}>
              {tracks.map((item) => (<option key={item}>{item}</option>))}
            </select>
          </label>

          <label>
            السنة الدراسية
            <select value={profile.year} onChange={(e) => handleFieldChange('year', e.target.value)}>
              {egyptEducationOptions.years.map((item) => (<option key={item}>{item}</option>))}
            </select>
          </label>
        </div>

        <div className="profile-grid">
          <label>
            رقم ولي الأمر
            <input value={profile.guardian || ''} onChange={(e) => handleFieldChange('guardian', e.target.value)} placeholder="01X XXX XXXX"/>
          </label>

          <label>
            الرقم القومي
            <input value={profile.nationalId || ''} onChange={(e) => handleFieldChange('nationalId', e.target.value)} placeholder="١٤ رقمًا"/>
          </label>
        </div>

        <div className="profile-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
            إلغاء والعودة
          </button>
          <button className="btn btn-primary" type="submit">
            حفظ التغييرات <Check size={15}/>
          </button>
        </div>
      </form>
    </PortalLayout>);
};
export default ProfilePage;
