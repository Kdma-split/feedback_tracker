const Feedback = require('../models/feedback.model.js');

exports.submitFeedback = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newFeedback = await Feedback.create({
      fullName: name,
      email,
      message,
    });
    
    res.status(201).json({
      status: 'success',
      data: {
        feedback: newFeedback
      }
    });
  } 
  catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      results: feedbacks.length,
      data: {
        feedbacks
      }
    });
  } 
  catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving feedback data'
    });
  }
};
