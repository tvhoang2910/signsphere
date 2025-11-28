
import React from 'react';
import type { Category, Video } from '../types';
import { VideoCard } from './VideoCard';

interface VideoGridProps {
  videos: Video[];
  selectedCategory: Category | null;
  onSelectVideo: (video: Video) => void;
  currentVideoId?: string | null;
}

export const VideoGrid: React.FC<VideoGridProps> = ({ videos, selectedCategory, onSelectVideo, currentVideoId }) => {
  if (!selectedCategory) {
    return <div className="text-center p-4">Vui lòng chọn một chuyên ngành.</div>;
  }

  const filteredVideos = videos.filter(video => video.categoryId === selectedCategory.id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold">Bài học trong "{selectedCategory.name}"</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{filteredVideos.length} videos</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredVideos.length > 0 ? (
            filteredVideos.map(video => (
            <VideoCard 
                key={video.id} 
                video={video} 
                onSelectVideo={onSelectVideo} 
                isPlaying={video.id === currentVideoId}
            />
            ))
        ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-8">Không có video nào trong chuyên ngành này.</p>
        )}
        </div>
    </div>
  );
};
