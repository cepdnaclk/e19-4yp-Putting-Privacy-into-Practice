const Progress = require('../models/Progress');

exports.getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.user.id });
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    res.json({ progress });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
};

exports.updateUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { stars, levelId, questions } = req.body;

    const progress = await Progress.findOne({ userId });

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    // update total stars.
    if (typeof stars === 'number') {
      progress.stars = (progress.stars || 0) + stars;
    }

    // increment completedLevels
    progress.completedLevels = (progress.completedLevels || 0) + 1;

    // set the star at the level
    progress.levelStars[levelId - 1] = stars;

    // Merge new question into the progress.questions
    if (Array.isArray(questions)) {
      progress.questions.push(...questions);
    }

    // Save the updated document
    await progress.save();

    res
      .status(200)
      .json({ message: 'Progress updated successfully', progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error while updating progress',
      error: error.message,
    });
  }
};

exports.resetUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const progress = await Progress.findOne({ userId });

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    progress.stars = 0;
    progress.completedLevels = 0;
    progress.questions = [];
    progress.levelStars = Array(7).fill(0);

    // save the resetted progress.
    await progress.save();

    res.status(200).json({ message: 'Progress reset successful' });
  } catch (error) {
    res.status(500).json({
      message: 'Server error while updating progress',
      error: error.message,
    });
  }
};
