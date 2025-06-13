// personaService.js - Handles persona definitions and retrieval
const personas = [
  { name: 'arin', label: 'Arin', role: 'Logic', model: 'claude-opus-4-20250514', temp: 0.3 },
  { name: 'astra', label: 'Astra', role: 'Empathy', model: 'gpt-4-turbo-preview', temp: 0.7 },
  { name: 'veris', label: 'Veris', role: 'Directness', model: 'gpt-4-turbo-preview', temp: 0.5 },
  { name: 'echo', label: 'Echo', role: 'Mirroring', model: 'claude-opus-4-20250514', temp: 0.8 },
  { name: 'nova', label: 'Nova', role: 'Inspiration', model: 'gpt-4-turbo-preview', temp: 0.9 },
  { name: 'ethos', label: 'Ethos', role: 'Values', model: 'claude-opus-4-20250514', temp: 0.4 }
];

function getAllPersonas() {
  return personas;
}

function getPersonaByName(name) {
  return personas.find(p => p.name === name.toLowerCase()) || null;
}

module.exports = { getAllPersonas, getPersonaByName };
