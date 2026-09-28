const YOUTUBE_HOSTS = new Set([
    'youtube.com',
    'www.youtube.com',
    'm.youtube.com',
    'youtu.be',
    'youtube-nocookie.com',
    'www.youtube-nocookie.com',
]);

const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

export const getYouTubeVideoId = (value) => {
    if (!value || typeof value !== 'string') return null;
    const trimmed = value.trim();
    if (VIDEO_ID_PATTERN.test(trimmed)) return trimmed;
    try {
        const url = new URL(trimmed);
        if (!YOUTUBE_HOSTS.has(url.hostname.toLowerCase())) {
            // Check fallback regex
            const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/))([A-Za-z0-9_-]{11})/);
            return match ? match[1] : null;
        }
        const segments = url.pathname.split('/').filter(Boolean);
        const videoId = url.hostname.includes('youtu.be')
            ? segments[0]
            : url.pathname === '/watch'
                ? url.searchParams.get('v')
                : ['embed', 'shorts', 'live', 'v'].includes(segments[0])
                    ? segments[1]
                    : null;
        return videoId && VIDEO_ID_PATTERN.test(videoId) ? videoId : null;
    } catch {
        const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/))([A-Za-z0-9_-]{11})/);
        return match ? match[1] : null;
    }
};

export const getYouTubeEmbedUrl = (videoId) => {
    const params = new URLSearchParams({
        enablejsapi: '1',
        controls: '0',
        disablekb: '1',
        fs: '0',
        iv_load_policy: '3',
        modestbranding: '1',
        rel: '0',
        playsinline: '1',
    });
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};
