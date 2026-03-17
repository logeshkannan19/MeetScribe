const OpenAI = require('openai');
const Note = require('../models/Note');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * @desc    Process meeting audio or transcript using AI
 * @route   POST /api/ai/process
 * @access  Private
 */
exports.processMeeting = async (req, res) => {
  try {
    const { transcript, title } = req.body;
    let finalTranscript = transcript;

    // Handle audio file transcription if provided
    if (req.file) {
      console.log(`[AI] Transcribing audio: ${req.file.originalname}`);
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(req.file.path),
        model: 'whisper-1',
      });
      finalTranscript = transcription.text;
      
      // Clean up temporary upload
      fs.unlinkSync(req.file.path);
    }

    if (!finalTranscript) {
      return res.status(400).json({ 
        success: false, 
        message: 'No transcript provided. Please upload an audio file or paste text.' 
      });
    }

    console.log(`[AI] Analyzing transcript for: ${title || 'Untitled Meeting'}`);

    // AI Summarization & Analysis
    const prompt = `
      Analyze the following meeting transcript and provide a structured JSON response.
      The JSON should have these keys: "summary" (array of bullet points), "keyPoints" (array of strings), "actionItems" (array of objects with {task, responsibility}), "sentiment" ({score, label}), "tags" (array of topics).

      Transcript:
      ${finalTranscript}
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const aiResult = JSON.parse(response.choices[0].message.content);

    // Save notes to database with owner association
    const note = await Note.create({
      user: req.user.id,
      title: title || 'Untitled Meeting',
      originalText: finalTranscript,
      summary: aiResult.summary,
      keyPoints: aiResult.keyPoints,
      actionItems: aiResult.actionItems,
      sentiment: aiResult.sentiment,
      tags: aiResult.tags,
    });

    res.status(201).json({ success: true, data: note });
  } catch (err) {
    console.error(`[AI Error] ${err.message}`);
    const statusCode = err.status || 500;
    res.status(statusCode).json({ 
      success: false, 
      message: err.message || 'AI processing failed. Please check your connectivity and API limits.' 
    });
  }
};
