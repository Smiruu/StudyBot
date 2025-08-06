import { useState, useCallback } from "react";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/flashcards" });

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [flashcards, setFlashcards] = useState([])
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createFlashcards = async (flashcardData, file = null) => {
    // Cooldown timer implementation

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

      return response.data;
    } catch (err) {
      setError(
        "Failed to create flashcards.Try again after 1 minute"
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
  }, [setIsLoading,setError,setQuizzes]);

 const fetchFlashcards = useCallback(async (groupId) => {
        setIsLoading(true); // Set loading to true when starting fetch
        setError(null);     // Clear any previous errors

        try {
            const token = localStorage.getItem("accessToken");

            if (!groupId) {
                setError("Group ID is missing.");
                setIsLoading(false);
                return;
            }
            if (!token) {
                setError("Authentication token is missing. Please log in.");
                setIsLoading(false);
                return;
            }

            const response = await API.get(`/userFlashcards/${groupId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // IMPORTANT: Reverted to response.data.data based on your initial code.
            // If your API directly returns the array as response.data, change this back to response.data
            setFlashcards(response.data.data); 

        } catch (err) {
            console.error("Failed to fetch flashcards:", err);
            // More robust error message extraction
            setError(err.response?.data?.message || err.message || "An unknown error occurred while fetching flashcards.");
        } finally {
            setIsLoading(false); // Always set loading to false when done
        }
    }, [setIsLoading, setError, setFlashcards]);
  return { 
    quizzes, 
    flashcards,
    loading, 
    error, 
    fetchQuizzesByGroup, 
    createFlashcards,
    fetchFlashcards

  };
};
