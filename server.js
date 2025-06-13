require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { enforcePersonaAttribution } = require('./middleware/fsvl');
const app = express();

app.use(cors());
app.use(express.json());
app.use(cors);
app.use(enforcePersonaAttribution);

// Health check
app.get('/health', (req, res) => res.json({ status: 'Infinity Agent backend running' }));

const chatRoute = require('./routes/chat');
const personaRoute = require('./routes/persona');
const contextRoute = require('./routes/context');
const evolutionRoute = require('./routes/evolution');
const verifyRoute = require('./routes/verify');
const tokensRoute = require('./routes/tokens');
app.use('/api/chat', chatRoute);
app.use('/api/persona', personaRoute);
app.use('/api/context', contextRoute);
app.use('/api/evolution', evolutionRoute);
app.use('/api/verify', verifyRoute);
app.use('/api/tokens', tokensRoute);

// TODO: Implement /api/chat, /api/persona, /api/context, /api/evolution

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Infinity Agent backend listening on port ${PORT}`);
});
