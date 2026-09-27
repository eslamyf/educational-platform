import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Check, CheckCircle2, Sparkles, GraduationCap } from 'lucide-react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAuth } from '@/hooks/useAuth';
import { egyptEducationOptions } from '@/lib/data';

export const ProfilePage = () => {
    const [, navigate] = useLocation();
    const { user, updateProfile } = useAuth();
    const [savedFeedback, setSavedFeedback] = useState(false);

    const getInitialStage = (rawStage) => {
        if (!rawStage) return 'المرحلة الإعدادية';
        if (rawStage === 'إعدادي') return 'المرحلة الإعدادية';
        if (rawStage === 'ثانوي') return 'الثانوية العامة';
        if (rawStage === 'بكالوريا') return 'البكالوريا المصرية';
        return egyptEducationOptions.stages.includes(rawStage) ? rawStage : 'المرحلة الإعدادية';
    };

    const initialStage = getInitialStage(user?.stage);
    const initialStageConfig = egyptEducationOptions.stageMap[initialStage];

    const [profile, setProfile] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        governorate: user?.governorate || 'القاهرة',
        stage: initialStage,
        grade: user?.grade || initialStageConfig.grades[0],
        track: user?.track || initialStageConfig.tracks[0],
        guardian: user?.guardian || '',
        nationalId: user?.nationalId || '',
    });

    useEffect(() => {
        if (user) {
            const currentStage = getInitialStage(user.stage);
            const stageConfig = egyptEducationOptions.stageMap[currentStage];
            setProfile({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                governorate: user.governorate || 'القاهرة',
                stage: currentStage,
                grade: stageConfig.grades.includes(user.grade) ? user.grade : stageConfig.grades[0],
                track: stageConfig.tracks.includes(user.track) ? user.track : stageConfig.tracks[0],
                guardian: user.guardian || '',
                nationalId: user.nationalId || '',
            });
        }
    }, [user]);

    const activeStageKey = egyptEducationOptions.stages.includes(profile.stage) ? profile.stage : 'المرحلة الإعدادية';
    const activeStageData = egyptEducationOptions.stageMap[activeStageKey];
    const grades = activeStageData.grades;
    const tracks = activeStageData.tracks;

    const handleFieldChange = (key, value) => {
        setProfile((prev) => ({ ...prev, [key]: value }));
    };

    const handleStageSelect = (stageName) => {
        const stageInfo = egyptEducationOptions.stageMap[stageName];
        setProfile((prev) => ({
            ...prev,
            stage: stageName,
            grade: stageInfo.grades[0],
            track: stageInfo.tracks[0],
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        updateProfile(profile);
        setSavedFeedback(true);
        setTimeout(() => setSavedFeedback(false), 3500);
    };

    return (
        <PortalLayout activeTab="profile" role="student">
            <div className="profile-heading">
                <div>
                    <div className="eyebrow">مساحتك وملفك الشخصي</div>
                    <h1 className="display">بياناتك التعليمية، على مقاسك.</h1>
                    <p className="muted">
                        عدّل معلوماتك والمرحلة الدراسية لتظل الاقتراحات والمحتوى متطابقة مع احتياجاتك الدراسية.
                    </p>
                </div>
                <div className="profile-avatar">{(profile.name || user?.name || 'س')[0]}</div>
            </div>

            <form className="profile-card" onSubmit={handleSave}>
                <div className="profile-card-head">
                    <div>
                        <h2>البيانات الأساسية</h2>
                        <p>معلومات التواصل والمحافظة.</p>
                    </div>
                    <span className={`profile-saved ${savedFeedback ? 'profile-saved-active' : ''}`}>
                        <CheckCircle2 size={15} /> {savedFeedback ? 'تم حفظ التعديلات بنجاح' : 'بياناتك محفوظة ومحدّثة'}
                    </span>
                </div>

                <div className="profile-grid">
                    <label>
                        الاسم بالكامل
                        <input
                            value={profile.name}
                            onChange={(e) => handleFieldChange('name', e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        البريد الإلكتروني
                        <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        رقم الهاتف
                        <input
                            value={profile.phone || ''}
                            onChange={(e) => handleFieldChange('phone', e.target.value)}
                            placeholder="01X XXX XXXX"
                        />
                    </label>

                    <label>
                        المحافظة
                        <select
                            value={profile.governorate}
                            onChange={(e) => handleFieldChange('governorate', e.target.value)}
                        >
                            {egyptEducationOptions.governorates.map((item) => (
                                <option key={item}>{item}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="profile-card-head profile-study-head">
                    <div>
                        <h2>النظام والمرحلة التعليمية في مصر</h2>
                        <p>اختر نظامك الدراسي، وستتحدّث الصفوف والمسارات المتاحة تلقائيًا.</p>
                    </div>
                </div>

                <div className="stage-choice profile-stage-choice">
                    {egyptEducationOptions.stages.map((stg) => {
                        const info = egyptEducationOptions.stageMap[stg];
                        const isActive = profile.stage === stg;
                        return (
                            <button
                                key={stg}
                                type="button"
                                className={isActive ? 'active' : ''}
                                onClick={() => handleStageSelect(stg)}
                            >
                                <span>{info.label}</span>
                                <small>{info.description}</small>
                            </button>
                        );
                    })}
                </div>

                <div className="profile-grid">
                    <label>
                        الصف الدراسي
                        <select
                            value={profile.grade}
                            onChange={(e) => handleFieldChange('grade', e.target.value)}
                        >
                            {grades.map((item) => (
                                <option key={item}>{item}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        المسار التخصصي
                        <select
                            value={profile.track}
                            onChange={(e) => handleFieldChange('track', e.target.value)}
                        >
                            {tracks.map((item) => (
                                <option key={item}>{item}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="profile-grid">
                    <label>
                        رقم ولي الأمر
                        <input
                            value={profile.guardian || ''}
                            onChange={(e) => handleFieldChange('guardian', e.target.value)}
                            placeholder="01X XXX XXXX"
                        />
                    </label>

                    <label>
                        الرقم القومي
                        <input
                            value={profile.nationalId || ''}
                            onChange={(e) => handleFieldChange('nationalId', e.target.value)}
                            placeholder="١٤ رقمًا"
                        />
                    </label>
                </div>

                <div className="profile-actions">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/dashboard')}
                    >
                        إلغاء والعودة
                    </button>
                    <button className="btn btn-primary" type="submit">
                        {savedFeedback ? 'تم الحفظ بنجاح' : 'حفظ التغييرات'} <Check size={15} />
                    </button>
                </div>
            </form>
        </PortalLayout>
    );
};

export default ProfilePage;
