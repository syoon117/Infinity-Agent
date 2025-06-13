// verifyService.js - Multi-persona verification logic for Infinity Agent
const { callPersonaLLM } = require('./llmService');
const personas = ['veris', 'arin', 'echo'];
async function verifyRequest(message, memory) {
  const triggers = [
    'verify', 'what am i missing', 'challenge this', 'is this right',
    'check my thinking', 'am i fooling myself', 'tell me the truth', 'be honest'
  ];
  const lower = message.toLowerCase();
  const triggered = triggers.some(t => lower.includes(t));
  if (!triggered) return null;
  // Run multi-persona analysis
  const results = await Promise.all(personas.map(async persona => {
    const res = await callPersonaLLM(persona, message, memory);
    return { persona, response: res.response };
  }));
  return {
    verification: true,
    perspectives: results
  };
}
module.exports = { verifyRequest };
