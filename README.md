#  AI-Powered Audio Note Summarizer

This project allows users to upload audio notes in formats like MP3, WAV, and M4A, transcribe them using AI (Whisper via Groq API), and generate intelligent summaries. The summaries are categorized into:

-  **Full Summary**
-  **Executive Summary**
-  **Key Points**
-  **Action Items**

---

##  Setup Instructions (Docker Compose Workflow)

### Prerequisites

Before you begin, ensure you have the following installed:

- Docker
- Docker Compose

### Steps

1. **Clone the Repository**\
   Clone this project to your local machine and navigate into the directory:

   ```bash
   git clone https://github.com/yassine-mathlouthi/AI-Powered-Audio-Note-Summarizer.git
   cd AI-Powered-Audio-Note-Summarizer
   ```

2. **Set Up Environment Variables**\
   Create a `.env` file in the project root for the backend and add your Groq API key:

   ```bash
   GROQ_API_KEY=your_groq_api_key_here
   ```

3. **Run the Full Stack**\
   Build and start both the frontend and backend services using Docker Compose:

   ```bash
   docker-compose up --build
   ```

   - The frontend will be available at `http://localhost:3000`.
   - The backend API will be accessible at `http://localhost:8000`.

---

##  Architecture Overview

This project is a full-stack application with a frontend and backend, orchestrated using Docker Compose for seamless deployment.

### Frontend

- **Framework**: Built with **Next.js 14**.
- **Styling**: Utilizes **Tailwind CSS** and the **Shadcn/ui** component library for a modern, responsive design.
- **Functionality**:
  - File upload interface for audio files.
  - Tabbed interface to display:
    - Transcript
    - Full Summary
    - Executive Summary
    - Key Points
    - Action Items
  - Displays upload progress and handles errors gracefully.

### Backend

- **Framework**: Built with **Flask** (Python).
- **API**: Exposes a REST endpoint `/api/process-audio` for processing audio files.
- **Processing**:
  - Uses the **Groq API** to perform Whisper transcription and LLM-based summarization.
  - Returns structured JSON with the transcript and summaries.

### Communication & Deployment

- The frontend sends audio files to the backend via an HTTP POST request.
- The backend processes the audio and responds with the transcription and summaries.
- Both services are containerized with Docker and managed via Docker Compose.
- Environment variables (e.g., API keys) are securely passed using `.env` files.

---
## Potential Improvements
If given more time, I would:

Add persistent storage with a database (e.g., PostgreSQL)

Implement authentication and user history

Allow real-time transcription streaming

## 📸 Screenshots

Below are screenshots showcasing the application's interface and features:

### Home Page

Upload your audio files here to get started.

![Home Page](https://github.com/user-attachments/assets/ff4f99dd-386d-4f3f-a480-c037d75074c2)
### Transcript

View the full transcription of your audio.

![Transcript](https://github.com/user-attachments/assets/4c020437-e9a3-40e8-b5c7-35170b5eb659)
### Full Summary

Get a detailed summary of the audio content.

![Full Summary](https://github.com/user-attachments/assets/0827d969-ff0f-4cfa-90fc-af0c7e406e3a)
### Executive Summary

A concise summary for quick insights.

![Executive Summary](https://github.com/user-attachments/assets/c0744318-02d9-4904-b515-9807bab5f62b)
### Key Points

Highlight the main takeaways from the audio.

![Key Points](https://github.com/user-attachments/assets/a5992d9f-2c00-4943-ade8-636cc6cfdfaf)
### Action Items

Identify actionable steps derived from the audio.

![Action Items](https://github.com/user-attachments/assets/e573989f-54d5-4545-a9fe-50ce372aabfe)

---


