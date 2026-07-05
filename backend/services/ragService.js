import { GoogleGenAI } from '@google/genai';
import { Pinecone } from '@pinecone-database/pinecone';

// Initialize Gemini
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

// Initialize Pinecone
const pc = process.env.PINECONE_API_KEY ? new Pinecone({ apiKey: process.env.PINECONE_API_KEY }) : null;
const indexName = process.env.PINECONE_INDEX || 'academicai';

export const chunkText = (text, maxLength = 1000) => {
  const paragraphs = text.split(/\n\s*\n/);
  const chunks = [];
  let currentChunk = "";

  for (const p of paragraphs) {
    if (currentChunk.length + p.length > maxLength && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = p + "\n\n";
    } else {
      currentChunk += p + "\n\n";
    }
  }
  
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  const finalChunks = [];
  for (const chunk of chunks) {
    if (chunk.length > maxLength * 1.5) {
      let i = 0;
      while (i < chunk.length) {
        finalChunks.push(chunk.substring(i, i + maxLength));
        i += maxLength - 200; // 200 overlap
      }
    } else {
      finalChunks.push(chunk);
    }
  }

  return finalChunks;
};

export const processDocumentAndEmbed = async (text, documentId, userId) => {
  if (!ai || !pc) {
    console.log("Skipping RAG embedding: Gemini or Pinecone API key is missing.");
    return;
  }

  const chunks = chunkText(text);
  const index = pc.index(indexName);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    
    // Generate embedding
    const response = await ai.models.embedContent({
      model: 'gemini-embedding-2',
      contents: chunk,
    });
    
    const embedding = response.embeddings[0].values;

    // Save to Pinecone
    await index.upsert([{
      id: `${documentId}-${i}`,
      values: embedding,
      metadata: {
        documentId: documentId.toString(),
        userId: userId.toString(),
        text: chunk,
      }
    }]);
  }
};

export const retrieveContext = async (query, userId, documentId = null) => {
  if (!ai || !pc || !userId) {
    return "";
  }

  // Generate embedding for the search query
  const response = await ai.models.embedContent({
    model: 'gemini-embedding-2',
    contents: query,
  });
  
  const queryEmbedding = response.embeddings[0].values;
  const index = pc.index(indexName);

  const filterDict = { userId: userId.toString() };
  if (documentId) {
    filterDict.documentId = documentId.toString();
  }

  const searchResults = await index.query({
    vector: queryEmbedding,
    topK: 5,
    includeMetadata: true,
    filter: filterDict
  });

  if (!searchResults.matches || searchResults.matches.length === 0) {
    return "";
  }

  return searchResults.matches.map(match => match.metadata.text).join('\n\n');
};
