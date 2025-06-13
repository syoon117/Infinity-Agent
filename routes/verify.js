const express = require('express');
const router = express.Router();
const { getMemory } = require('../services/memoryService');
const { verifyRequest } = require('../services/verifyService');

router.post('/', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });
  const hotMemory = getMemory('hot');
  const result = verifyRequest(message, hotMemory);
  if (!result) return res.status(200).json({ result: 'No verification triggered.' });
  res.json(result);
});
// Global error handler
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

module.exports = router;
