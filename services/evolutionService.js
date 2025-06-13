// evolutionService.js - Handles evolution tracking and milestone logging
let evolutions = [];

function logEvolution(event) {
  evolutions.push({ ...event, timestamp: Date.now() });
}

function getEvolutions() {
  return evolutions;
}

module.exports = { logEvolution, getEvolutions };
