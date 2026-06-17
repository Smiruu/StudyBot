# StudyBot - Your AI-Powered Learning Partner 🧠⚡

![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Express.js](https://img.shields.io/badge/Backend-Express.js-000000?logo=express&logoColor=white)
![Supabase](https://img.shields.io/badge/Database-Supabase%20%28PostgreSQL%29-3ECF8E?logo=supabase&logoColor=white)
![Gemini](https://img.shields.io/badge/AI_Model-Google_Gemini-8E75B2?logo=google&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

StudyBot is a full-stack, AI-driven educational platform designed for high-velocity learning. Simply upload your notes, textbook chapters, or handwritten images, and StudyBot instantly transforms them into comprehensive study guides and interactive, timed quizzes to test your retention.

---

## ✨ Features

### 📚 Intelligent Material Processing
- **Multi-Format Uploads**: Support for PDFs (`pdf-parse`), Word Documents (`mammoth`), and Images (`tesseract.js` OCR).
- **Centralized Dashboard**: Organize and preview your uploaded materials in a sleek, searchable library.

### 🤖 AI-Generated Study Materials
- **Instant Study Guides**: Google Gemini automatically condenses your textbooks and notes into easily digestible study guides.
- **Dynamic Quizzes**: Automatically generates multiple-choice quizzes uniquely tailored to the content of your uploaded documents.

### ⏱️ Interactive Assessment & Anti-Cheat
- **Timed Quizzes**: Configurable time limits per question with live countdown timers.
- **Anti-Cheat Mechanics**: Strict state management prevents users from refreshing the page or leaving the quiz without resetting their attempt.
- **Progress Tracking**: Tracks attempt history and calculates accuracy to help you monitor your learning journey over time.


## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: React 19 (via Vite)
- **Styling**: Tailwind CSS (Modern Glassmorphism & Custom Design System)
- **Routing**: React Router DOM
- **Icons & Assets**: Lucide React
- **Document Viewing**: React-PDF, Mammoth

### Backend (Server)
- **Environment**: Node.js & Express.js
- **Database & Auth**: Supabase (PostgreSQL)
- **AI Integration**: Google Generative AI API (Gemini)
- **File Handling**: Multer, PDF-Parse, Mammoth, Tesseract.js

---

## 📂 Project Structure

A clean, scalable, domain-driven architecture separating client and server logic.

```text
StudyBot/
├── client/                     # Frontend Application
│   ├── src/
│   │   ├── api/                # API client configuration
│   │   ├── components/         # Reusable UI elements (auth, layout, ui, dashboard, quiz)
│   │   ├── context/            # React Context (AuthContext)
│   │   ├── hooks/              # Custom React Hooks (useFiles, useQuiz, useCountdown)
│   │   ├── screens/            # Application Pages (auth, dashboard, quiz, public)
│   │   ├── utils/              # Helper functions
│   │   ├── App.jsx             # Main Router
│   │   └── main.jsx            # Entry Point
│   └── package.json            # Frontend Dependencies
│
└── server/                     # Backend Application
    ├── src/
    │   ├── apps/               # Domain-driven modules (users, quizzes, materials)
    │   ├── config/             # Environment & service configurations
    │   ├── middlewares/        # Express Middlewares (Auth validation, Multer uploads)
    │   ├── utils/              # Helper utilities
    │   └── index.js            # Server Entry Point
    └── package.json            # Backend Dependencies
```


