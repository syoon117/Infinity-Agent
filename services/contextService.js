// contextService.js - Handles context retrieval and updates
let context = {
  hot: [],
  warm: [],
  cool: [],
  cold: []
};

function getContext() {
  return context;
}

function updateContext(newContext) {
  context = { ...context, ...newContext };
}

module.exports = { getContext, updateContext };
