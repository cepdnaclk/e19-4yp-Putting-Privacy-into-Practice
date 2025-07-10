const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getLLMFeedback(question, userAnswer, correctAnswer, principle) {
  const prompt = `
You are an expert tutor in GDPR. A developer answered the following question incorrectly.

Question: "${question}"
Their answer: "${userAnswer}"
Correct answer: "${correctAnswer}"
GDPR Principle: "${principle}"

Please explain why the answer is incorrect and give a short, motivating explanation based on GDPR.
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 150,
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}

module.exports = { getLLMFeedback };
