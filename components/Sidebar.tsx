
import React from 'react';
import type { Category } from '../types';
import { LogoIcon, CloseIcon, PracticeIcon } from './icons';

interface SidebarProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onFeatureClick?: (feature: 'practice' | 'interpreter') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ categories, selectedCategory, onSelectCategory, isOpen, setIsOpen, onFeatureClick }) => {
  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>
      <aside className={`bg-white dark:bg-slate-900 text-blue-900 dark:text-blue-100 w-64 fixed md:relative inset-y-0 left-0 z-30 flex-shrink-0 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex items-center justify-between p-4 border-b border-blue-100 dark:border-blue-800">
          <div className="flex items-center space-x-3">
            <LogoIcon className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold">SignEdu Dictionary</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-blue-400 dark:text-blue-300">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          <h2 className="text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-3">Chuyên ngành</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => onSelectCategory(category)}
                  className={`w-full flex items-center px-4 py-2.5 my-1 text-left rounded-lg transition-colors duration-200 ${selectedCategory?.id === category.id
                    ? 'bg-blue-300 text-blue-900 shadow-md'
                    : 'hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                    }`}
                >
                  <category.icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{category.name}</span>
                </button>
              </li>
            ))}
          </ul>

          <h2 className="text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-3 mt-6">Tính năng</h2>
          <ul>
            <li>
              <button onClick={() => onFeatureClick?.('practice')} className="w-full flex items-center px-4 py-2.5 my-1 text-left rounded-lg transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-800 dark:text-blue-200 group">
                <PracticeIcon className="h-5 w-5 mr-3 text-yellow-300 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Luyện tập</span>
              </button>
            </li>
            <li>
              <button onClick={() => onFeatureClick?.('interpreter')} className="w-full flex items-center px-4 py-2.5 my-1 text-left rounded-lg transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-800 dark:text-blue-200 group">
                <svg className="h-5 w-5 mr-3 text-blue-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium">Tổng đài phiên dịch viên</span>
              </button>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-blue-100 dark:border-blue-800">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg text-center">
            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Nâng cấp Pro</h3>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">Mở khóa tất cả các bài học và tính năng.</p>
            <button className="mt-3 w-full bg-blue-400 text-blue-900 font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors duration-300">Nâng cấp</button>
          </div>
        </div>
      </aside>
    </>
  );
};
