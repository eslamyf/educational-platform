const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtu.be',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com',
]);

const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

export const getYouTubeVideoId = (value: string): string | null => {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' || !YOUTUBE_HOSTS.has(url.hostname.toLowerCase())) return null;

    const segments = url.pathname.split('/').filter(Boolean);
    const videoId = url.hostname === 'youtu.be'
      ? segments[0]
      : url.pathname === '/watch'
        ? url.searchParams.get('v')
        : ['embed', 'shorts', 'live'].includes(segments[0])
          ? segments[1]
          : null;

    return videoId && VIDEO_ID_PATTERN.test(videoId) ? videoId : null;
  } catch {
    return null;
  }
};

export const getYouTubeEmbedUrl = (videoId: string) => {
  const params = new URLSearchParams({
    enablejsapi: '1',
    controls: '1',
    modestbranding: '1',
    rel: '0',
    playsinline: '1',
    origin: window.location.origin,
  });

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
};