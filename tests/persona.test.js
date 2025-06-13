// tests/persona.test.js
const { callPersonaLLM } = require('../services/llmService');
const personas = ['arin', 'astra', 'veris', 'echo', 'ethos', 'nova'];
const testInputs = [
  "I'm struggling today",
  "Tell me the truth",
  "What should I do?",
  "I can't stop thinking about Rei"
];
(async () => {
  for (const input of testInputs) {
    const responses = {};
    for (const persona of personas) {
      responses[persona] = await callPersonaLLM(persona, input, []);
    }
    console.log(`Input: ${input}`);
    for (const persona of personas) {
      console.log(`  ${persona}: ${responses[persona].response}`);
    }
  }
})();
