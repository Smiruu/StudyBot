import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/QuizScreen.css';
import QuizList from '../../component/QuizComponents/QuizList';
import CreateQuiz from '../../component/QuizComponents/CreateQuiz'; // Import your CreateQuiz component

const QuizScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCreateQuiz = () => {
    setShowModal(true); // Show modal instead of navigating
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1 className="quiz-title">My Quizzes</h1>
        <button className="create-button" onClick={handleCreateQuiz}>
          Create Quiz
        </button>
      </div>
      
      <QuizList />
      
      {/* Modal Backdrop */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <CreateQuiz onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;