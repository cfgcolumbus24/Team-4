import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { db } from './firebaseConfig.js';
import { collection, getDocs } from 'firebase/firestore';
import Groq from 'groq-sdk';

const app = express();
const PORT = process.env.PORT || 5004;

console.log("GROQ_API_KEY:", process.env.GROQ_API_KEY);  // Check if the key is loaded

if (!process.env.GROQ_API_KEY) {
  console.error("GROQ_API_KEY is missing. Check your .env file.");
  process.exit(1);  // Stop the server if the API key is missing
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint for Chat
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    // Fetch data from Firestore database if needed
    const teachersCollection = collection(db, 'login');
    const teacherSnapshot = await getDocs(teachersCollection);
    const teachers = teacherSnapshot.docs.map(doc => doc.data());

    // Format data to send to the AI model (Groq)
    const dataContent = `There are ${teachers.length} teachers in the database.`;

    // Send the user's message and data to Groq's API for an AI-generated response
    const response = await groq.chat.completions.create({
      messages: [
        { role: 'user', content: message },
        { role: 'system', content: dataContent }
      ],
      model: 'llama3-8b-8192', // Verify this model is correct for your Groq account
    });

    // Parse the response from Groq
    const botReply = response.choices?.[0]?.message?.content || 'Sorry, I am unable to respond.';

    // Send response back to the client
    res.json({ response: botReply });
  } catch (error) {
    console.error('Error handling chat:', error);
    res.status(500).json({ response: 'Error processing your request.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
