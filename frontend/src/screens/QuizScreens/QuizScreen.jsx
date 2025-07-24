
import { useNavigate } from 'react-router-dom';
import './css/QuizScreen.css'; // Import the CSS file
import QuizList from '../../component/QuizComponents/QuizList';

const QuizScreen = () => {

  const navigate = useNavigate();

  const handleCreateQuiz = () => {
    navigate('/create-quiz');
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
    </div>
  );
};

export default QuizScreen;