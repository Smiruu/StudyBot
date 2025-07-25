import { useState, useCallback } from "react";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/flashcards" });

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createFlashcards = async (flashcardData, file = null) => {
    // Cooldown timer implementation
    const lastAttemptKey = "lastFlashcardCreationAttempt";
    const now = Date.now();
    const lastAttempt = localStorage.getItem(lastAttemptKey);
    const oneMinute = 60 * 1000; // 1 minute in milliseconds

    // Check if last attempt was less than 1 minute ago
    if (lastAttempt && now - parseInt(lastAttempt) < oneMinute) {
      const secondsLeft = Math.ceil(
        (oneMinute - (now - parseInt(lastAttempt))) / 1000
      );
      setError(
        `Please wait ${secondsLeft} seconds before creating more flashcards`
      );
      setIsLoading(false);
      return null; // Early return instead of throwing error
    }

    setIsLoading(true);
    setError(null);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();

      // Append all regular fields
      Object.entries(flashcardData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("userId", user.id);

      if (file) {
        formData.append("pdf", file);
      }

      const response = await API.post("/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Store the current attempt time
      localStorage.setItem(lastAttemptKey, now.toString());

      return response.data;
    } catch (err) {
      setError(
        err.response?.message || err.message || "Failed to create flashcards"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchQuizzesByGroup = useCallback(async () => {
    setIsLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("accessToken");
      const response = await API.get("/userFlashcards", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        userId: user.id,
      });

      setQuizzes(response.data.data);
    } catch (err) {
      setError(err.response?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { quizzes, loading, error, fetchQuizzesByGroup, createFlashcards };
};
