import { useState } from 'react';
import { useQuizzes } from '../../hooks/QuizHooks/useQuizzes';
import './css/CreateQuiz.css';
import TopicForm  from './TopicForm';
import NotesForm from './NotesForm';
import PDFForm from './PDFForm'


function CreateQuiz({ onClose }) {
  const [showTopicForm, setShowTopicForm] = useState(false);
  const [showNotesForm, setShowNotesForm] = useState(false);
  const [showPdfForm, setShowPdfForm] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [formData, setFormData] = useState({
    inputType: '',
    topic: '',
    notes: '',
    difficulty: 'medium',
    count: 5
  });
  const {createFlashcards, loading, error} = useQuizzes();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   const result = await createFlashcards(
      {
        inputType: formData.inputType,
        topic: formData.topic,
        notes: formData.notes,
        difficulty: formData.difficulty,
        count: formData.count
      },
      pdfFile // This will be null if not using PDF form
    );
    console.log('Flashcards created:', result);
    if(result){
      onClose()
    }
  };

  const resetForms = () => {
    if (!loading || !error) { // Only allow reset if not loading
      setShowTopicForm(false);
      setShowNotesForm(false);
      setShowPdfForm(false);
      setPdfFile(null);
    }
  };

  return (
    <div className="create-quiz-container">
      <button 
        className="close-button" 
        onClick={onClose}
        aria-label="Close modal"
      >
        ×
      </button>
      
      <h2 className="create-quiz-title">Create New Quiz</h2>
      
      <div className="action-buttons-container">
        <button 
          className={`action-button topic-button ${showTopicForm ? 'active' : ''}`}
          onClick={() => {
            resetForms();
            setFormData(prev => ({...prev, inputType: 'topic'}));
            setShowTopicForm(true);
          }}
        >
          <span className="button-icon">📚</span>
          <span className="button-text">Topic</span>
        </button>
        
        <button 
          className={`action-button notes-button ${showNotesForm ? 'active' : ''}`}
          onClick={() => {
            resetForms();
            setFormData(prev => ({...prev, inputType: 'notes'}));
            setShowNotesForm(true);
          }}
        >
          <span className="button-icon">📝</span>
          <span className="button-text">Notes</span>
        </button>
        
        <button 
          className={`action-button pdf-button ${showPdfForm ? 'active' : ''}`}
          onClick={() => {
            resetForms();
            setFormData(prev => ({...prev, inputType: 'pdf'}));
            setShowPdfForm(true);
          }}
        >
          <span className="button-icon">📄</span>
          <span className="button-text">PDF</span>
        </button>
      </div>

      {/* Topic Form */}
      {showTopicForm && (
        
        <TopicForm 
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          loading={loading}
          error = {error}
        />
      )}

      {/* Notes Form */}
      {showNotesForm && (
        <NotesForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          loading={loading}
          error = {error}
        />
      )}

      {/* PDF Form */}
      {showPdfForm && (
         <PDFForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleFileChange={handleFileChange}
          pdfFile={pdfFile}
          loading={loading}
          error = {error}
        />
      )}
    </div>
  );
}

export default CreateQuiz;