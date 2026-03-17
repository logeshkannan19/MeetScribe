# MeetScribe AI Architecture

MeetScribe AI is built with a decoupled architecture focusing on scalability and high-performance AI processing.

## 🏗 System Overview

### 1. Frontend (Next.js 14)
- **App Router**: Leverages React Server Components for performance.
- **Tailwind CSS**: A comprehensive design system for a premium SaaS feel.
- **Framer Motion**: Handles micro-interactions and transitions for a fluid UX.
- **Context API**: Manages global authentication state.

### 2. Backend (Node.js/Express)
- **AI Processing Pipeline**: 
  - **Whisper V3**: Fast speech-to-text conversion for audio files.
  - **GPT-4o**: Large language model for structured summarization and entity extraction (action items, tags).
- **Security**: Implements JWT-based stateless authentication and Helmet for secure headers.
- **Storage**: MongoDB handles metadata and meeting insights, while local storage temporarily buffers uploads.

## 🔄 Data Lifecycle

1. **Ingestion**: User uploads audio or pastes a transcript via the `UploadSection`.
2. **Buffering**: Audio files are buffered using Multer before being streamed to the OpenAI Whisper API.
3. **Analysis**: The transcribed text is sent to GPT-4o with a custom system prompt to generate a JSON response containing the summary, action items, and sentiment.
4. **Persistence**: The meeting note is saved to MongoDB, associated with the authenticated user's ID.
5. **Retrieval**: The dashboard fetches notes and renders them with animated transitions.

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Frameworks**: Express, Next.js
- **Database**: MongoDB
- **AI**: OpenAI SDK
- **Styling**: Tailwind CSS
