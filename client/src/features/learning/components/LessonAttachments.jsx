import React from 'react';
import { FileText, FileDown, FolderOpen } from 'lucide-react';
import { toast } from 'sonner';
export const LessonAttachments = ({ files = [] }) => {
    const handleDownload = (filename) => {
        toast.info(`المرفق "${filename}" تجريبي ولا يتوفر للتنزيل حاليًا`);
    };
    if (!files || files.length === 0) {
        return (<div className="empty-resource">
        <FolderOpen size={20}/>
        <span>لا توجد ملفات مرفقة بهذه المحاضرة.</span>
      </div>);
    }
    return (<div className="file-list">
      {files.map((file) => (<div className="file-row" key={file}>
          <div className="file-info-group">
            <span className="file-icon">
              <FileText size={18}/>
            </span>
            <div>
              <strong>{file}</strong>
              <small>ملف تدريب ومرفق للمحاضرة</small>
            </div>
          </div>
          <button type="button" className="btn btn-outline btn-small" onClick={() => handleDownload(file)}>
            <FileDown size={14}/> تحميل الملف
          </button>
        </div>))}
    </div>);
};
export default LessonAttachments;
