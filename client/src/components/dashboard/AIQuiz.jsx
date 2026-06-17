import { useState, useEffect } from 'react';
import { useQuiz } from '../../hooks/useQuiz';

import { useNavigate } from 'react-router-dom';

const AIQuiz = ({ materialId, generateQuiz }) => {
    const [count, setCount] = useState(10);
    const [difficulty, setDifficulty] = useState('intermediate');
    const [isTimeLimitEnabled, setIsTimeLimitEnabled] = useState(false);
    const [timeLimit, setTimeLimit] = useState(30);
    const { error, fetchQuizzes, quizzes } = useQuiz();
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuizzes(materialId)
    }, [])



    const difficultyClass = (level) =>
        difficulty === level
            ? 'py-2.5 sm:py-2 border-2 border-primary bg-primary/10 rounded-lg text-xs font-bold text-primary transition-colors'
            : 'py-2.5 sm:py-2 border border-outline-variant rounded-lg text-xs font-bold hover:bg-primary/10 transition-colors';

    const handleGenerate = async () => {
        const limitToPass = isTimeLimitEnabled ? timeLimit : 0;
        const data = await generateQuiz(materialId, count, difficulty, limitToPass);
        if (data) {
            navigate(`/dashboard/quiz/${data.quiz_id}`, {
                state: { quizData: data }
            });
        }

    };

    const handleTakeQuiz = (quizId) => {
        navigate(`/dashboard/quiz/${quizId}`);
    }


    return (
        <div className="space-y-6" id="ai-quiz-content">
            <div className="space-y-8 py-4" id="quiz-setup">
                {quizzes && quizzes.length > 0 && (
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between">
                            <h4 className="font-headline-md text-sm uppercase tracking-widest text-secondary">Your Quizzes</h4>
                        </div>
                        <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                            {quizzes.map((quiz, index) => {
                                const attemptCount = quiz.quiz_attempts ? quiz.quiz_attempts.length : 0;
                                
                                return (
                                <div key={quiz.id || index} className="bg-surface-container p-4 rounded-xl border border-outline-variant flex items-center justify-between group hover:border-primary transition-all">
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-on-surface">{quiz.title}</p>
                                        <div className="flex items-center gap-2 text-[10px] text-outline">
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">calendar_today</span>{new Date(quiz.created_at).toLocaleDateString()}</span>
                                            <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
                                            <span className="text-tertiary font-bold">
                                                {attemptCount === 0 ? "Haven't answered" : `${attemptCount} Attempt${attemptCount > 1 ? 's' : ''}`}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary hover:text-on-primary transition-all"
                                        onClick={() => handleTakeQuiz(quiz.id)}>
                                        {attemptCount === 0 ? "Answer" : "Retake"}
                                    </button>
                                </div>
                                );
                            })}



                        </div>
                        <div className="h-px bg-outline-variant my-6"></div>
                    </div>
                )}
                <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-3xl text-primary">quiz</span>
                    </div>
                    <h3 className="font-headline-md text-on-surface">Generate Knowledge Check</h3>
                    <p className="text-secondary">Studybot will scan your document to create a custom quiz.</p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-on-surface">Enable Time Limit per Question</span>
                        <button
                            type="button"
                            className={`w-12 h-6 rounded-full p-1 transition-colors ${isTimeLimitEnabled ? 'bg-tertiary' : 'bg-surface-container-high border border-outline-variant'}`}
                            onClick={() => setIsTimeLimitEnabled(!isTimeLimitEnabled)}
                        >
                            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isTimeLimitEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                    </div>

                    {isTimeLimitEnabled && (
                        <label className="block animate-in slide-in-from-top-2 fade-in duration-200">
                            <span className="text-sm font-bold text-on-surface">Time Limit: <span className="text-tertiary">{timeLimit} seconds</span></span>
                            <input
                                className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-tertiary mt-4"
                                max="120"
                                min="30"
                                step="5"
                                type="range"
                                value={timeLimit}
                                onChange={(e) => setTimeLimit(Number(e.target.value))}
                            />
                            <div className="flex justify-between text-[10px] text-outline mt-1 font-bold">
                                <span>30s</span>
                                <span>120s</span>
                            </div>
                        </label>
                    )}

                    <label className="block">
                        <span className="text-sm font-bold text-on-surface">Question Count: <span className="text-tertiary" id="q-count-val">{count}</span></span>
                        <input
                            className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-tertiary mt-4"
                            max="20"
                            min="5"
                            type="range"
                            value={count}
                            onChange={(e) => setCount(Number(e.target.value))}
                        />
                        <div className="flex justify-between text-[10px] text-outline mt-1 font-bold">
                            <span>5</span>
                            <span>10</span>
                            <span>15</span>
                            <span>20</span>
                        </div>
                    </label>
                    <div className="space-y-3">
                        <span className="text-sm font-bold text-on-surface">Complexity Level</span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                            <button
                                type="button"
                                className={difficultyClass('easy')}
                                onClick={() => setDifficulty('easy')}
                            >
                                Easy
                            </button>
                            <button
                                type="button"
                                className={difficultyClass('intermediate')}
                                onClick={() => setDifficulty('intermediate')}
                            >
                                Intermediate
                            </button>
                            <button
                                type="button"
                                className={difficultyClass('expert')}
                                onClick={() => setDifficulty('expert')}
                            >
                                Expert
                            </button>
                        </div>
                    </div>
                </div>
                {error && (
                    <p className="text-sm text-error text-center">{error}</p>
                )}
                <button
                    type="button"
                    className="w-full py-4 bg-tertiary text-on-tertiary rounded-xl font-display-lg text-[18px] font-extrabold hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-tertiary/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    onClick={handleGenerate}

                >
                    GENERATE MY QUIZ
                </button>
            </div>
        </div>
    );
};

export default AIQuiz;
