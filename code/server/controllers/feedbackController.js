const OpenAI = require('openai');
require('dotenv').config();
const Question = require('../models/Question');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateFeedback = async (req, res) => {
  const { scenario, challenge, selectedOption, correctAnswer, principle } =
    req.body;

  try {
    const prompt = `
You are an expert tutor in GDPR. A developer answered the following question incorrectly.
Scenario: "${scenario}"
Challenge: "${challenge}"
User's selected option: "${selectedOption}"
Correct answer: "${correctAnswer}"
GDPR Principle: "${principle}"
Please explain why the selected option is wrong and give a short, motivating explanation based on GDPR. Do not include the correct answer in your response.
Your response should be concise and educational, helping the user understand their mistake and learn from it.
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });

    const feedback = response.choices[0].message.content;
    res.json({ feedback });
  } catch (error) {
    console.error('LLM error:', error);
    res.status(500).json({ error: 'Failed to generate feedback' });
  }
};

exports.storeFeedback = async (req, res) => {
  const { questionId, selectedOption, feedback } = req.body;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    question.FeedBackonWrongOptions[selectedOption] = feedback;
    await question.save();

    res.status(201).json({ message: 'Feedback stored successfully' });
  } catch (error) {
    console.error('Error storing feedback:', error);
    res.status(500).json({ message: 'Failed to store feedback', error });
  }
};
