import { useQuiz } from '../../hooks/useQuiz';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { useTimer } from '../../hooks/useCountdown';
import LoadingScreen from '../../components/ui/LoadingScreen';
import QuizHeader from '../../components/quiz/QuizHeader';
import QuizProgress from '../../components/quiz/QuizProgress';
import QuizQuestionBlock from '../../components/quiz/QuizQuestionBlock';
import QuizFooter from '../../components/quiz/QuizFooter';

const QuizPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const { id } = useParams()
    const navigate = useNavigate();

    const location = useLocation();
    const generatedQuiz = location.state?.quizData;

    const { questions, quizTimeLimit, isLoading, error, fetchQuestions, submitQuiz } = useQuiz();

    useEffect(() => {
        const sessionKey = `quiz_in_progress_${id}`;
        
        if (sessionStorage.getItem(sessionKey)) {
            sessionStorage.removeItem(sessionKey);
            alert("Quiz reset! You refreshed or left the page during an active quiz.");
            navigate("/dashboard");
            return;
        }

        sessionStorage.setItem(sessionKey, 'true');

        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            sessionStorage.removeItem(sessionKey);
        };
    }, [id, navigate]);

    useEffect(() => {
        if (!generatedQuiz) {
            fetchQuestions(id);
        }
    }, [id, generatedQuiz, fetchQuestions])

    const activeQuestions = generatedQuiz ? generatedQuiz?.questions : questions;
    const timeLimit = generatedQuiz ? (generatedQuiz.time_limit || 0) : quizTimeLimit;

    const { formattedTime: totalTime } = useTimer();
    const { timeLeft, formattedTime: countdownTime, isTimeUp } = useCountdown(timeLimit);

    
 

    const handleOptionSelect = (index) => {
        const selectedOption = activeQuestions[currentQuestion].options[index];
        const questionId = activeQuestions[currentQuestion].question_id;
    
        setAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[currentQuestion] = {
                question_id: questionId,
                answer: selectedOption
            };
            return newAnswers;
        });
        
    };

    const handleQuestionNav = (val) => {
        if (val === 'prev' && currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        } else if (val === 'next') {
            setCurrentQuestion(currentQuestion + 1);
        }
    }

    const handleQuizSubmit = async (isAutoSubmit = false) => {
        if (!isAutoSubmit && answers.filter(a => a !== undefined).length !== activeQuestions.length) {
            alert("Please answer all questions before submitting.");
            return;
        }
        
        const timeTaken = totalTime;
        
        const result = await submitQuiz(id, answers, timeTaken);

        if(result) {
            alert(isAutoSubmit ? "Time is up! Quiz automatically submitted." : "Quiz submitted successfully!");
            navigate(`/dashboard/score/${result.results.attempt_info.id}`, { state: { results: result.results } });
        }
    }

    useEffect(() => {
        if (isTimeUp) {
            handleQuizSubmit(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTimeUp]);

    if (isLoading && !generatedQuiz) {
        return <div className="flex items-center justify-center min-h-[80vh]">
            <LoadingScreen title="Preparing your Quiz..." subtitle="Upping our brain juice..." />
        </div>
    }

    if (error) {
        return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
    }

    
    if (!activeQuestions || activeQuestions.length === 0) {
        return null;
    }

    return (
        <>
            <QuizHeader />

            <main className="pt-32 pb-12 px-6 flex flex-col items-center min-h-screen relative overflow-hidden bg-[#1A1821]">
                {/* Background Atmosphere */}
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(at 50% 0%, hsla(253,16%,10%,1) 0, transparent 50%)" }}></div>

                <div className="w-full max-w-4xl space-y-10 z-10">
                    <QuizProgress 
                        currentQuestion={currentQuestion} 
                        totalQuestions={activeQuestions.length} 
                        totalTime={totalTime} 
                        timeLimit={timeLimit} 
                        timeLeft={timeLeft} 
                        countdownTime={countdownTime} 
                    />

                    <QuizQuestionBlock 
                        questionData={activeQuestions[currentQuestion]} 
                        selectedAnswer={answers[currentQuestion]} 
                        onOptionSelect={handleOptionSelect} 
                    />

                    <QuizFooter 
                        currentQuestion={currentQuestion} 
                        totalQuestions={activeQuestions.length} 
                        onNav={handleQuestionNav} 
                        onSubmit={handleQuizSubmit}
                        isSubmitDisabled={answers.filter(a => a !== undefined).length !== activeQuestions.length}
                    />
                </div>
            </main>
        </>
    )
}

export default QuizPage;