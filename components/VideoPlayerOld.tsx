import React from 'react';
import type { Video } from '../types';
import { BookOpenIcon } from './icons';

interface VideoPlayerProps {
  video: Video | null;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  if (!video) {
    return (
      <div className="w-full h-full bg-white dark:bg-gray-800 rounded-xl shadow-md flex flex-col items-center justify-center text-center p-8">
        <BookOpenIcon className="h-16 w-16 text-indigo-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Chào mừng bạn đến với SignEdu Dictionary</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Chọn một bài học từ danh sách bên cạnh để bắt đầu hành trình của bạn.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-xl shadow-md flex flex-col overflow-hidden">
      <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
        <video
          controls
          src={video.videoUrl}
          className="w-full h-full object-cover"
          // allow native keyboard shortcuts and picture-in-picture where supported
          // users can click/drag the native progress bar to seek
          controlsList="nodownload"
        />
      </div>
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{video.title}</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{video.description}</p>
      </div>
    </div>
  );
};
