import express, { json } from 'express';
import { post } from 'axios';
const app = express();
const port = 3001; // or another port

app.use(json());

app.post('/api/chat', async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const response = await post('https://generativelanguage.googleapis.com/v1beta2/models/models/gemini-pro:generateText', {
      prompt: prompt,
      temperature: 0.7,
      maxOutputTokens: 200,
    }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': process.env.REACT_APP_GEMINI_API_KEY // Again, replace with secure key management
        }
    });
    res.json({ response: response.data.candidates[0].output });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});