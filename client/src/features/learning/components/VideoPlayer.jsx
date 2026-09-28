import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    CirclePlay,
    ShieldAlert,
    Settings,
    RotateCcw,
    RotateCw,
    Maximize2,
    Minimize2,
    Check,
    Volume2,
    VolumeX,
    Play,
    Pause,
    ChevronRight,
    ChevronLeft,
} from 'lucide-react';
import { getYouTubeEmbedUrl, getYouTubeVideoId } from '@/lib/youtube';

let youtubeApiPromise;
const loadYouTubeApi = () => {
    if (window.YT?.Player)
        return Promise.resolve(window.YT);
    if (!youtubeApiPromise) {
        youtubeApiPromise = new Promise((resolve, reject) => {
            const previousReady = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = () => {
                previousReady?.();
                if (window.YT)
                    resolve(window.YT);
                else
                    reject(new Error('YouTube API did not initialize'));
            };
            if (!document.querySelector('script[data-youtube-iframe-api]')) {
                const script = document.createElement('script');
                script.src = 'https://www.youtube.com/iframe_api';
                script.async = true;
                script.dataset.youtubeIframeApi = 'true';
                script.onerror = () => reject(new Error('YouTube API failed to load'));
                document.head.appendChild(script);
            }
        });
    }
    return youtubeApiPromise;
};

const SPEED_OPTIONS = [
    { label: '0.5x (بطيء)', value: 0.5 },
    { label: '0.75x', value: 0.75 },
    { label: 'عادي (1x)', value: 1 },
    { label: '1.25x', value: 1.25 },
    { label: '1.5x', value: 1.5 },
    { label: '1.75x', value: 1.75 },
    { label: '2x (سريع)', value: 2 },
];

const QUALITY_OPTIONS = [
    { label: '1080p (Full HD)', value: 'hd1080' },
    { label: '720p (HD)', value: 'hd720' },
    { label: '480p (SD)', value: 'large' },
    { label: '360p (توفير البيانات)', value: 'medium' },
    { label: 'تلقائي (Auto)', value: 'auto' },
];

const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export const VideoPlayer = ({
    lesson,
    moduleTitle,
    posterImage,
    lessonId,
    isWatched,
    studentName = 'سارة أحمد',
    studentNationalId = '30401011234567',
    onWatched,
}) => {
    const containerRef = useRef(null);
    const iframeRef = useRef(null);
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const hideControlsTimeoutRef = useRef(null);
    const onWatchedRef = useRef(onWatched);
    const isWatchedRef = useRef(isWatched);
    const isScrubbingRef = useRef(false);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [selectedQuality, setSelectedQuality] = useState('auto');
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [settingsSubmenu, setSettingsSubmenu] = useState(null); // 'speed' | 'quality' | null
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [rippleState, setRippleState] = useState(null); // 'play' | 'pause' | 'forward' | 'replay' | null
    const [watermarkPosition, setWatermarkPosition] = useState({ left: 30, top: 40, rotate: -2 });

    const videoId = lesson?.video ? getYouTubeVideoId(lesson.video) : null;
    const looksLikeYouTubeUrl = Boolean(lesson?.video && /youtube\.com|youtu\.be|youtube-nocookie\.com/i.test(lesson.video));

    onWatchedRef.current = onWatched;
    isWatchedRef.current = isWatched;

    // Drifting watermark animation strictly inside video canvas (left: 20% to 75%, top: 25% to 70%)
    useEffect(() => {
        const moveWatermark = () => setWatermarkPosition({
            left: 20 + Math.random() * 55, // 20% -> 75%
            top: 25 + Math.random() * 45,  // 25% -> 70%
            rotate: -3 + Math.random() * 6,
        });
        const interval = window.setInterval(moveWatermark, 6500);
        return () => window.clearInterval(interval);
    }, []);

    // Ripple effect helper
    const triggerRipple = (type) => {
        setRippleState(type);
        window.setTimeout(() => setRippleState(null), 450);
    };

    // YouTube Player Initialization
    useEffect(() => {
        if (!videoId || !iframeRef.current)
            return;
        let cancelled = false;
        let progressInterval = 0;

        loadYouTubeApi().then((youtube) => {
            if (cancelled || !iframeRef.current)
                return;
            playerRef.current?.destroy?.();
            const player = new youtube.Player(iframeRef.current, {
                events: {
                    onReady: () => {
                        player.setPlaybackRate?.(playbackSpeed);
                        if (isMuted) {
                            player.mute?.();
                        } else {
                            player.unMute?.();
                            player.setVolume?.(volume * 100);
                        }
                        if (selectedQuality !== 'auto') {
                            player.setPlaybackQuality?.(selectedQuality);
                        }
                        const dur = player.getDuration?.();
                        if (dur > 0) setDuration(dur);

                        progressInterval = window.setInterval(() => {
                            try {
                                if (isScrubbingRef.current) return;
                                const state = player.getPlayerState?.();
                                const isCurrentlyPlaying = state === youtube.PlayerState.PLAYING;
                                setIsPlaying(isCurrentlyPlaying);
                                const cur = player.getCurrentTime?.() || 0;
                                const total = player.getDuration?.() || 0;
                                const loaded = player.getVideoLoadedFraction?.() || 0;
                                setBuffered(loaded * 100);
                                setCurrentTime(cur);
                                if (total > 0) setDuration(total);
                                if (total > 0 && cur >= total - 2 && !isWatchedRef.current) {
                                    onWatchedRef.current?.();
                                }
                            } catch { }
                        }, 250);
                    },
                    onStateChange: (event) => {
                        if (event.data === youtube.PlayerState.PLAYING) {
                            setIsPlaying(true);
                        } else if (event.data === youtube.PlayerState.PAUSED) {
                            setIsPlaying(false);
                        } else if (event.data === youtube.PlayerState.ENDED) {
                            setIsPlaying(false);
                            onWatchedRef.current?.();
                        }
                    },
                },
            });
            playerRef.current = player;
        }).catch(() => { });

        return () => {
            cancelled = true;
            window.clearInterval(progressInterval);
            playerRef.current?.destroy?.();
            playerRef.current = null;
        };
    }, [videoId, lessonId]);

    // Fullscreen change listener
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement));
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Auto-hide controls overlay on inactivity
    const handleMouseMove = useCallback(() => {
        setShowControls(true);
        if (hideControlsTimeoutRef.current) {
            clearTimeout(hideControlsTimeoutRef.current);
        }
        if (isPlaying) {
            hideControlsTimeoutRef.current = setTimeout(() => {
                if (!settingsOpen) {
                    setShowControls(false);
                }
            }, 2600);
        }
    }, [isPlaying, settingsOpen]);

    // Close settings popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.yt-settings-wrap')) {
                setSettingsOpen(false);
                setSettingsSubmenu(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Play / Pause toggle
    const togglePlay = () => {
        if (videoId && playerRef.current) {
            try {
                if (isPlaying) {
                    playerRef.current.pauseVideo?.();
                    setIsPlaying(false);
                    triggerRipple('pause');
                } else {
                    playerRef.current.playVideo?.();
                    setIsPlaying(true);
                    triggerRipple('play');
                }
            } catch {
                setIsPlaying(!isPlaying);
            }
        } else if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
                triggerRipple('play');
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
                triggerRipple('pause');
            }
        }
    };

    // Seek handler (-10s / +10s)
    const handleSeek = (deltaSeconds) => {
        if (videoId && playerRef.current) {
            const current = playerRef.current.getCurrentTime?.() || currentTime || 0;
            const totalDur = playerRef.current.getDuration?.() || duration || 0;
            const target = Math.max(0, Math.min(totalDur, current + deltaSeconds));
            setCurrentTime(target);
            playerRef.current.seekTo?.(target, true);
            triggerRipple(deltaSeconds > 0 ? 'forward' : 'replay');
        } else if (videoRef.current) {
            const current = videoRef.current.currentTime || currentTime || 0;
            const totalDur = videoRef.current.duration || duration || 0;
            const target = Math.max(0, Math.min(totalDur, current + deltaSeconds));
            videoRef.current.currentTime = target;
            setCurrentTime(target);
            triggerRipple(deltaSeconds > 0 ? 'forward' : 'replay');
        }
    };

    // Scrubber Change Handlers
    const handleScrubStart = () => {
        isScrubbingRef.current = true;
        setIsScrubbing(true);
    };

    const handleScrub = (e) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
    };

    const handleScrubEnd = (e) => {
        const targetTime = parseFloat(e.target.value ?? currentTime);
        setCurrentTime(targetTime);
        if (videoId && playerRef.current?.seekTo) {
            playerRef.current.seekTo(targetTime, true);
        } else if (videoRef.current) {
            videoRef.current.currentTime = targetTime;
        }
        setTimeout(() => {
            isScrubbingRef.current = false;
            setIsScrubbing(false);
        }, 120);
    };

    const handleTimelineClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percent = Math.max(0, Math.min(1, clickX / rect.width));
        const totalDur = (videoId && playerRef.current?.getDuration?.()) || duration || 0;
        const targetTime = percent * totalDur;
        setCurrentTime(targetTime);
        if (videoId && playerRef.current?.seekTo) {
            playerRef.current.seekTo(targetTime, true);
        } else if (videoRef.current) {
            videoRef.current.currentTime = targetTime;
        }
    };

    // Keyboard Shortcuts Listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
            if (e.code === 'Space' || e.key === 'k' || e.key === 'K') {
                e.preventDefault();
                togglePlay();
            } else if (e.key === 'ArrowLeft' || e.key === 'j' || e.key === 'J') {
                e.preventDefault();
                handleSeek(-5);
            } else if (e.key === 'ArrowRight' || e.key === 'l' || e.key === 'L') {
                e.preventDefault();
                handleSeek(5);
            } else if (e.key === 'm' || e.key === 'M') {
                e.preventDefault();
                toggleMute();
            } else if (e.key === 'f' || e.key === 'F') {
                e.preventDefault();
                toggleFullscreen();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPlaying, currentTime, duration, volume, isMuted]);

    // Speed change handler
    const handleSpeedChange = (speed) => {
        setPlaybackSpeed(speed);
        setSettingsOpen(false);
        setSettingsSubmenu(null);
        if (videoId && playerRef.current?.setPlaybackRate) {
            playerRef.current.setPlaybackRate(speed);
        }
        if (videoRef.current) {
            videoRef.current.playbackRate = speed;
        }
    };

    // Quality change handler
    const handleQualityChange = (quality) => {
        setSelectedQuality(quality);
        setSettingsOpen(false);
        setSettingsSubmenu(null);
        if (videoId && playerRef.current?.setPlaybackQuality) {
            playerRef.current.setPlaybackQuality(quality);
        }
    };

    // Volume change handler
    const handleVolumeChange = (newVol) => {
        setVolume(newVol);
        setIsMuted(newVol === 0);
        if (videoId && playerRef.current) {
            if (newVol === 0) {
                playerRef.current.mute?.();
            } else {
                playerRef.current.unMute?.();
                playerRef.current.setVolume?.(newVol * 100);
            }
        }
        if (videoRef.current) {
            videoRef.current.volume = newVol;
            videoRef.current.muted = newVol === 0;
        }
    };

    const toggleMute = () => {
        if (isMuted) {
            setIsMuted(false);
            const restoreVol = volume > 0 ? volume : 0.8;
            setVolume(restoreVol);
            if (videoId && playerRef.current) {
                playerRef.current.unMute?.();
                playerRef.current.setVolume?.(restoreVol * 100);
            }
            if (videoRef.current) {
                videoRef.current.muted = false;
                videoRef.current.volume = restoreVol;
            }
        } else {
            setIsMuted(true);
            if (videoId && playerRef.current) playerRef.current.mute?.();
            if (videoRef.current) videoRef.current.muted = true;
        }
    };

    // Fullscreen toggle
    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen?.().catch(() => {});
        } else {
            document.exitFullscreen?.().catch(() => {});
        }
    };

    const handleNativeTimeUpdate = (e) => {
        const video = e.currentTarget;
        if (!isScrubbingRef.current) {
            setCurrentTime(video.currentTime);
        }
        setDuration(video.duration || 0);
        if (video.buffered?.length > 0) {
            setBuffered((video.buffered.end(video.buffered.length - 1) / (video.duration || 1)) * 100);
        }
        if (!isWatchedRef.current && video.duration > 0 && video.currentTime >= video.duration - 2) {
            onWatchedRef.current?.();
        }
    };

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
    const hasActiveVideo = Boolean(videoId || lesson?.video);
    const displayStudentName = studentName || 'سارة أحمد';
    const displayStudentId = studentNationalId || '30401011234567';

    return (
        <div
            className="video-shell yt-video-shell"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && !settingsOpen && setShowControls(false)}
            onContextMenu={(e) => e.preventDefault()}
        >
            {/* Topbar Info */}
            <div className="video-topbar">
                <span className="video-topbar-title">
                    <CirclePlay size={15} /> {moduleTitle} · {lesson?.title}
                </span>
                <div className="video-topbar-meta">
                    <span className="lesson-badge-time">{lesson?.duration}</span>
                </div>
            </div>

            {/* Video Player Frame Container */}
            <div className="video-placeholder yt-video-placeholder">
                {videoId ? (
                    <iframe
                        ref={iframeRef}
                        className="video-frame yt-iframe-element"
                        src={getYouTubeEmbedUrl(videoId)}
                        title={lesson?.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                ) : looksLikeYouTubeUrl ? (
                    <div className="video-error" role="alert">
                        <ShieldAlert size={22} />
                        <span>رابط YouTube غير صالح. تأكد من صحة الرابط.</span>
                    </div>
                ) : lesson?.video ? (
                    <video
                        ref={videoRef}
                        className="video-frame"
                        src={lesson.video}
                        poster={posterImage}
                        playsInline
                        onClick={togglePlay}
                        onTimeUpdate={handleNativeTimeUpdate}
                        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onContextMenu={(e) => e.preventDefault()}
                    />
                ) : (
                    <div className="video-error" role="status">
                        <ShieldAlert size={22} />
                        <span>لم يُضف رابط فيديو لهذا الدرس بعد.</span>
                    </div>
                )}

                {/* Anti-Navigation Top Shield (Blocks clicking YouTube video title & external links to prevent leaving site) */}
                {videoId && (
                    <div
                        className="yt-top-shield"
                        onClick={(e) => {
                            e.stopPropagation();
                            togglePlay();
                        }}
                    />
                )}

                {/* Anti-Navigation Bottom-Right Shield (Blocks clicking YouTube logo & watermark) */}
                {videoId && (
                    <div
                        className="yt-bottom-shield"
                        onClick={(e) => {
                            e.stopPropagation();
                            togglePlay();
                        }}
                    />
                )}

                {/* Video Central Click Surface (Click to play/pause, double click for fullscreen) */}
                {hasActiveVideo && (
                    <div
                        className="yt-click-surface"
                        onClick={togglePlay}
                        onDoubleClick={toggleFullscreen}
                    />
                )}

                {/* Center Ripple Animation on Play / Pause / Seek */}
                {rippleState && (
                    <div className="yt-center-ripple" key={Date.now()}>
                        {rippleState === 'play' && <Play size={36} fill="currentColor" />}
                        {rippleState === 'pause' && <Pause size={36} />}
                        {rippleState === 'forward' && <RotateCw size={32} />}
                        {rippleState === 'replay' && <RotateCcw size={32} />}
                    </div>
                )}

                {/* Anti-Piracy Drifting Watermark Layer strictly bounded within the video container */}
                <div className="yt-watermark-layer" aria-hidden="true">
                    <div
                        className="video-watermark video-watermark-dynamic yt-watermark"
                        style={{
                            left: `${watermarkPosition.left}%`,
                            top: `${watermarkPosition.top}%`,
                            transform: `translate(-50%, -50%) rotate(${watermarkPosition.rotate}deg)`,
                        }}
                    >
                        <span className="watermark-name">{displayStudentName}</span>
                        <span className="watermark-id"> · {displayStudentId}</span>
                    </div>
                </div>

                {/* YouTube-Exact Controls Overlay (Timeline Scrubber Line + Controls Bar) */}
                {hasActiveVideo && (
                    <div className={`yt-controls-overlay ${showControls || !isPlaying ? 'visible' : 'hidden'}`} dir="ltr">
                        {/* Red Scrubber Timeline Bar (Strict LTR direction & precision click seeking) */}
                        <div
                            className={`yt-progress-container ${isScrubbing ? 'scrubbing' : ''}`}
                            dir="ltr"
                            onClick={handleTimelineClick}
                        >
                            <input
                                type="range"
                                dir="ltr"
                                min="0"
                                max={duration || 100}
                                step="0.1"
                                value={currentTime}
                                onMouseDown={handleScrubStart}
                                onTouchStart={handleScrubStart}
                                onChange={handleScrub}
                                onMouseUp={handleScrubEnd}
                                onTouchEnd={handleScrubEnd}
                                className="yt-progress-slider"
                                aria-label="شريط وقت الفيديو"
                            />
                            {/* Gray Buffered Bar */}
                            <div className="yt-progress-bar-buffered" style={{ width: `${buffered}%` }} />
                            {/* Red Filled Progress Line with Scrubber Thumb */}
                            <div className="yt-progress-bar-filled" style={{ width: `${progressPercent}%` }}>
                                <span className="yt-progress-thumb" />
                            </div>
                        </div>

                        {/* Controls Bottom Row (Exact YouTube Order) */}
                        <div className="yt-controls-row">
                            {/* Left Controls (Play/Pause, 10s Seek, Volume, Time) */}
                            <div className="yt-controls-left">
                                <button
                                    type="button"
                                    className="yt-icon-btn"
                                    onClick={togglePlay}
                                    title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
                                >
                                    {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
                                </button>

                                <button
                                    type="button"
                                    className="yt-icon-btn yt-seek-btn"
                                    onClick={() => handleSeek(-10)}
                                    title="ترجيع ١٠ ثوانٍ"
                                >
                                    <RotateCcw size={16} />
                                    <span>١٠</span>
                                </button>

                                <button
                                    type="button"
                                    className="yt-icon-btn yt-seek-btn"
                                    onClick={() => handleSeek(10)}
                                    title="تقديم ١٠ ثوانٍ"
                                >
                                    <RotateCw size={16} />
                                    <span>١٠</span>
                                </button>

                                <div className="yt-volume-wrap">
                                    <button
                                        type="button"
                                        className="yt-icon-btn"
                                        onClick={toggleMute}
                                        title={isMuted ? 'إلغاء الكتم' : 'كتم الصوت'}
                                    >
                                        {isMuted || volume === 0 ? <VolumeX size={19} /> : <Volume2 size={19} />}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.05"
                                        value={isMuted ? 0 : volume}
                                        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                                        className="yt-volume-slider"
                                    />
                                </div>

                                <div className="yt-time-display">
                                    <span>{formatTime(currentTime)}</span>
                                    <span className="yt-time-sep">/</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* Right Controls (Speed/Quality Settings Gear, Fullscreen) */}
                            <div className="yt-controls-right">
                                {/* YouTube Settings Gear with Speed & Quality Menus */}
                                <div className="yt-settings-wrap">
                                    <button
                                        type="button"
                                        className={`yt-icon-btn ${settingsOpen ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSettingsOpen(!settingsOpen);
                                            setSettingsSubmenu(null);
                                        }}
                                        title="الإعدادات (السرعة والجودة)"
                                    >
                                        <Settings size={18} />
                                    </button>

                                    {settingsOpen && (
                                        <div
                                            className="yt-settings-menu"
                                            onClick={(e) => e.stopPropagation()}
                                            dir="rtl"
                                        >
                                            {settingsSubmenu === null && (
                                                <div className="yt-menu-main">
                                                    <button
                                                        type="button"
                                                        className="yt-menu-row"
                                                        onClick={() => setSettingsSubmenu('speed')}
                                                    >
                                                        <span className="yt-menu-row-label">سرعة التشغيل</span>
                                                        <span className="yt-menu-val">
                                                            {SPEED_OPTIONS.find((s) => s.value === playbackSpeed)?.label || `${playbackSpeed}x`}
                                                            <ChevronLeft size={14} />
                                                        </span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="yt-menu-row"
                                                        onClick={() => setSettingsSubmenu('quality')}
                                                    >
                                                        <span className="yt-menu-row-label">جودة الفيديو</span>
                                                        <span className="yt-menu-val">
                                                            {QUALITY_OPTIONS.find((q) => q.value === selectedQuality)?.label.split(' ')[0] || 'تلقائي'}
                                                            <ChevronLeft size={14} />
                                                        </span>
                                                    </button>
                                                </div>
                                            )}

                                            {settingsSubmenu === 'speed' && (
                                                <div className="yt-submenu">
                                                    <button
                                                        type="button"
                                                        className="yt-submenu-header"
                                                        onClick={() => setSettingsSubmenu(null)}
                                                    >
                                                        <ChevronRight size={15} />
                                                        <span>سرعة التشغيل</span>
                                                    </button>
                                                    <div className="yt-submenu-list">
                                                        {SPEED_OPTIONS.map((opt) => (
                                                          <button
                                                              key={opt.value}
                                                              type="button"
                                                              className={`yt-menu-item ${playbackSpeed === opt.value ? 'selected' : ''}`}
                                                              onClick={() => handleSpeedChange(opt.value)}
                                                          >
                                                              <span>{opt.label}</span>
                                                              {playbackSpeed === opt.value && <Check size={14} />}
                                                          </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {settingsSubmenu === 'quality' && (
                                                <div className="yt-submenu">
                                                    <button
                                                        type="button"
                                                        className="yt-submenu-header"
                                                        onClick={() => setSettingsSubmenu(null)}
                                                    >
                                                        <ChevronRight size={15} />
                                                        <span>جودة الفيديو</span>
                                                    </button>
                                                    <div className="yt-submenu-list">
                                                        {QUALITY_OPTIONS.map((opt) => (
                                                          <button
                                                              key={opt.value}
                                                              type="button"
                                                              className={`yt-menu-item ${selectedQuality === opt.value ? 'selected' : ''}`}
                                                              onClick={() => handleQualityChange(opt.value)}
                                                          >
                                                              <span>{opt.label}</span>
                                                              {selectedQuality === opt.value && <Check size={14} />}
                                                          </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    className="yt-icon-btn"
                                    onClick={toggleFullscreen}
                                    title={isFullscreen ? 'تصغير الشاشة' : 'ملء الشاشة'}
                                >
                                    {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoPlayer;
