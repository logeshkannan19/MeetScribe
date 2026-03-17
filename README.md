# MeetScribe AI 🎙️

**"Turn meetings into clarity in seconds."**

MeetScribe AI is a premium SaaS application that leverages OpenAI Whisper and GPT-4o to transform meeting audio and transcripts into structured, actionable insights.

## ✨ Features

- 🎙️ **Smart Transcription**: Near-instant speech-to-text using OpenAI Whisper.
- 🧠 **AI Summarization**: GPT-4o powered executive summaries and key highlights.
- ✅ **Action Items**: Automatically detect tasks and owners from your discussions.
- 📊 **Sentiment Analysis**: Understand the tone and mood of your meetings.
- 💾 **Safe Storage**: History of all your meetings, searchable and securely stored.
- 🎨 **Modern UI**: A glassmorphic, dark-mode-first dashboard built with Next.js & Tailwind.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Node.js, Express, Multer (file handling)
- **Database**: MongoDB (Mongoose)
- **AI Integration**: OpenAI SDK (Whisper V3 & GPT-4o)

## 🚀 Getting Started

### 1. Prerequisites
- Node.js ≥ 18
- MongoDB Atlas account
- OpenAI API Key

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Fill in MONGODB_URI and OPENAI_API_KEY
npm start
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:3000` to see the landing page.

## 📁 Project Structure

```
meetscribe-ai/
├── client/          # Next.js App Router & Components
├── server/          # Node.js API & AI Logic
│   ├── controllers/ # Business logic (Auth, AI, Notes)
│   ├── models/      # Mongoose Schemas (User, Note)
│   ├── middleware/  # Auth & Upload filters
│   └── routes/      # API endpoints
└── README.md
```

## 📄 License
MIT License.
