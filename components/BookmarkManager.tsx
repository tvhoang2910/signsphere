import React, { useState, useEffect } from 'react';
import type { Video } from '../types';

interface BookmarkManagerProps {
    currentVideoId?: string | null;
}

export const BookmarkManager: React.FC<BookmarkManagerProps> = ({ currentVideoId }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [bookmarkCount, setBookmarkCount] = useState(0);

    // Load bookmarks from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('signedictionary_bookmarks');
        const bookmarks = saved ? JSON.parse(saved) : [];
        setBookmarkCount(bookmarks.length);

        if (currentVideoId) {
            setIsBookmarked(bookmarks.includes(currentVideoId));
        }
    }, [currentVideoId]);

    const toggleBookmark = () => {
        if (!currentVideoId) return;

        const saved = localStorage.getItem('signedictionary_bookmarks');
        let bookmarks = saved ? JSON.parse(saved) : [];

        if (isBookmarked) {
            bookmarks = bookmarks.filter((id: string) => id !== currentVideoId);
        } else {
            bookmarks.push(currentVideoId);
        }

        localStorage.setItem('signedictionary_bookmarks', JSON.stringify(bookmarks));
        setIsBookmarked(!isBookmarked);
        setBookmarkCount(bookmarks.length);
    };

    const viewBookmarks = () => {
        const saved = localStorage.getItem('signedictionary_bookmarks');
        const bookmarks = saved ? JSON.parse(saved) : [];
        alert(`Đã lưu ${bookmarks.length} mục:\n${bookmarks.join(', ')}`);
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={toggleBookmark}
                className={`px-3 py-2 text-sm rounded transition flex items-center space-x-1 ${isBookmarked
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
            >
                <span>{isBookmarked ? '❤️' : '🤍'}</span>
                <span>{isBookmarked ? 'Đã lưu' : 'Lưu lại'}</span>
            </button>

            <button
                onClick={viewBookmarks}
                className="px-3 py-2 text-sm rounded bg-blue-500 hover:bg-blue-600 text-white transition"
            >
                Xem ({bookmarkCount})
            </button>
        </div>
    );
};
