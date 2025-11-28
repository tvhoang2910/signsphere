
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { VideoGrid } from './components/VideoGrid';
import { VideoPlayer } from './components/VideoPlayer';
import { SearchFilter } from './components/SearchFilter';
import { BookmarkManager } from './components/BookmarkManager';
import { ContributionForm } from './components/ContributionForm';
import { FeatureModal } from './components/FeatureModal';
import type { Category, Video } from './types';
import { CATEGORIES, VIDEOS } from './constants';

const App: React.FC = () => {
  const [categories] = useState<Category[]>(CATEGORIES);
  const [videos] = useState<Video[]>(VIDEOS);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>(VIDEOS);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showContributionForm, setShowContributionForm] = useState(false);
  const [activeFeature, setActiveFeature] = useState<'practice' | 'interpreter' | null>(null);

  useEffect(() => {
    if (categories.length > 0) {
      const initialCategory = categories[0];
      setSelectedCategory(initialCategory);
    }
  }, [categories]);

  useEffect(() => {
    if (selectedCategory) {
      const firstVideoInCategory = filteredVideos.find(v => v.categoryId === selectedCategory.id);
      setSelectedVideo(firstVideoInCategory || null);
    }
  }, [selectedCategory, filteredVideos]);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleFilter = (filtered: Video[]) => {
    setFilteredVideos(filtered);
  };

  return (
    <div className="bg-blue-50 dark:bg-slate-900 min-h-screen text-blue-900 dark:text-blue-100 transition-colors duration-300">
      <div className="flex h-screen">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          isOpen={isSidebarOpen}
          setIsOpen={setSidebarOpen}
          onFeatureClick={setActiveFeature}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 h-full">
              {/* Left: Video Player + Bookmark */}
              <div className="lg:col-span-2 h-full flex flex-col space-y-4">
                <VideoPlayer video={selectedVideo} />

                {/* Bookmark + Contribute Button */}
                {selectedVideo && (
                  <div className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-blue-700 shadow-sm">
                    <BookmarkManager currentVideoId={selectedVideo.id} />
                    <button
                      onClick={() => setShowContributionForm(true)}
                      className="px-4 py-2 bg-yellow-200 hover:bg-yellow-300 text-yellow-900 rounded font-semibold transition"
                    >
                      + Đóng góp
                    </button>
                  </div>
                )}
              </div>

              {/* Right: Search + Video List */}
              <div className="lg:col-span-1 h-full flex flex-col space-y-4">
                <SearchFilter videos={videos} onFilter={handleFilter} />
                <VideoGrid
                  videos={filteredVideos}
                  selectedCategory={selectedCategory}
                  onSelectVideo={setSelectedVideo}
                  currentVideoId={selectedVideo?.id}
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Contribution Form Modal */}
      {showContributionForm && (
        <ContributionForm onClose={() => setShowContributionForm(false)} />
      )}

      {/* Feature Modal */}
      <FeatureModal
        isOpen={activeFeature !== null}
        onClose={() => setActiveFeature(null)}
        feature={activeFeature}
      />
    </div>
  );
};

export default App;