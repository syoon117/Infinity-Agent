// personaRouter.js - Modular dynamic LLM router for Infinity Agent
const personaModelMap = {
  arin: { model: 'claude-opus-4-20250514', temp: 0.3, fallback: 'gpt-4-turbo-preview' },
  echo: { model: 'claude-opus-4-20250514', temp: 0.8, fallback: 'gpt-4-turbo-preview' },
  ethos: { model: 'claude-opus-4-20250514', temp: 0.4, fallback: 'gpt-4-turbo-preview' },
  astra: { model: 'gpt-4-turbo-preview', temp: 0.7, fallback: 'claude-sonnet-4' },
  veris: { model: 'gpt-4-turbo-preview', temp: 0.5, fallback: 'claude-sonnet-4' },
  nova: { model: 'gpt-4-turbo-preview', temp: 0.9, fallback: 'claude-sonnet-4' },
};

function getPersonaConfig(persona) {
  return personaModelMap[persona.toLowerCase()] || null;
}

module.exports = { getPersonaConfig };
