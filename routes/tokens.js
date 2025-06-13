const express = require('express');
const router = express.Router();
const { getTokenLog } = require('../services/llmService');
router.get('/', (req, res) => {
  res.json({ tokens: getTokenLog() });
});
// Global error handler
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

module.exports = router;
