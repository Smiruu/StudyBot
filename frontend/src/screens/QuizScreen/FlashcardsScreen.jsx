import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useQuizzes } from "../../hooks/QuizHooks/useQuizzes";
import Flashcard from "../../component/QuizComponents/Flashcard";
import "./css/FlashcardScreen.css";
import { useAuth } from "../../hooks/AuthHooks/userAuth";

const FlashcardScreen = () => {
  const { groupId } = useParams();
  const { flashcards, fetchFlashcards, loading, error } = useQuizzes();
  const { accessToken } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      if (groupId) {
        await fetchFlashcards(groupId, accessToken);
      }
    };
    fetchData();
  }, [groupId, fetchFlashcards]);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading flashcards...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  console.log(flashcards);
  const groupName =
    flashcards.length > 0 ? flashcards[0].group.name : "Unknown Group";
  return (
    <div className="flashcard-page-container">
      <h1>
        Flashcards for Group:{" "}
        <span className="flashcard-group-id">{groupName}</span>
      </h1>
      {flashcards.length > 0 ? (
        <div className="flashcard-grid">
          {flashcards.map((card) => (
            <Flashcard
              key={card.id}
              question={card.question}
              answer={card.answer}
            />
          ))}
        </div>
      ) : (
        <p className="no-flashcards-message">
          No flashcards found for this group.
        </p>
      )}
    </div>
  );
};

export default FlashcardScreen;
