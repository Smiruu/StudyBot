import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const registerUser = (data) => API.post('/register', data);
export const verifyEmail = (data) => API.post('/verify', data);
export const loginUser = (data) => API.post('/users/login', data);
export const sendResetPassword = (data) => API.post('/send-reset', data);
export const resetPassword = (data) => API.post('/reset-password', data);

export const createFlashcards = (formData, token) =>
  API.post('/create', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

export const getUserFlashcards = (token) =>
  API.get('/userFlashcards', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getGroupFlashcards = (token) =>
  API.get('/userFlashcards/flashcards', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteFlashcardGroup = (data, token) =>
  API.delete('/userFlashcards/delete', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
