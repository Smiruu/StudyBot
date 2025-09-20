import React from 'react';

const TopicForm = ({ formData, handleInputChange, handleSubmit, loading,error }) => {
  return (
    <form className="quiz-form" onSubmit={handleSubmit}>
      <h3>Create from Topic</h3>
      <div className="form-group">
        <label htmlFor="topic">Topic*</label>
        <input
          type="text"
          id="topic"
          name="topic"
          value={formData.topic}
          onChange={handleInputChange}
          required
          placeholder="Enter topic"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="difficulty">Difficulty*</label>
        <select
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleInputChange}
          required
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="very hard">Very Hard</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="count">Number of Questions*</label>
        <input
          type="number"
          id="count"
          name="count"
          min="1"
          max="20"
          value={formData.count}
          onChange={handleInputChange}
          required
        />
      </div>
        {error && <p className="error">{error}</p>}
       <div className="form-actions">
        <button 
          type="submit" 
          className="hs-button bg-green-500 hover:bg-green-600"
          disabled={loading}
        >
          {loading ? 'Creating Flashcards...' : 'Create Quiz'}
        </button>
      </div>
    </form>
  );
};

export default TopicForm;