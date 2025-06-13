const express = require('express');
const router = express.Router();
const { getPersonaConfig } = require('../services/personaRouter');
const { addMemory, getMemory } = require('../services/memoryService');
const { callPersonaLLM } = require('../services/llmService');

// POST /api/chat
router.post('/', async (req, res) => {
  const { message, persona } = req.body;
  if (!message || !persona) {
    return res.status(400).json({ error: 'Message and persona are required.' });
  }
  const config = getPersonaConfig(persona);
  if (!config) {
    return res.status(400).json({ error: 'Invalid persona.' });
  }
  // Add message to HOT memory tier
  addMemory('hot', { persona, message, timestamp: Date.now() });
  const hotMemory = getMemory('hot');
  // Use LLM service (dev mode or real)
  const llmResponse = await callPersonaLLM(persona, message, hotMemory);
  res.json({
    persona,
    model: config.model,
    temp: config.temp,
    fallback: config.fallback,
    response: llmResponse.response,
    dev: llmResponse.dev || false,
    cached: llmResponse.cached || false,
    memory: hotMemory
  });
});

// Global error handler
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

module.exports = router;
