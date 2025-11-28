import React, { useState } from 'react';

interface ContributionFormProps {
    onSubmit?: (data: any) => void;
    onClose?: () => void;
}

export const ContributionForm: React.FC<ContributionFormProps> = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        gloss: '',
        variants: '',
        description_vi: '',
        domain_tags: '',
        level: 'basic',
        signer_name: '',
        signer_bio: '',
        video_file: null as File | null,
        consent: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: (e.target as HTMLInputElement).checked,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFormData(prev => ({
            ...prev,
            video_file: file || null,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.consent) {
            alert('Vui lòng xác nhận consent');
            return;
        }
        if (onSubmit) {
            onSubmit(formData);
        }
        alert('Cảm ơn bạn! Mục của bạn đã được gửi để phê duyệt.');
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full my-8">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Đóng góp mục mới</h2>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-96 overflow-y-auto">
                    {/* Gloss */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                            Gloss (ký hiệu chuẩn) *
                        </label>
                        <input
                            type="text"
                            name="gloss"
                            value={formData.gloss}
                            onChange={handleChange}
                            placeholder="VD: BÁC SĨ"
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                    </div>

                    {/* Variants */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                            Đồng nghĩa (cách nhau bằng dấu phẩy)
                        </label>
                        <input
                            type="text"
                            name="variants"
                            value={formData.variants}
                            onChange={handleChange}
                            placeholder="VD: DOCTOR, PHYSICIAN"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                            Mô tả chi tiết (Tiếng Việt) *
                        </label>
                        <textarea
                            name="description_vi"
                            value={formData.description_vi}
                            onChange={handleChange}
                            placeholder="Mô tả ký hiệu, cách sử dụng..."
                            required
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                            Thẻ (cách nhau bằng dấu phẩy)
                        </label>
                        <input
                            type="text"
                            name="domain_tags"
                            value={formData.domain_tags}
                            onChange={handleChange}
                            placeholder="VD: y tế, cơ bản, nghề nghiệp"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                    </div>

                    {/* Level */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                            Mức độ
                        </label>
                        <select
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        >
                            <option value="basic">Cơ bản</option>
                            <option value="intermediate">Trung cấp</option>
                            <option value="advanced">Nâng cao</option>
                        </select>
                    </div>

                    {/* Signer Info */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Thông tin người dạy</h3>
                        <input
                            type="text"
                            name="signer_name"
                            value={formData.signer_name}
                            onChange={handleChange}
                            placeholder="Tên người dạy *"
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 mb-2"
                        />
                        <textarea
                            name="signer_bio"
                            value={formData.signer_bio}
                            onChange={handleChange}
                            placeholder="Bio (chuyên gia, tổ chức...)"
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                    </div>

                    {/* Video File */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                            File video (MP4, tối đa 50MB) *
                        </label>
                        <input
                            type="file"
                            name="video_file"
                            onChange={handleFileChange}
                            accept="video/mp4"
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                    </div>

                    {/* Consent */}
                    <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 p-3 rounded">
                        <label className="flex items-start space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="consent"
                                checked={formData.consent}
                                onChange={handleChange}
                                className="mt-1"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Tôi xác nhận rằng tôi sở hữu quyền trí tuệ của video này và cho phép nó được sử dụng với giấy phép CC-BY-NC.
                            </span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex space-x-2 pt-4">
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-semibold transition"
                        >
                            Gửi để phê duyệt
                        </button>
                        {onClose && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded font-semibold transition"
                            >
                                Hủy
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};
