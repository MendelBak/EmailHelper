// Checks if a user has at least one available credit in their account.
// TODO: refactor to check if user has enough credits for a specific, requested operation.

module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'You do not have enough credits.' });
  }

  next();
};