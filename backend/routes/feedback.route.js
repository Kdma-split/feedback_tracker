const express = require('express');
const feedbackController = require('../controllers/feedback.controller.js');

const router = express.Router();

router.post('/submit-feedback', feedbackController.submitFeedback);
router.get('/feedbacks', feedbackController.getAllFeedback);

module.exports = router;
