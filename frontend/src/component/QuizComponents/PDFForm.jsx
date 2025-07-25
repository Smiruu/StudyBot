

const PDFForm = ({formData, 
  handleInputChange, 
  handleSubmit, 
  handleFileChange, 
  pdfFile,
loading,
error }) => {
    return(
         <form className="quiz-form" onSubmit={handleSubmit}>
          <h3>Create from PDF</h3>
          <div className="form-group">
            <label htmlFor="pdf-upload">Upload PDF*</label>
            <input
              type="file"
              id="pdf-upload"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
            {pdfFile && (
              <div className="file-info">
                Selected: {pdfFile.name}
              </div>
            )}
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
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Creating Flashcards...' : 'Create Quiz'}
        </button>
      </div>
        </form>
    )
}

export default PDFForm;