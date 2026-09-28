import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { toast } from 'sonner';
const AUTH_STORAGE_KEY = 'nawa-session';
const defaultStudentProfile = {
    name: 'سارة أحمد',
    email: 'sara@example.com',
    phone: '01012345678',
    governorate: 'القاهرة',
    stage: 'الثانوية العامة',
    grade: 'الصف الثالث الثانوي',
    track: 'علمي علوم',
    guardian: '01098765432',
    nationalId: '30401011234567',
};
const defaultInstructorProfile = {
    name: 'صاحب المنصة',
    email: 'instructor@nawa.education',
    phone: '01000000000',
    governorate: 'القاهرة',
    stage: 'إدارة المنصة',
    grade: 'معلم ومعد مسارات',
    track: 'تسويق وتصميم',
};

const normalizeProfile = (profile, role = 'student') => {
    if (!profile) return role === 'instructor' ? defaultInstructorProfile : defaultStudentProfile;
    const defaults = role === 'instructor' ? defaultInstructorProfile : defaultStudentProfile;
    let stage = profile.stage || defaults.stage;
    if (stage === 'ثانوي' || stage === 'المرحلة الإعدادية' || stage === 'إعدادي') stage = 'الثانوية العامة';
    if (stage === 'بكالوريا') stage = 'البكالوريا المصرية';

    let grade = profile.grade || defaults.grade;
    if (grade.includes('إعدادي')) grade = 'الصف الثالث الثانوي';
    if (grade === 'أولى ثانوي') grade = 'الصف الأول الثانوي';
    if (grade === 'تانية ثانوي') grade = 'الصف الثاني الثانوي';
    if (grade === 'تالتة ثانوي') grade = 'الصف الثالث الثانوي';

    const normalized = {
        ...defaults,
        ...profile,
        stage,
        grade,
    };
    delete normalized.year;
    return normalized;
};

const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(() => {
        try {
            const saved = window.localStorage.getItem(AUTH_STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                return {
                    ...parsed,
                    profile: normalizeProfile(parsed.profile, parsed.role),
                };
            }
            return {
                role: 'student',
                mode: 'login',
                profile: defaultStudentProfile,
            };
        }
        catch {
            return {
                role: 'student',
                mode: 'login',
                profile: defaultStudentProfile,
            };
        }
    });
    useEffect(() => {
        if (session) {
            window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
        }
        else {
            window.localStorage.removeItem(AUTH_STORAGE_KEY);
        }
    }, [session]);
    const login = (email, role = 'student', name) => {
        const base = role === 'instructor' ? defaultInstructorProfile : defaultStudentProfile;
        const profile = {
            ...base,
            email,
            name: name || base.name,
        };
        const newSession = {
            role,
            mode: 'login',
            profile,
        };
        setSession(newSession);
        try {
            window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newSession));
        } catch { }
        toast.success(`مرحبًا بك مجددًا يا ${profile.name}!`);
    };
    const register = (profile, role = 'student') => {
        const cleanProfile = normalizeProfile(profile, role);
        const newSession = {
            role,
            mode: 'register',
            profile: cleanProfile,
        };
        setSession(newSession);
        try {
            window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newSession));
        } catch { }
        toast.success('تم إنشاء حسابك بنجاح في نَوَى!');
    };
    const updateProfile = (partial) => {
        setSession((prev) => {
            if (!prev) return prev;
            const updatedProfile = { ...prev.profile, ...partial };
            delete updatedProfile.year;
            const nextSession = {
                ...prev,
                profile: updatedProfile,
            };
            try {
                window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession));
            } catch (err) {
                console.error('Failed to save profile update', err);
            }
            return nextSession;
        });
        toast.success('تم تحديث وحفظ بيانات ملفك الشخصي');
    };
    const logout = () => {
        setSession(null);
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        toast('تم تسجيل الخروج بنجاح');
    };
    const setRole = (role) => {
        if (!session)
            return;
        setSession({
            ...session,
            role,
        });
    };
    const user = session?.profile || null;
    const role = session?.role || 'student';
    const isAuthenticated = Boolean(session && session.profile);
    const isInstructor = role === 'instructor';
    const value = useMemo(() => ({
        session,
        user,
        role,
        isAuthenticated,
        isInstructor,
        login,
        register,
        updateProfile,
        logout,
        setRole,
    }), [session, user, role, isAuthenticated, isInstructor]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
