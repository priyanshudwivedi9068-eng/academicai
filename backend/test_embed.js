import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function test() {
  try {
    const res = await ai.models.embedContent({
      model: 'gemini-embedding-2',
      contents: 'test',
    });
    console.log("Success with gemini-embedding-2!");
  } catch (err) {
    console.log("Error with gemini-embedding-2:", err.message);
  }

  try {
    const res = await ai.models.embedContent({
      model: 'text-embedding-004',
      contents: 'test',
    });
    console.log("Success with text-embedding-004!");
  } catch (err) {
    console.log("Error with text-embedding-004:", err.message);
  }
}

test();
