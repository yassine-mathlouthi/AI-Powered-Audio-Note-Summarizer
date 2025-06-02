# 🧠 AI-Powered Audio Note Summarizer

This project allows users to upload audio notes (MP3, WAV, M4A), automatically transcribe them using AI (Whisper), and generate intelligent summaries including:
- Full Summary
- Executive Summary
- Key Points
- Action Items

## 🚀 Setup Instructions (Docker Compose Workflow)

### Prerequisites
- [Docker](https://www.docker.com/) installed
- [Docker Compose](https://docs.docker.com/compose/) installed

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yassine-mathlouthi/AI-Powered-Audio-Note-Summarizer.git
   cd AI-Powered-Audio-Note-Summarizer 

2.Create a .env file for the backend:
   ```bash
   GROQ_API_KEY=your_groq_api_key_here 

3.Run the full stack:
   ```bash
   docker-compose up --build 

## 🧩 Architecture Overview

This project consists of a frontend and backend, each running in its own Docker container and orchestrated via Docker Compose.

### Frontend

- Built with **Next.js 14** using the App Router.
- Styled using **Tailwind CSS** and **Shadcn/ui** component library.
- Provides a file upload interface for audio files.
- Displays the transcription and multiple summary views via tabs:
  - Transcript
  - Full Summary
  - Executive Summary
  - Key Points
  - Action Items
- Shows upload progress and error handling.

### Backend

- Built with **Flask** (Python).
- Exposes a REST API endpoint `/api/process-audio`.
- Accepts multipart audio file uploads.
- Uses the **Groq API** for Whisper transcription and LLM-based summarization.
- Returns structured JSON containing the transcript and summaries.

### Communication & Deployment

- Frontend sends audio files to backend via HTTP POST.
- Backend processes and responds with transcription and summaries.
- Both services are containerized with Docker and started together using Docker Compose.
- Environment variables (like API keys) are securely passed via `.env` files configured in Docker Compose.

---




home
![image](https://github.com/user-attachments/assets/ff4f99dd-386d-4f3f-a480-c037d75074c2)
transcript
![image](https://github.com/user-attachments/assets/4c020437-e9a3-40e8-b5c7-35170b5eb659)
full samurray 
![image](https://github.com/user-attachments/assets/0827d969-ff0f-4cfa-90fc-af0c7e406e3a)
execusive summary 
![image](https://github.com/user-attachments/assets/c0744318-02d9-4904-b515-9807bab5f62b)
key points 
![image](https://github.com/user-attachments/assets/a5992d9f-2c00-4943-ade8-636cc6cfdfaf)
actions items 
![image](https://github.com/user-attachments/assets/e573989f-54d5-4545-a9fe-50ce372aabfe)


