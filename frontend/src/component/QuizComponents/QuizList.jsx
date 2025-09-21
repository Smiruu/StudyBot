import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/QuizList.css";
import { useQuizzes } from "../../hooks/QuizHooks/useQuizzes";
import { useAuth } from "../../hooks/AuthHooks/userAuth.js";
import 'bootstrap-icons/font/bootstrap-icons.css';

function QuizList() {
  const { quizzes, isLoading, error, fetchQuizzesByGroup, deleteFlashcards } = useQuizzes();
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null); // Tracks which quiz menu is open

  useEffect(() => {
    fetchQuizzesByGroup(user, accessToken);
  }, [fetchQuizzesByGroup]);

  const handleQuizClick = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  const toggleMenu = (quizId, e) => {
    e.stopPropagation(); // Prevent opening quiz when clicking menu
    setOpenMenuId((prev) => (prev === quizId ? null : quizId));
  };

  const handleDelete = (quizId, e) => {
    e.stopPropagation();
    deleteFlashcards(quizId);
    setOpenMenuId(null); // Close the menu after deleting
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
            key={quiz._id}
            className="quiz-card"
            onClick={() => handleQuizClick(quiz._id)}
          >
            <div className="menu-container">
              <button
                className="menu-icon"
                onClick={(e) => toggleMenu(quiz._id, e)}
              >
                <i className="bi bi-three-dots-vertical"></i>
              </button>
              {openMenuId === quiz._id && (
                <div className="menu-dropdown" onClick={(e) => e.stopPropagation()}>
                  <div className="menu-item">Edit</div>
                  <div className="menu-item">Share</div>
                  <div className="menu-item delete" onClick={(e) => handleDelete(quiz._id, e)}>
                    Delete
                  </div>
                </div>
              )}
            </div>
            <h2 className="quiz-name">{quiz.name}</h2>
          </div>
        ))
      )}
    </div>
  );
}

export default QuizList;
