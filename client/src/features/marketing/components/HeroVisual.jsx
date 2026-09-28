import React from 'react';
import { Sparkles, CheckCircle2, Play, BookOpen, Star, Users, Brain, Zap, GraduationCap, ShieldCheck, Trophy, Flame } from 'lucide-react';

export const HeroVisual = () => {
    return (
        <div className="hero-visual-stage" aria-hidden="true" dir="rtl">
            {/* Ambient Background Aura Glows */}
            <div className="hero-glow-blob blob-left" />
            <div className="hero-glow-blob blob-right" />
            <div className="hero-glow-blob blob-center" />

            {/* Connecting Doodle Vector Lines (SVG) */}
            <svg
                className="hero-doodle-canvas"
                viewBox="0 0 1200 480"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="coralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d86e4d" />
                        <stop offset="100%" stopColor="#b9573e" />
                    </linearGradient>
                    <linearGradient id="oliveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8a9877" />
                        <stop offset="100%" stopColor="#556247" />
                    </linearGradient>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f5d378" />
                        <stop offset="100%" stopColor="#d9a334" />
                    </linearGradient>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#d86e4d" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#252622" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#6c775d" stopOpacity="0.8" />
                    </linearGradient>
                </defs>

                {/* Dynamic Connecting Doodle Curves */}
                <path
                    d="M 120 280 C 180 180, 260 360, 380 240 C 440 180, 520 230, 600 240 C 680 250, 760 170, 840 220 C 920 270, 1000 160, 1080 260"
                    stroke="url(#lineGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="6 8"
                    className="doodle-dash-anim"
                />

                <path
                    d="M 220 140 C 290 80, 350 160, 420 120 C 490 80, 560 130, 600 110 C 680 90, 780 150, 880 100 C 960 60, 1020 130, 1060 110"
                    stroke="#252622"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.35"
                />

                {/* Playful Floating Geometry in SVG */}
                {/* 3D Isometric Cube (Terracotta Coral) */}
                <g transform="translate(180, 80) rotate(-12)" className="float-slow-1">
                    <polygon points="35,0 70,18 35,36 0,18" fill="#f08b6d" />
                    <polygon points="0,18 35,36 35,76 0,58" fill="#d86e4d" />
                    <polygon points="35,36 70,18 70,58 35,76" fill="#b9573e" />
                </g>

                {/* 3D Cylinder (Olive Sage) */}
                <g transform="translate(940, 70) rotate(15)" className="float-slow-2">
                    <path d="M 0 20 L 0 65 A 25 10 0 0 0 50 65 L 50 20 Z" fill="url(#oliveGrad)" />
                    <ellipse cx="25" cy="20" rx="25" ry="10" fill="#9db088" />
                    <ellipse cx="25" cy="20" rx="21" ry="7" fill="#b5c6a1" opacity="0.6" />
                </g>

                {/* 3D Isometric Cone / Prism (Warm Gold) */}
                <g transform="translate(560, 360) rotate(-8)" className="float-slow-3">
                    <polygon points="25,0 50,60 25,72 0,60" fill="url(#goldGrad)" />
                    <polygon points="25,0 25,72 50,60" fill="#c99124" />
                </g>

                {/* 3D Mini Cube (Sand) */}
                <g transform="translate(860, 350) rotate(22)" className="float-slow-1">
                    <polygon points="20,0 40,10 20,20 0,10" fill="#dfcbba" />
                    <polygon points="0,10 20,20 20,42 0,32" fill="#b99170" />
                    <polygon points="20,20 40,10 40,32 20,42" fill="#8c6b4e" />
                </g>

                {/* Floating Graduation Cap (Custom SVG) */}
                <g transform="translate(100, 210) rotate(-16)" className="float-slow-2">
                    <path d="M 22 36 Q 38 48 54 36 L 54 44 Q 38 56 22 44 Z" fill="#1e1f1c" />
                    <polygon points="38,10 74,26 38,42 2,26" fill="#252622" />
                    <polygon points="38,10 74,26 38,30 2,26" fill="#383a34" />
                    <circle cx="38" cy="26" r="3.5" fill="#efc75e" />
                    <path d="M 38 26 Q 52 32 60 48" stroke="#efc75e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <circle cx="60" cy="48" r="2.5" fill="#efc75e" />
                </g>

                {/* Sparkle Stars & Decorative Accents */}
                <g transform="translate(290, 60)" className="pulse-sparkle">
                    <path d="M 12 0 L 15 9 L 24 12 L 15 15 L 12 24 L 9 15 L 0 12 L 9 9 Z" fill="#efc75e" />
                </g>
                <g transform="translate(890, 180)" className="pulse-sparkle-delay">
                    <path d="M 10 0 L 12.5 7.5 L 20 10 L 12.5 12.5 L 10 20 L 7.5 12.5 L 0 10 L 7.5 7.5 Z" fill="#d86e4d" />
                </g>
                <g transform="translate(1100, 140)" className="pulse-sparkle">
                    <path d="M 8 0 L 10 6 L 16 8 L 10 10 L 8 16 L 6 10 L 0 8 L 6 6 Z" fill="#6c775d" />
                </g>

                {/* Decorative Colored Dots */}
                <circle cx="150" cy="380" r="14" fill="#6c775d" opacity="0.85" />
                <circle cx="160" cy="390" r="6" fill="#8f9d7c" />

                <circle cx="1040" cy="330" r="18" fill="#d86e4d" opacity="0.85" />
                <circle cx="1048" cy="324" r="7" fill="#f08b6d" />

                <circle cx="340" cy="340" r="8" fill="#efc75e" />
                <circle cx="780" cy="80" r="9" fill="#b99170" />
            </svg>

            {/* Left Interactive Visual Card (Virtual Class / Student Mastery Hub) */}
            <div className="hero-card-left float-card-left">
                <div className="card-browser-mockup">
                    <div className="card-browser-header">
                        <div className="browser-dots">
                            <span className="dot-red" />
                            <span className="dot-yellow" />
                            <span className="dot-green" />
                        </div>
                        <span className="browser-tab-title">
                            <BookOpen size={13} /> درس تفاعلي مباشر
                        </span>
                        <span className="live-pill">
                            <span className="live-dot" /> مباشر
                        </span>
                    </div>

                    <div className="card-browser-body">
                        <div className="student-scene">
                            <div className="student-info-col">
                                <div className="quiz-stats-row">
                                    <span className="badge-tag">
                                        <Trophy size={11} className="inline-icon" /> أوائل الثانوية العامة
                                    </span>
                                    <span className="stat-text">
                                        نسبة التفوق: <strong>٩٨٪</strong>
                                    </span>
                                </div>
                                
                                <div className="quiz-progress-bar">
                                    <div className="quiz-progress-fill" style={{ width: '98%' }} />
                                </div>

                                <div className="quiz-checklist">
                                    <span><CheckCircle2 size={13} className="text-olive" /> حل بنك الأسئلة الشامل (١٠٠٪)</span>
                                    <span><CheckCircle2 size={13} className="text-coral" /> مراجعة المفاهيم والخرائط الذهنية</span>
                                </div>
                            </div>

                            <div className="student-avatar-wrap">
                                <div className="student-illustration-avatar">
                                    <div className="avatar-face">
                                        <div className="avatar-glasses" />
                                        <div className="avatar-smile" />
                                    </div>
                                    <div className="avatar-shirt" />
                                </div>
                                <div className="student-audio-badge">
                                    <Flame size={11} className="text-yellow" /> متفوق
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Mini Pill on Left */}
                <div className="hero-mini-floating-badge badge-left-sub">
                    <div className="mini-badge-icon coral-bg">
                        <Brain size={15} />
                    </div>
                    <div>
                        <strong>شرح مبسط وذكي</strong>
                        <small>خرائط ذهنية وتلخيصات</small>
                    </div>
                </div>
            </div>

            {/* Right Interactive Visual Card (Mobile App Mockup / Live Masterclass - NO TEACHER NAMES) */}
            <div className="hero-card-right float-card-right">
                <div className="phone-device-mockup">
                    <div className="phone-camera-notch" />
                    <div className="phone-screen-content">
                        {/* Stream Header */}
                        <div className="phone-stream-header">
                            <div className="instructor-mini-tag">
                                <div className="instructor-avatar-circle">
                                    <GraduationCap size={15} />
                                </div>
                                <div>
                                    <strong>منصة نَوَى التعليمية</strong>
                                    <small>شروحات تفاعلية وبنك أسئلة</small>
                                </div>
                            </div>
                            <span className="rating-pill">
                                <Star size={11} fill="currentColor" /> ٤.٩
                            </span>
                        </div>

                        {/* Video / Interactive Board Preview */}
                        <div className="phone-video-preview">
                            <div className="video-overlay-elements">
                                <div className="play-button-pulse">
                                    <Play size={18} fill="currentColor" />
                                </div>
                                <span className="video-title-chip">شرح تفاعلي ومراجعة الامتحانات</span>
                            </div>
                        </div>

                        {/* Student Interaction Waves */}
                        <div className="phone-bottom-stats">
                            <div className="stat-pill-group">
                                <span className="pill-item">
                                    <Users size={12} /> +٣,٤٠٠ طالب
                                </span>
                                <span className="pill-item text-success">
                                    <ShieldCheck size={12} /> أسئلة معتمدة
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Mini Pill on Right */}
                <div className="hero-mini-floating-badge badge-right-sub">
                    <div className="mini-badge-icon gold-bg">
                        <Sparkles size={16} />
                    </div>
                    <div>
                        <strong>+١٥,٠٠٠ طالب متفوق</strong>
                        <small>أعلى الدرجات في مصر</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroVisual;
