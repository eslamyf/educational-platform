import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { toast } from 'sonner';
const AUTH_STORAGE_KEY = 'nawa-session';
const defaultStudentProfile = {
    name: 'سارة أحمد',
    email: 'sara@example.com',
    phone: '01012345678',
    governorate: 'القاهرة',
    stage: 'إعدادي',
    grade: 'تالتة إعدادي',
    year: '2026 / 2027',
    track: 'إعدادي عام',
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
    year: '2026 / 2027',
    track: 'تسويق وتصميم',
};
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(() => {
        try {
            const saved = window.localStorage.getItem(AUTH_STORAGE_KEY);
            if (saved) {
                return JSON.parse(saved);
            }
            // Demo session default to enhance prototype experience
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
        const profile = role === 'instructor'
            ? { ...defaultInstructorProfile, email }
            : { ...defaultStudentProfile, email, name: name || defaultStudentProfile.name };
        const newSession = {
            role,
            mode: 'login',
            profile,
        };
        setSession(newSession);
        toast.success(`مرحبًا بك مجددًا يا ${profile.name}!`);
    };
    const register = (profile, role = 'student') => {
        const newSession = {
            role,
            mode: 'register',
            profile,
        };
        setSession(newSession);
        toast.success('تم إنشاء حسابك بنجاح في نَوَى!');
    };
    const updateProfile = (partial) => {
        if (!session)
            return;
        const updatedProfile = { ...session.profile, ...partial };
        setSession({
            ...session,
            profile: updatedProfile,
        });
        toast.success('تم تحديث بيانات ملفك الشخصي');
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
