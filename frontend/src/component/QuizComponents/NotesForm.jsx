const NotesForm = ({ formData, handleInputChange, handleSubmit, loading, error }) => {
  return (
    <form className="quiz-form" onSubmit={handleSubmit}>
      <h3>Create from Notes</h3>
      <div className="form-group">
        <label htmlFor="topic">Topic (Optional)</label>
        <input
          type="text"
          id="topic"
          name="topic"
          value={formData.topic}
          onChange={handleInputChange}
          placeholder="Enter topic (optional)"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="notes">Notes*</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          required
          placeholder="Paste your notes here"
          rows="5"
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
      {error && <p className="error">{"1 minute per request. Thank You!"}</p>}
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

export default NotesForm;