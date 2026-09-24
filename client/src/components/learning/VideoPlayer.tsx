import React, { useRef, useEffect } from 'react';
import { CirclePlay, Play } from 'lucide-react';
import type { Lesson } from '@/types';

interface VideoPlayerProps {
  lesson: Lesson;
  moduleTitle: string;
  posterImage?: string;
  currentTime: number;
  onTimeUpdate: (time: number) => void;
  jumpTime?: number | null;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  lesson,
  moduleTitle,
  posterImage,
  onTimeUpdate,
  jumpTime,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (jumpTime !== undefined && jumpTime !== null && videoRef.current) {
      videoRef.current.currentTime = jumpTime;
      void videoRef.current.play().catch(() => {});
    }
  }, [jumpTime]);

  const isEmbed = lesson.video?.includes('youtube') || lesson.video?.includes('youtu.be') || lesson.video?.includes('vimeo');

  return (
    <div className="video-shell">
      <div className="video-topbar">
        <span>
          <CirclePlay size={15} /> {moduleTitle}
        </span>
        <span className="lesson-badge-time">{lesson.duration}</span>
      </div>

      <div className="video-placeholder">
        {lesson.video ? (
          isEmbed ? (
            <iframe
              className="video-frame"
              src={lesson.video}
              title={lesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              ref={videoRef}
              className="video-frame"
              src={lesson.video}
              poster={posterImage}
              controls
              playsInline
              onTimeUpdate={(e) => onTimeUpdate(e.currentTarget.currentTime)}
            />
          )
        ) : (
          <div className="video-grid" />
        )}
        <span className="video-watermark">نَوَى</span>
      </div>
    </div>
  );
};

export default VideoPlayer;
