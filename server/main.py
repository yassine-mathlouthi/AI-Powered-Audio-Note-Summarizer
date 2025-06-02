import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv

# Load environment variables



app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

# Initialize Groq client
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY)

@app.route('/api/process-audio', methods=['POST'])
def process_audio():
    if 'files' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files['files']
    if audio_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # Save audio temporarily
        temp_path = "temp_audio.wav"
        audio_file.save(temp_path)

        # Transcribe with Whisper
        with open(temp_path, "rb") as file:
            transcription = client.audio.transcriptions.create(
                file=(audio_file.filename, file.read()),
                model="whisper-large-v3",
                response_format="verbose_json",
                language="en"
            )

        os.remove(temp_path)

        transcript = transcription.text
        print("Transcript:", transcript)

        # Generate full summary
        full_summary = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[
                {
                    "role": "system",
                    "content": "You are an assistant that summarizes audio transcripts."
                },
                {
                    "role": "user",
                    "content": f"Please provide a full, detailed summary of this transcript:\n{transcript}"
                },
            ],
            temperature=0.7,
            max_tokens=1024,
            top_p=1,
            stream=False,
        ).choices[0].message.content

        executiveSummary = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[
                {
                    "role": "system",
                    "content": "You are an assistant that give A short executive summary audio transcripts."
                },
                {
                    "role": "user",
                    "content": f"Please provide a A short executive summary of this transcript:\n{transcript}"
                },
            ],
            temperature=0.7,
            max_tokens=1024,
            top_p=1,
            stream=False,
        ).choices[0].message.content

        keyPoints = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[
                {
                    "role": "system",
                    "content": "You are an assistant that give Bullet points of key takeaways  of an audio transcripts."
                },
                {
                    "role": "user",
                    "content": f"Please provide Bullet points of key takeaways  of this transcript:\n{transcript}"
                },
            ],
            temperature=0.7,
            max_tokens=1024,
            top_p=1,
            stream=False,
        ).choices[0].message.content

        actionItems = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[
                {
                    "role": "system",
                    "content": "You are an assistant that extract clear actionable items or next steps. For example: 'Send follow-up email to client', 'Prepare presentation slides'."
                },
                {
                    "role": "user",
                    "content": f"Please provide actionable items or next steps of this transcript:\n{transcript}"
                },
            ],
            temperature=0.7,
            max_tokens=1024,
            top_p=1,
            stream=False,
        ).choices[0].message.content
        return jsonify({
            "transcript": transcript,
            "fullSummary": full_summary,
            "executiveSummary":executiveSummary,
            "keyPoints":keyPoints,
            "actionItems":actionItems
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
