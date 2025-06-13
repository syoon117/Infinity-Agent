// memoryService.js - Supabase integration
const supabase = require('../utils/db');

async function saveMemory(userId, sessionId, content, tier, type, relevance_score) {
  const { data, error } = await supabase.from('memories').insert([
    { user_id: userId, session_id: sessionId, content, tier, type, relevance_score }
  ]);
  if (error) throw error;
  return data;
}

async function getMemories(userId, tier = 'hot') {
  const { data, error } = await supabase.from('memories').select('*').eq('user_id', userId).eq('tier', tier).order('created_at', { ascending: false }).limit(10);
  if (error) throw error;
  return data;
}

module.exports = { saveMemory, getMemories };
