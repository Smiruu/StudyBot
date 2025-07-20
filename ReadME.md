# StudyBot - AI-Powered Flashcard Generator

![MERN Stack](https://img.shields.io/badge/Stack-MERN-brightgreen)
![AI Model](https://img.shields.io/badge/AI-DeepSeek_R1_0528-blue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<div align="center">
  <img src="https://i.imgur.com/JQ7X9zP.png" alt="StudyBot Screenshot" width="80%">
</div>

## Features

### 🧠 AI-Powered Generation
- Create flashcards from topics or text notes
- Extract content from PDFs
- Powered by DeepSeek-R1-0528 (free version via OpenRouter)

### 📚 Smart Organization
- Automatic grouping of generated flashcards
- Categorize by topic/difficulty
- Full CRUD operations for flashcards

### 🔒 Secure Authentication
- JWT token-based auth
- Protected API routes
- User-specific content isolation

## Tech Stack

**Frontend:**
- React.js
- Redux Toolkit
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)

**AI Integration:**
- OpenRouter API
- DeepSeek-R1-0528 model
- Rate limiting (1 request/minute)


