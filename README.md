# MeetScribe AI – Smart AI Meeting Notes Summarizer 🎙️🚀

**"Turn meetings into clarity in seconds."**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://client-itlmxnf88-logeshkannan19s-projects.vercel.app)

MeetScribe AI is a production-ready SaaS application that leverages OpenAI Whisper and GPT-4o to transform meeting audio and transcripts into structured summaries, action items, and actionable insights.

---

## ✨ Features

- 🎙️ **Smart Transcription**: Near-instant speech-to-text using OpenAI Whisper (MP3, WAV, etc.).
- 🧠 **AI Summaries**: GPT-4o powered concise summaries, key discussion highlights, and important decisions.
- ✅ **Action Item Tracking**: Automatically detect tasks and responsibilities with precision.
- 📈 **Sentiment Analysis**: Understand the tone and mood of your meetings at a glance.
- 💾 **Personal Dashboard**: A secure, glassmorphic history of all your meeting notes.
- 📤 **Export & Share**: Professional PDF exports and shareable links for better collaboration.

---

## 🏗️ Architecture

- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Node.js, Express, Multer
- **Database**: MongoDB (Mongoose)
- **AI Engine**: OpenAI SDK (Whisper V3 & GPT-4o)

Refer to the [Architecture Overview](ARCHITECTURE.md) for a deep dive into our design choices.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js ≥ 18
- MongoDB Atlas account
- OpenAI API Key

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/logeshkannan19/MeetScribe.git
cd MeetScribe

# Setup Backend
cd server
npm install
cp .env.example .env
# Update .env with your credentials
npm start

# Setup Frontend
cd ../client
npm install
npm run dev
```

Visit `http://localhost:3000` to start scribe-ing.

---

## 🗺️ Roadmap
Check our [Roadmap](ROADMAP.md) to see what's coming next, including real-time transcription and speaker diarization.

---

## 🤝 Contributing
Contributions are welcome! See our [Contributing Guide](CONTRIBUTING.md) to get started.

---

## 📄 License
Distributed under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">
Made with 🎙️ by <a href="https://github.com/logeshkannan19">logeshkannan19</a>
</div>
