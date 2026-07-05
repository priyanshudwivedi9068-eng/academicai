import { GoogleGenAI } from '@google/genai';
import { retrieveContext } from '../services/ragService.js';

const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

export const streamChat = async (req, res) => {
  if (!ai) {
    return res.status(500).json({ message: 'Gemini API not configured' });
  }

  try {
    const { message, history } = req.body;
    const userId = req.user.id; // From authMiddleware

    const context = await retrieveContext(message, userId);

    const systemPrompt = `You are AcadAssist, an advanced academic AI tutor. 
Use the following context extracted from the user's uploaded documents to answer their question.
If the answer is not in the context, use your general knowledge but mention that it wasn't found in their notes.

CONTEXT:
${context ? context : 'No context found.'}`;

    const contents = [];
    if (history && history.length > 0) {
      for (const msg of history) {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemPrompt
      }
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
      }
    }
    
    res.write('data: [DONE]\n\n');
    res.end();

  } catch (error) {
    console.error('Chat error:', error);
    res.write(`data: ${JSON.stringify({ error: 'An error occurred during chat generation.' })}\n\n`);
    res.end();
  }
};

export const generateQuiz = async (req, res) => {
  if (!ai) {
    return res.status(500).json({ message: 'Gemini API not configured' });
  }

  try {
    const { topic, difficulty, type } = req.body;
    const userId = req.user.id;

    const context = await retrieveContext(topic, userId);

    const prompt = `Generate a ${difficulty} difficulty quiz about "${topic}" consisting of 5 questions of type: ${type}.
Base the quiz strictly on the following context if provided. If the context is insufficient, use your general academic knowledge.

CONTEXT:
${context ? context : 'No specific context.'}

You MUST return the output strictly as a JSON array of objects. Do not include markdown code blocks. 
Format:
[
  {
    "question": "Question text",
    "options": ["A", "B", "C", "D"], 
    "answer": "Correct answer text",
    "explanation": "Explanation of why this is correct"
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    let rawText = response.text;
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    const quizData = JSON.parse(rawText);
    res.json(quizData);

  } catch (error) {
    console.error('Quiz error:', error);
    res.status(500).json({ message: 'Failed to generate quiz' });
  }
};

export const generateNotes = async (req, res) => {
  if (!ai) {
    return res.status(500).json({ message: 'Gemini API not configured' });
  }

  try {
    const { topic, style } = req.body;
    const userId = req.user.id;

    const context = await retrieveContext(topic, userId);

    const prompt = `Generate academic notes about "${topic}" in the style of "${style}".
Use the following context from the user's uploaded documents as the primary source of truth.

CONTEXT:
${context ? context : 'No specific context.'}

Format the output entirely in beautiful GitHub-flavored Markdown. Use headings, bullet points, bold text, and tables where appropriate.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ markdown: response.text });

  } catch (error) {
    console.error('Notes error:', error);
    res.status(500).json({ message: 'Failed to generate notes' });
  }
};
