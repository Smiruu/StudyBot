import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/QuizList.css";
import { useQuizzes } from "../../hooks/QuizHooks/useQuizzes";

function QuizList() {
  const { quizzes, isLoading, error, fetchQuizzesByGroup } = useQuizzes();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzesByGroup();
  }, [fetchQuizzesByGroup]);

  const handleQuizClick = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  if (isLoading) {
    return <div>Loading quizzes...</div>;
  } else if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="quiz-grid">
      {quizzes.length === 0 ? (
        <div className="empty-quizzes-message">No Quizzes yet</div>
      ) : (
        quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="quiz-card"
            onClick={() => handleQuizClick(quiz.id)}
          >
            <h2 className="quiz-name">{quiz.name}</h2>
          </div>
        ))
      )}
      
    </div>
  );
}

export default QuizList;
