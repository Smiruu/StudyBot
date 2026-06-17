import React from 'react';

const QuizFooter = ({ currentQuestion, totalQuestions, onNav }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between pt-10 pb-4">
            <button className={`text-sm font-bold text-on-surface flex items-center gap-2 px-6 py-3 rounded-full hover:bg-surface-container-high transition-colors w-full sm:w-auto justify-center ${currentQuestion === 0 ? 'invisible' : ''}`}
                onClick={() => onNav('prev')}>
                <span className="material-symbols-outlined text-xl">arrow_back</span>
                Previous
            </button>
            <div className="flex gap-4 w-full sm:w-auto justify-center mt-4 sm:mt-0">
                <button className="text-sm font-bold bg-transparent text-on-surface-variant px-6 py-3 rounded-full border border-outline-variant hover:text-white hover:border-outline transition-colors">
                    Flag Question
                </button>
                {currentQuestion < totalQuestions - 1 ? (
                    <button className="text-sm font-extrabold bg-tertiary text-on-tertiary px-8 py-3 rounded-full shadow-[0_4px_16px_rgba(243,192,26,0.2)] hover:shadow-[0_6px_24px_rgba(243,192,26,0.3)] hover:-translate-y-0.5 transition-all"
                        onClick={() => onNav('next')}>
                        Next Question
                    </button>
                ) : (
                    <button className="text-sm font-extrabold bg-tertiary text-on-tertiary px-8 py-3 rounded-full shadow-[0_4px_16px_rgba(243,192,26,0.2)] hover:shadow-[0_6px_24px_rgba(243,192,26,0.3)] hover:-translate-y-0.5 transition-all"
                        onClick={() => onNav('next')}>
                        Submit Quiz
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizFooter;
