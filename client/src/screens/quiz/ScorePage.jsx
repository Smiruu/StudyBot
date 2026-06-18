import { useLocation, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuiz } from "../../hooks/useQuiz";
import LoadingScreen from "../../components/ui/LoadingScreen";

const ScorePage = () => {
    const { attemptId } = useParams();
    const location = useLocation();
    const { fetchAttempt } = useQuiz();
    const [scoreData, setScoreData] = useState(location.state?.results || null);
    const [isLoading, setIsLoading] = useState(!location.state?.results);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!scoreData && attemptId) {
            const loadAttempt = async () => {
                try {
                    const data = await fetchAttempt(attemptId);
                    if (data && data.results) {
                        setScoreData(data.results);
                    } else {
                        setError("Could not load score data.");
                    }
                } catch (err) {
                    setError("Failed to load attempt.");
                } finally {
                    setIsLoading(false);
                }
            };
            loadAttempt();
        }
    }, [attemptId, scoreData, fetchAttempt]);

    if (isLoading) {
        return (
            <main className="flex-1 min-h-screen bg-dashboard-bg text-white flex items-center justify-center">
                <LoadingScreen title="Loading your results..." subtitle="Getting your score" />
            </main>
        );
    }

    if (error || !scoreData) {
        return (
            <main className="flex-1 min-h-screen bg-dashboard-bg text-white flex flex-col items-center justify-center">
                <div className="text-red-500 text-xl font-bold mb-4">{error || "No score data available."}</div>
                <Link to="/dashboard" className="bg-dashboard-accent text-black font-bold px-6 py-2 rounded-full hover:bg-yellow-400 transition-transform hover:-translate-y-1 shadow-lg">Return to Dashboard</Link>
            </main>
        );
    }

    const { attempt_info, score, questions } = scoreData;
    
    // Format time taken
    const minutes = Math.floor(attempt_info.time_taken / 60);
    const seconds = attempt_info.time_taken % 60;
    const timeTakenDisplay = `${minutes}m ${seconds}s`;

    return (
        <main className="flex-1 min-h-screen bg-dashboard-bg text-white font-sans p-6 md:p-12 pb-24">
            <div className="max-w-[900px] mx-auto anim-slide-up">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Quiz Results</h1>
                        <p className="text-dashboard-text-secondary mt-1">Review your performance</p>
                    </div>
                    <Link to="/dashboard" className="bg-dashboard-card text-white font-bold px-5 py-2.5 rounded-full hover:bg-dashboard-icon-bg transition-colors shadow-sm text-sm border border-dashboard-icon-bg">
                        Back to Dashboard
                    </Link>
                </div>
                
                {/* Score Summary Card */}
                <div className="bg-dashboard-card rounded-3xl p-8 mb-10 shadow-xl border border-dashboard-icon-bg flex flex-col md:flex-row justify-between items-center gap-8 anim-slide-up-delay-1">
                    <div className="text-center md:text-left">
                        <h2 className="text-sm font-bold text-dashboard-text-secondary uppercase tracking-widest mb-2">Overall Score</h2>
                        <div className="flex items-baseline justify-center md:justify-start">
                            <span className={`text-7xl font-black ${score >= 80 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                                {score}
                            </span>
                            <span className="text-3xl font-bold text-dashboard-text-secondary ml-1">%</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 md:gap-6 w-full md:w-auto">
                        <div className="bg-dashboard-icon-bg rounded-2xl p-5 flex-1 md:min-w-[140px] text-center shadow-inner border border-white/5">
                            <p className="text-[11px] font-bold text-dashboard-text-secondary uppercase tracking-wider mb-2">Time Taken</p>
                            <p className="text-2xl font-black text-dashboard-cyan">{timeTakenDisplay}</p>
                        </div>
                        <div className="bg-dashboard-icon-bg rounded-2xl p-5 flex-1 md:min-w-[140px] text-center shadow-inner border border-white/5">
                            <p className="text-[11px] font-bold text-dashboard-text-secondary uppercase tracking-wider mb-2">Date</p>
                            <p className="text-xl font-black text-white mt-1">{new Date(attempt_info.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                {/* Questions Header */}
                <div className="flex items-center mb-6 anim-slide-up-delay-2">
                    <span className="bg-dashboard-accent text-black font-black text-sm px-3 py-1 rounded-full mr-3 shadow-md">
                        {questions.length}
                    </span>
                    <h3 className="text-2xl font-bold">Question Breakdown</h3>
                </div>
                
                {/* Questions List */}
                <div className="space-y-6 anim-slide-up-delay-2">
                    {questions.map((q, index) => {
                        const isCorrect = q.is_correct;
                        return (
                            <div key={q.id} className={`bg-dashboard-card rounded-2xl overflow-hidden transition-all duration-300 shadow-lg border-2 ${isCorrect ? 'border-green-500/30 hover:border-green-400/60' : 'border-red-500/30 hover:border-red-400/60'}`}>
                                {/* Question Text Bar */}
                                <div className={`px-6 py-5 border-b border-white/5 ${isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                                    <div className="flex items-start">
                                        <span className={`flex items-center justify-center w-8 h-8 rounded-xl font-bold text-sm shadow-sm mr-4 flex-shrink-0 mt-0.5 ${isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {index + 1}
                                        </span>
                                        <h4 className="text-lg font-bold text-white leading-relaxed">{q.question_text}</h4>
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                        <div className={`p-5 rounded-xl border border-white/5 shadow-inner ${isCorrect ? 'bg-dashboard-icon-bg' : 'bg-red-900/10 border-red-500/20'}`}>
                                            <p className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>Your Answer</p>
                                            <p className="font-medium text-white/90">
                                                {q.user_answer}
                                            </p>
                                        </div>
                                        
                                        {!isCorrect && (
                                            <div className="p-5 rounded-xl border border-white/5 shadow-inner bg-dashboard-icon-bg">
                                                <p className="text-[11px] font-bold uppercase tracking-wider mb-2 text-green-400">Correct Answer</p>
                                                <p className="font-medium text-white/90">
                                                    {q.correct_answer}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {q.explanation && (
                                        <div className="bg-dashboard-icon-bg border border-dashboard-cyan/20 p-5 rounded-xl flex items-start gap-3 shadow-inner">
                                            <div className="text-dashboard-cyan mt-0.5">
                                                <span className="material-symbols-outlined text-xl">lightbulb</span>
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-bold text-dashboard-cyan uppercase tracking-wider mb-1.5">Explanation</p>
                                                <p className="text-sm text-dashboard-text-secondary leading-relaxed">
                                                    {q.explanation}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
};

export default ScorePage;