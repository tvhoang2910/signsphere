
import React from 'react';
import type { Video } from '../types';
// no thumbnail/icon needed; show text only

interface VideoCardProps {
  video: Video;
  onSelectVideo: (video: Video) => void;
  isPlaying: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onSelectVideo, isPlaying }) => {
  return (
    <button
      onClick={() => onSelectVideo(video)}
      className={`w-full flex flex-col space-y-2 p-3 rounded-lg text-left transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300 dark:focus-visible:ring-offset-slate-800 ${isPlaying ? 'bg-blue-100 dark:bg-blue-900/60' : 'hover:bg-blue-50 dark:hover:bg-blue-900/30'
        }`}
    >
      {/* Gloss (main title) */}
      <h3 className={`font-bold text-lg ${isPlaying ? 'text-blue-800 dark:text-blue-200' : 'text-blue-900 dark:text-blue-100'}`}>
        {video.gloss}
      </h3>

      {/* Variants as secondary text */}
      {video.variants && video.variants.length > 0 && (
        <p className="text-xs text-blue-400 dark:text-blue-400">
          {video.variants.join(' • ')}
        </p>
      )}

      {/* Description */}
      <p className="text-sm text-blue-800 dark:text-blue-200 line-clamp-2">
        {video.description_vi}
      </p>

      {/* Domain tags */}
      <div className="flex flex-wrap gap-1 pt-1">
        {video.domain_tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 rounded-full"
          >
            {tag}
          </span>
        ))}
        {video.domain_tags.length > 2 && (
          <span className="px-2 py-0.5 text-xs text-blue-400 dark:text-blue-400">
            +{video.domain_tags.length - 2}
          </span>
        )}
      </div>

      {/* Level removed per request */}
    </button>
  );
};
