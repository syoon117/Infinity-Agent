const express = require('express');
const router = express.Router();
const { logEvolution, getEvolutions } = require('../services/evolutionService');

router.get('/', (req, res) => {
  res.json({ evolutions: getEvolutions() });
});

router.post('/', (req, res) => {
  logEvolution(req.body);
  res.json({ status: 'Evolution event logged', evolutions: getEvolutions() });
});

// Global error handler
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

module.exports = router;
