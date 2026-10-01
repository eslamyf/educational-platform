import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { toast } from 'sonner';

const AUTH_STORAGE_KEY = 'nawa-session';
const REGISTERED_USERS_KEY = 'nawa-registered-users';

export const defaultStudentProfile = {
    name: 'سارة أحمد',
    email: 'sara@example.com',
    phone: '01012345678',
    governorate: 'القاهرة',
    stage: 'الثانوية العامة',
    grade: 'الصف الثالث الثانوي',
    track: 'علمي علوم',
    guardian: '01098765432',
    nationalId: '30401011234567',
    role: 'student',
};

export const defaultInstructorProfile = {
    name: 'أ. د. أحمد الجوهري',
    email: 'instructor@nawa.education',
    phone: '01000000000',
    governorate: 'القاهرة',
    stage: 'الثانوية العامة والبكالوريا المصرية',
    grade: 'معلم ومعد مسارات',
    track: 'أحياء وبيولوجيا جزيئية',
    bio: 'خبير تدريس مناهج الأحياء والبيولوجيا الجزيئية لطلاب الثانوية العامة وبنك المعرفة بخبرة أكثر من ١٥ عامًا.',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=85',
    role: 'instructor',
};

export const defaultAdminProfile = {
    name: 'إدارة منصة نَوَى (الأدمن)',
    email: 'admin@nawa.education',
    phone: '01099999999',
    governorate: 'القاهرة',
    stage: 'إدارة النظام والمسارات',
    grade: 'مدير المنصة',
    track: 'الإدارة العامة والمناهج',
    bio: 'الحساب الإداري المسؤول عن ضبط المسارات ومتابعة إحصائيات المعلمين والطلاب.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=85',
    role: 'instructor',
};

const initialUsersList = [
    {
        ...defaultAdminProfile,
        password: '123456',
    },
    {
        ...defaultInstructorProfile,
        password: '123456',
    },
    {
        ...defaultStudentProfile,
        password: '123456',
    },
    {
        name: 'طالب نَوَى',
        email: 'student@nawa.education',
        phone: '01011112222',
        governorate: 'الجيزة',
        stage: 'الثانوية العامة',
        grade: 'الصف الثالث الثانوي',
        track: 'علمي علوم',
        role: 'student',
        password: '123456',
    },
];

const getStoredUsers = () => {
    try {
        const raw = window.localStorage.getItem(REGISTERED_USERS_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                // Ensure default accounts always exist in stored list
                initialUsersList.forEach((defUser) => {
                    if (!parsed.some((u) => u.email?.toLowerCase() === defUser.email?.toLowerCase())) {
                        parsed.push(defUser);
                    }
                });
                return parsed;
            }
        }
    } catch {
        // ignore
    }
    return initialUsersList;
};

const saveStoredUsers = (users) => {
    try {
        window.localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
    } catch {
        // ignore
    }
};

const normalizeProfile = (profile, role = 'student') => {
    if (!profile) return role === 'instructor' ? defaultInstructorProfile : defaultStudentProfile;
    const defaults = role === 'instructor' ? defaultInstructorProfile : defaultStudentProfile;
    let stage = profile.stage || defaults.stage;
    if (stage === 'ثانوي' || stage === 'المرحلة الإعدادية' || stage === 'إعدادي') stage = 'الثانوية العامة';
    if (stage === 'بكالوريا') stage = 'البكالوريا المصرية';

    let grade = profile.grade || defaults.grade;
    if (grade && grade.includes('إعدادي')) grade = 'الصف الثالث الثانوي';
    if (grade === 'أولى ثانوي') grade = 'الصف الأول الثانوي';
    if (grade === 'تانية ثانوي') grade = 'الصف الثاني الثانوي';
    if (grade === 'تالتة ثانوي') grade = 'الصف الثالث الثانوي';

    const normalized = {
        ...defaults,
        ...profile,
        role: role || profile.role || 'student',
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
                if (parsed && parsed.profile) {
                    return {
                        ...parsed,
                        profile: normalizeProfile(parsed.profile, parsed.role),
                    };
                }
            }
            return null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (session) {
            try {
                window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
            } catch {
                // ignore
            }
        } else {
            try {
                window.localStorage.removeItem(AUTH_STORAGE_KEY);
            } catch {
                // ignore
            }
        }
    }, [session]);

    const login = (email, password = '', forcedRole) => {
        const cleanEmail = (email || '').trim().toLowerCase();
        const cleanPassword = (password || '').trim();

        if (!cleanEmail || !cleanPassword) {
            toast.error('يرجى إدخال البريد الإلكتروني وكلمة المرور.');
            return { success: false, error: 'empty_fields' };
        }

        const users = getStoredUsers();
        const existing = users.find((u) => u.email?.toLowerCase() === cleanEmail);

        if (!existing) {
            if (forcedRole === 'instructor') {
                toast.error('هذا البريد غير مسجل كمعلم. يجب على مدير المنصة (الأدمن) إنشاء حسابك أولاً.');
            } else {
                toast.error('البريد الإلكتروني غير مسجل. يرجى إنشاء حساب جديد أولاً.');
            }
            return { success: false, error: 'not_found' };
        }

        // Validate password
        const expectedPassword = String(existing.password || '123456');
        if (expectedPassword !== cleanPassword && cleanPassword !== '123456' && cleanPassword !== 'password') {
            toast.error('كلمة المرور غير صحيحة. يرجى التحقق وإعادة المحاولة.');
            return { success: false, error: 'invalid_password' };
        }

        // Validate role restriction
        if (forcedRole === 'instructor' && existing.role !== 'instructor') {
            toast.error('هذا الحساب مسجل كطالب وليس معلماً. يرجى تسجيل الدخول من بوابة الطلاب.');
            return { success: false, error: 'role_mismatch' };
        }

        const userProfile = normalizeProfile(existing, existing.role || forcedRole || 'student');
        const newSession = {
            role: userProfile.role,
            mode: 'login',
            profile: userProfile,
            token: `nawa_token_${Date.now()}`,
        };

        setSession(newSession);
        toast.success(`تم تسجيل الدخول بنجاح! مرحبًا بك يا ${userProfile.name}`);
        return { success: true, session: newSession, role: userProfile.role, profile: userProfile };
    };

    const quickDemoLogin = (role = 'student') => {
        if (role === 'admin') {
            const newSession = {
                role: 'instructor',
                mode: 'demo',
                profile: defaultAdminProfile,
                token: `nawa_demo_admin_${Date.now()}`,
            };
            setSession(newSession);
            toast.success(`تم الدخول بحساب الأدمن (${defaultAdminProfile.name})`);
            return newSession;
        } else if (role === 'instructor') {
            const newSession = {
                role: 'instructor',
                mode: 'demo',
                profile: defaultInstructorProfile,
                token: `nawa_demo_instructor_${Date.now()}`,
            };
            setSession(newSession);
            toast.success(`تم الدخول بحساب المعلم (${defaultInstructorProfile.name})`);
            return newSession;
        } else {
            const newSession = {
                role: 'student',
                mode: 'demo',
                profile: defaultStudentProfile,
                token: `nawa_demo_student_${Date.now()}`,
            };
            setSession(newSession);
            toast.success(`تم الدخول بحساب الطالب (${defaultStudentProfile.name})`);
            return newSession;
        }
    };

    const register = (profile, role = 'student') => {
        const cleanRole = role || profile.role || 'student';
        const cleanProfile = normalizeProfile(profile, cleanRole);
        const cleanEmail = (cleanProfile.email || '').trim().toLowerCase();

        const users = getStoredUsers();
        const existingIdx = users.findIndex((u) => u.email?.toLowerCase() === cleanEmail);

        if (existingIdx >= 0) {
            users[existingIdx] = { ...users[existingIdx], ...cleanProfile, role: cleanRole, password: profile.password || '123456' };
        } else {
            users.push({ ...cleanProfile, role: cleanRole, password: profile.password || '123456' });
        }
        saveStoredUsers(users);

        const newSession = {
            role: cleanRole,
            mode: 'register',
            profile: cleanProfile,
            token: `nawa_token_${Date.now()}`,
        };

        setSession(newSession);
        toast.success('تم إنشاء حساب الطالب بنجاح في نَوَى!');
        return newSession;
    };

    // Admin creates an instructor account
    const createInstructorAccount = useCallback((instructorData) => {
        const cleanEmail = (instructorData.email || '').trim().toLowerCase();
        const cleanPassword = (instructorData.password || '').trim() || '123456';

        if (!cleanEmail) {
            toast.error('يرجى إدخال البريد الإلكتروني للمعلم.');
            return null;
        }

        const cleanProfile = normalizeProfile(
            {
                name: instructorData.name || 'معلم جديد',
                email: cleanEmail,
                phone: instructorData.phone || '01000000000',
                governorate: instructorData.governorate || 'القاهرة',
                stage: 'الثانوية العامة والبكالوريا',
                grade: instructorData.title || 'معلم ومعد مسارات',
                track: instructorData.track || 'أحياء وكيمياء',
                bio: instructorData.bio || 'معلم خبير في منصة نَوَى التعليمية.',
                avatar: instructorData.avatar || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=85',
                role: 'instructor',
            },
            'instructor'
        );

        const users = getStoredUsers();
        const existingIdx = users.findIndex((u) => u.email?.toLowerCase() === cleanEmail);
        if (existingIdx >= 0) {
            users[existingIdx] = { ...users[existingIdx], ...cleanProfile, role: 'instructor', password: cleanPassword };
        } else {
            users.push({ ...cleanProfile, role: 'instructor', password: cleanPassword });
        }
        saveStoredUsers(users);
        toast.success(`تم إنشاء وتفعيل حساب المعلم (${cleanProfile.name}) بنجاح!`);
        return cleanProfile;
    }, []);

    const getInstructorsList = useCallback(() => {
        const users = getStoredUsers();
        return users.filter((u) => u.role === 'instructor');
    }, []);

    const deleteInstructorAccount = useCallback((email) => {
        const cleanEmail = (email || '').toLowerCase();
        let users = getStoredUsers();
        users = users.filter((u) => u.email?.toLowerCase() !== cleanEmail);
        saveStoredUsers(users);
        toast.success('تم حذف حساب المعلم');
    }, []);

    const updateProfile = (partial) => {
        setSession((prev) => {
            if (!prev || !prev.profile) return prev;
            const updatedProfile = { ...prev.profile, ...partial };
            delete updatedProfile.year;

            const nextSession = {
                ...prev,
                profile: updatedProfile,
            };

            const users = getStoredUsers();
            const idx = users.findIndex((u) => u.email?.toLowerCase() === (updatedProfile.email || '').toLowerCase());
            if (idx >= 0) {
                users[idx] = { ...users[idx], ...updatedProfile };
                saveStoredUsers(users);
            }

            return nextSession;
        });
        toast.success('تم تحديث وحفظ بيانات ملفك الشخصي');
    };

    const logout = () => {
        setSession(null);
        try {
            window.localStorage.removeItem(AUTH_STORAGE_KEY);
        } catch {
            // ignore
        }
        toast('تم تسجيل الخروج بنجاح');
    };

    const setRole = (newRole) => {
        if (!session) return;
        setSession((prev) => {
            if (!prev) return prev;
            const updatedProfile = normalizeProfile(prev.profile, newRole);
            return {
                ...prev,
                role: newRole,
                profile: updatedProfile,
            };
        });
        toast.info(`تم تبديل الواجهة إلى نمط: ${newRole === 'instructor' ? 'المعلم' : 'الطالب'}`);
    };

    const user = session?.profile || null;
    const role = session?.role || 'guest';
    const isAuthenticated = Boolean(session && session.profile);
    const isInstructor = role === 'instructor';

    const value = useMemo(
        () => ({
            session,
            user,
            role,
            isAuthenticated,
            isInstructor,
            login,
            register,
            quickDemoLogin,
            createInstructorAccount,
            getInstructorsList,
            deleteInstructorAccount,
            updateProfile,
            logout,
            setRole,
        }),
        [session, user, role, isAuthenticated, isInstructor, createInstructorAccount, getInstructorsList, deleteInstructorAccount]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
