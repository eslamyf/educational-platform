import React, { useState } from 'react';
import { ListChecks, CheckCircle2, ArrowLeft, RefreshCw } from 'lucide-react';
import type { QuizQuestion } from '@/types';
import { useLearning } from '@/hooks/useLearning';
import { toast } from 'sonner';

interface LessonQuizProps {
  quiz: QuizQuestion;
  lessonTitle: string;
}

export const LessonQuiz: React.FC<LessonQuizProps> = ({ quiz, lessonTitle }) => {
  const { quizAnswers, submitQuiz } = useLearning();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(
    quizAnswers[lessonTitle] !== undefined ? quizAnswers[lessonTitle] : null
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(
    quizAnswers[lessonTitle] !== undefined
  );

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      toast.error('يرجى اختيار إجابة أولاً');
      return;
    }
    submitQuiz(lessonTitle, selectedAnswer);
    setIsSubmitted(true);
    if (selectedAnswer === quiz.correct) {
      toast.success('إجابة صحيحة! أحسنت');
    } else {
      toast.error('إجابة غير صحيحة، حاول مجددًا');
    }
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setSelectedAnswer(null);
  };

  const isCorrect = selectedAnswer === quiz.correct;

  return (
    <div className="lesson-quiz">
      <div className="quiz-kicker">
        <ListChecks size={16} /> اختبار استيعاب سريع
      </div>
      <h3>{quiz.question}</h3>

      <div className="lesson-quiz-options">
        {quiz.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const showAsCorrect = isSubmitted && index === quiz.correct;
          const showAsWrong = isSubmitted && isSelected && index !== quiz.correct;

          return (
            <button
              key={option}
              type="button"
              className={`quiz-option-btn ${isSelected ? 'selected' : ''} ${
                showAsCorrect ? 'correct' : ''
              } ${showAsWrong ? 'wrong' : ''}`}
              onClick={() => !isSubmitted && setSelectedAnswer(index)}
              disabled={isSubmitted}
            >
              <span className="quiz-letter">{String.fromCharCode(1575 + index)}</span>
              <span className="quiz-text">{option}</span>
              {showAsCorrect && <CheckCircle2 size={16} className="quiz-status-icon text-success" />}
            </button>
          );
        })}
      </div>

      {isSubmitted ? (
        <div className={`quiz-feedback ${isCorrect ? 'success' : 'retry'}`}>
          <div className="quiz-feedback-text">
            <strong>{isCorrect ? 'إجابة صحيحة وممتازة!' : 'إجابة غير دقيقة.'}</strong>
            {quiz.explanation && <p>{quiz.explanation}</p>}
          </div>
          <button type="button" className="btn btn-outline btn-small" onClick={handleRetry}>
            <RefreshCw size={14} /> إعادة المحاولة
          </button>
        </div>
      ) : (
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          تحقق من الإجابة <ArrowLeft size={14} />
        </button>
      )}
    </div>
  );
};

export default LessonQuiz;
