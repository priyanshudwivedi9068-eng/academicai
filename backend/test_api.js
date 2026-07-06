import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const token = jwt.sign({ id: '64d1f2a5e4b0a1c9d8e7f6a5' }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });

async function test() {
  const res = await fetch('https://academicai-emzn.onrender.com/api/ai/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `access_token=${token}`
    },
    body: JSON.stringify({ message: "Hello", history: [] })
  });
  
  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Response:", text);
}

test();
