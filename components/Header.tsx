
import React from 'react';
import { MenuIcon, SearchIcon } from './icons';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm p-4 flex items-center justify-between flex-shrink-0 z-10 border-b border-blue-200 dark:border-blue-700">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="md:hidden mr-4 text-blue-400 dark:text-blue-300">
          <MenuIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold text-blue-800 dark:text-blue-200">SignEdu Dictionary: Học Ngôn ngữ Ký hiệu</h1>
      </div>
      <div className="relative w-full max-w-xs hidden sm:block">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-blue-300" />
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm bài học..."
          className="w-full bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-blue-600 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-blue-900 dark:text-blue-100 placeholder-blue-400"
        />
      </div>
    </header>
  );
};