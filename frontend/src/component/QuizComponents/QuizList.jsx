import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/QuizList.css";
import { useQuizzes } from "../../hooks/QuizHooks/useQuizzes";
import { useAuth } from "../../hooks/AuthHooks/userAuth.js";
import 'bootstrap-icons/font/bootstrap-icons.css';

function QuizList() {
  const { quizzes, isLoading, error, fetchQuizzesByGroup, deleteFlashcards } = useQuizzes();
  const {user, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzesByGroup( user, accessToken);
  },[fetchQuizzesByGroup]);

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
          <>
          <div
            key={quiz.id}
            className="quiz-card"
            onClick={() => handleQuizClick(quiz._id)}
          >
            <button
              className="delete-icon"
              onClick={(e) => {
                e.stopPropagation(); 
                deleteFlashcards(quiz._id);
              }}
            >
              <i className="bi bi-trash"></i>
            </button>
            <h2 className="quiz-name">{quiz.name}</h2>
          </div>
          </>
        ))
      )}
      
    </div>
  );
}

export default QuizList;
