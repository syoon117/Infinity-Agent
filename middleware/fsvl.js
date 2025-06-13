const validPersonas = ['arin', 'astra', 'veris', 'echo', 'ethos', 'nova'];
function enforcePersonaAttribution(req, res, next) {
  const originalJson = res.json;
  res.json = function(data) {
    if (data && data.response) {
      if (!data.persona) {
        console.error('FSVL-0610 VIOLATION: Response without persona attribution');
        data.persona = 'echo';
        data.warning = 'FSVL-0610: Added missing persona attribution';
      }
      if (typeof data.persona !== 'string' || (!validPersonas.includes(data.persona) && !(typeof data.persona === 'string' && data.persona.includes('+')))) {
        data.persona = 'echo';
        data.warning = 'Invalid persona corrected to Echo';
      }
    }
    originalJson.call(this, data);
  };
  next();
}
module.exports = { enforcePersonaAttribution };
