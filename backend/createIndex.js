import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

dotenv.config();

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const indexName = process.env.PINECONE_INDEX || 'academicai-index';

async function createIndex() {
  try {
    console.log('Checking existing indexes...');
    const existingIndexes = await pc.listIndexes();
    const indexExists = existingIndexes.indexes?.some(index => index.name === indexName);

    if (indexExists) {
      console.log(`Index "${indexName}" already exists!`);
    } else {
      console.log(`Creating index "${indexName}" with dimension 768...`);
      await pc.createIndex({
        name: indexName,
        dimension: 768, 
        metric: 'cosine',
        spec: { 
          serverless: { 
            cloud: 'aws', 
            region: 'us-east-1' 
          }
        } 
      });
      console.log(`Index "${indexName}" created successfully! It might take a minute to initialize.`);
    }
  } catch (error) {
    console.error('Error creating index:', error);
  }
}

createIndex();
