// Utility for error handling
function handleError(res, status, message) {
  res.status(status).json({ error: message });
}

module.exports = { handleError };
