import { useState, useCallback } from "react";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/flashcards" });

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createFlashcards = async (flashcardData, file = null, user, accessToken) => {
    // Cooldown timer implementation

    setIsLoading(true);
    setError(null);

    try {

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
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Store the current attempt time

      return response.data;
    } catch (err) {
      setError("Failed to create flashcards.Try again after 1 minute");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchQuizzesByGroup = useCallback(async (user, accessToken) => {
    setIsLoading(true);

    try {

      const response = await API.get("/userFlashcards", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

  const fetchFlashcards = useCallback(
    async (groupId, accessToken) => {
      setIsLoading(true); // Set loading to true when starting fetch
      setError(null); // Clear any previous errors
      console.log(accessToken)
      try {
        

        if (!groupId) {
          setError("Group ID is missing.");
          setIsLoading(false);
          return;
        }
        if (!accessToken) {
          setError("Authentication token is missing. Please log in.");
          setIsLoading(false);
          return;
        }

        const response = await API.get(`/userFlashcards/${groupId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // IMPORTANT: Reverted to response.data.data based on your initial code.
        // If your API directly returns the array as response.data, change this back to response.data
        setFlashcards(response.data.data);
      } catch (err) {
        console.error("Failed to fetch flashcards:", err);
        // More robust error message extraction
        setError(
          err.response?.data?.message ||
            err.message ||
            "An unknown error occurred while fetching flashcards."
        );
      } finally {
        setIsLoading(false); // Always set loading to false when done
      }
    },
    [setIsLoading, setError, setFlashcards]
  );

  const deleteFlashcards = async (groupId, accessToken) => {
    setIsLoading(true);

    try {

      
      await API.delete(`/userFlashcards/${groupId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      fetchQuizzesByGroup();
    } catch (err) {
      setError(err.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    quizzes,
    flashcards,
    loading,
    error,
    deleteFlashcards,
    fetchQuizzesByGroup,
    createFlashcards,
    fetchFlashcards,
  };
};
