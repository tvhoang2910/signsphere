import React, { useState } from 'react';
import type { Video } from '../types';

interface SearchFilterProps {
    videos: Video[];
    onFilter: (filtered: Video[]) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ videos, onFilter }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Extract all unique tags from videos
    const allTags = Array.from(new Set(videos.flatMap(v => v.domain_tags))) as string[];

    const applyFilters = () => {
        let filtered = videos;

        // Search by gloss or description
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(
                v =>
                    v.gloss.toLowerCase().includes(term) ||
                    (v.variants?.some(variant => variant.toLowerCase().includes(term))) ||
                    v.description_vi.toLowerCase().includes(term)
            );
        }

        // (levels removed) no level filtering

        // Filter by tags (if any tag selected, show entries with at least one matching tag)
        if (selectedTags.length > 0) {
            filtered = filtered.filter(v =>
                selectedTags.some(tag => v.domain_tags.includes(tag))
            );
        }

        onFilter(filtered);
    };

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    React.useEffect(() => {
        applyFilters();
    }, [searchTerm, selectedTags]);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 space-y-4 border border-blue-200 dark:border-blue-800">
            {/* Search Input */}
            <div>
                <label className="block text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Tìm kiếm (Gloss hoặc mô tả)
                </label>
                <input
                    type="text"
                    placeholder="Nhập từ khóa..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-blue-200 dark:border-blue-700 rounded bg-white dark:bg-slate-800 text-blue-900 dark:text-blue-100 placeholder-blue-400 dark:placeholder-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>

            {/* Level filter removed */}

            {/* Tag Filter */}
            <div>
                <label className="block text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Thẻ ({selectedTags.length} chọn)
                </label>
                <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-2 py-1 text-xs rounded transition ${selectedTags.includes(tag)
                                ? 'bg-blue-400 text-white'
                                : 'bg-blue-50 dark:bg-slate-800 text-blue-800 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-slate-700 border border-blue-200 dark:border-blue-800'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Clear Filters */}
            <button
                onClick={() => {
                    setSearchTerm('');
                    setSelectedTags([]);
                }}
                className="w-full px-3 py-2 text-sm bg-blue-50 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition"
            >
                Xóa tất cả bộ lọc
            </button>
        </div>
    );
};
