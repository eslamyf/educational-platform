import React, { useState } from 'react';
import { Clock3, Plus, Trash2, BookOpen } from 'lucide-react';
import type { LessonNote } from '@/types';
import { useLearning } from '@/hooks/useLearning';

interface LessonNotesProps {
  lessonTitle: string;
  currentTime: number;
  courseId?: string;
  onJumpToTime: (time: number) => void;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export const LessonNotes: React.FC<LessonNotesProps> = ({
  lessonTitle,
  currentTime,
  courseId,
  onJumpToTime,
}) => {
  const [noteText, setNoteText] = useState('');
  const { notes, addNote, deleteNote } = useLearning();

  const currentLessonNotes = notes.filter((n) => n.lesson === lessonTitle);

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    addNote(lessonTitle, currentTime, noteText, courseId);
    setNoteText('');
  };

  return (
    <section className="lesson-notes">
      <div className="portal-section-head">
        <div>
          <div className="eyebrow">مذكرتك الدراسية الذكية</div>
          <h2 className="section-title">أضف ملاحظة عند نقطة مهمة</h2>
        </div>
        <span className="note-current-time">
          <Clock3 size={14} /> التوقيت الحالي: {formatTime(currentTime)}
        </span>
      </div>

      <div className="note-editor">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="اكتب نقطة تركيز، سؤالاً تريد الرجوع له، أو تلخيصًا سريعًا..."
          rows={3}
        />
        <button type="button" className="btn btn-primary" onClick={handleAddNote}>
          <Plus size={15} /> حفظ الملاحظة عند {formatTime(currentTime)}
        </button>
      </div>

      {currentLessonNotes.length > 0 ? (
        <div className="saved-notes">
          {currentLessonNotes.map((note) => (
            <div className="saved-note" key={note.id}>
              <button
                type="button"
                className="note-time-btn"
                onClick={() => onJumpToTime(note.time)}
                title="القفز إلى توقيت الملاحظة في الفيديو"
              >
                <Clock3 size={12} /> {formatTime(note.time)}
              </button>
              <p>{note.body}</p>
              <div className="saved-note-actions">
                <button
                  type="button"
                  className="note-jump-text"
                  onClick={() => onJumpToTime(note.time)}
                >
                  اذهب للوقت
                </button>
                <button
                  type="button"
                  className="note-delete-btn"
                  onClick={() => deleteNote(note.id)}
                  aria-label="حذف الملاحظة"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-notes-hint">
          <BookOpen size={18} />
          <span>لم تقم بإضافة ملاحظات لهذه المحاضرة بعد. ستظهر ملاحظاتك هنا مرتبة بالدقيقة والثانية.</span>
        </div>
      )}
    </section>
  );
};

export default LessonNotes;
