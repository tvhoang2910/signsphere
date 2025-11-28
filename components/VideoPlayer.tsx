import React, { useRef, useState } from 'react';
import type { Video } from '../types';
import { BookOpenIcon } from './icons';

interface VideoPlayerProps {
  video: Video | null;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(false);

  if (!video) {
    return (
      <div className="w-full h-full bg-white dark:bg-slate-900 rounded-xl shadow-md flex flex-col items-center justify-center text-center p-8 border border-blue-200 dark:border-blue-700">
        <BookOpenIcon className="h-16 w-16 text-blue-300 mb-4" />
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">Chào mừng bạn đến với SignEdu Dictionary</h2>
        <p className="mt-2 text-blue-500 dark:text-blue-400">Chọn một bài học từ danh sách bên cạnh để bắt đầu hành trình của bạn.</p>
      </div>
    );
  }

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
    if (videoRef.current) {
      videoRef.current.loop = !isLooping;
    }
  };

  const handleFrameForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 0.04; // ~1 frame at 25fps
    }
  };

  const handleFrameBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 0.04;
    }
  };

  const handleVideoEnded = () => {
    if (isLooping && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const isYouTubeUrl = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('youtube.com/embed');
  };

  const toYouTubeEmbed = (url: string) => {
    try {
      if (url.includes('youtube.com/embed')) return url;
      // youtu.be short link
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1].split(/[?&]/)[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      const u = new URL(url);
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}`;
    } catch (e) {
      // fallback to original
    }
    return url;
  };

  return (
    <div className="w-full h-full bg-white dark:bg-slate-900 rounded-xl shadow-md flex flex-col overflow-hidden border border-blue-200 dark:border-blue-700">
      <div className="aspect-video bg-slate-900 relative flex items-center justify-center">
        {isYouTubeUrl(video.videoUrl) ? (
          <iframe
            width="100%"
            height="100%"
            src={toYouTubeEmbed(video.videoUrl)}
            title="Sign Language Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <video
            ref={videoRef}
            controls
            src={video.videoUrl}
            className="w-full h-full object-cover"
            controlsList="nodownload"
            onEnded={handleVideoEnded}
          />
        )}
      </div>

      {/* Advanced Controls */}
      <div className="bg-blue-50 dark:bg-slate-800 border-t border-blue-200 dark:border-blue-700 p-4 space-y-3">
        {/* Playback Speed */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-blue-700 dark:text-blue-300">Tốc độ:</label>
          <div className="flex space-x-2">
            {[0.5, 0.75, 1, 1.25, 1.5].map((rate) => (
              <button
                key={rate}
                onClick={() => handlePlaybackRateChange(rate)}
                className={`px-2 py-1 text-xs rounded transition ${playbackRate === rate
                  ? 'bg-blue-400 text-blue-900'
                  : 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-slate-600 border border-blue-200 dark:border-blue-600'
                  }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>

        {/* Frame Controls & Loop */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleFrameBackward}
            className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition"
          >
            ◀ Frame
          </button>
          <button
            onClick={handleFrameForward}
            className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition"
          >
            Frame ▶
          </button>
          <button
            onClick={toggleLoop}
            className={`px-3 py-1 text-sm rounded transition ${isLooping
              ? 'bg-blue-400 text-blue-900'
              : 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-slate-600 border border-blue-200 dark:border-blue-600'
              }`}
          >
            {isLooping ? '🔁 Loop ON' : '🔁 Loop OFF'}
          </button>
        </div>
      </div>

      {/* Metadata & Info */}
      <div className="p-6 flex-1 overflow-y-auto space-y-4">
        {/* Gloss & Variants */}
        <div>
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">{video.gloss}</h2>
          {video.variants && video.variants.length > 0 && (
            <p className="text-sm text-blue-500 dark:text-blue-500">
              Đồng nghĩa: {video.variants.join(', ')}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-blue-800 dark:text-blue-200">{video.description_vi}</p>

        {/* Domain Tags & Level */}
        <div className="flex flex-wrap gap-2">
          {video.domain_tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-full"
            >
              {tag}
            </span>
          ))}
          {video.level && (
            <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300 rounded-full">
              {video.level === 'basic' && '★ Cơ bản'}
              {video.level === 'intermediate' && '★★ Trung cấp'}
              {video.level === 'advanced' && '★★★ Nâng cao'}
            </span>
          )}
        </div>

        {/* Signer Info */}
        <div className="border-t border-blue-200 dark:border-blue-700 pt-4">
          <div className="flex items-center space-x-3">
            {video.signer.avatar && (
              <img
                src={video.signer.avatar}
                alt={video.signer.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 dark:border-blue-600"
              />
            )}
            <div>
              <p className="font-semibold text-blue-800 dark:text-blue-200">
                {video.signer.name}
                {video.signer.verified && <span className="ml-2 text-lg text-blue-400">✓</span>}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">{video.signer.bio}</p>
            </div>
          </div>
        </div>

        {/* Examples */}
        {video.examples && video.examples.length > 0 && (
          <div className="border-t border-blue-200 dark:border-blue-700 pt-4">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Ví dụ câu:</h3>
            <div className="space-y-2">
              {video.examples.map((ex, idx) => (
                <div key={idx} className="bg-blue-50 dark:bg-slate-800 p-3 rounded-lg text-sm border border-blue-200 dark:border-blue-700">
                  <p className="text-blue-800 dark:text-blue-200 font-medium">{ex.text_vi}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Ký hiệu: {ex.sign_sequence.join(' → ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* License & Attribution */}
        {(video.license || video.verified_by) && (
          <div className="bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700 p-3 rounded text-xs text-blue-800 dark:text-blue-200">
            {video.verified_by && <p>✓ Được xác thực bởi: {video.verified_by}</p>}
            {video.license && <p>Giấy phép: {video.license}</p>}
          </div>
        )}
      </div>
    </div>
  );
};
