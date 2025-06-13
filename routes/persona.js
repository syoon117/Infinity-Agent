const express = require('express');
const router = express.Router();
const { getAllPersonas, getPersonaByName } = require('../services/personaService');

router.get('/', (req, res) => {
  res.json({ personas: getAllPersonas() });
});

router.get('/:name', (req, res) => {
  const persona = getPersonaByName(req.params.name);
  if (!persona) return res.status(404).json({ error: 'Persona not found' });
  res.json({ persona });
});

// Global error handler
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

module.exports = router;
