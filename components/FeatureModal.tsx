import React from 'react';
import { CloseIcon } from './icons';

interface FeatureModalProps {
    isOpen: boolean;
    onClose: () => void;
    feature: 'practice' | 'interpreter' | null;
}

export const FeatureModal: React.FC<FeatureModalProps> = ({ isOpen, onClose, feature }) => {
    if (!isOpen || !feature) return null;

    const content = {
        practice: {
            title: '🎯 Luyện tập Ngôn ngữ Ký hiệu',
            icon: '📚',
            description: 'Nâng cao kỹ năng của bạn với các bài luyện tập tương tác.',
            features: [
                'Luyện tập từ vựng với flashcard',
                'Bài tập viết ký hiệu',
                'Kiểm tra độ hiểu biết từng chuyên đề',
                'Theo dõi tiến độ học tập',
            ],
        },
        interpreter: {
            title: '📞 Tổng đài phiên dịch viên',
            icon: '💬',
            description: 'Liên hệ tổng đài phiên dịch viên cho sự kiện hoặc hỗ trợ giao tiếp.',
            features: [
                'Phiên dịch viên được chứng chỉ',
                'Các lĩnh vực chuyên môn đa dạng',
                'Hỗ trợ khẩn cấp hoặc theo lịch hẹn',
                'Phí dịch vụ minh bạch và hợp lý',
            ],
        },
    };

    const currentContent = content[feature];

    return (
        <div className="fixed inset-0 bg-blue-900/50 z-40 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto border border-blue-200 dark:border-blue-800">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-blue-200 dark:border-blue-800 sticky top-0 bg-white dark:bg-slate-900">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">{currentContent.icon}</span>
                        <h2 className="text-xl font-bold text-blue-800 dark:text-blue-100">{currentContent.title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-blue-300 dark:text-blue-500 hover:text-blue-400 dark:hover:text-blue-300"
                    >
                        <CloseIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <p className="text-blue-800 dark:text-blue-200">{currentContent.description}</p>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-blue-800 dark:text-blue-100">Tính năng:</h3>
                        <ul className="space-y-2">
                            {currentContent.features.map((feat, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <span className="text-yellow-200 font-bold mt-0.5">✓</span>
                                    <span className="text-blue-600 dark:text-blue-300">{feat}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Action Button */}
                    <button className="w-full mt-6 bg-gradient-to-r from-blue-300 to-yellow-200 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-400 hover:to-yellow-300 transition-all duration-300 shadow-lg">
                        {feature === 'practice' && '🚀 Bắt đầu luyện tập'}
                        {feature === 'interpreter' && '💼 Liên hệ Tổng đài phiên dịch viên'}
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full mt-2 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 font-semibold py-2 px-4 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};
