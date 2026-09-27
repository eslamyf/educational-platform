import React, { useEffect, useRef, useState } from 'react';
import { CirclePlay, ShieldAlert, ShieldCheck } from 'lucide-react';
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

export const VideoPlayer = ({
    lesson,
    moduleTitle,
    posterImage,
    lessonId,
    isWatched,
    studentName,
    studentNationalId,
    onWatched,
}) => {
    const iframeRef = useRef(null);
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const onWatchedRef = useRef(onWatched);
    const isWatchedRef = useRef(isWatched);
    const maxWatchedTimeRef = useRef(0);
    const previousTimeRef = useRef(0);
    const verifiedPlaybackRef = useRef(0);
    const [watermarkPosition, setWatermarkPosition] = useState({ left: 18, top: 22, rotate: -2 });

    const videoId = lesson.video ? getYouTubeVideoId(lesson.video) : null;
    const looksLikeYouTubeUrl = Boolean(lesson.video && /youtube\.com|youtu\.be|youtube-nocookie\.com/i.test(lesson.video));

    onWatchedRef.current = onWatched;
    isWatchedRef.current = isWatched;

    useEffect(() => {
        const moveWatermark = () => setWatermarkPosition({
            left: 10 + Math.random() * 60,
            top: 12 + Math.random() * 68,
            rotate: -3 + Math.random() * 6,
        });
        const interval = window.setInterval(moveWatermark, 5500);
        return () => window.clearInterval(interval);
    }, []);

    useEffect(() => {
        previousTimeRef.current = 0;
        maxWatchedTimeRef.current = 0;
        verifiedPlaybackRef.current = 0;
    }, [lessonId]);

    useEffect(() => {
        if (!videoId || !iframeRef.current || isWatched)
            return;
        let cancelled = false;
        let progressInterval = 0;

        loadYouTubeApi().then((youtube) => {
            if (cancelled || !iframeRef.current)
                return;
            playerRef.current?.destroy();
            const player = new youtube.Player(iframeRef.current, {
                events: {
                    onReady: () => {
                        player.seekTo(0, true);
                        previousTimeRef.current = 0;
                        progressInterval = window.setInterval(() => {
                            if (player.getPlayerState() !== youtube.PlayerState.PLAYING)
                                return;
                            if (player.getPlaybackRate() !== 1)
                                player.setPlaybackRate(1);
                            const currentTime = player.getCurrentTime();
                            const duration = player.getDuration();
                            const delta = currentTime - previousTimeRef.current;
                            if (delta > 2.2) {
                                player.seekTo(previousTimeRef.current, true);
                                return;
                            }
                            if (delta > 0)
                                verifiedPlaybackRef.current += Math.min(delta, 1.5);
                            previousTimeRef.current = currentTime;
                            if (duration > 0 && currentTime >= duration - 1.5 && verifiedPlaybackRef.current >= duration * 0.97) {
                                onWatchedRef.current();
                            }
                        }, 1000);
                    },
                    onStateChange: (event) => {
                        if (event.data === youtube.PlayerState.ENDED) {
                            const duration = player.getDuration();
                            if (duration > 0 && verifiedPlaybackRef.current >= duration * 0.97)
                                onWatchedRef.current();
                        }
                    },
                },
            });
            playerRef.current = player;
        }).catch(() => { });

        return () => {
            cancelled = true;
            window.clearInterval(progressInterval);
            playerRef.current?.destroy();
            playerRef.current = null;
        };
    }, [videoId, lessonId, isWatched]);

    const handleNativeTimeUpdate = (event) => {
        const video = event.currentTarget;
        const currentTime = video.currentTime;
        const duration = video.duration;
        const delta = currentTime - previousTimeRef.current;
        if (!isWatchedRef.current && delta > 0 && delta <= 2.2) {
            verifiedPlaybackRef.current += delta;
            maxWatchedTimeRef.current = Math.max(maxWatchedTimeRef.current, currentTime);
        }
        previousTimeRef.current = currentTime;
        if (!isWatchedRef.current && duration > 0 && currentTime >= duration - 0.5 && verifiedPlaybackRef.current >= duration * 0.97) {
            onWatchedRef.current();
        }
    };

    const handleNativeSeeking = (event) => {
        const video = event.currentTarget;
        if (!isWatchedRef.current && video.currentTime > maxWatchedTimeRef.current + 1.5) {
            video.currentTime = maxWatchedTimeRef.current;
        }
    };

    const handleNativePlay = (event) => {
        previousTimeRef.current = event.currentTarget.currentTime;
    };

    return (
        <div className="video-shell">
            <div className="video-topbar">
                <span className="video-topbar-title">
                    <CirclePlay size={15} /> {moduleTitle} · {lesson.title}
                </span>
                <div className="video-topbar-meta">
                    <span className="video-student-badge">
                        <ShieldCheck size={13} /> {studentName} {studentNationalId ? `(${studentNationalId})` : ''}
                    </span>
                    <span className="lesson-badge-time">{lesson.duration}</span>
                </div>
            </div>

            <div className="video-placeholder">
                {videoId ? (
                    <iframe
                        ref={iframeRef}
                        className="video-frame"
                        src={getYouTubeEmbedUrl(videoId)}
                        title={lesson.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                ) : looksLikeYouTubeUrl ? (
                    <div className="video-error" role="alert">
                        <ShieldAlert size={22} />
                        <span>رابط YouTube غير صالح. استخدم رابط فيديو أو Shorts صحيحًا.</span>
                    </div>
                ) : lesson.video ? (
                    <video
                        ref={videoRef}
                        className="video-frame"
                        src={lesson.video}
                        poster={posterImage}
                        controls
                        controlsList="nodownload noplaybackrate noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                        playsInline
                        onContextMenu={(event) => event.preventDefault()}
                        onLoadedMetadata={(event) => {
                            previousTimeRef.current = event.currentTarget.currentTime;
                            maxWatchedTimeRef.current = event.currentTarget.currentTime;
                            verifiedPlaybackRef.current = 0;
                            if (!isWatchedRef.current)
                                event.currentTarget.currentTime = 0;
                        }}
                        onPlay={handleNativePlay}
                        onTimeUpdate={handleNativeTimeUpdate}
                        onSeeking={handleNativeSeeking}
                    />
                ) : (
                    <div className="video-error" role="status">
                        <ShieldAlert size={22} />
                        <span>لم يُضف رابط فيديو لهذا الدرس بعد.</span>
                    </div>
                )}

                {/* Inline, slim, non-intrusive floating watermark */}
                <span
                    className="video-watermark video-watermark-dynamic"
                    style={{
                        left: `${watermarkPosition.left}%`,
                        top: `${watermarkPosition.top}%`,
                        transform: `translate(-50%, -50%) rotate(${watermarkPosition.rotate}deg)`,
                    }}
                    aria-hidden="true"
                >
                    <span className="watermark-name">{studentName}</span>
                    {studentNationalId && <span className="watermark-id">· الرقم القومي {studentNationalId}</span>}
                </span>
            </div>
        </div>
    );
};

export default VideoPlayer;
