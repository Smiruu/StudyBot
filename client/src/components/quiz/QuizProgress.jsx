import React from 'react';

const QuizProgress = ({ currentQuestion, totalQuestions, totalTime, timeLimit, timeLeft, countdownTime }) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end mb-2">
                <span className="text-2xl font-bold text-primary">Question {currentQuestion + 1} <span className="text-on-surface-variant font-normal text-base">of {totalQuestions}</span></span>
                <div className="flex flex-col items-end">
                    {timeLimit > 0 ? (
                        <span className={`text-sm font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-orange-400'}`}>
                            Time Left: {countdownTime}
                        </span>
                    ) : (
                        <span className="text-sm font-bold text-secondary">Total Time: {totalTime}</span>
                    )}
                </div>
            </div>
            <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div
                    className="h-full bg-secondary rounded-full shadow-[0_0_12px_rgba(102,217,204,0.4)] transition-all duration-300 ease-in-out"
                    style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                ></div>
            </div>
        </div>
    );
};

export default QuizProgress;
