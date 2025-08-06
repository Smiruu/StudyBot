import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useQuizzes } from "../../hooks/QuizHooks/useQuizzes";
import Flashcard from "../../component/QuizComponents/Flashcard"; // This is your individual card component
import "./css/FlashcardScreen.css";

const FlashcardScreen = () => {
  const { groupId } = useParams();
  const { flashcards, fetchFlashcards, loading, error } = useQuizzes();

  useEffect(() => {
    const fetchData = async () => {
      if (groupId) {
        await fetchFlashcards(groupId);
      }
    };
    fetchData();
  }, [groupId, fetchFlashcards]); // Include fetchFlashcards in dependencies for stability

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading flashcards...</p>
      </div>
    );
  }

  // You might also want an error state here, similar to loading
  if (error) {
    return (
      // Apply the error-container class for styling
      <div className="error-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  console.log(flashcards); // Keep this for debugging if needed
  const groupName =
    flashcards.length > 0 ? flashcards[0].group.name : "Unknown Group";
  return (
    // Apply the main page container class
    <div className="flashcard-page-container">
      <h1>
        Flashcards for Group:{" "}
        <span className="flashcard-group-id">{groupName}</span>
      </h1>
      {flashcards.length > 0 ? (
        // Use a <div> with flashcard-grid class for the grid layout
        <div className="flashcard-grid">
          {flashcards.map((card) => (
            <Flashcard
              key={card.id} // Ensure each card has a unique key
              question={card.question} // Assuming 'question' is the front
              answer={card.answer} // Assuming 'answer' is the back
            />
          ))}
        </div>
      ) : (
        // Apply the no-flashcards-message class
        <p className="no-flashcards-message">
          No flashcards found for this group.
        </p>
      )}
    </div>
  );
};

export default FlashcardScreen;
