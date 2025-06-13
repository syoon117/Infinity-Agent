const express = require('express');
const router = express.Router();
const { getContext, updateContext } = require('../services/contextService');

router.get('/', (req, res) => {
  res.json({ context: getContext() });
});

router.post('/', (req, res) => {
  updateContext(req.body);
  res.json({ context: getContext() });
});

// Global error handler
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

module.exports = router;
