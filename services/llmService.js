// llmService.js - Handles persona LLM calls, dev mode, and response caching
const DEV_MODE = process.env.DEV_MODE === 'true';

const mockPersonaResponses = {
  arin: (input) => ({
    response: "Looking at this logically, [specific observation about input]. Let's break down what's happening here.",
    persona: 'arin'
  }),
  astra: (input) => ({
    response: "I can feel the weight in what you're sharing. [emotional recognition]. You're not alone in this.",
    persona: 'astra'
  }),
  veris: (input) => ({
    response: "Here's the truth: [direct observation]. No sugar-coating - [honest feedback].",
    persona: 'veris'
  }),
  echo: (input) => ({
    response: "Reflecting your words: [mirrored insight].",
    persona: 'echo'
  }),
  nova: (input) => ({
    response: "Let's imagine new possibilities: [creative suggestion].",
    persona: 'nova'
  }),
  ethos: (input) => ({
    response: "From a values perspective: [ethical reflection].",
    persona: 'ethos'
  })
};

class ResponseCache {
  constructor(maxSize = 100, ttl = 3600000) { // 1 hour TTL
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }
  generateKey(persona, input, contextHash) {
    return `${persona}-${input.substring(0, 50)}-${contextHash}`;
  }
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    return item.response;
  }
  set(key, response) {
    if (this.cache.size >= this.maxSize) {
      // Remove oldest
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, { response, expiry: Date.now() + this.ttl });
  }
}

const responseCache = new ResponseCache();

async function callPersonaLLM(persona, input, context, contextHash = 'default') {
  const key = responseCache.generateKey(persona, input, contextHash);
  const cached = responseCache.get(key);
  if (cached) return { ...cached, cached: true };
  if (DEV_MODE) {
    await new Promise(r => setTimeout(r, 500));
    const mock = mockPersonaResponses[persona] ? mockPersonaResponses[persona](input) : { response: 'Mock response', persona };
    responseCache.set(key, mock);
    logTokenUsage(persona, input, mock.response, 10);
    return { ...mock, dev: true, tokens: 10 };
  }
  // TODO: Implement real LLM API call and rate limit handling here
  // await rateLimiter.throttle();
  // const real = await realLLMCall(persona, input, context);
  // responseCache.set(key, real);
  // return real;
  logTokenUsage(persona, input, "LLM API not implemented", 0);
    return { response: "LLM API not implemented", persona, tokens: 0 };
}

module.exports = { callPersonaLLM };

// Simple token logging (mocked for now)
let tokenLog = [];
function logTokenUsage(persona, input, response, tokens=10) {
  tokenLog.push({ persona, input, response, tokens, timestamp: Date.now() });
  if (tokenLog.length > 1000) tokenLog.shift();
}
function getTokenLog() { return tokenLog; }
