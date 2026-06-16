import {useQuiz} from '../hooks/useQuiz';
const QuizPage = () => {
    const {quizzes, quizId, isLoading, error, totalItems, generatedQuiz} = useQuiz();

    
    if(isLoading){
        return <LoadingScreen title="Generating Knowledge Check" subtitle="Studybot is scanning your document to create a custom quiz..." />
    }

    return (
        <div>
            <h1>Quiz Page</h1>
        </div>
    )
}

export default QuizPage;