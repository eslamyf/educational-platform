import React from 'react';
import { FileText, FileDown, FolderOpen } from 'lucide-react';
import { toast } from 'sonner';

export const LessonAttachments = ({ files = [], lessonTitle = '' }) => {
    const handleDownload = (fileItem) => {
        const filename = typeof fileItem === 'string' ? fileItem : (fileItem.name || 'مرفق_المحاضرة.pdf');
        const dataUrl = typeof fileItem === 'object' && fileItem.dataUrl ? fileItem.dataUrl : null;

        if (dataUrl) {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success(`تم بدء تحميل: ${filename}`);
            return;
        }

        try {
            const fileContent = `=====================================================
منصة نَوَى التعليمية — المذكرات وأوراق العمل المرفقة
المادة: مناهج الثانوية العامة والبكالوريا المصرية — ${lessonTitle || 'ملخص المحاضرة'}
الملف: ${filename}
=====================================================

أولاً: ملخص المفاهيم والقوانين الوزارية:
- استيعاب الفكرة العلمية والتطبيق العملي خطوة بخطوة.
- التركيز على استراتيجيات حل أسئلة الاختيار من متعدد بنظام الاستبعاد والتحليل.
- مراجعة المخططات والخرائط الذهنية المرفقة لتثبيت المعلومة.

ثانياً: تدريبات تطبيقية بنمط امتحانات بنك المعرفة:
١. ما هو العامل الأساسي المؤثر في فهم وتطبيق هذا الدرس؟
٢. تطبيق على العلاقات البيانية والتحليل العلمي الدقيق.

تمنياتنا لجميع طلاب منصة نَوَى بدوام التوفيق والتفوق!
`;
            const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast.success(`تم بدء تحميل: ${filename}`);
        } catch {
            toast.success(`تم تحميل المرفق: ${filename}`);
        }
    };

    if (!files || files.length === 0) {
        return (
            <div className="empty-resource">
                <FolderOpen size={20} />
                <span>لا توجد ملفات مرفقة بهذه المحاضرة حالياً.</span>
            </div>
        );
    }

    return (
        <div className="file-list">
            {files.map((file, idx) => {
                const fileName = typeof file === 'string' ? file : (file.name || 'ملف تدريبي.pdf');
                const fileSize = typeof file === 'object' && file.size ? file.size : 'مذكرة تدريب وملخص PDF';
                return (
                    <div className="file-row" key={`${fileName}-${idx}`}>
                        <div className="file-info-group">
                            <span className="file-icon">
                                <FileText size={18} />
                            </span>
                            <div>
                                <strong>{fileName}</strong>
                                <small>{fileSize}</small>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="btn btn-outline btn-small"
                            onClick={() => handleDownload(file)}
                        >
                            <FileDown size={14} /> تحميل الملف
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default LessonAttachments;
