import { useQuiz } from '../hooks/useQuiz';
import { useLocation, useParams } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import { useEffect } from 'react';

const QuizPage = () => {
    const {id} = useParams()
    
    const location = useLocation();
    const generatedQuiz = location.state?.quizData;

    const { questions, isLoading, error, fetchQuestions } = useQuiz();

    useEffect(()=> {
        if(!generatedQuiz){
            fetchQuestions(id);
        }
    },[id,generatedQuiz, fetchQuestions])

    const activeQuestions = generatedQuiz ? generatedQuiz?.questions : questions;


    if (isLoading && !generatedQuiz) {
        return <LoadingScreen title="Preparing your Quiz..." subtitle="Upping our brain juice..." />
    }

    if (error) {
        return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
    }

    // Protection: If somehow there are no questions yet, don't crash the app
    if (!activeQuestions || activeQuestions.length === 0) {
        return null; 
    }


    return (
        <>
            <header className="fixed top-0 left-0 right-0 h-20 px-6 md:px-12 flex items-center justify-between z-50 bg-[#141316] border-b border-outline-variant/30">
                <div className="flex items-center gap-4">
                    <span className="text-2xl font-black text-primary tracking-tight">Studybot</span>
                    <div className="h-6 w-px bg-outline-variant mx-2"></div>
                    <span className="text-sm font-semibold text-on-surface-variant">Active Quiz</span>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full text-on-surface hover:bg-surface-container-high transition-all" onClick={() => window.history.back()}>
                    <span className="material-symbols-outlined text-xl">close</span>
                    <span className="text-sm font-bold">Exit Quiz</span>
                </button>
            </header>

            <main className="pt-32 pb-12 px-6 flex flex-col items-center min-h-screen relative overflow-hidden bg-[#1A1821]">
                {/* Background Atmosphere */}
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(at 50% 0%, hsla(253,16%,10%,1) 0, transparent 50%)" }}></div>

                <div className="w-full max-w-4xl space-y-10 z-10">
                    {/* Progress Indicator Section */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-2xl font-bold text-primary">Question 3 <span className="text-on-surface-variant font-normal text-base">of 10</span></span>
                            <span className="text-sm font-bold text-secondary">8:45 remaining</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                            <div className="h-full bg-secondary w-[30%] rounded-full shadow-[0_0_12px_rgba(102,217,204,0.4)]"></div>
                        </div>
                    </div>

                    {/* Question Block */}
                    <section className="bg-[#1C1A22] rounded-2xl p-8 md:p-10 border border-outline-variant/50 shadow-xl">
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                            <div className="bg-tertiary/20 text-tertiary w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                <span className="material-symbols-outlined text-[24px]">psychology</span>
                            </div>
                            <div className="space-y-3 mt-1">
                                <span className="text-xs font-extrabold text-tertiary tracking-widest uppercase">Machine Learning</span>
                                <h1 className="text-2xl md:text-3xl font-bold text-on-surface leading-snug tracking-wide">
                                    Which algorithm is primarily used for classification tasks where the goal is to find a hyperplane that best separates two classes?
                                </h1>
                            </div>
                        </div>
                    </section>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                        {/* Option A */}
                        <button className="group relative flex items-center text-left p-5 bg-[#1C1A22] rounded-2xl hover:bg-surface-container-highest transition-all shadow-sm border border-transparent hover:border-outline-variant/30" onClick={() => { }}>
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-lg font-bold text-on-surface-variant group-hover:text-primary transition-colors">A</div>
                            <div className="ml-5">
                                <p className="text-base font-medium text-on-surface">Support Vector Machines</p>
                            </div>
                        </button>
                        {/* Option B */}
                        <button className="group relative flex items-center text-left p-5 bg-[#1C1A22] rounded-2xl hover:bg-surface-container-highest transition-all shadow-sm border border-transparent hover:border-outline-variant/30" onClick={() => { }}>
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-lg font-bold text-on-surface-variant group-hover:text-primary transition-colors">B</div>
                            <div className="ml-5">
                                <p className="text-base font-medium text-on-surface">K-Means Clustering</p>
                            </div>
                        </button>
                        {/* Option C */}
                        <button className="group relative flex items-center text-left p-5 bg-[#1C1A22] rounded-2xl hover:bg-surface-container-highest transition-all shadow-sm border border-transparent hover:border-outline-variant/30" onClick={() => { }}>
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-lg font-bold text-on-surface-variant group-hover:text-primary transition-colors">C</div>
                            <div className="ml-5">
                                <p className="text-base font-medium text-on-surface">Linear Regression</p>
                            </div>
                        </button>
                        {/* Option D */}
                        <button className="group relative flex items-center text-left p-5 bg-[#1C1A22] rounded-2xl hover:bg-surface-container-highest transition-all shadow-sm border border-transparent hover:border-outline-variant/30" onClick={() => { }}>
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-lg font-bold text-on-surface-variant group-hover:text-primary transition-colors">D</div>
                            <div className="ml-5">
                                <p className="text-base font-medium text-on-surface">Principal Component Analysis</p>
                            </div>
                        </button>
                    </div>

                    {/* Navigation Footer */}
                    <div className="flex flex-col sm:flex-row items-center justify-between pt-10 pb-4">
                        <button className="text-sm font-bold text-on-surface flex items-center gap-2 px-6 py-3 rounded-full hover:bg-surface-container-high transition-colors w-full sm:w-auto justify-center">
                            <span className="material-symbols-outlined text-xl">arrow_back</span>
                            Previous
                        </button>
                        <div className="flex gap-4 w-full sm:w-auto justify-center mt-4 sm:mt-0">
                            <button className="text-sm font-bold bg-transparent text-on-surface-variant px-6 py-3 rounded-full border border-outline-variant hover:text-white hover:border-outline transition-colors">
                                Flag Question
                            </button>
                            <button className="text-sm font-extrabold bg-tertiary text-on-tertiary px-8 py-3 rounded-full shadow-[0_4px_16px_rgba(243,192,26,0.2)] hover:shadow-[0_6px_24px_rgba(243,192,26,0.3)] hover:-translate-y-0.5 transition-all">
                                Next Question
                            </button>
                        </div>
                    </div>
                </div>

                {/* Decorative UI Element */}
                <div className="mt-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 opacity-70">
                    <div className="bg-surface-container/30 rounded-2xl p-4 border border-outline-variant/20 flex items-center gap-4">
                        <span className="material-symbols-outlined text-secondary text-[20px]">tips_and_updates</span>
                        <span className="text-[11px] font-semibold text-on-surface-variant">Tip: Hyperplanes are key in SVMs.</span>
                    </div>
                    <div className="bg-surface-container/30 rounded-2xl p-4 border border-outline-variant/20 flex items-center gap-4">
                        <span className="material-symbols-outlined text-primary text-[20px]">history</span>
                        <span className="text-[11px] font-semibold text-on-surface-variant">Last answered: 2 minutes ago</span>
                    </div>
                    <div className="bg-surface-container/30 rounded-2xl p-4 border border-outline-variant/20 flex items-center gap-4">
                        <span className="material-symbols-outlined text-tertiary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                        <span className="text-[11px] font-semibold text-on-surface-variant">Double XP Active for Quizzes</span>
                    </div>
                </div>
            </main>
        </>
    )
}

export default QuizPage;